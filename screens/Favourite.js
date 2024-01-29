import { View, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import FavouriteCard from '../components/FavouriteCard'
import { products } from '../data/products'
import Header from '../components/Header'
import {
    getFavorites_URL,
    fetchProductDetails,
    getFavoritesByUserId_URL 
} from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from 'react-native'
import { Image } from 'react-native'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const Favourite = ({ navigation }) => {
    /***
     * Render User favourite Shops
     */
    const [favorites, setFavorites] = useState([])
    const [userId, setUserId] = useState('')
    const [fetchProductIds, setFetchProductIds] = useState([])
    const [productInfo, setProductInfo] = useState([])

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


    useEffect(() => {
        const request_body = {
            userId: userId,
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        async function getAllFavorites() {
            try {
                const res = await axios.post(
                    `${getFavoritesByUserId_URL}`,
                    request_body,
                    {
                        headers: headers,
                    }
                )

                console.log('user fav', res.data)
                setFavorites(res.data)
                const extractedProductIds = res.data.productIds
                // setFetchProductIds(extractedProductIds)
                // const extractedProductIds = res.data.flatMap(
                //     (item) => item.productIds
                // )
                setFetchProductIds(extractedProductIds)
                // const productIds = res.data.reduce((acc, cartItem) => {
                //     acc.push(...cartItem.productIds)
                //     return acc
                // }, [])
                // setFetchProductIds(productIds)
            } catch (e) {
                console.log(e)
            }
        }

        getAllFavorites()
    }, [userId])

    useEffect(() => {
        async function getProductDetails() {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }
            try {
                const res = await axios.post(
                    `${fetchProductDetails}`,
                    fetchProductIds,
                    {
                        headers: headers,
                    }
                )
                console.log(res.data,"WWWWWWWWWWWW")

                setProductInfo(res.data)
            } catch (e) {
                console.log(e)
            }
        }

        getProductDetails()
    }, [userId, fetchProductIds])


    async function getAllFavorites() {
        const request_body = {
            userId: userId,
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        try {
            const res = await axios.post(
                `${getFavoritesByUserId_URL}`,
                request_body,
                {
                    headers: headers,
                }
            )

            setFavorites(res.data)
            const extractedProductIds = res.data.productIds

            setFetchProductIds(extractedProductIds)
        } catch (e) {
            console.log(e)
        }
    }
    async function deleteFav(id) {
        const productIds = favorites.productIds.filter(productId => productId !== id);

        console.log(id,"IIIIIIIIII",favorites);
        const request_body = {
            productIds: productIds,
            userId: userId,
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }

        try {
            console.log('delete', request_body) 
            const response = await axios.post(
                `${getFavorites_URL}`,
                request_body,
                {
                    headers: headers,
                }
            )
            Alert.alert('Success', 'deleted successfully', [
                {
                    text: 'OK',
                    onPress: async () => {
                        await getAllFavorites()
                    },
                },
            ])
            // Fetch the latest user cart data after deletion

            console.log('Delete API response:', response.data)
            // Handle successful response, e.g., show a success message to the user
        } catch (error) {
            console.error('Error:', error.message)
            // Handle error, e.g., show an error message to the user
        }
    }

    function renderMyFavouriteShops() {
        return (
            <View>
                <FlatList
                    data={productInfo}
                    // data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                height: 108,
                                width: '100%',
                                borderWidth: 0.3,
                                borderColor: 'rgba(0,0,0,.4)',
                                paddingVertical: 3,
                                borderRadius: 4,
                                paddingHorizontal: 8,
                                marginVertical: 6,
                                alignItems: 'center',
                            }}
                        >
                            {item.image ? (
                                <Image
                                    source={{ uri: item.image }}
                                    resizeMode="cover"
                                    style={{
                                        height: 84,
                                        width: 84,
                                        borderRadius: 4,
                                    }}
                                />
                            ) : (
                                <Image
                                    source={require('../assets/images/products/product1.jpg')}
                                    resizeMode="cover"
                                    style={{
                                        height: 84,
                                        width: 84,
                                        borderRadius: 4,
                                    }}
                                />
                            )}
                            <View
                                style={{
                                    marginLeft: 10,
                                    marginRight: 6,
                                    flex: 1,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontFamily: 'bold',
                                            color: '#101010',
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* <Entypo
                                        name="shop"
                                        size={18}
                                        color={COLORS.primary}
                                    /> */}
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#878787',
                                            fontFamily: 'regular',
                                            marginVertical: 2,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {item.shop}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <FontAwesome
                                        name="money"
                                        size={18}
                                        color={COLORS.primary}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontFamily: 'bold',
                                            color: COLORS.primary,
                                            marginLeft: 12,
                                        }}
                                    >
                                       Price: ₹ {item.price}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={{
                                        marginLeft: 180,
                                        borderColor: COLORS.primary,
                                        borderWidth: 1,
                                        width: 27,
                                    }}
                                    onPress={() => deleteFav(item.id)} 
                                >
                                    <MaterialCommunityIcons
                                        name="delete"
                                        size={24}
                                        color={COLORS.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <View
                style={{
                    flex: 1,
                    padding: 16,
                }}
            >
                <Header title="Favourite" />
                {productInfo.length === 0 && (
                    <Text
                        style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontFamily: 'regular',
                            color: COLORS.black,
                        }}
                    >
                        No favorites found!
                    </Text>
                )}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderMyFavouriteShops()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Favourite
