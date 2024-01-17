import React from 'react';
import { View } from 'react-native';
import { CustomHeader } from '../../reusable/components/header/CustomHeader';
import { HeaderButton } from '../../reusable/components/headerButtons/HeaderButtons';
import SwiperComponent from '../../reusable/components/swiper/SwiperComponenet';
import FooterButtons from '../../reusable/components/footerButtons/footerButtons';

 
const Home = ({navigation}) => {
  return ( 
      <View 
        style={{flex:1,
         backgroundColor:'#8962f3'
        // backgroundColor:'rgba(137,98,243,0.8)' 
         }}> 
        <CustomHeader/>
        <HeaderButton navigation={navigation} />
        <SwiperComponent/>
        <FooterButtons navigation={navigation} />
      </View>  
  ); 
};

export default Home;