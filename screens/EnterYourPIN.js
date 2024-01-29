import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, icons, illustrations } from '../constants'
import OTPTextInput from 'react-native-otp-textinput'
import Button from '../components/Button'
import Header from '../components/Header'

const EnterYourPIN = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  

  /**
   * Render content
   */

  // render success modal
  function renderSuccessModal() {

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,.3)"
            }}
          >
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.white,
                borderRadius: 12,
                alignItems: "center",
                padding: 12
              }}
            >
              <Image
                source={illustrations.successConfirmed}
                resizeMode='contain'
                style={{
                  width: SIZES.width * 0.6,
                  height: SIZES.width * 0.6
                }}
              />

              <Text style={{
                fontSize: 22,
                fontFamily: "bold",
                color: COLORS.black
              }}>Order Successful!</Text>
              <Text style={{
                fontSize: 14,
                fontFamily: "regular",
                color: COLORS.black,
                marginVertical: 16
              }}>You have successfully made an order.</Text>

              <TouchableOpacity
                onPress={()=>navigation.navigate("Orders")}
                style={{
                  width: "100%",
                  height: 48,
                  backgroundColor: COLORS.primary,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 22
                }}
              >
                <Text style={{
                  fontSize: 12,
                  fontFamily: "regular",
                  color: COLORS.white
                }}
                >View Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Enter Your PIN"/>
        <View style={{ alignItems: "center" }}>
          <Text style={{
            ...FONTS.body4,
            marginVertical: 36
          }}>Enter your PIN to confirm payment</Text>
          <OTPTextInput
            textInputStyle={styles.OTPStyle}
            inputCount={5}
            tintColor={COLORS.primary}
          />

          <Button
            title="Continue"
            filled
            style={{
              width: "100%",
              marginVertical: 58
            }}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
      {renderSuccessModal()}
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
  subtitle: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black
  },
  offerBtn: {
    width: SIZES.width - 32,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    position: "absolute",
    bottom: 0,
    right: 16,
    left: 16,
    marginVertical: 16
  },
  offerBtnText: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.white
  },
  offerTitle: {
    fontFamily: "regular",
    fontSize: 12,
    color: COLORS.black
  },
  OTPStyle: {
    backgroundColor: COLORS.gray,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 10,
    height: 58,
    width: 58,
    borderBottomWidth: 1,
  },
})
export default EnterYourPIN