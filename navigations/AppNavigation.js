import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { Onboarding1, 
    Onboarding2, 
    Onboarding3, 
    Onboarding4 ,
    Signup, 
    Verification,
    Login, 
    StartUpScreen, 
    ForgotPassword, 
    ResetPassword, 
    LocationAccess,
    AddNewAddress,
    Address,
    Faqs,
    PaymentDeclined,
    PaymentMethod,
    PaymentSuccess,
    Settings,
    EditProfile,
    Cart,
    EditCart,
    AddNewPaymentMethod,
    PaymentCardSuccess,
    PaymentCardDeclined,
    SubmitQuestion,
    ProductByKeywords,
    ShopView2,
    ProductDetailsV1,
    ProductReviews,
    Call,
    Message,
    Favourite,
    PersonalProfile,
    AddNewPaymentMethodDeclined,
    AddNewPaymentMethodSuccess,
    TransactionHistory,
    Chat,
    VideoCall,
    ShopView1,
    ProductDetailsV2,
    TrackingOrdersV1,
    TrackingOrdersV2,
    AddReviews,
    History,
    Notifications,
    CancelOrders,
    OpenShops,
    TermsAndConditions,
    CaptureProduct,
    MyOrders
} from '../screens'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './BottomTabNavigation'
import MainScreen from '../components/MainScreen'
import Order from '../screens/newscreens/Order'
import OrderList from '../screens/newscreens/OrderList'
import LedgerScreen from '../screens/newscreens/LedgerScreen'
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkIfFirstLaunch = async () => {
            try {
                const value = await AsyncStorage.getItem('alreadyLaunched')
                if (value === null) {
                    await AsyncStorage.setItem('alreadyLaunched', 'true')
                    setIsFirstLaunch(true)
                } else {
                    setIsFirstLaunch(false)
                }
            } catch (error) {
                setIsFirstLaunch(false)
            }
            setIsLoading(false) // Set loading state to false once the check is complete
        }

        checkIfFirstLaunch()
    }, [])

    if (isLoading) {
        return null // Render a loader or any other loading state component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={ isFirstLaunch ? 'Onboarding1' : 'Onboarding1'}
                 screenOptions={{
                    headerShown: false
                 }}
                >
                {/* <Stack.Screen name="Onboarding1" component={Onboarding1}/>
                <Stack.Screen name="Onboarding2" component={Onboarding2}/>
                <Stack.Screen name="Onboarding3" component={Onboarding3}/>
                <Stack.Screen name="Onboarding4" component={Onboarding4}/> */}
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="StartUpScreen" component={StartUpScreen}/>
                <Stack.Screen name="Login" component={Login}/>
                {/* <Stack.Screen name="Home" component={MainScreen}/> */}
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                <Stack.Screen name="ResetPassword" component={ResetPassword}/>
                <Stack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen}/>
                <Stack.Screen name="Verification" component={Verification}/>
                <Stack.Screen name="LocationAccess" component={LocationAccess}/>
                <Stack.Screen name="Main" component={BottomTabNavigation}/>
                <Stack.Screen name="PersonalProfile" component={PersonalProfile}/>
                <Stack.Screen name="AddNewAddress" component={AddNewAddress}/>
                <Stack.Screen name="Address" component={Address}/>
                <Stack.Screen name="EditProfile" component={EditProfile}/>
                <Stack.Screen name="PaymentDeclined" component={PaymentDeclined}/>
                <Stack.Screen name="PaymentMethod" component={PaymentMethod}/>
                <Stack.Screen name="PaymentSuccess" component={PaymentSuccess}/>
                <Stack.Screen name="AddNewPaymentMethod" component={AddNewPaymentMethod} />
                <Stack.Screen name="PaymentCardSuccess" component={PaymentCardSuccess}/>
                <Stack.Screen name="PaymentCardDeclined" component={PaymentCardDeclined}/>
                <Stack.Screen name="AddNewPaymentMethodDeclined" component={AddNewPaymentMethodDeclined}/>
                <Stack.Screen name="AddNewPaymentMethodSuccess" component={AddNewPaymentMethodSuccess}/>
                <Stack.Screen name="Faqs" component={Faqs}/>
                <Stack.Screen name="Settings" component={Settings}/>
                <Stack.Screen name="SubmitQuestion" component={SubmitQuestion}/>
                <Stack.Screen name="Call"  component={Call}/>
                <Stack.Screen name="Chat"  component={Chat}/>
                <Stack.Screen name='VideoCall' component={VideoCall}/>
                <Stack.Screen name='CancelOrders' component={CancelOrders}/>
                <Stack.Screen name='AddReviews' component={AddReviews}/>
                <Stack.Screen name='TrackingOrdersV1' component={TrackingOrdersV1}/>
                <Stack.Screen name='TrackingOrdersV2' component={TrackingOrdersV2}/>
                <Stack.Screen name='History' component={History}/>
                <Stack.Screen name='OpenShops' component={OpenShops}/>
                <Stack.Screen name='ShopView1' component={ShopView1}/>
                <Stack.Screen name='ShopView2' component={ShopView2}/>
                <Stack.Screen name="ProductByKeywords" component={ProductByKeywords}/>
                <Stack.Screen name="ProductDetails" component={ProductDetailsV2} />
                <Stack.Screen name="ProductReviews" component={ProductReviews} />
                <Stack.Screen name="Cart" component={Cart}/>
                <Stack.Screen name="EditCart" component={EditCart}/>
                <Stack.Screen name="TransactionHistory" component={TransactionHistory}/>
                <Stack.Screen name="Message" component={Message}/>
                <Stack.Screen name='Notifications' component={Notifications}/>
                <Stack.Screen name="Favourite" component={Favourite}/>
                <Stack.Screen name="TermsAndConditions" component={TermsAndConditions}/>
                <Stack.Screen name="CaptureProduct" component={CaptureProduct}/>
                <Stack.Screen name="Orders" component={MyOrders}/>
                <Stack.Screen name="Order" component={Order}/>
                <Stack.Screen name="OrderList" component={OrderList}/>
                <Stack.Screen name="Ledger" component={LedgerScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation