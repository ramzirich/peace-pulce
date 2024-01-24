import axios from "axios";
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { config } from "../../../config";
import { CustomColors } from "../../styles/color";
import { create } from "react-test-renderer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Preference from "./Preference";


export default VolunteerProfile = () =>{
    const [hobbies, setHobbies] = useState([]);
    const [places, setPlaces] = useState([]);
    const [hobbiesSet, setHobbiesSet] = useState(new Set());
        
    useEffect(() =>{
        const fetchHobbies = async() =>{
            try{
                const response = await axios.get(`${config.apiUrl}/hobbies`)
                setHobbies(response.data)
                const responseplaces = await axios.get(`${config.apiUrl}/places`)
                setPlaces(responseplaces.data)

                const authToken = await AsyncStorage.getItem('authToken');
                const responsefavoriteshobbies = await axios.get(`${config.apiUrl}/favorite_hobbies`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
                });

                let set1 = new Set();
                for(let j=0; j<responsefavoriteshobbies.data.length; j++){
                    set1.add(responsefavoriteshobbies.data[j].hobbies_id);
                }
                setHobbiesSet(set1);
            }catch(error){
                console.error("Error in fetching hobbies: ", error)
            }
        }
        fetchHobbies()
    },[])

    return(
        <LinearGradient style={styles.bigContainer}
           colors={ ['black','#214ae2', '#4752e2','#8962f3']}
            // colors={[ '#8962f3', '#4752e2', '#214ae2']}
            >
            <View style={{marginBottom:15}}>
                <Text style={styles.headers}>Hobbies</Text>
                <Preference list={hobbies} element='favorite_hobby' set={hobbiesSet} keyValue='hobbies_id'/>
            </View>

            {/* <View>
                <Text style={styles.headers}>Places</Text>
                <View>{renderHobbies(places)}</View>
            </View> */}
            
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bigContainer:{
        flex:1,
        paddingTop:40,
        paddingHorizontal:20
    },
    headers:{
        color:CustomColors.white,
        fontSize: 18,
        fontWeight:'500',
        marginBottom: 10
    },
    rowCenter:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    shadowContainer: {
        shadowColor: '#fff', 
        shadowOffset: {
          width: 4,
          height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        borderRadius:10,
        padding:5 
      },
})