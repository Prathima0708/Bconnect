import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons, images } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import {
    Ionicons,
    MaterialCommunityIcons,
    Fontisto,
    Octicons,
} from '@expo/vector-icons'
import { ScrollView } from 'react-native-virtualized-view'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'

const ProductDetailsV1 = () => {
    const renderHeader = () => {
        const navigation = useNavigation()
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                }}
            >
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
                    Details
                </Text>
            </View>
        )
    }

    const renderProductDetails = () => {
        const [isFavourite, setIsFavourite] = useState(false)
        const [quantity, setQuantity] = useState(2)
        const navigation = useNavigation()
        const [selectedColor, setSelectedColor] = useState('#FF0000') // Default color

        const handleColorChange = (color) => {
            setSelectedColor(color)
        }

        const [selectedSize, setSelectedSize] = useState(null)
        const handleSizeSelection = (size) => {
            setSelectedSize(size)
        }
        return (
            <View style={{ marginVertical: 16 }}>
                {/* Product details images */}
                <View>
                    <TouchableOpacity
                        onPress={() => setIsFavourite(!isFavourite)}
                        style={{
                            position: 'absolute',
                            bottom: 18,
                            right: 18,
                            zIndex: 999,
                            height: 37,
                            width: 37,
                            borderRadius: 18.5,
                            backgroundColor: 'rgba(255,255,255,0.6)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Ionicons
                            name={
                                isFavourite
                                    ? 'md-heart-sharp'
                                    : 'md-heart-outline'
                            }
                            size={24}
                            color={isFavourite ? COLORS.primary : COLORS.white}
                        />
                    </TouchableOpacity>
                    <Image
                        source={images.shop8}
                        resizeMode="contain"
                        style={{
                            width: SIZES.width - 32,
                            height: 250,
                            borderRadius: 32,
                            borderColor: COLORS.gray6,
                            borderWidth: 1,
                        }}
                    />
                </View>
                {/* Product details infos */}
                <View style={{ marginVertical: 16 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 47,
                            borderRadius: 50,
                            paddingHorizontal: 16,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: COLORS.gray6,
                        }}
                    >
                        <Image
                            source={images.shop10}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 22,
                            }}
                        />
                        <Text
                            style={{
                                marginLeft: 12,
                                fontFamily: 'regular',
                                fontSize: 14,
                            }}
                        >
                            Multilevel Premium Shop
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: 18,
                            fontFamily: 'bold',
                            textTransform: 'capitalize',
                            marginVertical: 10,
                        }}
                    >
                        Lorem Ipsum
                    </Text>
                    <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'regular',
                            color: COLORS.gray5,
                        }}
                    >
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Text>

                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ProductReviews')
                            }
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Octicons
                                name="star"
                                size={24}
                                color={COLORS.primary}
                            />
                            <Text style={{ marginLeft: 8 }}>4.7</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: SIZES.padding3,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="truck-delivery-outline"
                                size={24}
                                color={COLORS.primary}
                            />
                            <Text style={{ marginLeft: 8 }}>Free</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Fontisto
                                name="stopwatch"
                                size={22}
                                color={COLORS.primary}
                            />
                            <Text style={{ marginLeft: 8 }}>2 days</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: COLORS.tertiaryGray,
                            borderRadius: 24,
                            paddingHorizontal: 10,
                            paddingVertical: 16,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 16,
                            }}
                        >
                            <Text
                                style={{ fontSize: 28, fontFamily: 'regular' }}
                            >
                                $19
                            </Text>
                            <View
                                style={{
                                    backgroundColor: COLORS.blue,
                                    width: 125,
                                    height: 48,
                                    borderRadius: 24,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                    justifyContent: 'space-between',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        if (quantity > 2) {
                                            setQuantity(quantity - 1)
                                        }
                                    }}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 12,
                                        backgroundColor:
                                            'rgba(255,255,255,0.2)',
                                    }}
                                >
                                    <Text style={{ color: COLORS.white }}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: COLORS.white,
                                    }}
                                >
                                    {quantity}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setQuantity(quantity + 1)}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 12,
                                        backgroundColor:
                                            'rgba(255,255,255,0.2)',
                                    }}
                                >
                                    <Text style={{ color: COLORS.white }}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button
                            filled
                            onPress={() => navigation.navigate('Cart')}
                            title="ADD TO CART"
                        />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar hidden={true} />
            <View style={{ flex: 1, paddingHorizontal: 16 }}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderProductDetails()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
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
    selectedColorSwatch: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
    },
    selectedColorText: {
        fontSize: 18,
        marginTop: 10,
    },
})

export default ProductDetailsV1