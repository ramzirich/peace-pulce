import axios from "axios";
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { config } from "../../../config";


export default VolunteerProfile = () =>{
    const [hobbies, setHobbies] = useState([]);
    const [places, setPlaces] = useState([])
   
  const renderHobbies = () => {
    const rows = [];
    for (let i = 0; i < hobbies.length; i += 4) {
        // console.log(i)
      const currentRow = hobbies.slice(i, i + 4).map((hobby, index) => (
        <TouchableOpacity key={hobby.id} >
          <Image
            source={{ uri: `${config.imgUrl}${hobby.img_url}` }}
            style={{ height: 50, width: 50 , borderRadius:10}} 
          />
        </TouchableOpacity> 
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
            <View>{renderHobbies()}</View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bigContainer:{
        flex:1,
        paddingTop:30,
        paddingHorizontal:20
    }
})