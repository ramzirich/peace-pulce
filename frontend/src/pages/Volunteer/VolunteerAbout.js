import React, { useEffect, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../styles/color"
import { useSelector } from "react-redux"
import axios from "axios"
import { config } from "../../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"


export default VolunteerAbout = () =>{
    const [typedNote, setTypedNote] = useState(null)
    const {userInfo} = useSelector(state => state.userInfoReducer);

    const navigation = useNavigation();
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

    const save = async() =>{
        try{
            const authToken  = await AsyncStorage.getItem('authToken');
            const response= await axios.post(`${config.apiUrl}/volunteer/update`,
            {
                about:typedNote
            },{
                headers:{
                    "Authorization" : `Bearer ${authToken}`
                }
            })
            navigation.navigate('profile')
        }catch(error){
            console.error('Error fetching data: ', error)
        }
    }

    return(
        <>
            <TextInput
                value={typedNote}
                onChangeText={(text) => setTypedNote(text)}
                multiline
                autoFocus
                style={{ width:'100%', color:CustomColors.white,
                paddingHorizontal:15, borderWidth:1, borderColor:"#e782f5", borderRadius:10
                }}
            />
            <TouchableOpacity style={{backgroundColor:'#4752e2', flexDirection:'row', alignItems:'center'
                ,justifyContent:'center', padding:10, marginTop:10, height:40, width:'50%', alignSelf:'center',
                marginBottom:20, borderRadius:10}}
                onPress={save}    
            >
                <Text style={{color:'white',fontSize:16, fontWeight:'500'}}>Save</Text>
            </TouchableOpacity>
        </>
    )
}