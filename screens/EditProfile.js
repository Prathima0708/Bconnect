import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS, SIZES, icons, images } from "../constants"
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../styles/CommonStyles'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { launchImagePicker } from '../utils/ImagePickerHelper'
import * as ImagePicker from 'expo-image-picker';
import Input from '../components/Input'
import Button from '../components/Button'
import {
    getUserDetails, updateUserDetails, imageUpload, imageUpload64
} from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { ScrollView } from 'react-native-virtualized-view'
import { StatusBar } from 'expo-status-bar'
import * as ImageManipulator from 'expo-image-manipulator';
const initialState = {
    inputValues: {
        address: '',
        email: '',
        gstno: '',
        phone: '',
    },
    inputValidities: {
        address: false,
        email: false,
        gstno: false,
        phone: false,
    },
    formIsValid: false,
}
const EditProfile = (navigation, route) => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [userId, setUserId] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const [image, setImage] = useState(null);
    const [error, setError] = useState();
    const [formData, setFormData] = useState({
        address: '',
        email: '',
        gstno: '',
        phone: '',
    })



    const inputChangedHandler = (id, value) => {

        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }))
    }

    useEffect(() => {
        const getUserId = async () => {
            try {
                // Retrieve the value of "userid" from AsyncStorage
                const userid = await AsyncStorage.getItem('userid')

                // Check if the value is present
                if (userid !== null) {
                    setUserId(userid)
                    readUserDetails();
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


    readUserDetails = async () => {
        const request_body = {
            id: userId,
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        try {
            const res = await axios.post(
                `${getUserDetails}`,
                request_body,
                {
                    headers: headers,
                }
            )
            setUserDetails(res.data);
            if (res.data?.image) { 
                setImage({ uri: res.data.image })
            }

            setFormData((prevFormData) => ({
                ...prevFormData,
                ['phone']: res.data.phone, ['email']: res.data.email, ['gstno']: res.data.gstno, ['address']: res.data.address,
            }))
        } catch (e) {
            console.log(e)
        }

    }

    async function updateDetails() {
        const request_body = {
            address: formData.address,
            phone: formData.phone,
            gstno: formData.gstno,
            email: formData.email,
            id: userId,

        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }

        try {
            const res = await axios.post(`${updateUserDetails}`, request_body, {
                headers: headers,
            })
            if (res.data.statusCode === '200') {
                Alert.alert(res.data.status, 'Details saved successfully', [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('PersonalProfile')
                        },
                    },
                ])
            } else {
                alert(res.data.status)
                return
            }
        } catch (e) {
            console.log(e, res)
        }
    }

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    const pickImage = async () => {
        try {
            // const tempUri = await launchImagePicker()

            // if (!tempUri) return

            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                const resizedImage = await resizeImage(result.assets[0].uri);
                const base64String = await convertImageToBase64(resizedImage.uri); 
                const response = await axios.post(`${imageUpload64}`, { content: base64String, userId: userId }, {
                    headers: headers,
                }) 
                setImage({ uri: response.data.file })
            }



        } catch (error) {
            console.error('Error uploading image:', JSON.stringify(error));
        }
    }

    const resizeImage = async (uri) => {
        try {
            const resizedImage = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: 1000 } }],
                { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
            );

            return resizedImage;
        } catch (error) {
            console.error('Error resizing image:', error);
            throw error;
        }
    };


    const convertImageToBase64 = async (imageUri) => {
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const base64Image = await blobToBase64(blob);
            return base64Image;
        } catch (error) {
            console.error('Error converting image to Base64:', error);
            throw error;
        }
    };

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(blob);
        });
    };



    const renderHeader = () => {
        const navigation = useNavigation()
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={commonStyles.header1Icon}
                    >
                        <Image
                            resizeMode='contain'
                            source={icons.arrowLeft}
                            style={{ height: 24, width: 24, tintColor: COLORS.black }}
                        />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>Edit Profile</Text>
                </View>

            </View>
        )
    }

    const renderEditProfileForm = () => {
        const navigation = useNavigation()
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ marginVertical: 12 }}>
                    <Image
                        source={
                            image === null ?
                                images.avatar3 :
                                image
                        }
                        resizeMode='contain'
                        style={{
                            height: 130,
                            width: 130,
                            borderRadius: 65
                        }}
                    />
                    <TouchableOpacity
                        onPress={pickImage}
                        style={{
                            height: 42,
                            width: 42,
                            borderRadius: 21,
                            backgroundColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            bottom: 0,
                            right: 0
                        }}
                    >
                        <MaterialCommunityIcons
                            name="pencil-outline"
                            size={24}
                            color={COLORS.white} />
                    </TouchableOpacity>
                </View>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={{
                        width: SIZES.width - 32,
                    }}>
                        <Text style={commonStyles.inputHeader}>Address</Text>
                        <Input
                            id="address"
                            value={formData.address}
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['address']}
                            placeholder="John Doe"
                            placeholderTextColor="rgba(0,0,0,0.5)"
                            key="1"
                        />
                        <Text style={commonStyles.inputHeader}>Email</Text>
                        <Input
                            id="email"
                            value={formData.email}
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['email']}
                            placeholder="example@gmail.com"
                            placeholderTextColor="rgba(0,0,0,0.5)"
                            keyboardType="email-address"
                        />
                        <Text style={commonStyles.inputHeader}>Phone Number</Text>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['phone']}
                            placeholder="+912656477234"
                            placeholderTextColor="rgba(0,0,0,0.5)"
                            keyboardType="numeric"
                        />
                        <Text style={commonStyles.inputHeader}>GSTNO</Text>
                        <Input
                            id="gstno"
                            value={formData.gstno}
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['gstno']}
                            placeholder="BNVPM2453G"
                            placeholderTextColor="rgba(0,0,0,0.5)"
                        />
                        <Button
                            title="SAVE"
                            filled
                            onPress={updateDetails}
                            style={{
                                marginTop: 12,
                                marginBottom: 30
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar hidden={true} />
            <View style={{
                flex: 1,
                marginHorizontal: 16
            }}>
                {renderHeader()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {renderEditProfileForm()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile