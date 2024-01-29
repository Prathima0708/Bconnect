import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    Linking,
} from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS, images } from '../constants'
import * as Animatable from 'react-native-animatable'
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { login_URL, reg_URL } from '../constants/utils/URL'
import { FONTS, icons } from '../constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const isTestMode = true

const initialState = {
    inputValues: {
        fullName: isTestMode ? 'John Doe' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
        confirmPassword: isTestMode ? '**********' : '',
        companyName: isTestMode ? 'CowboyIceCream' : '',
        address1: isTestMode ? 'Manipal' : '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
        companyName: false,
        address1: false,
    },
    formIsValid: false,
}

const Signup = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        passwordConfirm: '',
    })
    const [formErrors, setFormErrors] = useState({
        email: '',
    })

    const validateEmail = (email) => {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
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
        // if (id === 'email') {
        //     const isValid = validateEmail(value);
        //     setFormErrors((prevFormErrors) => ({
        //       ...prevFormErrors,
        //       [id]: isValid ? '' : 'Invalid email format',
        //     }));
        //   }
    }

    // useEffect(() => {
    //   setFormData({
    //     fullName: '',
    //     email: '',
    //     password: '',
    //     passwordConfirm:''
    //   })
    //     if (error) {
    //         Alert.alert('An error occured', error)
    //     }
    // }, [error])

    // const onSubmit = async () => {
    //     try {
    //         setIsLoading(true)
    //         if (formData.password !== formData.passwordConfirm) {
    //           alert('Passwords do not match');
    //         }

    //         const response = await fetch(`${reg_URL}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 fullName: formData.fullName,
    //                 email: formData.email,
    //                 password: formData.password,
    //             }),
    //         })

    //         if (response.ok) {
    //             const responseData = await response.json()
    //             console.log('API response:', responseData)
    //             // Handle successful signup, e.g., navigate to the login screen
    //             navigation.navigate('Login')
    //             setFormData({
    //               fullName: '',
    //               email: '',
    //               password: '',
    //             })
    //         } else {
    //             throw new Error('Signup failed')
    //         }
    //     } catch (error) {
    //         console.error('Error during signup:', error)
    //         // Handle error, e.g., display an error message to the user
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    const onSubmit = async () => {
        //   try {
        //     setIsLoading(true);

        //     if (!formData.fullName || !formData.email || !formData.password || !formData.passwordConfirm) {
        //         alert('Please fill in all fields');
        //         return
        //       }

        //     // Check if passwords match
        //     if (formData.password !== formData.passwordConfirm) {
        //       throw new Error('Passwords do not match');
        //     }

        //     const response = await fetch(`${reg_URL}`, {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify({
        //         name: formData.fullName,
        //         email: formData.email,
        //         password: formData.password,
        //       }),
        //     });

        //     const responseData = await response.json();
        //     console.log('API response:', responseData);
        //     Alert.alert('Success', responseData.status, [
        //       { text: 'OK', onPress: () => navigation.navigate('Verification',{email:formData.email}) },
        //     ]);

        //     // if (response.ok) {
        //     //   const responseData = await response.json();
        //     //   console.log('API response:', responseData);
        //     //   Alert.alert('Success', responseData.status, [
        //     //     { text: 'OK', onPress: () => navigation.navigate('Verification',{email:formData.email}) },
        //     //   ]);
        //     //  // navigation.navigate('Verification');
        //     // }
        //     // else {
        //     //   throw new Error('Signup failed');
        //     // }
        //   } catch (error) {
        //     console.error('Error during signup:', error);

        //     // Show an alert to the user when passwords do not match
        //     // if (error.message === 'Passwords do not match') {
        //     //   alert('Passwords do not match', 'Passwords do not match');
        //     // } else {
        //     //   // Handle other errors or display a general error message
        //     //   alert('Error', 'Signup failed. Please try again.');
        //     // }
        //   } finally {
        //     setIsLoading(false);
        //   }

        try {
            setIsLoading(true)
          //  alert('alert 1')
            if (
                !formData.fullName ||
                !formData.email ||
                !formData.password ||
                !formData.passwordConfirm
            ) {
                alert('Please fill in all fields')
                return
            }
          //  alert('alert 2')
            // Check if passwords match
            if (formData.password !== formData.passwordConfirm) {
                throw new Error('Passwords do not match')
            }
          //  alert('alert 3')
            const request_body = {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
            }
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }
            const response = await axios.post(`${reg_URL}`, request_body, {
                headers: headers,
            })
          //  alert('alert 4')
            console.log('API response:', response.data)
            try {
                await AsyncStorage.setItem("username", formData.fullName);
              } catch (error) {}
            Alert.alert('Success', response.data.status, [
                {
                    text: 'OK',
                    onPress: () => {
                        // Check if the email is already in use
                        if (response.data.status !== 'Email is already in use') {
                          // Clear the formData state
                
                          // Navigate to 'Verification' screen with email data
                          navigation.navigate('Verification', {
                            email: formData.email,
                            pin: response.data.pin
                          });
                        }
                    }
                },
            ])
            setFormData({
                fullName: '',
                email: '',
                password: '',
                passwordConfirm: '',
            })
        } catch (error) {
            alert('something went wrong', error)
            console.log('Error during signup:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // const onSubmit=()=>{
    //     Linking.openURL('http://www.google.com')
    // }

    // const onSubmit = async () => {
    //     try {
    //       const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           title: 'foo',
    //           body: 'bar',
    //           userId: 1,
    //         }),
    //       });
      
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }
      
    //       const data = await response.json();
    //       console.log('Post created:', data);
    //       navigation.navigate('Main');
    //       // Perform any further actions with the data here
      
    //     } catch (error) {
    //       console.error('Error making POST request:', error.message);
    //     }
    //   };
      

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary]}
            style={{ flex: 1, backgroundColor: COLORS.blue }}
        >
            <StatusBar hidden={true} />
            <View style={commonStyles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.backIcon}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={commonStyles.headerTitle}>Sign up</Text>
                <Text style={commonStyles.subHeaderTitle}>
                    Please sign up to get started
                </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}
            >
                <KeyboardAwareScrollView>
                    <Text style={commonStyles.inputHeader}>Name</Text>
                    <Input
                        id="fullName"
                        value={formData.fullName}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['fullName']}
                        placeholder="Name"
                        placeholderTextColor={COLORS.black}
                    />
                    <Text style={commonStyles.inputHeader}>Email</Text>
                    <Input
                        id="email"
                        value={formData.email}
                        onInputChanged={inputChangedHandler}
                        // errorText={formState.inputValidities['email']}
                        placeholder="Email"
                        placeholderTextColor={COLORS.black}
                        keyboardType="email-address"
                    />
                    <Text style={commonStyles.inputHeader}>Password</Text>
                    <Input
                     value={formData.password}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['password']}
                        autoCapitalize="none"
                        id="password"
                        placeholder="*************"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                    />

                    <Text style={commonStyles.inputHeader}>
                        Re-Type Password
                    </Text>
                    <Input
                     value={formData.passwordConfirm}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['passwordConfirm']}
                        autoCapitalize="none"
                        id="passwordConfirm"
                        placeholder="*************"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                    />

                    <Text style={commonStyles.inputHeader}>Phone</Text>
                    <Input
                        id="phone"
                        value={formData.phone}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['phone']}
                        placeholder="Phone"
                        placeholderTextColor={COLORS.black}
                    />

                    <Text style={commonStyles.inputHeader}>Address</Text>
                    <Input
                        id="address"
                        value={formData.address}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['address']}
                        placeholder="Address"
                        placeholderTextColor={COLORS.black}
                    /> 
                    {/* <Text style={commonStyles.inputHeader}>Company Name</Text>
                    <Input
                        id="companyName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['companyName']}
                        placeholder="CowboyIceCream"
                        placeholderTextColor={COLORS.black}
                    />
                     <Text style={commonStyles.inputHeader}>Address Line 1</Text>
                    <Input
                        id="address1"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['address1']}
                        placeholder="Manipal"
                        placeholderTextColor={COLORS.black}
                    />
                     
                     <Text style={commonStyles.inputHeader}>City</Text>
                    <Input
                        id="city"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['city']}
                        placeholder="Manipal"
                        placeholderTextColor={COLORS.black}
                    />
                     <Text style={commonStyles.inputHeader}>Taluk</Text>
                    <Input
                        id="taluk"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['taluk']}
                        placeholder="Udupi"
                        placeholderTextColor={COLORS.black}
                    />
                     <Text style={commonStyles.inputHeader}>District</Text>
                    <Input
                        id="district"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['district']}
                        placeholder="Udupi"
                        placeholderTextColor={COLORS.black}
                    />
                    <Text style={commonStyles.inputHeader}>State</Text>
                    <Input
                        id="state"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['state']}
                        placeholder="Karnataka"
                        placeholderTextColor={COLORS.black}
                    />
                     <Text style={commonStyles.inputHeader}>Pincode</Text>
                    <Input
                        id="pincode"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['pincode']}
                        placeholder="576104"
                        placeholderTextColor={COLORS.black}
                    /> */}
                    <Button
                        title="SIGN UP"
                        isLoading={isLoading}
                        filled
                        onPress={onSubmit}
                        //  onPress={() => navigation.navigate('Login')}
                        style={commonStyles.btn1}
                    />
                </KeyboardAwareScrollView>
                <View style={commonStyles.center}>
                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                        Already have account?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                            Login In
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </LinearGradient>
    )
}

export default Signup
