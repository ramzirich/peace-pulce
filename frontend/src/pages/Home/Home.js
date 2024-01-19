import React from 'react';
import { View } from 'react-native';
import { HeaderButton } from '../../reusable/components/headerButtons/HeaderButtons';
import SwiperComponent from '../../reusable/components/swiper/SwiperComponenet';
import FooterButtons from '../../reusable/components/footerButtons/footerButtons';

 
const Home = ({navigation}) => {
  return ( 
      <View 
        style={{flex:1,
         backgroundColor:'#8962f3',
         paddingTop:40
         }}> 
        <HeaderButton navigation={navigation} />
        <SwiperComponent/>
        <FooterButtons navigation={navigation} />
      </View>  
  ); 
};

export default Home;