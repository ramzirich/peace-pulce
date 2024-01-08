import { Text, View } from "react-native"
import { CustomHeader } from "../../reusable/components/header/CustomHeader"
import { SliderVertical } from "../../reusable/components/sliderVertcal/SliderVertical"
import { HeaderButton } from "../../reusable/components/headerButtons/HeaderButtons"
import React, { useEffect } from "react"
import axios from "axios"
import { config } from "../../../config"
// import { useNavigate } from "react-router-dom"
import { Link } from "react-router-native"
import Home from "../Home/Home"
// import { useNavigation } from "@react-navigation/native"


export const ListOfPsychiatrist = ({navigation}) =>{
    const [doctors, setDoctors] = React.useState([]);

    useEffect(() =>{
        const fetchUserData = async() =>{
            try{
                const response =await  axios.get(`${config.apiUrl}/doctors`);
                setDoctors(response.data)
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData(); 
    }, [])
    const users = doctors.map(doctor => ({
        about :doctor.about,
        id:doctor.id,
        first_name: doctor.user.first_name,
        last_name: doctor.user.last_name,
        img_url: doctor.user.img_url,
    }));
  
    return(
        <View>
            <CustomHeader />
            <HeaderButton />
            {doctors.length ===0 ? <Text>No Doctors</Text> :
          
            <SliderVertical userList={users} dr='Dr.'
                navigation={navigation}
             /> 
           }
        </View>
    )
} 