import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import React from 'react'
import { orders } from '../data/utils'
import { COLORS } from '../constants'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { fetchProductDetails, getAllUserOrders_URL} from '../constants/utils/URL'
import axios from 'axios'

const OngoingOrders = () => {
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
                    `${getAllUserOrders_URL}`,
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
    

    return (
        <View style={styles.container}>

{historyItems.length === 0 && (
                    <Text
                        style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontFamily: 'regular',
                            color: COLORS.black,
                            marginTop:30,
                        }}
                    >
                        No orders found!
                    </Text>
                )}
            <ScrollView>
 
                    {historyItems.map((order, index) => (
                        <View style={styles.card} key={index}>
                            <View style={styles.card} key={index}>
                                <Text style={[styles.total, { marginBottom: 25 }]}>
                                    Order No: {order.orderNumber} 
                                </Text>
                                {order?.items.map((product, orderIndex) => (
                              

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
                                    style={styles.cancelButton}
                                    onPress={() =>{ 
                                        navigation.navigate('CancelOrders',{
                                            productDetails:order 
                                        }) 
                                    }}
                                      
                                >
                                    <Text  style={[
                                                styles.buttonText,
                                                styles.cancelButtonText 
                                            ]}>
                                        {'    '}Return
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        </View>

                    ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom:70,
    },
    itemContainer: {
        flexDirection: 'column',
    },
    borderBottom: {
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        marginVertical: 12,
        paddingBottom: 4,
    },
    typeText: {
        fontSize: 14,
        fontFamily: 'bold',
        color: COLORS.primary,
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
    trackButton: {
        height: 38,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 8,
    },
    cancelButton: {
        height: 38,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 12,
        fontFamily: 'regular',
    },
    cancelButtonText: {
        color: COLORS.primary,
        width : 70
    },
    trackButtonText: {
        color: COLORS.white,
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

export default OngoingOrders




// import {
//     View,
//     Text,
//     FlatList,
//     Image,
//     TouchableOpacity,
//     StyleSheet,
// } from 'react-native'
// import React from 'react'
// import { orders } from '../data/utils'
// import { COLORS } from '../constants'
// import { useNavigation } from '@react-navigation/native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { useEffect, useState } from 'react'
// import { fetchProductDetails, getUserOrders_URL, placeOrder_URL } from '../constants/utils/URL'
// import axios from 'axios'
// import { ScrollView } from 'react-native'

// const OngoingOrders = () => {
//     const navigation = useNavigation()
//     const [userId, setUserId] = useState('')

//     const [data,setData]=useState([]);
//     const [fetchProductIds,setFetchProductIds]=useState([])
//     const [productInfo,setProductInfo]=useState([])

//     useEffect(() => {
//         const getUserId = async () => {
//             try {
//                 const userid = await AsyncStorage.getItem('userid')
//                 if (userid !== null) {
//                     setUserId(userid)
//                 } else {
//                     console.log('User ID not found in AsyncStorage')
//                 }
//             } catch (error) {
//                 console.error('Error retrieving user ID:', error)
//             }
//         }

//         getUserId()
//     }, [])

//     useEffect(() => {
//         const request_body={
//             userId:userId
//         }
//         console.log(request_body)
//         async function getItems() {
//             let headers = {
//                 'Content-Type': 'application/json; charset=utf-8',
//             }
//             try {
//                 const res = await axios.post(`${getUserOrders_URL}`,request_body,{
//                     headers:headers
//                 }
//                 )
                 
//                  const productIds = res.data.flatMap(order => order.items?.map(item => item.productId));
//                 console.log(res.data)
//                  setFetchProductIds(productIds)

//                 // const formattedData = res.data.map(order => ({
//                 //     ...order,
//                 //     items: order.items.map(item => JSON.stringify(item)),
//                 // }));
  
//                 setData(res.data);
//             } catch (e) {
//                 console.log(e)
//             }
//         }

//         getItems()
//     }, [userId])

//     useEffect(() => {
//         async function getProductDetails() {
//             let headers = {
//                 'Content-Type': 'application/json; charset=utf-8',
//             }
//             try {
//                 const res = await axios.post(
//                     `${fetchProductDetails}`,
//                     fetchProductIds,
//                     {
//                         headers: headers,
//                     }
//                 )

//                console.log('product detail',res.data)
              
//                 setProductInfo(res.data)
//             } catch (e) {
//                 console.log(e)
//             }
//         }

//         getProductDetails()
//     }, [userId, fetchProductIds])

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={data}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item, index }) => {
//                     return(
//                         <View style={styles.itemContainer}>
//                                 <View style={styles.borderBottom}>
//                                     <Text style={styles.typeText}>{item.type}</Text>
//                                 </View>
//                                 <View style={styles.rowContainer}>
//                                     <View style={styles.imageContainer}>
//                                         {/* // <Image
//                                         //     source={item.image}
//                                         //     style={styles.image}
//                                         // /> */}
//                                         <View style={{ marginLeft: 12 }}>
//                                             <Text style={styles.nameText}>
//                                                 {item.description}
//                                             </Text>
//                                             <View
//                                                 style={{
//                                                     flexDirection: 'row',
//                                                     alignItems: 'center',
//                                                     marginTop: 4,
//                                                 }}
//                                             >
//                                                 <Text style={styles.priceText}>
//                                                     ${item.price}
//                                                 </Text>
//                                                 <Text style={styles.numberOfItemsText}>
//                                                     {' '}
//                                                     | {item.quantity} Items
//                                                 </Text>
//                                             </View>
//                                         </View>
//                                     </View>
//                                     {/* // <Text style={styles.receiptText}>
//                                     //     {item.receipt}
//                                     // </Text> */}
//                                 </View>
//                                 <View style={styles.buttonContainer}>
//                                     <TouchableOpacity
//                                         onPress={() =>
//                                             navigation.navigate('TrackingOrdersV2')
//                                         }
//                                         style={styles.trackButton}
//                                     >
//                                         <Text
//                                             style={[
//                                                 styles.buttonText,
//                                                 styles.trackButtonText,
//                                             ]}
//                                         >
//                                             Track Order
//                                         </Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         onPress={() =>
//                                             // console.log('ITEMS', item.orderNumber)
//                                             navigation.navigate('CancelOrders',{
//                                                 productDetails,
//                                                 orderNumber: item.orderNumber,
//                                             })
//                                         }
//                                         style={styles.cancelButton}
//                                     >
//                                         <Text
//                                             style={[
//                                                 styles.buttonText,
//                                                 styles.cancelButtonText,
//                                             ]}
//                                         >
//                                             Return
//                                         </Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                     )
//                 }
                   
//                 }
//             />
//         </View>
//     )
// }



// export default OngoingOrders