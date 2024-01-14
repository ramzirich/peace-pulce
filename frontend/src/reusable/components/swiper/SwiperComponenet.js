import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import { sliderImages } from '../../../utils/sliderImages/sliderImages';

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
            <View >
              <Image
                source={item.url}
                style={[styles.img,
                        {
                            borderTopRightRadius: index==len-1?0:20,
                            borderBottomRightRadius: index==len-1?0:20,
                            borderTopLeftRadius: index==0?0:20,
                            borderBottomLeftRadius: index==0?0:20,
                            marginRight: index==len-1?0:20
                        }
                    ]}
              />
            </View>
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