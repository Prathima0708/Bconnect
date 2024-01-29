import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
} from 'react-native'
import React from 'react'
import { COLORS, icons } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import ReviewCard from '../components/ReviewCard'
import { reviews } from '../data/products'

const ProductReviews = ({ navigation }) => {
    /**
     * Render header
     */
    const renderHeader = () => {
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
                <Text style={styles.subtitle}>4.8 (86 reviews)</Text>
                <TouchableOpacity style={styles.headerIcon}>
                    <Image
                        source={icons.more}
                        resizeMode="contain"
                        style={styles.moreIcon}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * Render content
     */

    const renderContent = () => {
        return (
            <View>
                <FlatList
                    data={reviews}
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
        )
    }

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
            </View>
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
        backgroundColor: COLORS.white,
        padding: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 12,
        alignItems: 'center',
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
    moreIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'bold',
        color: COLORS.black,
    },
})

export default ProductReviews