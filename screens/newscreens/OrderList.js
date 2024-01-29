import React, { Component } from 'react'
import { Image, SafeAreaView } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import Header from '../../components/Header'
import { COLORS, FONTS, SIZES } from '../../constants'
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import {
    fetchProductDetails,
    getAllUserOrders_URL,
    getUserOrders_URL,
} from '../../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


class OrderList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allOrders: [],
            userId: '',
            productInfo: [],
            fetchProductIds: [],
        };
    }



    componentDidMount() {
        this.getUserId();
    }


    getUserId = async () => {
        try {
            const userid = await AsyncStorage.getItem('userid');
            if (userid !== null) {
                this.setState({ userId: userid });
                this.fetchData(userid);
                console.log('User ID:', userid);
            } else {
                console.log('User ID not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error retrieving user ID:', error);
        }
    };

    fetchData = async (userId) => {
        try {
            const orderListResponse = await axios.post(
                `${getAllUserOrders_URL}`,
                { userId: this.state.userId },
                { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
            );


            const allProductIds = orderListResponse.data.flatMap((order) =>
                order.items.map((item) => item.productId)
            );

            this.setState({ fetchProductIds: allProductIds });

            const productDetailsResponse = await axios.post(
                `${fetchProductDetails}`,
                allProductIds,
                { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
            );

            const enrichedOrderJson = orderListResponse.data.map((order) => {
                const enrichedItems = order.items.map((item) => {
                    const productDetail = productDetailsResponse.data.find(
                        (product) => product.id === item.productId
                    );

                    return {
                        ...item,
                        productDetail,
                    };
                });

                return {
                    ...order,
                    items: enrichedItems,
                };
            });

            this.setState({
                productInfo: productDetailsResponse.data,
                allOrders: enrichedOrderJson,
            });
            console.log(productDetailsResponse.data, "CCCCCCCCCCCCcc", orderListResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.cardContainer}>
                        <Header title="Order List" />
                        {this.state.allOrders.length === 0 && (
                            <Text
                                style={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontFamily: 'regular',
                                    color: COLORS.black,
                                }}
                            >
                                No Orders found!
                            </Text>
                        )}


                        {this.state.allOrders.map((order, orderIndex) => (
                            <View style={styles.card} key={orderIndex}>
                                <Text style={[styles.total, { marginBottom: 25 }]}>
                                    Order No: {order.orderNumber}
                                </Text>
                                {order.items.map((product, orderIndex) => (

                                    <View style={styles.cardRow} key={product.id}>
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
                                                    source={require('../../assets/images/products/product1.jpg')}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        marginRight: 30,
                                                    }}
                                                />
                                            )}
                                            <Text style={styles.orderNo}>
                                                {product.productDetail?.name}
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
                                        Order Status: {order.status}
                                    </Text>
                                </View>
                            </View>
                        ))}


                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        fontFamily: 'regular',
        marginBottom: 70,
    },
    cardContainer: {
        flex: 1,
        padding: 12,
        textAlign: 'center',
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
    item_details: {
        fontSize: 12,
        flexDirection: 'row',
        width: '100%',
        fontFamily: 'regular',
    },
    total: {
        fontSize: 13,
        fontFamily: 'regular',
    },
    ratings: {
        fontSize: 16,
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
    lineBreak: {
        marginVertical: 10, // Adjust the value to control the space
        width: '100%',
        height: 1,
        backgroundColor: 'black', // Adjust the color as needed
    },
})

export default OrderList
