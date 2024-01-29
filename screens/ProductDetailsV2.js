import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, icons, images } from '../constants'
import { Feather, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons'
import { reviews } from '../data/products'
import { ScrollView } from 'react-native-virtualized-view'
import ReviewStars from '../components/ReviewStars'
import ReviewCard from '../components/ReviewCard'

const ProductDetailsV2 = ({ navigation }) => {
    const [mainImage, setMainImage] = useState(images.shop9)
    /**
     * @returns user header
     */
    const renderHeader = () => {
        const [isLiked, setIsLiked] = useState(false)
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.headerIcon}
                >
                    <Image
                        source={icons.arrowLeft}
                        resizeMode="contain"
                        style={styles.arrowLeft}
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Feather name="share" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsLiked(!isLiked)}
                        style={[styles.headerIcon, { marginLeft: 6 }]}
                    >
                        <Ionicons
                            name={isLiked ? 'heart' : 'heart-outline'}
                            size={24}
                            color={COLORS.primary}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    /***
     * Render Plant Gallery
     */
    const renderPlantGallery = () => {
        return (
            <View style={styles.galleryContainer}>
                <Image
                    source={mainImage}
                    resizeMode="contain"
                    style={styles.plantImage}
                />
                <View style={styles.featureBottomContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductReviews')}
                        style={styles.ratingContainer}
                    >
                        <FontAwesome name="star" size={16} color="orange" />
                        <Text style={styles.rating}>4.9</Text>
                    </TouchableOpacity>
                    <View style={styles.typeContainer}>
                        <Text style={styles.type}>Sofa</Text>
                    </View>
                </View>
                <View style={styles.galleryRightContainer}>
                    <TouchableOpacity
                        onPress={() => setMainImage(images.shop10)}
                        style={styles.galleryItemContainer}
                    >
                        <Image
                            source={images.shop10}
                            resizeMode="cover"
                            style={styles.galleryItem}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setMainImage(images.shop12)}
                        style={styles.galleryItemContainer}
                    >
                        <Image
                            source={images.shop12}
                            resizeMode="cover"
                            style={styles.galleryItem}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setMainImage(images.shop8)}
                        style={styles.galleryItemContainer}
                    >
                        <Image
                            source={images.shop8}
                            resizeMode="cover"
                            style={styles.galleryItem}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    /***
     * Render content
     */
    const renderContent = () => {
        const [selectedButton, setSelectedButton] = useState('S')

        const handleButtonPress = (value) => {
            setSelectedButton(value)
        }

        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 12,
                    }}
                >
                    <Text style={styles.contentTitle}>Lorem ipsum</Text>
                    <Text style={styles.contentTitle}>$ 20</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Image
                            source={icons.maps}
                            resizeMode="contain"
                            style={{
                                height: 16,
                                width: 16,
                                tintColor: COLORS.primary,
                                marginRight: 4,
                            }}
                        />
                        <Text style={styles.contentSubtitle}>
                            Jakarta, Indonesia
                        </Text>
                    </View>
                </View>

                <View style={styles.agentContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={images.avatar2}
                            resizeMode="contain"
                            style={{
                                height: 38,
                                width: 38,
                                borderRadius: 999,
                            }}
                        />
                        <View style={{ marginLeft: 16 }}>
                            <Text style={styles.agentName}>Anderson</Text>
                            <Text style={styles.agentTitle}>
                                Sofa Pro Shop Owner
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Chat')}
                    >
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.headingTitle}>About</Text>
                    <Text style={{ ...FONTS.body4, marginVertical: 12 }}>
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Text>
                </View>

                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Text style={styles.headingTitle}>Reviews</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductReviews')}
                        style={styles.reviewSummaryContainer}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.ratingIconContainer}>
                                <AntDesign
                                    name="star"
                                    size={24}
                                    color="orange"
                                />
                            </View>
                            <View style={{ marginLeft: 12 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ReviewStars review={5} />
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontFamily: 'bold',
                                            color: COLORS.white,
                                            marginLeft: 4,
                                        }}
                                    >
                                        4.9
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: COLORS.white,
                                        fontFamily: 'regular',
                                    }}
                                >
                                    From 112 reviewers
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={images.avatar4}
                                resizeMode="contain"
                                style={[
                                    styles.reviewerAvatar,
                                    { marginRight: -12 },
                                ]}
                            />
                            <Image
                                source={images.avatar5}
                                resizeMode="contain"
                                style={[
                                    styles.reviewerAvatar,
                                    { marginRight: -10 },
                                ]}
                            />
                            <Image
                                source={images.avatar5}
                                resizeMode="contain"
                                style={styles.reviewerAvatar}
                            />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <FlatList
                            data={reviews.slice(0, 2)}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <ReviewCard
                                    image={item.image}
                                    date={item.date}
                                    title={item.title}
                                    num={item.rating}
                                    description={item.description}
                                />
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductReviews')}
                        style={styles.reviewButton}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: 'bold',
                                color: COLORS.primary,
                            }}
                        >
                            View all reviews
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    /**
     * Render Actions button
     */

    const renderActionsButton = () => {
        return (
            <View style={styles.actionsButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                    style={styles.actionsButton}
                >
                    <Text style={styles.actionsButtonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <ScrollView>
                <View style={styles.container}>
                    {renderHeader()}
                    {renderPlantGallery()}
                    {renderContent()}
                </View>
            </ScrollView>
            {renderActionsButton()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        padding: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 12,
        position: 'absolute',
        top: 24,
        left: 24,
        width: SIZES.width - 48,
        zIndex: 999,
    },
    headerIcon: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        backgroundColor: COLORS.gray,
    },
    arrowLeft: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
    },
    galleryContainer: {
        height: SIZES.height * 0.6,
        width: '100%',
    },
    plantImage: {
        width: '100%',
        height: '100%',
        borderRadius: 26,
    },
    featureBottomContainer: {
        position: 'absolute',
        bottom: 12,
        flexDirection: 'row',
        zIndex: 999,
        left: 8,
    },
    ratingContainer: {
        height: 50,
        width: 96,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderRadius: 24,
    },
    rating: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.white,
        marginLeft: 6,
    },
    typeContainer: {
        paddingHorizontal: 12,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderRadius: 24,
        marginHorizontal: 8,
    },
    type: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.white,
    },
    galleryRightContainer: {
        position: 'absolute',
        bottom: 16,
        flexDirection: 'column',
        right: 8,
    },
    galleryItemContainer: {
        height: 60,
        width: 60,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.white,
        marginTop: 8,
    },
    galleryItem: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    contentTitle: {
        fontSize: 25,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    contentSubtitle: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    button: {
        height: 48,
        width: 68,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.gray,
        borderRadius: 20,
        marginRight: 12,
    },
    body4: {
        ...FONTS.body4,
        color: COLORS.black,
    },
    selectedButton: {
        backgroundColor: COLORS.primary,
    },
    selectedButtonText: {
        color: COLORS.white,
    },
    viewContainer: {
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.gray,
        borderRadius: 999,
    },
    agentContainer: {
        height: 86,
        width: '100%',
        backgroundColor: COLORS.secondaryWhite,
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 16,
    },
    agentName: {
        fontSize: 14,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    agentTitle: {
        fontSize: 10,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    headingTitle: {
        fontSize: 18,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    locationIconContainer: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        backgroundColor: COLORS.gray,
    },
    headingBody: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    locationSelectionContainer: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderWidth: 0.4,
        borderColor: 'gray',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderRadius: 25,
    },
    headingH4: {
        fontSize: 12,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    locationMapContainer: {
        height: 236,
        width: '100%',
        borderRadius: 25,
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
    headingLeft: {
        fontSize: 18,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    headingRight: {
        fontSize: 12,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    costLivingContainer: {
        height: 84,
        backgroundColor: COLORS.gray,
        width: '100%',
        borderRadius: 24,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 12,
    },
    reviewSummaryContainer: {
        height: 84,
        width: '100%',
        borderRadius: 24,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    ratingIconContainer: {
        height: 52,
        width: 52,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewerAvatar: {
        height: 32,
        width: 32,
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: 999,
    },
    reviewButton: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: COLORS.gray,
    },
    actionsButtonContainer: {
        height: 96,
        width: '100%',
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
    },
    actionsButton: {
        height: 64,
        width: SIZES.width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
    },
    actionsButtonText: {
        fontSize: 16,
        fontFamily: 'bold',
        color: COLORS.white,
    },
})

export default ProductDetailsV2