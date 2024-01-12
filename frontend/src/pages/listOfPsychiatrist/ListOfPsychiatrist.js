import { FlatList, ScrollView, Text, View } from "react-native"
import { CustomHeader } from "../../reusable/components/header/CustomHeader"
import { SliderVertical } from "../../reusable/components/sliderVertcal/SliderVertical"
import { HeaderButton } from "../../reusable/components/headerButtons/HeaderButtons"
import React, { useEffect } from "react"
import axios from "axios"
import { config } from "../../../config"
import { Card } from "../../reusable/components/card/Card"


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
        hourly_rate: doctor.hourly_rate,
        degree: doctor.degree,
        specialization: doctor.specialization,
        first_name: doctor.user.first_name,
        last_name: doctor.user.last_name,
        img_url: doctor.user.img_url,
    }));
  
    return(
        <View style={{flex:1, paddingBottom:150}}>
            <CustomHeader />
            <HeaderButton  navigation={navigation} />
            {doctors.length===0?     <Text>No Doctors</Text> :
                <View style={{alignItems:'center', marginTop:20}}>
                    <FlatList
                        data={users}
                        renderItem={({item})=>{
                        return <Card item={item} dr='Dr' navigation={navigation} pathName='psychiatrist'/>
                        }}
                        keyExtractor={(item) => item.id }
                        contentContainerStyle={{ paddingBottom: 20 }} 
                    />
                </View> 
            }
        </View>
    )
} 