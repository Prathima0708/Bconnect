import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const PaymentMethodItem = ({ checked, onPress, title, icon }) => {
  return (
    <View style={styles.container}>
       <View style={styles.rightContainer}>
                <Image
                  source={icon}
                  resizeMode='contain'
                  style={styles.icon}
                />
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>     
       </View>
       <View style={styles.leftContainer}>
            <TouchableOpacity style={{marginLeft: 8}} onPress={onPress}>
                <View
                style={styles.checkContainer}
                >
                {checked && <View style={styles.checkView}/> }
                </View>
            </TouchableOpacity>

       </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: .4,
        borderColor: COLORS.gray5,
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        height: 26,
        width: 26,
        marginRight: 16
    },
    title: {
        fontSize: 12,
        fontFamily: "bold",
        color: COLORS.black
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    checkContainer: {
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 2,
        borderColor:  COLORS.primary ,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkView: {
        height: 10, 
        width: 10, 
        backgroundColor: COLORS.primary,
        borderRadius: 999
        }
})

export default PaymentMethodItem