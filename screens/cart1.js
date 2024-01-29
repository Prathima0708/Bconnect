import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    TextBase,
} from 'react-native'
import React, { useState } from 'react'
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
import { useEffect } from 'react'
import {
    deleteCartItem_URL,
    deleteUserWishlist_URL,
    fetchProductDetails,
    placeOrder_URL,
    userCart_URL,
} from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
const Cart = ({ navigation }) => {
    const data = [
        {
            id: '656b446909804a6330aa3997',
            image: require('../assets/images/shops/30g-urad-masala-papad.jpg'), // Use require for local images
            label: 'Nandini H C Milk 500 Ml',
            label1: 'Frozen products',
            // mrp: 30,
            price: 25,
            favorite: false,
        },
        {
            id: '656b454b09804a6330aa3998',
            image: require('../assets/images/shops/amul-dairy-products.jpg'), // Use require for local images
            label: '2M Choco strands',
            label1: 'Frozen products',
            // mrp: 25,
            price: 20,
            favorite: true,
        },
        {
            id: '656b46b609804a6330aa3999',
            image: require('../assets/images/shops/choco-strand.jpg'), // Use require for local images
            label: '2M Dark choco chips ',
            label1: 'Frozen products',
            // mrp: 25,
            price: 20,
            favorite: true,
        },

        // Add more items as needed
    ]

    const [quantity, setQuantity] = useState(1)
    const [cartModalVisible, setCartModalVisible] = useState(false)
    const [userId, setUserId] = useState('')

    const [fetchProductIds, setFetchProductIds] = useState([])
    const [productInfo,setProductInfo]=useState([])

    const [userCart, setUserCart] = useState([])
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getUserId = async () => {
            try {
                // Retrieve the value of "userid" from AsyncStorage
                const userid = await AsyncStorage.getItem('userid')

                // Check if the value is present
                if (userid !== null) {
                    setUserId(userid)
                    console.log('User ID:', userId)
                } else {
                    console.log('User ID not found in AsyncStorage')
                }
            } catch (error) {
                console.error('Error retrieving user ID:', error)
            }
        }

        getUserId()
    }, [])

    console.log('User ID:', userId)

    useEffect(() => {
        async function getUserCart() {
            const request_model = {
                userId: userId,
            }
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }
            try {
                const res = await axios.post(`${userCart_URL}`, request_model, {
                    headers: headers,
                })

                console.log('user cart', res.data)

                setUserCart(res.data)
                const productIdArray = res.data.flatMap(item =>
                    item.products && item.products.productId
                      ? [item.products.productId]
                      : []
                  );
                
                  console.log('productIdArray', productIdArray);
                // const productIds = res.data.reduce((acc, cartItem) => {
                //     acc.push(...cartItem.productIds)
                //     return acc
                // }, [])
               
                setFetchProductIds(productIdArray)
            } catch (e) {
                console.log(e)
            }
        }

        getUserCart()
    }, [userId])

   

    useEffect(() => {
        async function getProductDetails() {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }
            try {
                const res = await axios.post(
                   ` ${fetchProductDetails}`,
                    fetchProductIds,
                    {
                        headers: headers,
                    }
                )
              
             
             const mergedOrderItems = userCart.map(orderItem => {
                const productDetail = res.data.find( (product)=>{  
                    if(product.product === orderItem.products.productId)
                    return product;
                });
              
                return {
                  id: orderItem.id,
                  products: {
                    productId: orderItem.products.productId,
                    productDetail: productDetail || {},
                    quantity: orderItem.products.quantity
                  },
                  userId: orderItem.userId
                };
              }); 
              setUserCart(mergedOrderItems)
               setProductInfo(res.data);
            } catch (e) {
                console.log(e)
            }
        }

        getProductDetails()
    }, [userId,fetchProductIds])

    useEffect(()=>{
        const calculateTotal = () => {
            let sum = 0;
            userCart.forEach((item) => {
              sum += item.products.quantity * item.products.productDetail?.price;
            });
            console.log('sum is',sum)
            setTotal(sum);
          };
        
          // Call the function to calculate the total
          calculateTotal();
    },[userCart])
   

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    // async function deleteCartItem(id) {
    //     try {
    //         console.log('Deleting item:', id)
    //         let headers = {
    //             'Content-Type': 'application/json; charset=utf-8',
    //         }

    //         const request_model = {
    //             id: id,
    //         }

    //         const res = await axios.post(
    //             ${deleteCartItem_URL},
    //             request_model,
    //             {
    //                 headers: headers,
    //             }
    //         )

    //         // async function getUserCart() {
    //         //     const request_model = {
    //         //         userId: userId,
    //         //     }
    //         //     let headers = {
    //         //         'Content-Type': 'application/json; charset=utf-8',
    //         //     }
    //         //     try {
    //         //         const res = await axios.post(
    //         //             ${userCart_URL},
    //         //             request_model,
    //         //             {
    //         //                 headers: headers,
    //         //             }
    //         //         )

    //         //         console.log('user cart', res.data)

    //         //         setUserCart(res.data)
    //         //     } catch (e) {
    //         //         console.log(e)
    //         //     }
    //         // }

    //         if (res.status === 200) {
    //             Alert.alert('Success', 'deleted', [
    //                 { text: 'OK', onPress: () => getUserCart() },
    //             ])
    //             console.log('Item deleted successfully:', res.data)
    //         } else {
    //             console.log('Unexpected status code:', res.status)
    //         }
    //     } catch (error) {
    //         // Handle errors
    //         if (error.response) {
    //             console.error('Server Error:', error.response.data)
    //             console.error('Status Code:', error.response.status)
    //         } else if (error.request) {
    //             console.error('No response received from server')
    //         } else {
    //             console.error('Error:', error.message)
    //         }
    //     }
    // }

    async function placeOrder() {
      
        const selectedItemsDetails = productInfo.map(({ product, quantity, price }) => ({
            productId: product,
            quantity,
            price,
        }))

        console.log('CART ITEMS', selectedItemsDetails)

        const request_body = {
            userId: userId,
            orderDate: '2023-12-04T08:45:37.872Z',
            items: selectedItemsDetails,
            status: 'PENDING',
            total: 0,
            deliveryType: 'test',
            addressId: 'test',
        }

        console.log(request_body)
        try {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const res = await axios.post(
               ` ${placeOrder_URL}`,
                request_body, // Move request_body to the data property
                {
                    headers: headers,
                }
            )

            setCartModalVisible(true)

            if (res.data) {
                console.log('API response:', res.data)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }

    const closeModal = () => {
        setCartModalVisible(false)
    }

    async function getUserCart() {
        const request_model = {
            userId: userId, // Make sure userId is accessible
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        try {
            const res = await axios.post(`${userCart_URL}`, request_model, {
                headers: headers,
            })

            console.log('user cart', res.data)

            // Update the userCart state with the latest data
            setUserCart(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    function getProductImage(){
        const handleSearch = () => {
            const product = products.find(product => product.product === searchProductId);
            setFoundProduct(product);
          };
    }

    async function deleteCartItem(id) {
        console.log(id,"MMMMMMMMMMM",productInfo)
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
                await getUserCart()

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

    // Assuming this function is defined in your component

    async function clearCart() {

        const request_body={
            userId: userId
        }

        try {
            
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const res = await axios.post(
               `${deleteCartItem_URL}`,
                request_body,
                {
                    headers: headers,
                }
            )

            if (res) {
                // Fetch the latest user cart data after deletion
                Alert.alert('All Cart items Cleared')
                await getUserCart()
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

                {userCart.length===0 &&   <Text
                            style={{
                           textAlign:'center',
                           justifyContent:'center',
                           alignItems:'center',
                                fontFamily: 'regular',
                                color: COLORS.black,
                            }}
                        >
                           No items in the cart!
                        </Text>}

              { userCart.length > 0&& 
              <FlatList
             data={userCart}
                    // data={productInfo}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    padding: 16,
                                    borderRadius: 10,
                                    marginBottom: 16,
                                    elevation: 3, // Remove shadow when card is clicked
                                }}
                            >
                                {/* <View style={{ flexDirection: 'row' }}>
                                    <Image source={item.image} style={{ width: 50, height: 50, marginRight: 30 }} />
                                    <Text style={styles.text}>{item.label}</Text>


                                </View> */}

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image
                                        source={{uri:item.products.productDetail?.image}}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            marginRight: 10,
                                        }}
                                    />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.text}>
                                            {item.products.productDetail?.name}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.text,
                                                { fontWeight: 'bold' },
                                            ]}
                                        >
                                            {item.products.productDetail?.description}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                    }}
                                >
                                    <Text style={styles.text}>Qty:  {item.products.quantity}</Text>
                                    <Text
                                        style={[
                                            { marginLeft: 10, ...styles.text },
                                        ]}
                                    >
                                        Price: ₹ {item.products.productDetail?.price}
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            marginLeft: 150,
                                            borderColor: COLORS.primary,
                                            borderWidth: 1,
                                        }}
                                        onPress={() => deleteCartItem(item.id)}
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
                                    <Text style={styles.text}>Sub total: ₹ {item.products.quantity*item.products.productDetail?.price}</Text>
                                   
                                </View>
                            </View>
                        )
                    }}
                />}
            </View>
           {userCart.length > 0&& <Animatable.View animation="fadeInUpBig" style={cartStyles.footer}>
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
                        style={{ flexDirection: 'row', alignItems: 'center' }}
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
                           ₹ {total}
                        </Text>
                    </View>
                    {/* <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={cartStyles.body3Color}>Breakdown</Text>
                        <View style={{ marginLeft: 2 }}>
                            <Image
                                source={icons.arrowRight}
                                style={{
                                    height: 18,
                                    width: 18,
                                    tintColor: COLORS.black,
                                }}
                            />
                        </View>
                    </View> */}
                </View>
                <Button
                    filled
                    title="Clear Cart"
                    onPress={clearCart}
                    style={{ marginVertical: 2, backgroundColor: 'red' }}
                />
                <Button
                    filled
                    title="PLACE ORDER"
                    // onPress={() => setCartModalVisible(true)}
                    onPress={placeOrder}
                    style={{ marginVertical: 2 }}
                />
            </Animatable.View>}
            <Modal
                animationType="slide"
                transparent={true}
                visible={cartModalVisible}
            >
                 <TouchableWithoutFeedback onPress={closeModal}>
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
                                        <Text style={styles.text}>₹2371</Text>
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
                                        <Text style={styles.text}>₹07</Text>
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
                                        <Text style={styles.text}>Total</Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5 }}>
                                        <Text style={styles.text}>₹2371</Text>
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
                                    <Text style={styles.text}>Delivery:</Text>
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
                                    onPress={() => setCartModalVisible(false)}
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
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    text: {
        fontFamily: 'regular',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        padding: 20,
    },
})
export default Cart