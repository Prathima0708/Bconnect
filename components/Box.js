import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

  const Box = ({ text, onPress, iconName }) => {
    const handlePress = () => {
      console.log(`Navigating to ${text} screen`);
      onPress(); // Try removing this line, it should already be called when you tap the Box.
    };
    return (
      <Pressable
      android_ripple={{ color: 'rgba(0, 0, 0, 0)', borderless: true, radius: 3 }}
      style={({ pressed }) => [
        styles.box,
        {
          backgroundColor: pressed ? '#F2F3F4' : 'white', // Change the background color when pressed
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.container}>

        <View style={styles.textContainer}>
         <MaterialCommunityIcons name={iconName} size={30} color="black" />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Pressable>
    );
  };
  const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  box: {
    width: width < 768 ? '50%' : '45%',
    height: 60,
    margin: 5,
    borderRadius: 40,
    justifyContent:'center',
    // borderWidth: 1,
    borderColor: 'black',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    paddingRight: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    flexDirection:'row'
  },
  text: {
    fontSize: width < 768 ? 18 : 16,
    fontFamily:'regular'
  },
});

export default Box;
