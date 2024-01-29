import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import Rating from '../components/Rating'
import { AntDesign } from "@expo/vector-icons"
import RBSheet from 'react-native-raw-bottom-sheet'
import Button from '../components/Button'

const AddReviews = ({ navigation }) => {
    const successRefSheet = useRef();
    /**
   * @returns user header
   */
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.headerIcon}>
                    <Image
                        source={icons.arrowLeft}
                        resizeMode='contain'
                        style={styles.arrowLeft}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 14,
                    fontFamily: "bold",
                    color: COLORS.primary
                }}>Add Review</Text>
                <TouchableOpacity
                    style={styles.headerIcon}>
                    <Image
                        source={icons.more}
                        resizeMode='contain'
                        style={styles.moreIcon}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * Render Review Content
     */
    const renderReviewContent = () => {
        const [comment, setComment] = useState("");

        const handleCommentChange = (text) => {
            setComment(text);
        };
        return (
            <View>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Hi, how was your</Text>
                    <Text style={styles.greetingTextBold}>overall</Text>
                </View>
                <Text style={styles.experienceText}>experience?</Text>
                <Text style={styles.rateText}>Please, rate your experience with this product</Text>
                <Rating />
                <TextInput
                    style={styles.input}
                    placeholder="Write your comment here..."
                    multiline={true}
                    numberOfLines={4} // Set the number of lines you want to display initially
                    onChangeText={handleCommentChange}
                    value={comment}
                />
                <TouchableOpacity style={styles.selectedBtn}>
                    <AntDesign name="plus" size={24} color="black" />
                </TouchableOpacity>
            </View>
        )
    }

    const renderActionButton = () => {
        return (
            <View style={styles.actionButtonContainer}>
                <TouchableOpacity onPress={() => successRefSheet.current.open()} style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                {renderReviewContent()}
            </View>
            {renderActionButton()}
            <RBSheet
                ref={successRefSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={360}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,.3)"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },
                    container: {
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24
                    }
                }}
            >
                <View style={{ paddingHorizontal: 12, alignItems: "center" }}>
                    <Image
                        source={icons.checked}
                        resizeMode='contain'
                        style={{
                            height: 84,
                            width: 84,
                            tintColor: COLORS.primary,
                            marginVertical: 22
                        }}
                    />
                    <Text style={{
                        fontSize: 24,
                        fontFamily: "bold",
                        color: COLORS.primary
                    }}>Successfully submitted</Text>
                    <Text style={{
                        fontSize: 25,
                        fontFamily: "bold",
                        color: COLORS.primary
                    }}>review</Text>
                    <Text style={{
                        fontSize: 12,
                        fontFamily: "regular",
                        color: COLORS.primary
                    }}>Your review is successful. Continue searching...</Text>
                    <Button
                        title="Continue Exploring"
                        onPress={() => navigation.navigate("Home")}
                        filled
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />
                </View>
            </RBSheet>
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
        backgroundColor: COLORS.white,
        padding: 12
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 12,
        alignItems: "center"
    },
    headerIcon: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        backgroundColor: COLORS.gray
    },
    arrowLeft: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    moreIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    input: {
        borderColor: COLORS.primary,
        borderWidth: .3,
        borderRadius: 5,
        width: "100%",
        padding: 10,
        paddingBottom: 10,
        fontSize: 16,
        maxHeight: 150,
        textAlignVertical: "top"
    },
    selectedBtn: {
        height: 78,
        width: 78,
        backgroundColor: COLORS.gray,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        marginVertical: 12
    },
    actionButton: {
        height: 58,
        width: SIZES.width - 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center"
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 22,
    },
    greetingText: {
        fontSize: 25,
        fontFamily: 'regular',
        color: COLORS.primary,
        marginRight: 4,
    },
    greetingTextBold: {
        fontSize: 25,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    experienceText: {
        fontSize: 25,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    rateText: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.primary,
        marginVertical: 12
    },
    actionButtonContainer: {
        position: 'absolute',
        bottom: 12,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButton: {
        height: 58,
        width: SIZES.width - 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        fontSize: 16,
        color: COLORS.white,
        fontFamily: 'bold',
    },

})
export default AddReviews