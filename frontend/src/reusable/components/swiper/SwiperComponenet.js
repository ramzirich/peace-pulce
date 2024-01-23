import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { sliderImages } from '../../../utils/sliderImages/sliderImages';
import HomeCard from '../../elements/HomeCard/homeCard';
import axios from 'axios';
import { config } from '../../../../config';

const SwiperComponent = () => {
  const [images, setImages] = useState([]);

  useEffect(() =>{
    const fetchImages = async() =>{ 
      try{  
        const response = await axios.get(`${config.apiUrl}/homeImages`);
        setImages(response.data) 
      }catch(error){
        console.error("Error in fetching images: ",error)
      }     
    }
    fetchImages();
  }, [])

  const len = sliderImages.length
  return (
    <View style={styles.container}>
      {images.length>0 && <
        FlatList
          data={images} 
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <HomeCard item={item} index={index} listCount={images.length-1}/>
            );
          }}
        /> 
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:'13%',
    
  },
  img:{
    height:340,
    width:220
  }
  
});

export default SwiperComponent;