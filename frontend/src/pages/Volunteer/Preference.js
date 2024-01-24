import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { config } from "../../../config"
import React, { useEffect, useState } from "react"

import { CustomColors } from "../../styles/color"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

export default  Preference = () =>{
    const [hobbies, setHobbies] = useState([]);
    const [hobbiesSet, setHobbiesSet] = useState(new Set());
    const [counter, setCounter] = useState(0)
    useEffect(() =>{
        const fetchHobbies = async() =>{
            try{
                const response = await axios.get(`${config.apiUrl}/hobbies`)
                setHobbies(response.data)
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
        
    const createDeleteFavorite = async(items, id) =>{
        try{
            if(hobbiesSet.has(id)){
                const authToken = await AsyncStorage.getItem('authToken')
                const response = await axios.post(`${config.apiUrl}/favorite_hobby/delete/${id}`,
                {

                },{
                    headers: {                       
                        'Authorization': `Bearer ${authToken}`
                    }
                })
                setCounter(counter+1)
            }
            else{
                const authToken = await AsyncStorage.getItem('authToken')
                const response = await axios.post(`${config.apiUrl}/favorite_hobby/create`,{
                    hobbies_id : id
                },{
                    headers: {                       
                        'Authorization': `Bearer ${authToken}`
                    }
                })
                setCounter(counter+1)
            }
        }catch(error){
            console.error("Error: ", error)
        }
    }
 
    const isFavorite =  (itemId) => hobbiesSet.has(itemId)
    const toggleFavorite = (itemId) =>{
        hobbiesSet.has(itemId)? hobbiesSet.delete(itemId) : hobbiesSet.add(itemId)
    }

    const renderHobbies = (items) => {
        const rows = [];
        if(hobbiesSet){
            for (let i = 0; i < items.length; i += 4) {
                const currentRow = items.slice(i, i + 4).map((item, index) => (
                  <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                      <TouchableOpacity key={item.id} style={[ isFavorite(item.id) && styles.shadowContainer]}
                          onPress={()=>{
                                  createDeleteFavorite(items, item.id)
                                  toggleFavorite(item.id)
                                  }
                              }
                      >
                      <Image
                          source={{ uri: `${config.imgUrl}${item.img_url}` }}
                          style={{ height: 50, width: 50 , borderRadius:10}} 
                      />
                      </TouchableOpacity>
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
        }
        
    };

    return(
        <>
            <View>{renderHobbies(hobbies)}</View>   
        </>
         
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