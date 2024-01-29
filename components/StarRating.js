import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = (props) => {
  // Generate an array of star icons
  const starIcons = Array.from({ length: props.totalStars }, (_, index) => (
    <Ionicons key={index} name="star" size={20} color="#FFD700" />
  ));

  return <View style={{ flexDirection: 'row' }}>{starIcons}</View>;
};

export default StarRating;