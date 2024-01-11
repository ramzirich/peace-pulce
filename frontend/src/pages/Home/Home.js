import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../utils/AuthContext';
import { Link } from 'react-router-native';
import { Square } from '../../reusable/elements/square/Square';
import { CustomHeader } from '../../reusable/components/header/CustomHeader';
import { HeaderButton } from '../../reusable/components/headerButtons/HeaderButtons';
import { config } from '../../../config';
import axios from 'axios';
import { SliderHorizental } from '../../reusable/components/sliderHorizental/SliderHorizental';
import { CustomColors } from '../../styles/color';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FIRST_NAME, SET_LAST_NAME } from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import CustomVideo from '../../reusable/components/video/CustomVideo';
 
const Home = ({navigation}) => {
  const {userInfo} = useSelector(state => state.userInfoReducer)

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
       <HeaderButton navigation={navigation} />
       <SliderHorizental videos={videos} />
    </ScrollView>      
  ); 
};

export default Home;