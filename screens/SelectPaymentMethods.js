import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS, SIZES, icons, images } from '../constants'
import PaymentMethodItem from '../components/PaymentMethodItem'
import Header from '../components/Header'

const SelectPaymentMethods = ({ navigation }) => {
  

/**
 * Render content
 */

  const renderContent = ()=>{
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCheckboxPress = (itemTitle) => {
      if (selectedItem === itemTitle) {
        // If the clicked item is already selected, deselect it
        setSelectedItem(null);
      } else {
        // Otherwise, select the clicked item
        setSelectedItem(itemTitle);
      }
    };

    return (
      <View>
           <PaymentMethodItem
          checked={selectedItem === 'Add a New Card'} // Check if it's the selected item
          onPress={() => handleCheckboxPress('Add a New Card')} // Pass the item title
          title="Add a New Card"
          icon={images.creditCard}
        />
        <PaymentMethodItem
          checked={selectedItem === 'Paypal'}
          onPress={() => handleCheckboxPress('Paypal')}
          title="Paypal"
          icon={images.paypal}
        />
        <PaymentMethodItem
          checked={selectedItem === 'Apple Pay'}
          onPress={() => handleCheckboxPress('Apple Pay')}
          title="Apple Pay"
          icon={icons.apple}
        />
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.area}>
    <View style={styles.container}>
      <Header title="Payment Methods"/>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
      {renderContent()}
      </ScrollView>
      <TouchableOpacity
          onPress={() => navigation.navigate("ReviewSummary")}
          style={[styles.offerBtn, {
            position: "absolute",
            bottom: 0,
            right: 16,
            left: 16
          }]}>
          <Text style={styles.offerBtnText}>Continue</Text>
        </TouchableOpacity>
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
    backgroundColor: COLORS.white,
    padding: 12
},
subtitle: {
    fontSize: 18,
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
    marginVertical: 16
},
offerBtnText: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.white
},
})

export default SelectPaymentMethods