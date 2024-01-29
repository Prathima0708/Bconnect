import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { notifications } from '../data/utils'
import NotificationCard from '../components/NotificationCard'
import Header from '../components/Header'

const Notifications = ({ navigation }) => {
    /***
     * Render content
     */

    const renderContent = () => {
        return (
            <View>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <NotificationCard
                            avatar={item.avatar}
                            name={item.name}
                            message={item.message}
                            time={item.time}
                            image={item.image}
                        />
                    )}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <Header title="My Notifications" />
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
})

export default Notifications