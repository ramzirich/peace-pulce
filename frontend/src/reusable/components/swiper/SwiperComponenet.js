import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { sliderImages } from '../../../utils/sliderImages/sliderImages';
import HomeCard from '../../elements/HomeCard/homeCard';

const SwiperComponent = () => {
    const len = sliderImages.length
  return (
    <View style={styles.container}>
      <FlatList
        data={sliderImages}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={styles.flatListContainer}
        renderItem={({ item, index }) => {
          return (
            <HomeCard item={item} index={index} listCount={sliderImages.length-1}/>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:20
  },
  img:{
    height:340,
    width:200
  }
  
});

export default SwiperComponent;