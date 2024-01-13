import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { CustomHeader } from '../../reusable/components/header/CustomHeader';
import { HeaderButton } from '../../reusable/components/headerButtons/HeaderButtons';
import { config } from '../../../config';
import axios from 'axios';
import { SliderHorizental } from '../../reusable/components/sliderHorizental/SliderHorizental';
import { useSelector } from 'react-redux';

 
const Home = ({navigation}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() =>{
    const fetchUserData = async() =>{
      try{
        const response = await axios.get(`${config.apiUrl}/videos`,{
        });
        setVideos(response.data.data);   
      }catch(error){
        console.error('Error fetching user data:', error.message); 
      }
    };
    fetchUserData();
  }, [])

  return ( 
     <ScrollView> 
       <CustomHeader/>
       <Image source={require('../../../assets/images/1.jpg')} style={{width:200, height:340, alignSelf:'center'}}/>
       <HeaderButton navigation={navigation} />
       <SliderHorizental videos={videos} />
    </ScrollView>      
  ); 
};

export default Home;