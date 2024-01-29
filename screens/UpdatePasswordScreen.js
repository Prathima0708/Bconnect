import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS, FONTS, icons } from '../constants'

import * as Animatable from 'react-native-animatable'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { useRoute } from '@react-navigation/native'

const isTestMode = true

const initialState = {
    inputValues: {
        password: isTestMode ? '**********' : '',
        reentered_password: isTestMode ? '**********' : '',
    },
    inputValidities: {
        password: false,
        reentered_password: false,
    },
    formIsValid: false,
}

const UpdatePasswordScreen=({navigation})=>{

    const [formData, setFormData] = useState({
        password: '',
        reentered_password: '',
    })

    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const route=useRoute()

    const inputChangedHandler = (id, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }))
    }

    const onSubmit = async () => {
        try {
            setIsLoading(true)

            console.log(route.params.initialState)
            console.log(formData)
            // const response = await fetch(`${resetPassword_URL}`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         newPassword: initialState.inputValidities.reentered_password,
            //         token: "string",
            //         email: "string"
            //     }),
            // })

            // if (response.ok) {
            //     const responseData = await response.json()
            //     console.log('API response:', responseData)
            //     // Handle successful signup, e.g., navigate to the login screen
            //     navigation.navigate('LocationAccess')
            // } else {
            //    // throw new Error('Signin failed')
                
            // }
            navigation.navigate('Login')
        } catch (error) {
            console.error('Error during signin:', error)
            // Handle error, e.g., display an error message to the user
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary]}
            style={{ flex: 1, backgroundColor: COLORS.blue }}
        >
            <StatusBar hidden />
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerTitle}>Log In</Text>
                <Text style={commonStyles.subHeaderTitle}>
                    Please New Password
                </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}
            >
                
                <Text style={commonStyles.inputHeader}>Password</Text>
                <Input
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['password']}
                    autoCapitalize="none"
                    id="password"
                    placeholder="*************"
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={true}
                />

                <Text style={commonStyles.inputHeader}>Re-type Password</Text>
                <Input
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['reentered_password']}
                    autoCapitalize="none"
                    id="password"
                    placeholder="*************"
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={true}
                />

                
                <Button
                    title="Reset"
                    isLoading={isLoading}
                    filled
                    onPress={onSubmit}
                    style={commonStyles.btn}
                />

            </Animatable.View>
        </LinearGradient>
    )
}

export default UpdatePasswordScreen;