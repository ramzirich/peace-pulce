import React from 'react';
import { View } from 'react-native';
import { HeaderButton } from '../../reusable/components/headerButtons/HeaderButtons';
import SwiperComponent from '../../reusable/components/swiper/SwiperComponenet';
import FooterButtons from '../../reusable/components/footerButtons/footerButtons';
import LinearGradient from 'react-native-linear-gradient';

 
const Home = ({navigation}) => {
  return ( 
      <LinearGradient colors={['black','#214ae2', '#4752e2','#8962f3']} 
        style={{flex:1,
         backgroundColor:'#8962f3',
        //  backgroundColor:'white',
         paddingTop:40
         }}> 
        <HeaderButton navigation={navigation} />
        <SwiperComponent/>
        <FooterButtons navigation={navigation} />
      </LinearGradient>  
  ); 
};

export default Home;