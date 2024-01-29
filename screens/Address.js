import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { deleteUserAddress, getUserAddress } from '../constants/utils/URL'

const Address = ({ navigation }) => {
    const [userId, setUserId] = useState('')
    const [userAddress, setUserAddress] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

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
    console.log(userId)

    useEffect(() => {
        const request_body = {
            userId: userId,
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }

        const fetchUserAddress = async () => {
            try {
                const res = await axios.post(
                    `${getUserAddress}`,
                    request_body,
                    {
                        headers: headers,
                    }
                )

                console.log('user address', res.data)
                setUserAddress(res.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUserAddress()
    }, [userId])

        async function fetchUserAddress ()  {
        const request_body = {
            userId: userId,
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        try {
            const res = await axios.post(
                `${getUserAddress}`,
                request_body,
                {
                    headers: headers,
                }
            )

            
            setUserAddress(res.data)
        } catch (error) {
            console.error(error)
        }finally{
            setIsRefreshing(false)
        }
    }

    const handleRefresh = () => {
        setIsRefreshing(true)
        fetchUserAddress()
    }


    async function deleteAddress(id) {
       
        try {
            console.log('Deleting item:', id)
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const request_model = {
                id: id,
            }

            const res = await axios.post(
                `${deleteUserAddress}`,
                request_model,
                {
                    headers: headers,
                }
            )

            if (res.status === 200) {
               
                await fetchUserAddress()

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

    const renderHeader = () => {
        const navigation = useNavigation()
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20,
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                        }}
                    >
                        Add New Address
                    </Text>
                </View>
            </View>
        )
    }

    const renderUserAddresses = () => {
        return (
            < >
            <View style={{ flexDirection: 'column', marginVertical: 22 }} >
                {userAddress.map((address, key) => (
                    <ScrollView style={styles.container} key={key}   refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }>
                        <View style={styles.subContainer}>
                            <View style={styles.subLeftContainer}>
                                <View style={styles.rounded}>
                                    <Feather
                                        name="home"
                                        size={24}
                                        color="#2790C3"
                                    />
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.boldBody}>
                                        {address.name}
                                    </Text>
                                    <Text style={styles.textBody}>
                                        {address.street}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 6,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                {/* <TouchableOpacity>
                                    <Feather
                                        name="edit"
                                        size={18}
                                        color={COLORS.primary}
                                    />
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    style={{
                                        marginLeft: 4,
                                    }}
                                       onPress={() =>
                                        deleteAddress(address.id)
                                            }
                                >
                                    <MaterialCommunityIcons
                                        name="delete-outline"
                                        size={22}
                                        color={COLORS.primary}
                                        
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                ))}

              
            </View>
            </>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar hidden={true} />
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 16,
                   

                }}
               
            >
                {renderHeader()}
                {renderUserAddresses()}
                {userAddress.length === 0 && (
                    <Text
                        style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontFamily: 'regular',
                            color: COLORS.black,
                        }}
                    >
                        No Address added
                    </Text>
                )}
                <Button
                    filled
                    title="ADD NEW ADDRESS"
                    onPress={() => navigation.navigate('AddNewAddress')}
                    style={{
                        position: 'absolute',
                        bottom: 70,
                        width: SIZES.width - 32,
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray7,
        borderRadius: 16,
        width: SIZES.width - 32,
        paddingVertical: 8,
        marginBottom: 12,
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.gray7,
        marginVertical: 8,
    },
    subLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rounded: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
    },
    textBody: {
        fontSize: 12,
        fontFamily: 'regular',
        color: '#32343E',
    },
    iconRight: {
        height: 16,
        width: 16,
        marginRight: 8,
        tintColor: '#747783',
    },
    boldBody: {
        fontSize: 13,
        fontFamily: 'regular',
        color: COLORS.black,
        textTransform: 'uppercase',
        marginVertical: 6,
    },
})

export default Address
