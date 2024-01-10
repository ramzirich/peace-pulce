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
          // headers:{
          //   'Authorization': AsyncStorage.getItem('authToken')
          // }
        });
        setVideos(response.data.data);   
      }catch(error){
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchUserData();
  }, [])
//   console.log("hii")
// console.log(videos.length===0)
// console.log(videos)
  // console.log(user.length ==0 ?true:false)
  return ( 
     <ScrollView>
       {userInfo? <CustomHeader name={userInfo.first_name}/>: 
         <Text style={{marginVertical:10}}>Loading...</Text>} 
       <HeaderButton navigation={navigation} />
       <SliderHorizental videos={videos} />
     {/* {videos.length>0 &&  <Video
    key={videos[0].id}
    video={{ uri: `${config.imgUrl}videos/${videos[0].filename}` }}
    videoWidth={200} 
    videoHeight={200}
    controls={true}
     thumbnail={{ uri: '../../../assets/images/logo.jpg'}}

/>}  */}

     {videos.length>0 && <CustomVideo2 oneVideo={videos[0]}/>}  

      
       {/* <View style={styles.videoLength}>
      </View> */}
    </ScrollView>      
  ); 
};

const styles= StyleSheet.create({
  videoLength:{
    width:100,
    height:100,
    borderRadius: 50,
    marginTop: 20,
    backgroundColor: CustomColors.black,
    alignSelf: "center"
  }
})

export default Home;