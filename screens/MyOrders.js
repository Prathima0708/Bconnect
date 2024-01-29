import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, icons } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { StatusBar } from 'expo-status-bar'
import OngoingOrders from '../tabs/OngoingOrders'
import HistoryOrders from '../tabs/HistoryOrders'

const renderScene = SceneMap({
  first: OngoingOrders,
  second: HistoryOrders,
})

const MyOrders = ({ navigation }) => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)

  const [routes] = React.useState([
      { key: 'first', title: 'Ongoing' },
    //  { key: 'second', title: 'History' },
  ])

  const renderTabBar = (props) => (
      <TabBar
          {...props}
          indicatorStyle={{
              backgroundColor: COLORS.primary,
          }}
          style={{
              backgroundColor: '#fff',
          }}
          renderLabel={({ route, focused, color }) => (
              <Text style={[{ color: focused ? COLORS.black : 'gray' }]}>
                  {route.title}
              </Text>
          )}
      />
  )
  const renderHeader = () => {
      const navigation = useNavigation()
      return (
          <View
              style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  marginHorizontal: 16,
              }}
          >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={commonStyles.header1Icon}
                  >
                      <Image
                          resizeMode="contain"
                          source={icons.arrowLeft}
                          style={{
                              height: 24,
                              width: 24,
                              tintColor: COLORS.black,
                          }}
                      />
                  </TouchableOpacity>
                  <Text
                      style={{
                          marginLeft: 12,
                          fontSize: 17,
                          fontFamily: 'regular',
                      }}
                  >
                      My Orders
                  </Text>
              </View>
             
          </View>
      )
  }
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
          <StatusBar hidden={true} />
          <View style={{ flex: 1 }}>
              {renderHeader()}
              <View
                  style={{
                      flex: 1,
                      marginHorizontal: 22,
                  }}
              >
                  <TabView
                      navigationState={{ index, routes }}
                      renderScene={renderScene}
                      onIndexChange={setIndex}
                      initialLayout={{ width: layout.width }}
                      renderTabBar={renderTabBar}
                  />
              </View>
          </View>
      </SafeAreaView>
  )
}

export default MyOrders