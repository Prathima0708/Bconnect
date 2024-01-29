import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    TextBase,
} from 'react-native'
import React, { useState, Component } from 'react'
import { COLORS, SIZES, icons } from '../constants'
import * as Animatable from 'react-native-animatable'
import { cartStyles } from '../styles/CartStyles'
import { commonStyles } from '../styles/CommonStyles'
import Input from '../components/Input'
import Button from '../components/Button'
import { cartData } from '../data/cart'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Modal } from 'react-native'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useEffect } from 'react'
import {
    deleteCartItem_URL,
    deleteUserCart_URL,
    deleteUserWishlist_URL,
    fetchProductDetails,
    getUserAddress,
    placeOrder_URL,
    userCart_URL,
} from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { ActivityIndicator } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group'
import { RadioButton } from 'react-native-paper'
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            cartModalVisible: false,
            addressModalVisible: false,
            userId: '',
            fetchProductIds: [],
            productInfo: [],
            userCart: [],
            isLoading: false,
            userAddress: [],
            selectedAddressId: null,
            total: 0,
        };
    }

    closeModal = () => {
        this.setState({
            cartModalVisible: false
        });
    }

    closeAddressModal = () => {
        this.setState({
            addressModalVisible: false
        });
    }

    setCartModalVisible = (flag) => {
        this.setState({
            cartModalVisible: flag
        });
    } 

    getUserId = async () => {
        try {
            const userid = await AsyncStorage.getItem('userid')
            if (userid !== null) {
                this.setState({
                    userId: userid
                });
                this.fetchUserAddress(userid);
                this.getUserCart();
            } else {
                console.log('User ID not found in AsyncStorage')
            }
        } catch (error) {
            console.error('Error retrieving user ID:', error)
        }
    }



    fetchUserAddress = async () => {
        try {
            const request_body = {
                userId: this.state.userId,
            }
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }
            const res = await axios.post(
                `${getUserAddress}`,
                request_body,
                {
                    headers: headers,
                }
            )
            console.log("BBBXXXXXBBBBBBB", res.data)
            this.setState({
                userAddress: res.data
            });
        } catch (error) {
            console.error(error)
        }
    }

    setAddressModalVisible = (flag) => {
        this.setState({
            addressModalVisible: flag
        });
    }
    getUserCart = async () => { 
        this.setState({
            isLoading: true
        });
        const request_model = {
            userId: this.state.userId,
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        try {
            const res = await axios.post(`${userCart_URL}`, request_model, {
                headers: headers,
            })

            const productIdArray = res.data.flatMap((item) =>
                item.productQuantity && item.productQuantity.productId
                    ? [item.productQuantity.productId]
                    : []
            )
            console.log(JSON.parse(JSON.stringify(res.data)), "!!!!!!!!!!!!!!");
            this.setState({
                userCart: res.data,
                fetchProductIds: productIdArray
            });
            this.calculateTotal();
        } catch (e) {
            console.log(e)
        } finally {
            this.setState({
                isLoading: false
            });
        }
    }

    componentDidMount() {
        this.getUserId();
    }

    async getProductDetails() {
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        try {
            const res = await axios.post(
                ` ${fetchProductDetails}`,
                this.state.fetchProductIds,
                {
                    headers: headers,
                }
            )

            const mergedOrderItems = this.state.userCart.map((orderItem) => {
                const productDetail = res.data.find((product) => {
                    if (product.product === orderItem.products.productId)
                        return product
                })

                return {
                    id: orderItem.id,
                    products: {
                        productId: orderItem.products.productId,
                        productDetail: productDetail || {},
                        quantity: orderItem.products.quantity,
                    },
                    userId: orderItem.userId,
                }
            })
            this.setState({
                userCart: mergedOrderItems,
                productInfo: req.data
            });
        } catch (e) {
            console.log(e)
        }
    }

    calculateTotal = () => {
        let sum = 0
        this.state.userCart.forEach((item) => {
            sum +=
                item.productQuantity.quantity * item.productQuantity.product?.price
        })
        this.setState({
            total: sum
        });
    }

    decreaseQuantity = () => {
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
        }
    };

    increaseQuantity = () => {
        this.setState({ quantity: this.state.quantity + 1 });
    };

    placeOrder = async () => {

        const selectedAddress = this.state.userAddress.find(
            (address) => address.id === this.state.selectedAddressId
        ) 
        const mergedOrderItems = this.state.userCart.map((orderItem) => { 
            return {
                productId: orderItem.productQuantity.productId,
                price: orderItem.productQuantity.product.price,
                quantity: orderItem.productQuantity.quantity,
            }
        })

        console.log('CART ITEMS', mergedOrderItems)

        const request_body = {
            userId: this.state.userId,
            orderDate: '2023-12-04T08:45:37.872Z',
            items: mergedOrderItems,
            status: 'PENDING',
            total: this.state.total,
            deliveryType: 'test',
            addressId: selectedAddress.id,
        }

        console.log(request_body)
        try {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const res = await axios.post(
                `${placeOrder_URL}`,
                request_body,
                {
                    headers: headers,
                }
            )
            this.setState({ cartModalVisible: true });
            if (res.data) {
                console.log('Order res:', res.data)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }

    handleAddressSelection = (addressId) => {
        this.setState({ selectedAddressId: addressId });
    }

    closeModal = () => {
        this.setState({ cartModalVisible: false });
    }


    async deleteCartItem(id) {
        try {
            console.log('Deleting item:', id)
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const request_model = {
                id: id,
            }

            const res = await axios.post(
                `${deleteCartItem_URL}`,
                request_model,
                {
                    headers: headers,
                }
            )

            if (res.status === 200) {
                // Fetch the latest user cart data after deletion
                await this.getUserCart()

                Alert.alert('Success', 'Deleted')
                console.log('Item deleted successfully:', res.data)
            } else {
                console.log('Unexpected status code:', res.status)
            }
        } catch (error) {
            // Handle errors
            if (error.response) {
                console.error('Server Error:', error.response.data)
                console.error('Status Code:', error.response.status)
            } else if (error.request) {
                console.error('No response received from server')
            } else {
                console.error('Error:', error.message)
            }
        }
    }

    clearCart = async () => {
        const request_body = {
            userId: this.state.userId
        }
        console.log("DDDDDDDDDD", request_body);
        try {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const res = await axios.post(
                `${deleteUserCart_URL}`,
                request_body,
                {
                    headers: headers,
                }
            )

            if (res) {
                Alert.alert(' Cart items Cleared!')
                await this.getUserCart()
            } else {
                console.log('Unexpected status code:', res.status)
            }
        } catch (error) {
            // Handle errors
            if (error.response) {
            } else if (error.request) {
                console.error('No response received from server')
            } else {
                console.error('Error:', error.message)
            }
        }
    }

    closeAddressModal = () => {
        this.setState({ addressModalVisible: false });
    }


    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }

    render() {
        const { navigation } = this.props;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar hidden={true} />
                <View style={cartStyles.header}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 20,
                        }}
                    >
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={commonStyles.header1Icon}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={icons.arrowLeft}
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: COLORS.black,
                                    }}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    marginLeft: 12,
                                    fontSize: 17,
                                    fontFamily: 'regular',
                                    color: COLORS.black,
                                }}
                            >
                                Cart
                            </Text>
                        </View>
                    </View>

                    {this.state.userCart.length === 0 && (
                        <Text
                            style={{
                                textAlign: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontFamily: 'regular',
                                color: COLORS.black,
                            }}
                        >
                            No items in the cart!
                        </Text>
                    )}

                    {this.state.userCart.length > 0 && (
                        <FlatList
                            data={this.state.userCart}
                            // data={productInfo}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            padding: 15,
                                            borderRadius: 10,
                                            marginBottom: 16,
                                            elevation: 3, // Remove shadow when card is clicked
                                        }}
                                    >

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: 10,
                                                alignItems: 'center',
                                            }}
                                        >

                                            {item.productQuantity.product?.image ? (
                                                <Image
                                                    source={{ uri: item.productQuantity.product?.image }}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        marginRight: 30,
                                                    }}
                                                />
                                            ) : (
                                                <Image
                                                    source={require('../assets/images/products/product1.jpg')}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        marginRight: 30,
                                                    }}
                                                />
                                            )}

                                            <View
                                                style={{ flexDirection: 'column' }}
                                            >
                                                <Text style={styles.text}>
                                                    {
                                                        item.productQuantity.product
                                                            ?.name
                                                    }
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        { fontWeight: 'bold' },
                                                    ]}
                                                >
                                                    {
                                                        item.productQuantity.product
                                                            ?.description
                                                    }
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: 10,
                                            }}
                                        >
                                            <Text style={styles.text}>
                                                Qty: {item.productQuantity.quantity}
                                            </Text>
                                            <Text
                                                style={[
                                                    {
                                                        marginLeft: 10,
                                                        ...styles.text,
                                                    },
                                                ]}
                                            >
                                                Price: ₹{' '}
                                                {item.productQuantity.product?.price}
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    marginLeft: 120,
                                                    borderColor: COLORS.primary,
                                                    borderWidth: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                onPress={() =>
                                                    this.deleteCartItem(item.id)
                                                }
                                            >
                                                <MaterialCommunityIcons
                                                    name="delete"
                                                    size={24}
                                                    color={COLORS.primary}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: 10,
                                            }}
                                        >
                                            <Text style={{ fontFamily: 'Regular', fontSize: 16 }}>
                                                Total: ₹{' '}
                                                {item.productQuantity.quantity *
                                                    item.productQuantity.product
                                                        ?.price}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    )}
                </View>
                {this.state.isLoading && (
                    <ActivityIndicator
                        size="large"
                        color="blue"
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            bottom: 570,
                        }}
                    />
                )}
                {this.state.userCart.length > 0 && (
                    <Animatable.View
                        animation="fadeInUpBig"
                        style={cartStyles.footer}
                    >
                        {/* <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                        }}
                    >
                        <Text style={cartStyles.body3}>Delivery Address</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditCart')}
                        >
                            <Text style={cartStyles.body3Color}>Edit</Text>
                        </TouchableOpacity>
                    </View> */}
                        {/* <Input
                        id="Address"
                        placeholder="2118 Thornridge Cir. Syracuse"
                        placeholderTextColor={COLORS.gray4}
                        editable={false}
                    /> */}

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 16,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={cartStyles.body3}>Grand Total:</Text>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        fontFamily: 'bold',
                                        color: COLORS.black,
                                        marginLeft: 12,
                                    }}
                                >
                                    ₹ {this.state.total.toFixed(2)}
                                </Text>
                            </View>

                        </View>
                        <Button
                            filled
                            title="Clear Cart"
                            onPress={this.clearCart}
                            style={{ marginVertical: 2, backgroundColor: 'red' }}
                        />
                        <Button
                            filled
                            title="CONTINUE"
                            onPress={() => this.setAddressModalVisible(true)}
                            style={{ marginVertical: 2 }}
                        />
                    </Animatable.View>
                )}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.cartModalVisible}
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
                                    width: 350,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                }}
                            >
                                <View>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text style={styles.text}>Thanks</Text>

                                        <Text style={styles.text}>
                                            Your oder placed suucessfully
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: 'black',
                                            borderRadius: 5,
                                            marginTop: 10,
                                            padding: 1,
                                        }}
                                    >
                                        {/* Table header */}
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderBottomWidth: 1,
                                                borderBottomColor: 'black',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    borderRightWidth: 1,
                                                    borderRightColor: 'black',
                                                    padding: 3,
                                                }}
                                            >
                                                <Text style={styles.text}>
                                                    Goods Cost
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, padding: 5 }}>
                                                <Text style={styles.text}>
                                                    ₹ {this.state.total}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* First row of dynamic content */}
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderBottomColor: 'black',
                                                borderBottomWidth: 1,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    borderRightWidth: 1,
                                                    borderRightColor: 'black',
                                                    padding: 3,
                                                }}
                                            >
                                                <Text style={styles.text}>
                                                    Delivery Charges
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, padding: 5 }}>
                                                <Text style={styles.text}>₹ 07</Text>
                                            </View>
                                        </View>
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
                                                    padding: 3,
                                                }}
                                            >
                                                <Text style={styles.text}>
                                                    Total
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, padding: 5 }}>
                                                <Text style={styles.text}>
                                                    ₹ {this.state.total + 7}
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
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text style={styles.text}>
                                                Delivery:
                                            </Text>
                                        </View>

                                        <Text style={styles.text}>
                                            In the next delivery schedule
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={{
                                            height: 55, // Adjust the height as needed
                                            borderColor: 'gray',
                                            borderWidth: 1,
                                            backgroundColor: COLORS.primary,
                                            padding: 5,
                                        }}
                                        placeholder="Type here for enquiry"
                                        multiline={true} // Enable multi-line input
                                    />

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate('PaymentMethod')
                                            }
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
                                                style={{
                                                    color: 'black',
                                                    marginRight: 5,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                PAY NOW
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{
                                                width: '40%',
                                                backgroundColor: '#E7901B',
                                                padding: 10,
                                                borderRadius: 15,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: 10,
                                            }}
                                            // onPress={changeOrderStatus}
                                            onPress={() =>
                                                this.setCartModalVisible(false)
                                            }
                                        >
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    marginRight: 5,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                PAY LATER
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.addressModalVisible}
                >
                    <TouchableWithoutFeedback onPress={this.closeAddressModal}>
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
                                    width: 310,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                }}
                            >
                                <View>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {this.state.userAddress.length > 0 && (
                                            <Text style={styles.text}>
                                                Select address :
                                            </Text>
                                        )}

                                        {this.state.userAddress.length === 0 && (
                                            <Text style={styles.text}>
                                                Please add the address
                                            </Text>
                                        )}
                                    </View>


                                    {this.state.userAddress.map((address) => (
                                        <TouchableOpacity
                                            key={address.id}
                                            style={styles.addressContainer}
                                            onPress={() =>
                                                this.handleAddressSelection(address.id)
                                            }
                                        >
                                            <RadioButton.Android
                                                status={
                                                    this.state.selectedAddressId === address.id
                                                        ? 'checked'
                                                        : 'unchecked'
                                                }
                                                onPress={() =>
                                                    this.handleAddressSelection(
                                                        address.id
                                                    )
                                                }
                                                color="#2790C3"
                                            />
                                            <View style={styles.addresscontainer}>
                                                <View style={styles.subContainer}>
                                                    <View
                                                        style={
                                                            styles.subLeftContainer
                                                        }
                                                    >
                                                        <View
                                                            style={{
                                                                flexDirection:
                                                                    'column',
                                                            }}
                                                        >
                                                            <Text
                                                                style={
                                                                    styles.boldBody
                                                                }
                                                            >
                                                                {address.name}
                                                            </Text>
                                                            <Text
                                                                style={
                                                                    styles.textBody
                                                                }
                                                            >
                                                                {address.street}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                    {this.state.userAddress.length > 0 ? (
                                        <Button
                                            filled
                                            title="PLACE ORDER"

                                            onPress={this.placeOrder}
                                            style={{ marginVertical: 2 }}
                                        />
                                    ) : (
                                        <Button
                                            filled
                                            title="Add address"
                                            onPress={() =>
                                                navigation.navigate('AddNewAddress')
                                            }
                                            style={{ marginVertical: 2 }}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addressContainer: {
        flexDirection: 'row', // Display items in the same row
        alignItems: 'center',
        marginBottom: 10,
    },
    addressDetails: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rounded: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#2790C3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    boldBody: {
        fontWeight: 'bold',
    },
    textBody: {
        color: '#555',
    },
})
export default Cart;
