import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../constants'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { deleteFavorites_URL, getFavoritesByUserId_URL } from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const FavouriteCard = (props) => {
    const [userId, setUserId] = useState('')

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
    
    async function getUserFav() {
        const request_model = {
            userId: userId, // Make sure userId is accessible
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        try {
            const res = await axios.post(`${getFavoritesByUserId_URL}`, request_model, {
                headers: headers,
            })

            console.log('user cart', res.data)

            // Update the userCart state with the latest data
          
        } catch (e) {
            console.log(e)
        }
    }
    
       function deleteFav(id){
      
     //  props.onItemDeleted()
    }
    return (
        <View
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
            <Image
                source={{uri:props.image}}
                resizeMode="cover"
                style={{
                    height: 84,
                    width: 84,
                    borderRadius: 4,
                }}
            />
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
                        {props.name}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Entypo name="shop" size={18} color={COLORS.primary} />
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#878787',
                            fontFamily: 'regular',
                            marginVertical: 2,
                            marginLeft: 10,
                        }}
                    >
                        {props.shop}
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
                        ${props.price}
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        marginLeft: 200,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                        width:30,
                    }}
                    onPress={deleteFav(props.id)}
                >
                    <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FavouriteCard
