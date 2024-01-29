import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import ShippingAddressItem from '../components/ShippingAddressItem'

const ShippingAddress = ({ navigation }) => {
  /**
  * Render heder
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
        <Text style={styles.subtitle}>Shipping Address</Text>
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
   * Render content
   */

  const renderContent = () => {
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
        <ShippingAddressItem
          checked={selectedItem === 'Home'} // Check if it's the selected item
          onPress={() => handleCheckboxPress('Home')} // Pass the item title
          title="Home"
          subtitle="61480 Sunbrook Park, PC 5679"
          icon={icons.gps}
        />
        <ShippingAddressItem
          checked={selectedItem === 'Office'}
          onPress={() => handleCheckboxPress('Office')}
          title="Office"
          subtitle="69933 Meadow Valley Terra, PC 21"
          icon={icons.gps}
        />
        <ShippingAddressItem
          checked={selectedItem === 'Apartment'}
          onPress={() => handleCheckboxPress('Apartment')}
          title="Apartment"
          subtitle="21356 Clyde Gallagdher, PC 192"
          icon={icons.gps}
        />
        <ShippingAddressItem
          checked={selectedItem === "Parent's House"}
          onPress={() => handleCheckboxPress("Parent's House")}
          title="Parent's House"
          subtitle="52781 Blue Bird Park, PC 1212"
          icon={icons.gps}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("AddNewAddress")}
          style={[styles.offerBtn, {
            backgroundColor: COLORS.gray6
          }]}>
          <Text
            style={[styles.offerBtnText, {
              color: COLORS.black
            }]}>Add New Address</Text>
        </TouchableOpacity>

      </View>
    )
  }
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        {renderHeader()}
        {renderContent()}
        <TouchableOpacity
          onPress={() => navigation.navigate("Checkout")}
          style={[styles.offerBtn, {
            position: "absolute",
            bottom: 0,
            right: 16,
            left: 16
          }]}>
          <Text style={styles.offerBtnText}>Apply</Text>
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
export default ShippingAddress