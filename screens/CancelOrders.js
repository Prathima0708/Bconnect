import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS, SIZES } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import ReasonItem from '../components/ReasonItem'
import Header from '../components/Header'
import axios from 'axios'
import { returnItem_URL } from '../constants/utils/URL'



const CancelOrders = ({ navigation,route }) => {
    /***
     * Render content
     */

    var local_var,comment;
    const { productDetails } = route.params;
 

    const renderContent = () => {
        // const [comment, setComment] = useState('')
        const [selectedItem, setSelectedItem] = useState(null)

        const handleCheckboxPress = (itemTitle) => {
            if (selectedItem === itemTitle) {
                // If the clicked item is already selected, deselect it
                setSelectedItem(null)
              
                // selectedItem=null

            } else {
                // Otherwise, select the clicked item
                setSelectedItem(itemTitle)
               // local_var=itemTitle
                // selectedItem=itemTitle
            }
        }
        local_var=selectedItem
        const handleCommentChange = (text) => {
            comment=text;
        }
        return (
            <View style={{ marginVertical: 12 }}>
                <Text style={styles.inputLabel}>
                    Please select the reason for the cancellations
                </Text>
                <View style={{ marginVertical: 16 }}>
                    <ReasonItem
                        checked={
                            selectedItem === 'Changed mind about furniture choice'
                        }
                        onPress={() =>
                            handleCheckboxPress(
                                'Changed mind about furniture choice'
                            )
                        }
                        title="Changed mind about furniture choice"
                    />
                    <ReasonItem
                        checked={
                            selectedItem === 'Unforeseen change in interior design plan'
                        }
                        onPress={() =>
                            handleCheckboxPress('Unforeseen change in interior design plan')
                        }
                        title="Unforeseen change in interior design plan"
                    />
                    <ReasonItem
                        checked={
                            selectedItem === 'Weather affecting home decor plans'
                        }
                        onPress={() =>
                            handleCheckboxPress(
                                'Weather affecting home decor plans'
                            )
                        }
                        title="Weather affecting home decor plans"
                    />
                    <ReasonItem
                        checked={
                            selectedItem ===
                            'Sudden change in mood or home theme preference'
                        }
                        onPress={() =>
                            handleCheckboxPress(
                                'Sudden change in mood or home theme preference'
                            )
                        }
                        title="Sudden change in mood or home theme preference"
                    />
                    <ReasonItem
                        checked={selectedItem === 'Traffic or delivery delays'}
                        onPress={() =>
                            handleCheckboxPress('Traffic or delivery delays')
                        }
                        title="Traffic or delivery delays"
                    />
                    <ReasonItem
                        checked={selectedItem === 'Other reason'}
                        onPress={() => handleCheckboxPress('Other reason')}
                        title="Other reason"
                    />

                </View>
                <Text style={styles.inputLabel}>Add detailed reason</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Write your reason here..."
                    multiline={true}
                    numberOfLines={4} // Set the number of lines you want to display initially
                    onChangeText={handleCommentChange}
                    value={comment}
                />
            </View>
        )
    }

    /**
     * Render submit buttons
     */
    const renderSubmitButton = () => {
        return (
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    // onPress={() => navigation.goBack()}
                    onPress={handleSubmit}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    async function handleSubmit() {

        const request_body={
            orderId: productDetails.orderNumber, 
            reason: local_var,
            returnDate: "",
            status: "RETURNED",
            detailedReason: comment+""
        }

        console.log(request_body)
        
        try {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const res = await axios.post(
                `${returnItem_URL}`,
                request_body, // Move request_body to the data property
                {
                    headers: headers,
                }
            )

            if (res.data) {
                console.log('API response:', res.data)
                Alert.alert('Success', 'Request submitted successfully', [
                    { text: 'OK', onPress: () => navigation.navigate('Orders') },
                  ]);
            }
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }


    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <Header title="Cancel Orders" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
            </View>
            {renderSubmitButton()}
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
    input: {
        borderColor: 'gray',
        borderWidth: 0.3,
        borderRadius: 5,
        width: '100%',
        padding: 10,
        paddingBottom: 10,
        fontSize: 12,
        maxHeight: 150,
        textAlignVertical: 'top',
    },
    inputLabel: {
        fontSize: 14,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    btnContainer: {
        position: 'absolute',
        bottom: 0,
        height: 72,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        alignItems: 'center',
    },
    btn: {
        height: 48,
        width: SIZES.width - 32,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    btnText: {
        fontSize: 16,
        fontFamily: 'regular',
        color: COLORS.white,
    },
})

export default CancelOrders