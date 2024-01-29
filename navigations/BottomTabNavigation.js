import { View, Platform, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, icons } from '../constants'
import { Profile, Search, Message, HomeV1, MyOrders, HomeV2, HomeV3 } from '../screens'
import { Ionicons } from '@expo/vector-icons'
import DrawerNavigation from './DrawerNavigation'
import OrderList from '../screens/newscreens/OrderList'

const Tab = createBottomTabNavigator()

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: COLORS.white,
    },
}

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={DrawerNavigation}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? icons.home : icons.homeOutline}
                                resizeMode="contain"
                                style={{
                                    height: 24,
                                    width: 24,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="OrderList"
                component={OrderList}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? icons.shoppingBag : icons.shoppingBagOutline}
                                resizeMode="contain"
                                style={{
                                    height: 24,
                                    width: 24,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                        )
                    },
                }}
            />

            {/* <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: () => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.primary,
                                    height: Platform.OS == 'ios' ? 50 : 60,
                                    width: Platform.OS == 'ios' ? 50 : 60,
                                    top: Platform.OS == 'ios' ? -10 : -20,
                                    borderRadius:
                                        Platform.OS == 'ios' ? 25 : 30,
                                    borderWidth: 2,
                                    borderColor: COLORS.white,
                                }}
                            >
                                <Ionicons name="md-search-outline" size={24} color={COLORS.white} />
                            </View>
                        )
                    },
                }}
            /> */}

            {/* <Tab.Screen
                name="Message"
                component={Message}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? icons.chat : icons.chatOutline2}
                                resizeMode="contain"
                                style={{
                                    height: 24,
                                    width: 24,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                        )
                    },
                }}
            /> */}

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? icons.user : icons.userOutline}
                                resizeMode="contain"
                                style={{
                                    height: 24,
                                    width: 24,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation