import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { ScrollView } from 'react-native-virtualized-view'
import { furnitureStores } from '../data/shops'
import { Octicons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants'

const OpenShops = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{ flex: 1, padding: 16, backgroundColor: COLORS.white }}
            >
                <Header title="Open Shops" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        nestedScrollEnabled
                        data={furnitureStores}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ShopView2')}
                                style={{
                                    width: SIZES.width - 32,
                                    borderColor: COLORS.tertiaryGray,
                                    borderWidth: 1,
                                    paddingBottom: 2,
                                    marginBottom: 12,
                                    borderRadius: 15,
                                }}
                            >
                                <Image
                                    source={item.image}
                                    style={{
                                        width: SIZES.width - 32,
                                        height: 136,
                                        borderRadius: 15,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontFamily: 'regular',
                                        marginVertical: 6,
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <View
                                    style={{
                                        marginBottom: 4,
                                        flexDirection: 'row',
                                    }}
                                >
                                    {item.keywords.map((keyword, index) => (
                                        <Text
                                            key={index}
                                            style={{
                                                fontSize: 14,
                                                color: COLORS.gray5,
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {keyword}
                                            {index !== item.keywords.length - 1
                                                ? '-'
                                                : ''}
                                        </Text>
                                    ))}
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View
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
                                        <Text style={{ marginLeft: 8 }}>
                                            {item.rating}
                                        </Text>
                                    </View>
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
                                        <Text style={{ marginLeft: 8 }}>
                                            {item.shipping}
                                        </Text>
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
                                        <Text style={{ marginLeft: 8 }}>
                                            {item.deliveryTime} days
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default OpenShops