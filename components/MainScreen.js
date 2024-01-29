// import React from 'react'
// import Box from './Box';
// import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {
//   Feather,
//   Ionicons,
//   MaterialIcons,
//   Octicons,
//   MaterialCommunityIcons,
//   Fontisto,
// } from '@expo/vector-icons'
// import { COLORS, FONTS, SIZES, icons } from '../constants'
// import image1 from "../assets/images/mainimage.jpg";



// const MainScreen = ({navigation}) => {
//   return (
//    <>
//     <View style={styles.container}>
//        <Image
//         style={styles.fullScreenImage}
//         source={image1}
//       />
//       <View
//         style={[
          
//           {
//             // Try setting `flexDirection` to `"row"`.
//             top:140,
//             flexDirection: 'row',
//           },
//         ]}>
//         <View style={{flex: 1, justifyContent:'center',alignItems:'center'}} >
//           <Text style={styles.mainText}>RS. 24,485.02</Text>
//           <Text style={styles.subText}>TOTAL DUE</Text>
//         </View>
//         <View style={{flex: 1, justifyContent:'center',alignItems:'center'}} >
//           <Text style={styles.mainText}>RS. 24,485.02</Text>
//           <Text style={styles.subText}>OVER DUE</Text>
//         </View>
//       </View>
//       <View
//         style={[
//           {
//             flexDirection: 'row',
//             marginVertical:70,
//             top:80
//           },
//         ]}>
//           <TouchableOpacity
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 paddingHorizontal: 10,
//               }}
//               onPress={() => console.log('PAY button pressed')}>
//               <View style={{ backgroundColor: '#2CAB37', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 5 }}>
//                 <Text style={{ color: 'white', fontSize: 16 }}>PAY</Text>
//               </View>
//             </TouchableOpacity>
//       </View>
//       <View style={styles.row}>
//         <Box text="Order" onPress={() => navigation.navigate("Cart")} iconName="cart-check"/>
//         <Box text="Buy again" onPress={() => navigation.navigate("Main")} iconName="cart-arrow-down" />
//       </View>
//       <View style={styles.row}>
//         <Box text="Order list" onPress={() => navigation.navigate("Main")} iconName="clipboard-list-outline" />
//         <Box text="Cart" onPress={() => navigation.navigate("Cart")} iconName="cart-plus"/>
//       </View>
//       <View style={styles.row}>
//         <Box text="Favorites" onPress={() => navigation.navigate("Main")} iconName="heart-outline"/>
//         <Box text="Ledger" onPress={() => navigation.navigate("Main")} iconName="note-check-outline"/>
//       </View>
//       <View style={styles.row}>
//         <Box text="Invoices"  onPress={() => navigation.navigate("Main")} iconName="finance"/>
//         <Box text="Return" onPress={() => navigation.navigate("Main")} iconName="hand-coin"/>
//       </View>
//     </View>
//     <View
//       style={[
//         {
//           // Try setting `flexDirection` to `"row"`.
//           flexDirection: 'row',
//           marginVertical:20,
          
//         },
//       ]}>
//       <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}  >
//         <MaterialCommunityIcons name='cursor-default-outline' size={30} color="black" onPress={() => navigation.navigate("Main")} />
//       </View>
//       <View style={{flex: 1,justifyContent:'center',alignItems:'center'}} >
//       <MaterialCommunityIcons name='cart' size={30} color="black" onPress={() => navigation.navigate("Main")} />
//       </View>
//       <View style={{flex: 1, justifyContent:'center',alignItems:'center'}} >
//         <Text style={{fontWeight:'600'}} onPress={() => navigation.navigate("Main")}>Account</Text>
//       </View>
//     </View>

//    </>
//   );
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     row: {
//       flexDirection: 'row',
//       top:30,
//       justifyContent: 'space-between',
//     },
//     mainText:{
//       fontSize:24,
//       fontWeight:'bold'
//     },
//     subText:{
//       color:'grey'
//     },
//     fullScreenImage: {
//       width: '100%',
//       height: '25%',
//       objectFit:'fill',
//       top:0,
//       resizeMode: 'cover',
//       position: 'absolute',
//     },

//   });
// export default MainScreen