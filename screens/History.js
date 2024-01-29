import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView
} from 'react-native'
import { TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../constants'
import { Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { orderHistory } from '../data/utils'
import Header from '../components/Header'
import {
    fetchProductDetails,
    getUserOrders_URL,
    placeOrder_URL,
    buyAgainOrder_URL
} from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableWithoutFeedback } from 'react-native'

const History = ({ navigation }) => {
    const [historyItems, setHistoryItems] = useState([])
    const [cartModalVisible, setCartModalVisible] = useState(false)

    const orders = []
    const [userId, setUserId] = useState('')
    const [fetchProductIds, setFetchProductIds] = useState([])
    const [productInfo, setProductInfo] = useState([])

    useEffect(() => {
        const getUserId = async () => {
            try {
                const userid = await AsyncStorage.getItem('userid')
                if (userid !== null) {
                    setUserId(userid)
                } else {
                    console.log('User ID not found in AsyncStorage')
                }
            } catch (error) {
                console.error('Error retrieving user ID:', error)
            }
        }

        getUserId()
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderListResponse = await axios.post(
                    `${getUserOrders_URL}`,
                    { userId },
                    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
                );

                const allProductIds = orderListResponse.data.flatMap((order) =>
                    order.items.map((item) => item.productId)
                );

                setFetchProductIds(allProductIds);

                const productDetailsResponse = await axios.post(
                    `${fetchProductDetails}`,
                    allProductIds,
                    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
                );

                const enrichedOrderJson = orderListResponse.data.map((order) => {
                    const enrichedItems = order.items.map((item) => {
                        const itemObject = item;

                        const productDetail = productDetailsResponse.data.find(
                            (product) => product.id === itemObject.productId
                        );

                        return {
                            ...itemObject,
                            productDetail,
                        };
                    });

                    return {
                        ...order,
                        items: enrichedItems,
                    };
                });

                console.log('Merged Order Items:', enrichedOrderJson);

                setProductInfo(productDetailsResponse.data);
                setHistoryItems(enrichedOrderJson);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);


    async function placeOrder(order) {
        console.log(order, "AAAAAAAAAAXXXXXXXXXX")
        const request_body = {
            userId: userId,
            orderNumber: order.orderNumber
        }
        try {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const res = await axios.post(
                `${buyAgainOrder_URL}`,
                request_body,
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

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <Header title="Orders History" />

                {historyItems.length === 0 && (
                    <Text
                        style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontFamily: 'regular',
                            color: COLORS.black,
                        }}
                    >
                        No Orders history found!
                    </Text>
                )}

                <ScrollView>
                    {historyItems.map((order, index) => (
                        <View style={styles.card} key={index}>
                            <View style={styles.card} key={index}>
                                <Text style={[styles.total, { marginBottom: 25 }]}>
                                    Order No: {order.orderNumber}
                                </Text>
                                {order.items.map((product, orderIndex) => (
                              

                                    < View style = { styles.cardRow } key = { product.id } >
                                            
                                        <View style={styles.itemDetailsContainer}>
                                            {product.productDetail?.image ? (
                                                <Image
                                                    source={{ uri: product.productDetail?.image }}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        marginRight: 10,
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
                                            <Text style={styles.orderNo}>
                                                {product.productDetail.name} 
                                            </Text>
                                        </View>
                                        <View style={styles.itemDetailsContainer}>
                                            <Text style={styles.itemText}>
                                                Quantity: {product.quantity}
                                            </Text>
                                            <Text style={styles.itemText}>
                                                Price: {product.price}
                                            </Text>
                                        </View>
                                    </View>

                                ))}
                            <View style={styles.cardRow}>
                                <Text style={styles.total}>
                                    <Text style={styles.date}>
                                        {' '}Date :
                                        {new Date(order.orderDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        })}
                                    </Text>
                                </Text>
                                <View style={styles.ratingsContainer}>
                                    <Text style={styles.ratings}>
                                        Total:{' '}{order.total}

                                    </Text>
                                    {/* Add your star icons or ratings logic here */}
                                </View>
                            </View>
                            <View style={styles.horizontalLine} />
                            <View style={styles.cardRow}>
                                <Text style={styles.orderStatus}>
                                    Status: {order.status}
                                </Text>
                                <TouchableOpacity
                                    style={styles.reorderButton}
                                    onPress={() =>
                                        placeOrder(order)
                                    }
                                >
                                    <Text style={styles.reorderButtonText}>
                                        Buy Again
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        </View>

                    ))}
        </ScrollView>



            </View >
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
                                    <Text style={styles.text}>
                                        ₹2371
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
                                    <Text style={styles.text}>
                                        Total
                                    </Text>
                                </View>
                                <View style={{ flex: 1, padding: 5 }}>
                                    <Text style={styles.text}>
                                        ₹2371
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
                                onPress={() =>
                                    setCartModalVisible(false)
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
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    orderContainer: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 8,
        elevation: 3,
    },
    orderIdText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    orderDateText: {
        fontSize: 14,
        marginBottom: 5,
    },
    productsContainer: {
        marginTop: 10,
    },
    productCard: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    productDetailsText: {
        fontSize: 14,
        marginBottom: 5,
    },
    orderStatusText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    //   buttonText: {
    //     color: '#fff',
    //     fontWeight: 'bold',
    //   },

    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 12,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    itemContainer: {
        flexDirection: 'column',
    },
    borderBottom: {
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        marginVertical: 12,
        flexDirection: 'row',
        paddingBottom: 4,
    },
    typeText: {
        fontSize: 14,
        fontFamily: 'bold',
    },
    statusText: {
        fontSize: 14,
        fontFamily: 'bold',
        marginLeft: 12,
    },
    completedStatus: {
        color: COLORS.green,
    },
    pendingStatus: {
        color: COLORS.red,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 8,
    },
    nameText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 14,
        fontFamily: 'regular',
    },

    orderIdText: {
        fontSize: 14,
        fontFamily: 'bold',
    },
    orderDateText: {
        fontSize: 14,
        fontFamily: 'regular',
    },
    dateText: {
        fontSize: 12,
        fontFamily: 'regular',
        marginHorizontal: 2,
    },
    numberOfItemsText: {
        fontSize: 12,
        fontFamily: 'regular',
    },
    receiptText: {
        fontSize: 14,
        textDecorationLine: 'underline',
        textDecorationColor: COLORS.gray5,
        fontFamily: 'regular',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 18,
    },
    rateButton: {
        height: 38,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 8,
    },
    reorderButton: {
        height: 38,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'regular',
    },
    rateButtonText: {
        color: COLORS.primary,
        fontFamily: 'regular',
    },
    reorderButtonText: {
        color: COLORS.white,
        fontFamily: 'regular',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        padding: 16,
        marginTop: 20,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderNo: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'regular',
    },
    date: {
        fontSize: 12,
        fontFamily: 'regular',
    },
    total: {
        fontSize: 12,
        fontFamily: 'regular',
    },
    ratings: {
        fontSize: 12,
        fontFamily: 'regular',
    },
    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    orderStatus: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'regular',
    },
    ratingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginLeft: 5,
    },
})
export default History
