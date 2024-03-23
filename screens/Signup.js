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
import { fetchVendorsList, login_URL, reg_URL } from '../constants/utils/URL'
import { FONTS, icons } from '../constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dropdown } from 'react-native-element-dropdown'
import { StyleSheet } from 'react-native'

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
    const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedVendorId, setSelectedVendorId] = useState('');
  const [loading, setLoading] = useState(true);
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        passwordConfirm: '',
        country:'',
        city:'',
        state:'',
        pincode:'',
        gst:''
    })
    const [formErrors, setFormErrors] = useState({
        email: '',
    })

    const validateEmail = (email) => {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
  

    const inputChangedHandler = (id, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }))
      
    }

    useEffect(() => {
        // Fetch data from the API
        fetch(`${fetchVendorsList}`)
          .then(response => response.json())
          .then(data => {
            // Check if data is an object and contains the 'data' property
            if (data && data.data && Array.isArray(data.data)) {
                // Extract names and IDs from the response and set them to the state
                const vendorData = data.data.map(vendor => ({
                  id: vendor.id,
                  name: vendor.name
                }));
                setVendors(vendorData);
              }  else {
              console.error('Invalid data format:', data);
            }
          })
          .catch(error => console.error('Error fetching data:', error))
          .finally(() => setLoading(false));
      }, []);
      const handleVendorChange = (selectedValue) => {
        const selectedVendorName = selectedValue.value; // Extracting the name from the selected value object
        setSelectedVendor(selectedVendorName);
        
        // Find the selected vendor object
        const selectedVendorObject = vendors.find(vendor => vendor.name === selectedVendorName);
        console.log('Selected Vendor Object:', selectedVendorObject);
        
        // Retrieve the ID if the vendor object exists
        const selectedId = selectedVendorObject ? selectedVendorObject.id : undefined;
        console.log('Selected Vendor ID:', selectedId);
        
        // Set the selected vendor ID
        setSelectedVendorId(selectedId);
    };
    
    
    
    
    

      const onSubmit = async () => {
        try {
            setIsLoading(true)
            if (formData.password !== formData.passwordConfirm) {
                alert('Passwords do not match');
                return; // Return early if passwords do not match
            }
            const data = new FormData()
            data.append('name', formData.fullName)
            data.append('customer', selectedVendorId)
            data.append('mobile', formData.phone)
            data.append('email', formData.email)
            data.append('token', 10001)
            data.append('password', formData.password)
            data.append('retype_password', formData.passwordConfirm)
            data.append('city', formData.city)
            data.append('pincode', formData.pincode)
            data.append('gst_no', formData.gst)
            data.append('country', formData.country)
            data.append('state', formData.state)
          console.log('signup data',data)

            const response = await fetch(`${reg_URL}`, {
                method: 'POST',
                body: data,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to register');
            }
    
            const responseData = await response.json();
            console.log('Response:', responseData); // Log response here
           
            if (responseData.status === 200) {
                setvendorId()
                Alert.alert(responseData.message, 'Registered Successfully', [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate("Login")
                    }
                ]);
            } else {
                Alert.alert(responseData.message);
            }
        } catch (error) {
            console.error('Error during signin:', error)
            // Handle error, e.g., display an error message to the user
        } finally {
            setIsLoading(false)
        }
    }
    
    const setvendorId=async()=>{
        await AsyncStorage.setItem('vendorid', selectedVendorId);
    }

      

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
                    <Text style={commonStyles.inputHeader}>Country</Text>
                    <Input
                        id="country"
                        value={formData.country}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['country']}
                        placeholder="India"
                        placeholderTextColor={COLORS.black}
                    />
                   
                     
                     <Text style={commonStyles.inputHeader}>City</Text>
                    <Input
                        id="city"
                        value={formData.city}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['city']}
                        placeholder="Manipal"
                        placeholderTextColor={COLORS.black}
                    />
                   
                    <Text style={commonStyles.inputHeader}>State</Text>
                    <Input
                        id="state"
                        value={formData.state}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['state']}
                        placeholder="Karnataka"
                        placeholderTextColor={COLORS.black}
                    />
      
         <View style={{ }}>
                            <Dropdown
                                search
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={vendors.map(vendor => ({ value: vendor.name }))}
                                maxHeight={300}
                                labelField="value"
                                valueField="value"
                                placeholder="Select vendor"
                                searchPlaceholder="Search..."
                                value={selectedVendor}
                                onChange={(itemValue) => handleVendorChange(itemValue)}
                                
                               
                             
                            />

                        </View>
                     <Text style={commonStyles.inputHeader}>Pincode</Text>
                    <Input
                        id="pincode"
                        value={formData.pincode}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['pincode']}
                        placeholder="576104"
                        placeholderTextColor={COLORS.black}
                    />
                       <Text style={commonStyles.inputHeader}>GST No</Text>
                    <Input
                        id="gst"
                        value={formData.gst}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['gst']}
                        placeholder="GST"
                        placeholderTextColor={COLORS.black}
                    />
       
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

const styles=StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
})