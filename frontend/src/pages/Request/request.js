import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { HeaderButton } from "../../reusable/components/headerButtons/HeaderButtons"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"
import AsyncStorage from "@react-native-async-storage/async-storage"


export const RequestFromPatient = ({navigation}) =>{
    const [patients, setPatients] = React.useState(null);
    const [acceptSuccess, setAcceptSuccess] = useState(false);

    useEffect(() =>{
        const fetchUserData = async() =>{
            try{
                const auth = await AsyncStorage.getItem('authToken')
                const response =await  axios.get(`${config.apiUrl}/patient_request_pending`,
                    {
                        headers:{
                            "Authorization" : `Bearer ${auth}`
                        }
                    }
                );
                setPatients(response.data)
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData(); 
    }, [acceptSuccess])

    let users;
    if(patients){
        users = patients.map(patient => ({
            id:patient.user.id,
            first_name: patient.user.first_name,
            last_name: patient.user.last_name,
            img_url: patient.user.img_url,
            phone : patient.user.phone,
            email : patient.user.email,
            id_request:patient.id
        }));
    }
    

    acceptRequest = async(id) =>{
        try{
            const authToken = await AsyncStorage.getItem('authToken');
            const response = await axios.post(`${config.apiUrl}/doctor_accept_request/update/${id}`,
            {
                request : 'accepted'
            },
            {
                headers:{
                    "Authorization" : `Bearer ${authToken}`
                }
            });
            setAcceptSuccess(!acceptSuccess)
        }catch(error){
            console.error("Error accepting request: ", error)
        }
    }

    deleteRequest = async(id) =>{
        try{
            const authToken = await AsyncStorage.getItem('authToken');
            const response = await axios.post(`${config.apiUrl}/doctor_request/delete/${id}`,
            {
                request : 'accepted'
            },
            {
                headers:{
                    "Authorization" : `Bearer ${authToken}`
                }
            });
            setAcceptSuccess(!acceptSuccess)
        }catch(error){
            console.error("Error accepting request: ", error)
        }
    }
  
    return(
        <LinearGradient 
            colors={['black','#214ae2', '#4752e2','#8962f3']} 
            style={{flex:1, paddingBottom:50, paddingTop:40, }}>
            <HeaderButton  navigation={navigation} />
            <View style={styles.logo_container}>
                <Image source={require('../../../assets/images/logo22.png')} style={styles.img_logo} />
            </View>
            {patients === null && 
                <View style={{marginTop:60,paddingLeft:20, flexDirection:'row', alignItems:'center', gap:10}}>
                    <Text style={{color:CustomColors.white, fontSize:20, fontWeight:'500'}}>Loading</Text>
                    <ActivityIndicator size="small" color={CustomColors.white} />
                </View>
            }
            {patients && patients.length===0?     
                <Text style={{color:CustomColors.white, padding:40, fontSize:20}}>No Requests</Text> :
                <FlatList data={users}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index})=>{
                        return (
                            <View 
                                style={styles.small_container}  
                            >
                                <View style={styles.spaceBtn}>
                                    <View>
                                        <Image style={styles.img}
                                            source={{uri : `${config.imgUrl}${item.img_url}`}} />
                                    </View>
                                    <View>
                                        <Text style={styles.title}>{item.first_name} {item.last_name}</Text>
                                    </View>
                                </View>
                                
                                <View style={styles.gap}>
                                    <TouchableOpacity onPress={() =>acceptRequest(item.id_request)}>
                                            <Text style={{color:'white'}}>✔️</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                        style={{width:20}}
                                        onPress={() =>deleteRequest(item.id_request)}>
                                            <Text style={styles.x}>X</Text>
                                        </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />
            }
        </LinearGradient>
    )
} 

const styles = StyleSheet.create({
    logo_container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'center',
        height:200,
        width:'100%'
    },
    img_logo:{
        width:'100%',
        height:"100%"
    },
    small_container:{
        height:70,
        width:'100%',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#8b62e9',
        paddingHorizontal:20,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    img:{
        height:50,
        width:50,
        borderRadius:5
    },
    title:{
        color:'white'
    },
    spaceBtn:{
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    gap:{
        flexDirection:'row',
        alignItems:'center',
        gap:20
    },
    noteicon:{
        height:20,
        width:20,
    },
    x:{
        color:"red",
        fontSize:16
    }
})