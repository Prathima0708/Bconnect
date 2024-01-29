import React, { useEffect, useState, Component } from 'react' 
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Image,
    Button,
    StyleSheet,
    RefreshControl,
} from 'react-native'
import {
    Feather,
    Ionicons,
    MaterialIcons,
    Octicons,
    Fontisto,
} from '@expo/vector-icons'
import { CheckBox, Input } from 'react-native-elements'

import shop1 from '../../assets/images/shops/shop7.jpg'
import { images } from '../../constants/images'
import { FONTS, SIZES } from '../../constants'
import Toast from 'react-native-toast-message'
// import { SafeAreaView } from 'react-native-safe-area-context'

// import { ScrollView } from 'react-native-virtualized-view'

import { COLORS } from '../../constants'
import Header from '../../components/Header'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
    addToCart_URL,
    deleteFavorites_URL,
    favoriteItemPost_URL,
    updateFavorites_URL,
    filterByCategoryOrBrand,
    getAllProducts_URL,
    getBrands_URL,
    getCategories_URL,
    getFavoritesByUserId_URL,
    getFavorites_URL,
    getProductsById,
    userCart_URL,
} from '../../constants/utils/URL'
import axios from 'axios'
import { TouchableWithoutFeedback } from 'react-native'
import { async } from 'validate.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brandsModalVisible: false,
            categoriesModalVisible: false,
            isLoading: false,
            cartModalVisible: false,
            selectedBrands: [],
            selectedCategories: [],
            searchText: '',
            isCardClicked: false,
            selectedCardIndex: null,
            favoriteItems: [],
            userFavouriteId: [],
            selectedItem: {},
            brands: [],
            categories: [],
            allProducts: [],
            cartItems: 0,
            userId: '',
            selectedProductIds: [],
            apiProductIds: undefined,
            cartCount: 0,
            quantity: 1,
            handleFavStatus: false,
            isRefreshing: false,
        };
    }

    handleCategorySelection = async (category) => {
        this.setState((prevState) => {
            const selectedCategories = prevState.selectedCategories;
            if (selectedCategories.includes(category.id)) {
                return {
                    selectedCategories: selectedCategories.filter((item) => item !== category.id),
                };
            } else {
                return {
                    selectedCategories: [...selectedCategories, category.id],
                };
            }
        });
    };

    handleBrandSelection = async (brand) => {
        this.setState((prevState) => {
            const selectedBrands = prevState.selectedBrands;
            if (selectedBrands.includes(brand.id)) {
                return {
                    selectedBrands: selectedBrands.filter((item) => item !== brand.id),
                };
            } else {
                return {
                    selectedBrands: [...selectedBrands, brand.id],
                };
            }
        });
    };

    getCartCount = async () => {
        try {
            const request_model = {
                userId: this.state.userId,
            }
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }
            const res = await axios.post(
                `${userCart_URL}`,
                request_model,
                {
                    headers: headers,
                }
            )
            console.log("BBBBBBBBBBBBBBB",res.data)
            this.setState((prevState) => ({
                cartCount: res.data.length
            }));
        } catch (e) {
            console.log(e)
        }
    }

    retrieveUserId = async () => {
        try {
            const userid = await AsyncStorage.getItem('userid');

            if (userid !== null) {
                this.setState({ userId: userid }, () => {
                    this.getAllFavorites();
                    this.getCartCount();
                });
            } else {
                console.log('User ID not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error retrieving user ID:', error);
        }
    };
    addFavouite = async () => {
        const response = await fetch(
            getFavorites_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: this.state.userId,
                    productIds: this.state.favoriteItems
                }),
            }
        )
    }

    showModal = async (productDetails) => {
        this.setState({
            selectedItem: productDetails, cartModalVisible: true
        });
    }

    getAllFavorites = async () => {
        try {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }
            const request_body = {
                userId: this.state.userId,
            }
            const res = await axios.post(
                `${getFavoritesByUserId_URL}`,
                request_body,
                {
                    headers: headers,
                }
            )
            this.setState(prevState => ({
                favoriteItems: res.data.productIds
            }));

        } catch (e) {
            console.log(e)
        }
    }

    handleFavoriteItem = (item, flag) => {
        if (flag) {
            this.setState(prevState => ({
                favoriteItems: [...prevState.favoriteItems, item.id],
            }), () => {
                this.addFavouite();
            });
        } else {
            this.setState(prevState => ({
                favoriteItems: prevState.favoriteItems.filter(
                    favoriteItem => favoriteItem !== item.id
                ),
            }), () => {
                this.addFavouite();
            });
        }
    };

    handleOpenCartModal = async (item) => {
        try {
            const response = await fetch(`${getProductsById}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: item.id }),
            })

            if (response.ok) {
                const productDetails = await response.json()
                this.showModal(productDetails)
            } else {
                console.error('Failed to fetch product details')
            }
        } catch (error) {
            console.error('Error fetching product details', error)
        }
    }

    handleCardModal = async () => {
        this.setState((prevState) => ({
            selectedProductIds: [...prevState.selectedProductIds, this.state.selectedItem.id],
            cartItems: prevState.cartItems + 1,
            cartModalVisible: false,
        }));

        Toast.show({
            position: 'bottom',
            text1: 'Added to cart',
            text1Style: { color: 'white', backgroundColor: 'black' },
            type: 'info',
        })
        const request_model = {
            userId: this.state.userId,
            productQuantity: {
                productId: this.state.selectedItem.id,
                quantity: this.state.quantity,
            },
        }

        try {
            this.setState((prevState) => ({
                isLoading: true
            }));
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const res = await axios.post(`${addToCart_URL}`, request_model, {
                headers: headers,
            })
            console.log('after adding to cart', res.data)
            this.setState({
                quantity: 1
            });

            this.getCartCount();
        } catch (error) {
            console.log('Error ', error)
        } finally {
            this.setState({
                isLoading: false
            });
        }
    }

    setCategoriesModalVisible(flag) {
        this.setState({
            categoriesModalVisible: flag
        });
    }

    noActionCategories() {
        this.setState({
            categoriesModalVisible: false, selectedCategories: []
        });
    }

    noActionBrand() {
        this.setState({
            brandsModalVisible: false, selectedBrands: []
        });
    }

    closeModal = () => {
        this.setState((prevState) => ({
            cartModalVisible: false
        }));
    }

    closeBrandsModal = () => {
        this.setState((prevState) => ({
            brandsModalVisible: false
        }));
    }
    closeCategoriesModal = () => {
        this.setState((prevState) => ({
            categoriesModalVisible: false
        }));
    }
    increaseQuantity = () => {
        this.setState((prevState) => ({
            quantity: prevState.quantity + 1,
        }));
    }


    decreaseQuantity = () => {
        // Decrease the quantity by 1, but make sure it doesn't go below 1
        if (this.state.quantity > 1) {
            this.setState((prevState) => ({
                quantity: prevState.quantity - 1,
            }));
        }
    }

    filterBrands = async () => {
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        const request_body = {
            category: [],
            brand: this.state.selectedBrands,
        }
        const res = await axios.post(
            `${filterByCategoryOrBrand}`,
            request_body,
            {
                headers: headers,
            }
        ) 
        this.setState((prevState) => ({
            brandsModalVisible: false,
            selectedBrands: [],
            allProducts: res.data
        }));
    }

    filterCategory = async () => { 
       
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        const request_body = {
            category: this.state.selectedCategories,
            brand: [''],
        }
        const res = await axios.post(
            `${filterByCategoryOrBrand}`,
            request_body,
            {
                headers: headers,
            }
        )

        this.setState({
            categoriesModalVisible: false,
            selectedCategories: [],
            allProducts: res.data
        }); 
    }



    setBrandsModalVisible = (flag) => {
        this.setState((prevState) => ({
            brandsModalVisible: flag
        }));
    }

    handleRefresh = () => {
        this.setIsRefreshing(true)
        this.getAllProducts();
        this.getCartCount();
    }

    handleQuantityChange = (newQuantity) => {
        // Validate the input to ensure it's a positive integer
        if (/^[1-9]\d*$/.test(newQuantity)) {
            this.setState((prevState) => ({
                quantity: newQuantity
            }));
        }
    }


    render() {
        const { navigation } = this.props;

        return (

            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    fontFamily: 'regular',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        padding: 16,
                        ...FONTS.body4,

                        marginVertical: SIZES.padding * 2,
                        textAlign: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Header title="Products" />

                        <TouchableOpacity
                            onPress={() =>  navigation.navigate('Cart')}
                            style={{
                                position: 'absolute',
                                right: 10,
                                height: 45,
                                width: 45,
                                borderRadius: 22.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.tertiaryBlack,
                            }}
                        >
                            <View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -16,
                                        left: 12,
                                        backgroundColor: COLORS.primary,
                                        height: 25,
                                        width: 25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 12.5,
                                        zIndex: 999,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: COLORS.white,
                                        }}
                                    >
                                        {this.state.cartCount}
                                    </Text>
                                </View>
                                <Feather
                                    name="shopping-cart"
                                    size={24}
                                    color={COLORS.white}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.setCategoriesModalVisible(true)}
                            style={{
                                width: '40%',
                                backgroundColor: COLORS.primary,
                                padding: 10,
                                borderRadius: 15,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 10,
                            }}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    { color: 'white', marginRight: 5 },
                                ]}
                            >
                                Categories
                            </Text>
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.setBrandsModalVisible(true)}
                            style={{
                                width: '40%',
                                backgroundColor: COLORS.primary,
                                padding: 10,
                                borderRadius: 15,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 10,
                            }}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    { color: 'white', marginRight: 3 },
                                ]}
                            >
                                Brands
                            </Text>
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Category Modal */}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.categoriesModalVisible}
                        onRequestClose={this.closeCategoriesModal}
                    >
                        <TouchableWithoutFeedback onPress={this.closeCategoriesModal}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <View
                                    style={{
                                        width: 300, // Set the desired width
                                        height: 300, // Set the desired height
                                        backgroundColor: 'white',
                                        padding: 16,
                                        borderRadius: 10,
                                        position: 'absolute', // Use position 'absolute'
                                    }}
                                >

                                    <ScrollView>
                                        {this.state.categories.map((category, index) => (
                                            <TouchableOpacity
                                                key={category.id}
                                                onPress={() =>
                                                    this.handleCategorySelection(
                                                        category
                                                    )
                                                }
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <CheckBox
                                                    checked={this.state.selectedCategories.includes(
                                                        category.id
                                                    )}
                                                    onPress={() =>
                                                        this.handleCategorySelection(
                                                            category
                                                        )
                                                    }
                                                />
                                                <Text style={styles.text}>
                                                    {category.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.noActionCategories()
                                            }
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 10,
                                                borderRadius: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: COLORS.primary,
                                                    marginLeft: 100,
                                                    fontSize: 20,
                                                }}
                                            >
                                                NO
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={this.filterCategory}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 10,
                                                borderRadius: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: COLORS.primary,
                                                    marginLeft: 10,
                                                    fontSize: 20,
                                                }}
                                            >
                                                OK
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    {/* Brands Modal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.brandsModalVisible}
                        onRequestClose={this.closeBrandsModal}
                    >
                        <TouchableWithoutFeedback onPress={this.closeBrandsModal}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <View
                                    style={{
                                        width: 300, // Set the desired width
                                        height: 300, // Set the desired height
                                        backgroundColor: 'white',
                                        padding: 16,
                                        borderRadius: 10,
                                        position: 'absolute', // Use position 'absolute'
                                    }}
                                >
                                    <ScrollView>
                                        {this.state.brands.map((brand, key) => (
                                            <TouchableOpacity
                                                key={key}
                                                onPress={() =>
                                                    this.handleBrandSelection(brand)
                                                }
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <CheckBox
                                                    checked={this.state.selectedBrands.includes(
                                                        brand.id
                                                    )}
                                                    onPress={() =>
                                                        this.handleBrandSelection(brand)
                                                    }
                                                />
                                                <Text style={styles.text}>
                                                    {brand.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.noActionBrand()
                                            }
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 10,
                                                borderRadius: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: COLORS.primary,
                                                    marginLeft: 100,
                                                    fontSize: 20,
                                                }}
                                            >
                                                NO
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={this.filterBrands}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 10,
                                                borderRadius: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: COLORS.primary,
                                                    marginLeft: 10,
                                                    fontSize: 20,
                                                }}
                                            >
                                                OK
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    {/* Cards */}
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.handleRefresh}
                            />
                        }
                    >
                        {this.state.allProducts.map((item, index) => (

                            <View
                                key={item.id}
                                style={{
                                    marginTop: 5,
                                    backgroundColor: 'white',
                                    padding: 16,
                                    paddingBottom: 3,
                                    borderRadius: 10,

                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() =>
                                            this.handleOpenCartModal(item)
                                        }
                                    >
                                        {item.image ? (
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    marginRight: 30,
                                                }}
                                            />
                                        ) : (
                                            <Image
                                                source={require('../../assets/images/products/product1.jpg')}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    marginRight: 30,
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() =>
                                            this.handleOpenCartModal(item)
                                        }
                                    >
                                        <Text style={{ fontSize: 18 }}>
                                            {item.description}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: 'black',
                                        marginTop: -10,
                                        marginLeft: 80,
                                    }}
                                />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Price: ₹ {item.price}
                                    </Text>



                                    {this.state.favoriteItems.find(
                                        (favItem) =>
                                            favItem === item.id
                                    ) ? (
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.handleFavoriteItem(item, false)
                                            }
                                            style={{ position: 'absolute', right: 10, top: 0 }}
                                        >
                                            <MaterialCommunityIcons
                                                name="heart"
                                                size={20}
                                                color="red"
                                                style={{ position: 'absolute', right: 10, top: 0 }}
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.handleFavoriteItem(item, true)
                                            }
                                            style={{ position: 'absolute', right: 10, top: 0 }}
                                        >
                                            <MaterialCommunityIcons
                                                name={
                                                    this.state.favoriteItems.find(
                                                        (favItem) =>
                                                            favItem ===
                                                            item.id
                                                    )?.clicked_status
                                                        ? 'heart'
                                                        : 'heart-outline'
                                                }
                                                size={20}
                                                color="red"
                                                style={{ position: 'absolute', right: 10, top: 0 }}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>

                        ))}
                    </ScrollView>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.cartModalVisible}
                        onRequestClose={this.closeModal}
                    >
                        <TouchableWithoutFeedback onPress={this.closeModal}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 16,
                                        borderRadius: 10,
                                        width: 300,
                                        borderWidth: 1,
                                        borderColor: 'black',
                                    }}
                                >
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontFamily: 'regular',
                                            }}
                                        >
                                            {this.state.selectedItem.name}
                                        </Text>

                                        <View
                                            style={{
                                                borderWidth: 1,
                                                borderColor: 'black',
                                                borderRadius: 5,
                                                marginTop: 10,
                                                padding: 1,
                                            }}
                                        >
                                            {/* First row of dynamic content */}
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    borderBottomColor: 'black',
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        borderRightWidth: 1,
                                                        borderRightColor: 'black',
                                                        padding: 10,
                                                    }}
                                                >
                                                    <Text
                                                        style={[
                                                            { fontWeight: 'bold' },
                                                        ]}
                                                    >
                                                        Price
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{ flex: 1, padding: 5 }}
                                                >
                                                    <Text
                                                        style={[
                                                            { fontWeight: 'bold' },
                                                        ]}
                                                    >
                                                        {this.state.selectedItem.price}
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* Add more rows as needed */}
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                borderRadius: 5,
                                                padding: 10,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Text
                                                    style={[{ fontWeight: 'bold' }]}
                                                >
                                                    Qty
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'space-between',
                                                        borderWidth: 1,
                                                        borderColor: 'black',
                                                        borderRadius: 5,
                                                        padding: 5,
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={this.decreaseQuantity}
                                                    >
                                                        <Text>-</Text>
                                                    </TouchableOpacity>
                                                    <TextInput
                                                        style={{
                                                            flex: 1,
                                                            textAlign: 'center',
                                                        }}
                                                        value={this.state.quantity.toString()}
                                                        keyboardType="numeric"
                                                        onChangeText={
                                                            this.handleQuantityChange
                                                        }
                                                    />
                                                    <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={this.increaseQuantity}
                                                    >
                                                        <Text>+</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <Text
                                            style={[
                                                {
                                                    marginLeft: 90,
                                                    fontWeight: 'bold',
                                                },
                                            ]}
                                        >
                                            Total : ₹{' '}
                                            {this.state.selectedItem.price *
                                                parseInt(this.state.quantity, 10)}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={this.handleCardModal}
                                            style={{
                                                backgroundColor: COLORS.primary,
                                                padding: 10,
                                                borderRadius: 15,
                                                alignItems: 'center',
                                                marginTop: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                ADD TO CART
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </SafeAreaView>
        );
    }

    componentDidMount() {

        this.retrieveUserId();
        this.getAllProducts();
        this.getCategories();
        this.getBrands();
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }

    componentDidCatch(error, info) {
    }

    setAllProducts(data) {
        this.setState((prevState) => ({
            allProducts: data
        }));
    }

    setIsRefreshing(flag) {
        this.setState((prevState) => ({
            isRefreshing: flag
        }));
    }

    getCategories = async () => {
        try {
            const res = await axios.get(`${getCategories_URL}`)
            this.setCategories(res.data)
        } catch (e) {
            console.log(e)
        }
    }


    setCategories(data) {
        this.setState((prevState) => ({
            categories: data
        }));
    }

    setBrands(data) {
        this.setState((prevState) => ({
            brands: data
        }));
    }

    getBrands = async () => {
        try {
            const res = await axios.get(`${getBrands_URL}`)
            this.setBrands(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    getAllProducts = async () => {
        try {
            const res = await axios.post(`${getAllProducts_URL}`)
            this.setState({
                allProducts: res.data
            });
        } catch (e) {
            console.log(e)
        } finally {
            this.setIsRefreshing(false)
        }
    }

}
const styles = StyleSheet.create({
    text: {
        fontFamily: 'regular',
        fontSize: 16,
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
})
export default Order;
