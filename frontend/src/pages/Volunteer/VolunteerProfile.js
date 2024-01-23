import axios from "axios";
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { config } from "../../../config";
import { CustomColors } from "../../styles/color";


export default VolunteerProfile = () =>{
    const [hobbies, setHobbies] = useState([]);
    const [places, setPlaces] = useState([])
   
  const renderHobbies = (items) => {
    const rows = [];
    for (let i = 0; i < items.length; i += 4) {
        // console.log(i)
      const currentRow = items.slice(i, i + 4).map((item, index) => (
        <View style={{flexDirection:'column', alignItems:'center'}}>
        <TouchableOpacity key={item.id} style={[styles.shadowContainer]} >
          <Image
            source={{ uri: `${config.imgUrl}${item.img_url}` }}
            style={{ height: 50, width: 50 , borderRadius:10}} 
          />
        </TouchableOpacity>
        <View>

        </View>
        <Text style={{color:CustomColors.white, fontSize:12}}>{item.name}</Text> 
        </View>
      ));
      rows.push(
        <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent:'space-between' }}>
          {currentRow}
        </View>
      );
    }
    return rows;
  };
        
    useEffect(() =>{
        const fetchHobbies = async() =>{
            try{
                const response = await axios.get(`${config.apiUrl}/hobbies`)
                setHobbies(response.data)
                const responseplaces = await axios.get(`${config.apiUrl}/places`)
                setPlaces(responseplaces.data)
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
                <View>{renderHobbies(hobbies)}</View>    
            </View>

            <View>
                <Text style={styles.headers}>Places</Text>
                <View>{renderHobbies(places)}</View>
            </View>
            
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