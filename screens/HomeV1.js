import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native' 
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import {
    Feather,
    Ionicons,
    MaterialIcons,
    Octicons,
    MaterialCommunityIcons,
    Fontisto,
} from '@expo/vector-icons'
import { ScrollView } from 'react-native-virtualized-view'
import { StatusBar } from 'expo-status-bar'
import CustomModal from '../components/CustomModal'
import { furnitureStores } from '../data/shops'
import { furnitureCategories } from '../data/utils'
import image1 from "../assets/images/mainimage.jpg";
import Box from '../components/Box'
import { useNavigation } from '@react-navigation/native'
const HomeV1 = () => {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    const [totalOverdues, setTotalOverdues] = useState('')
    const [totalDues, setTotalDues] = useState('')
    const [modalVisible, setModalVisible] = useState(true)
    const [vendorId,setVendorId]=useState('')

    const handlePressGotIt = () => {
        // Handle the logic when the "GOT IT" button is pressed
        setModalVisible(false)
    }

    useEffect(() => {
        const getDueDetails = async () => {
            try {
                // Retrieve the value of "userid" from AsyncStorage
                const userid = await AsyncStorage.getItem('userid')
                const totalOverdues = await AsyncStorage.getItem('totalOverdues') 
                const totalDues = await AsyncStorage.getItem('totalDues')
                const vendorid = await AsyncStorage.getItem('vendorid')
                if(vendorid!==null){
                    setVendorId(vendorid)
                }

                // Check if the value is present
                if (userid !== null) { 
                    setTotalOverdues(totalOverdues)
                    setTotalDues(totalDues)
                    console.log('User ID:', userid)
                } else {
                    console.log('User ID not found in AsyncStorage')
                }
            } catch (error) {
                console.error('Error retrieving user ID:', error)
            }
        }

        getDueDetails()
    }, [])

    const handleSearch = (text) => {
        setSearchQuery(text)
    }
 
    return (
        <SafeAreaView style={styles.area}>
            <View style={{ flex: 1, marginHorizontal: 16 }}>
                <StatusBar hidden={true} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.toggleDrawer()}
                            style={{
                                height: 45,
                                width: 45,
                                borderRadius: 22.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.gray,
                            }}
                        >
                            <Image
                                source={icons.menu}
                                style={{
                                    height: 24,
                                    width: 24,
                                }}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: 'column',
                                marginLeft: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    color: COLORS.primary,
                                }}
                            >
                                DELIVER TO
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 'regular',
                                    }}
                                >
                                    Manipal
                                </Text>
                                <Image
                                    source={icons.arrowDown2}
                                    style={{
                                        height: 12,
                                        width: 12,
                                        marginLeft: 4,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    
                   

                 
                </View>

                <View style={styles.container}>
                    <Image
                        style={styles.fullScreenImage}
                        source={image1}
                    />
                    <View
                        style={[

                            {
                                // Try setting `flexDirection` to `"row"`.
                                top: 170,
                                flexDirection: 'row',
                            },
                        ]}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={styles.mainText}>RS.11 {totalDues.toLocaleString()}</Text>
                            <Text style={styles.subText}>TOTAL DUE</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={styles.mainText}>RS. {totalOverdues.toLocaleString()}</Text>
                            <Text style={styles.subText}>OVER DUE</Text>
                        </View>
                    </View>
                    <View
                        style={[
                            {
                                flexDirection: 'row',
                                marginVertical: 70,
                               // top: 110
                            },
                        ]}>
                        {/* <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 10,
                            }}
                            onPress={() => console.log('PAY button pressed')}>
                            <View style={{ backgroundColor: '#2CAB37', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontSize: 16 }}>PAY</Text>
                            </View>
                        </TouchableOpacity> */}
                    </View>

                </View>
                <ScrollView>
            <View>
                <View style={styles.row}>
                    <Box text="Order" onPress={() => navigation.navigate("Order")} iconName="shopping" />
                    <Box text="Buy again" iconName="cart-arrow-down" onPress={() => navigation.navigate("History")} />
                </View>
                <View style={styles.row}>
                    <Box text="Order list" onPress={() => navigation.navigate("OrderList")} iconName="clipboard-list-outline" />
                    <Box text="Cart" onPress={() => navigation.navigate('Cart')} iconName="cart-plus" />
                </View>
                <View style={styles.row}>
                    <Box text="Favorites" onPress={() => navigation.navigate('Favourite')} iconName="heart-outline" />
                    <Box text="Ledger" onPress={() => navigation.navigate('Ledger')} iconName="note-check-outline" />
                </View>
                <View style={styles.row}>
                    <Box text="Payment" iconName="finance" />
                    <Box text="Return" iconName="hand-coin" onPress={() => navigation.navigate('Orders')} />
                </View>
            </View>
        </ScrollView>
                {/* <View  >


                    <View style={styles.row}>
                        <Box text="Order" onPress={() => navigation.navigate("Order")} iconName="shopping" />
                        <Box text="Buy again" iconName="cart-arrow-down" onPress={() => navigation.navigate("History")} />
                    </View>
                    <View style={styles.row}>
                        <Box text="Order list" onPress={() => navigation.navigate("OrderList")} iconName="clipboard-list-outline" />
                        <Box text="Cart" onPress={() => navigation.navigate('Cart')} iconName="cart-plus" />
                    </View>
                    <View style={styles.row}>
                        <Box text="Favorites" onPress={() => navigation.navigate('Favourite')} iconName="heart-outline" />
                        <Box text="Ledger" onPress={() => navigation.navigate('Ledger')} iconName="note-check-outline" />
                    </View>
                    <View style={styles.row}>
                        <Box text="Invoices" iconName="finance" />
                        <Box text="Return" iconName="hand-coin" onPress={() => navigation.navigate('Orders')} />
                    </View>
                    
                </View> */}
 
            </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        paddingRight: 20,
        // marginHorizontal:10,
        flexDirection: 'row',
        //  top: 160,


    },
    mainText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'regular'
    },
    subText: {
        color: 'grey',
        fontFamily: 'regular',
        fontSize: 18,
    },
    fullScreenImage: {
        width: '115%',
        height: '55%',
        objectFit: 'fill',
        top: 15,
        resizeMode: 'cover',
        position: 'absolute',
    },
})

export default HomeV1