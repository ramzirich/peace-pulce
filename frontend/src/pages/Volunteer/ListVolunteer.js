import { FlatList, ScrollView, Text, View } from "react-native"
import { CustomHeader } from "../../reusable/components/header/CustomHeader"
import { HeaderButton } from "../../reusable/components/headerButtons/HeaderButtons"
import React, { useEffect } from "react"
import axios from "axios"
import { config } from "../../../config"
import { Card } from "../../reusable/components/card/Card"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"
import { VolunteerCard } from "../../reusable/components/card/VolunteerCard"

export const ListOfVolunteer = ({navigation}) =>{
    const [volunteers, setVolunteers] = React.useState(null);

    useEffect(() =>{
        const fetchUserData = async() =>{
            try{
                const response =await  axios.get(`${config.apiUrl}/volunteers`);
                setVolunteers(response.data)
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData(); 
    }, [])

    let users=[]
    if(volunteers){
        users = volunteers.map(volunteer => ({
            about :volunteer.about,
            id:volunteer.id,
            first_name: volunteer.user.first_name,
            last_name: volunteer.user.last_name,
            img_url: volunteer.user.img_url,
            phone:volunteer.user.phone
        }));
    }
    
  
    return(
        <LinearGradient 
            colors={['#373b39','#214ae2', '#4752e2','#8962f3']} 
            style={{flex:1, paddingBottom:50, paddingTop:40, }}>
            <HeaderButton  navigation={navigation} />
            {volunteers == null? 
                <Text style={{color:CustomColors.white, padding:40, fontSize:20}}>Loading...</Text> :
                volunteers.length===0?     
                <Text style={{color:CustomColors.white, padding:40, fontSize:20}}>No Volunteers</Text> :
                <View style={{alignItems:'center', marginTop:20}}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                        data={users}
                        renderItem={({item})=>{
                        return <VolunteerCard item={item} navigation={navigation} pathName='volunteer-user'/>
                        }}
                        keyExtractor={(item) => item.id }
                        contentContainerStyle={{ paddingBottom: 20 }} 
                    />
                </View> 
            }
        </LinearGradient>
    )
} 