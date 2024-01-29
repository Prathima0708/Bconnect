import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { orderHistory } from '../data/utils'
import { COLORS } from '../constants'
import { useNavigation } from '@react-navigation/native'

const HistoryOrders = () => {
    const navigation = useNavigation()
    const [userId, setUserId] = useState('') 
    const [data,setData]=useState([]);
    const [fetchProductIds, setFetchProductIds] = useState([])
    const [productInfo,setProductInfo]=useState([])
    const [historyItems,setHistoryItems]=useState([]);

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
                            (product) => product.product === itemObject.productId
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
                console.log(enrichedOrderJson,"XXXCCCCC");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [userId]);
    
    return (
        <View style={styles.container}>
             <ScrollView>
            <FlatList
                data={orderHistory}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.borderBottom}>
                            <Text style={styles.typeText}>{item.type}</Text>
                            <Text
                                style={[
                                    styles.statusText,
                                    item.status === 'Completed'
                                        ? styles.completedStatus
                                        : styles.pendingStatus,
                                ]}
                            >
                                {item.status}
                            </Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={item.image}
                                    style={styles.image}
                                />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.nameText}>
                                        {item.name}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 4,
                                        }}
                                    >
                                        <Text style={styles.priceText}>
                                            ${item.price}
                                        </Text>
                                        <Text style={styles.dateText}>
                                            {' '}
                                            | {item.date}
                                        </Text>
                                        <Text style={styles.numberOfItemsText}>
                                            {' '}
                                            | {item.numberOfItems} Items
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.receiptText}>
                                {item.receipt}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('AddReviews')
                                }
                                style={styles.rateButton}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        styles.rateButtonText,
                                    ]}
                                >
                                    Rate
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.reorderButton}>
                                <Text
                                    style={[
                                        styles.buttonText,
                                        styles.reorderButtonText,
                                    ]}
                                >
                                    Buy again
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontFamily: 'bold',
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
    },
    reorderButtonText: {
        color: COLORS.white,
    },
})

export default HistoryOrders