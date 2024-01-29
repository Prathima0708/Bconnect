import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native'
import React, {
    useRef,
    useEffect,
    useReducer,
    useCallback,
    useState,
} from 'react'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, SIZES, COLORS, FONTS } from '../constants'
import RBSheet from 'react-native-raw-bottom-sheet'
import { commonStyles } from '../styles/CommonStyles'
import Input from '../components/Input'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { saveUserAddress } from '../constants/utils/URL'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
    inputValues: {
        address: '',
        street: '',
        postalCode: '',
        appartment: '',
    },
    inputValidities: {
        address: false,
        street: false,
        postalCode: false,
        appartment: false,
    },
    formIsValid: false,
}

const AddNewAddress = ({ navigation }) => {
    const bottomSheetRef = useRef(null)
    const [error, setError] = useState()
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [selectedLabel, setSelectedLabel] = useState(null)
    const [formData, setFormData] = useState({
        name: '', 
        street: '', 
        state: '',
        zipCode: '',
        country: '', 
        phone: '',   
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        taluka: '',
        district: '',
        city: '', 
    })
    const [userId, setUserId] = useState('')

    const handleLabelSelection = (label) => {
        setSelectedLabel(label)
    }

    // const inputChangedHandler = useCallback(
    //     (inputId, inputValue) => {
    //         const result = validateInput(inputId, inputValue)
    //         dispatchFormState({ inputId, validationResult: result, inputValue })
    //     },
    //     [dispatchFormState]
    // )

    const inputChangedHandler = (id, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }))
    }

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    // Open the bottom sheet on component mount
    // useEffect(() => {
    //     bottomSheetRef.current.open()
    // }, [])

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

    async function saveAdrees() {
        const request_body = {
            name: formData.name,
            addressLine1:formData.addressLine1,
            addressLine2:formData.addressLine2,
            addressLine3:formData.addressLine3,
            userId: userId,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country, 
            phone: formData.phone,
            taluka: formData.taluka,
            district: formData.district 

        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }

        try {
            const res = await axios.post(`${saveUserAddress}`, request_body, {
                headers: headers,
            })

            if (res.data.statusCode === '200') {
                Alert.alert(res.data.status, 'Address saved successfully', [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('Address')
                        },
                    },
                ])
            } else {
                alert('Something went wrong')
                return
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar hidden={true} />
            <View
                style={{
                    // flex: 1,
                    marginHorizontal: 16,
                    marginVertical: 30,
                }}
            >
                {renderHeader()}
            </View>
            <ScrollView
                style={{
                    width: SIZES.width - 32,
                    marginHorizontal: 16,
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginVertical: 0 }}>
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>Name</Text>
                            <Input
                                id="name"
                                value={formData.name}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['name']}
                                placeholder="Name"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View>
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>Phone</Text>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['phone']}
                                placeholder="Phone"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View>
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>Address Line 1</Text>
                            <Input
                                id="addressLine1"
                                value={formData.address}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['addressLine1']}
                                placeholder="Address Line 1"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View>

                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>Address Line 2</Text>
                            <Input
                                id="addressLine2"
                                value={formData.address}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['addressLine2']}
                                placeholder="Address Line 2"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View>
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>Address Line 3</Text>
                            <Input
                                id="addressLine3"
                                value={formData.address}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['addressLine3']}
                                placeholder="Address Line 3"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View>
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>Street</Text>
                            <Input
                                id="street"
                                value={formData.address}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['street']}
                                placeholder="Street"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View>
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>City</Text>
                            <Input
                                id="city"
                                value={formData.address}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['city']}
                                placeholder="City"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View>
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>Taluka</Text>
                            <Input
                                id="taluka"
                                value={formData.address}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['taluka']}
                                placeholder="Taluka"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View>
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>District</Text>
                            <Input
                                id="district"
                                value={formData.address}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['district']}
                                placeholder="District"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View> 
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>State</Text>
                            <Input
                                id="state"
                                value={formData.address}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['state']}
                                placeholder="State"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View> 
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>Country</Text>
                            <Input
                                id="country"
                                value={formData.address}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['country']}
                                placeholder="Country"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View> 
                        <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                            <Text style={commonStyles.inputHeader}>ZipCode</Text>
                            <Input
                                id="zipCode"
                                value={formData.address}
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['zipCode']}
                                placeholder="ZipCode"
                                placeholderTextColor="rgba(0,0,0,.5)"
                            />
                        </View> 
             
                        
                        {/* <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 12,
                            }}
                        >
                            <View
                                style={{ width: (SIZES.width - 32) / 2 - 10 }}
                            >
                                <Text style={commonStyles.inputHeader}>
                                    City
                                </Text>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onInputChanged={inputChangedHandler}
                                    errorText={
                                        formState.inputValidities['city']
                                    }
                                    placeholder="City"
                                    placeholderTextColor="rgba(0,0,0,.5)"
                                />
                            </View>
                            <View
                                style={{ width: (SIZES.width - 32) / 2 - 10 }}
                            >
                                <Text style={commonStyles.inputHeader}>
                                    State
                                </Text>
                                <Input
                                    id="state"
                                    value={formData.state}
                                    onInputChanged={inputChangedHandler}
                                    errorText={
                                        formState.inputValidities['state']
                                    }
                                    placeholder="State"
                                    placeholderTextColor="rgba(0,0,0,.5)"
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 12,
                            }}
                        >
                            <View
                                style={{ width: (SIZES.width - 32) / 2 - 10 }}
                            >
                                <Text style={commonStyles.inputHeader}>
                                    Street
                                </Text>
                                <Input
                                    id="street"
                                    value={formData.street}
                                    onInputChanged={inputChangedHandler}
                                    errorText={
                                        formState.inputValidities['street']
                                    }
                                    placeholder="Street"
                                    placeholderTextColor="rgba(0,0,0,.5)"
                                />
                            </View>

                            <View
                                style={{ width: (SIZES.width - 32) / 2 - 10 }}
                            >
                                <Text style={commonStyles.inputHeader}>
                                    Country
                                </Text>
                                <Input
                                    id="country"
                                    value={formData.country}
                                    onInputChanged={inputChangedHandler}
                                    errorText={
                                        formState.inputValidities['country']
                                    }
                                    placeholder="Country"
                                    placeholderTextColor="rgba(0,0,0,.5)"
                                />
                            </View> */}
                            {/* <View
                                style={{ width: (SIZES.width - 32) / 2 - 10 }}
                            >
                                <Text style={commonStyles.inputHeader}>
                                    Post Code
                                </Text>
                                <Input
                                    id="postalCode"
                                    value={formData.zipCode}
                                    onInputChanged={inputChangedHandler}
                                    errorText={
                                        formState.inputValidities['postalCode']
                                    }
                                    placeholder="zipcode"
                                    placeholderTextColor="rgba(0,0,0,.5)"
                                />
                            </View> 
                        </View>
                          */}
                    </View>
                </View>
                {/* <View>
                        <Text style={{ fontSize: 13, fontFamily: 'regular', marginBottom: 2 }}>DELIVER TIME</Text>

                        <View style={{ flexDirection: "row", marginVertical: 13 }}>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedLabel === "home" && styles.selectedCheckbox
                                ]}
                                onPress={() => handleLabelSelection("home")}
                            >
                                <Text style={[selectedLabel === "home" && styles.checkboxText]}>Home</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedLabel === "work" && styles.selectedCheckbox
                                ]}
                                onPress={() => handleLabelSelection("work")}
                            >
                                <Text style={[selectedLabel === "work" && styles.checkboxText]}>Work</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedLabel === "other" && styles.selectedCheckbox
                                ]}
                                onPress={() => handleLabelSelection("other")}
                            >
                                <Text style={
                                    [
                                        selectedLabel === "other" && styles.checkboxText
                                    ]
                                }>Other</Text>
                            </TouchableOpacity>

                        </View>
                        <Button
                            filled
                            title="SAVE LOCATION"
                            onPress={() => navigation.navigate("Address")}
                        />
                    </View> */}
                <View style={{ marginTop: 30 }}>
                    <Button filled title="SAVE ADDRESS" onPress={saveAdrees} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        zIndex: 1,
    },
    // Callout bubble
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 'auto',
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    body3: {
        fontSize: 12,
        color: COLORS.gray5,
        marginVertical: 3,
    },
    h3: {
        fontSize: 12,
        color: COLORS.gray5,
        marginVertical: 3,
        fontFamily: 'bold',
        marginRight: 6,
    },
    btn1: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn2: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        borderColor: COLORS.primary,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxContainer: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.5)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginBottom: 12,
    },
    roundedCheckBoxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        width: 48,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.gray,
        marginRight: 12,
    },
    selectedCheckbox: {
        backgroundColor: COLORS.primary,
    },
    checkboxText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'regular',
    },
    starContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: COLORS.secondaryGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
})

export default AddNewAddress
