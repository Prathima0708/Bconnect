import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, illustrations } from '../constants'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'

const PaymentCardSuccess = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 16 }}>
        <Image
          source={illustrations.success2}
          resizeMode='contain'
          style={{
            width: SIZES.width * 0.4,
            height: SIZES.height * 0.4
          }}
        />
        <Text style={{ ...FONTS.h3, marginVertical: 12 }}>Congratulations!</Text>
        <Text style={{ ...FONTS.body4, textAlign: 'center' }}>You successfully added a new card, enjoy our service!</Text>
        <View style={{
          position: 'absolute',
          bottom: 30,
          width: SIZES.width - 32
        }}>
          <Button
            filled
            title="CONTINUE SHOPPING"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PaymentCardSuccess