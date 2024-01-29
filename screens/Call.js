import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, SIZES, icons, images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

const Call = ({ navigation }) => {
    const [isMute, setIsMute] = useState(false);

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                    style={styles.backIconContainer}>
                        <Image
                            source={icons.arrowLeft}
                            resizeMode='contain'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.callerProfileContainer}>
                    <Text style={{
                        fontSize: 26,
                        fontFamily: "bold"
                    }}>Milano</Text>
                    <View style={styles.timeContainer}>
                        <Text style={{ ...FONTS.body4, color: COLORS.white }}>12:23</Text>
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={images.avatar}
                        resizeMode='contain'
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            style={styles.btnContainer}
                            onPress={() => navigation.navigate("Chat")}
                        >
                            <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnContainer}
                            onPress={() => setIsMute(!isMute)}
                        >
                            <Ionicons name={isMute ? "mic-off-outline" : "mic-outline"} size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.callContainer}>
                        <Text style={styles.btnText}>End Call</Text>
                        <TouchableOpacity style={styles.callBtn}>
                            <MaterialCommunityIcons name="phone-hangup-outline" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    headerContainer: {
        marginVertical: 16,
        marginHorizontal: 16
    },
    backIconContainer: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white4,
        borderRadius: 999
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    callerProfileContainer: {
        alignItems: "center"
    },
    timeContainer: {
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        marginTop: 12
    },
    avatar: {
        height: 132,
        width: 132,
        borderRadius: 999,
        borderColor: COLORS.white4,
        borderWidth: 12,
        marginVertical: 72
    },
    footerContainer: {
        position: "absolute",
        bottom: 0,
        height: 188,
        width: "100%",
        borderWidth: 12,
        borderColor: COLORS.white,
        backgroundColor: COLORS.white4,
        borderRadius: 32,
        alignItems: "center",
    },
    actionContainer: {
        flexDirection: "row",
        marginVertical: 16
    },
    btnContainer: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
        borderRadius: 999,
        marginHorizontal: 6
    },
    callContainer: {
        height: 70,
        width: SIZES.width * 0.8,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    callBtn: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 9999
    },
    btnText: {
        ...FONTS.h4,
        color: COLORS.white,
        marginRight: 22
    }
})

export default Call