import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { CustomHeader } from '../../reusable/components/header/CustomHeader';
import { HeaderButton } from '../../reusable/components/headerButtons/HeaderButtons';
import { config } from '../../../config';
import axios from 'axios';
import { SliderHorizental } from '../../reusable/components/sliderHorizental/SliderHorizental';
import { useSelector } from 'react-redux';
import HomeSwiper from '../../reusable/components/swiper/homeSwiper';
import LinearGradient from 'react-native-linear-gradient';

 
const Home = ({navigation}) => {

  return ( 
     <LinearGradient colors={['#8962f3', '#4752e2','#214ae2']}
       style={{flex:1}}> 
       <CustomHeader/>
       <HeaderButton navigation={navigation} />
       {/* <HomeSwiper /> */}
    </LinearGradient>      
  ); 
};

export default Home;