import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { contacts } from '../data/utils';
import { COLORS, FONTS, icons } from '../constants';
import { StatusBar } from 'expo-status-bar';

const Message = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(contacts);

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = contacts.filter((user) =>
      user.userName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() =>
        navigation.navigate('Chat', {
          userName: item.userName,
        })
      }
      style={[
        styles.userContainer,
        index % 2 !== 0 ? styles.oddBackground : null,
      ]}
    >
      <View style={styles.userImageContainer}>
        {item.isOnline && item.isOnline === true && (
          <View style={styles.onlineIndicator}></View>
        )}

        <Image
          source={item.userImg}
          resizeMode="contain"
          style={styles.userImage}
        />
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.lastSeen}>{item.lastSeen}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Messsages</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.editIcon}>
              <Feather name="edit" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={icons.more}
                resizeMode="contain"
                style={styles.moreIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBar}>
          <Ionicons
            name="ios-search-outline"
            size={24}
            color={COLORS.black}
          />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={handleSearch}
            placeholder="Search contacts..."
          />
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={filteredUsers}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  headerIcons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  editIcon: {
    marginHorizontal: 12,
  },
  moreIcon: {
    height: 24,
    width: 24,
    tintColor: 'gray',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryWhite,
    height: 48,
    marginVertical: 22,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  searchInput: {
    width: '100%',
    height: '100%',
    marginHorizontal: 12,
  },
  flatListContainer: {
    paddingBottom: 100,
  },
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.secondaryWhite,
    borderBottomWidth: 1,
  },
  oddBackground: {
    backgroundColor: COLORS.tertiaryWhite,
  },
  userImageContainer: {
    paddingVertical: 15,
    marginRight: 22,
  },
  onlineIndicator: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.white,
    borderWidth: 2,
    position: 'absolute',
    top: 14,
    right: 2,
    zIndex: 1000,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  userInfoContainer: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 14,
    color: COLORS.blue,
    fontFamily: FONTS.bold,
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 14,
    color: COLORS.secondaryGray,
  },
});

export default Message;