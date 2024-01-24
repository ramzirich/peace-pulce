import React, { useEffect, useState } from "react"
import { TextInput, View } from "react-native"
import { CustomColors } from "../../styles/color"
import { useSelector } from "react-redux"
import axios from "axios"
import { config } from "../../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default VolunteerAbout = () =>{
    const [typedNote, setTypedNote] = useState(null)
    const {userInfo} = useSelector(state => state.userInfoReducer);

    useEffect(() =>{
        const fetchVolunteer = async() =>{
            try{
                const authToken  = await AsyncStorage.getItem('authToken');
                const response= await axios.get(`${config.apiUrl}/volunteer`,{
                    headers:{
                        "Authorization" : `Bearer ${authToken}`
                    }
                })
                setTypedNote(response.data.about)
            }catch(error){
                console.error('Error fetching data: ', error)
            }
        }
        fetchVolunteer()
    },[])

    return(
            <TextInput
                value={typedNote}
                onChangeText={(text) => setTypedNote(text)}
                multiline
                autoFocus
                style={{ width:'100%', color:CustomColors.white,
                paddingHorizontal:15, borderWidth:1, borderColor:"#e782f5", borderRadius:10
                }}
            />
    )
}