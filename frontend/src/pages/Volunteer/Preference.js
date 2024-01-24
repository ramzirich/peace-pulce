import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { config } from "../../../config"
import React, { useEffect, useState } from "react"

import { CustomColors } from "../../styles/color"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

export default  Preference = ({list, element, set, keyValue}) =>{
    const [setDb, setSetDb] = useState(new Set(set))
  
  

    const createDeleteFavorite = async(items, id) =>{
        try{
                if(!setDb.has(id) && element=='favorite_hobby'){
                    const authToken = await AsyncStorage.getItem('authToken')
                    const response = await axios.post(`${config.apiUrl}/${element}/create`,{
                        hobbies_id : id
                    },{
                        headers: {                       
                            'Authorization': `Bearer ${authToken}`
                        }
                    })
                    // console.log(response.data)
                    if(response.status==201){
                        setSetDb(prevSetDb => [...prevSetDb, { id }])
                    }
                }
                if(setDb.has(id) && element=='favorite_hobby'){
                    const authToken = await AsyncStorage.getItem('authToken')
                    console.log(id)
                    const response = await axios.post(`${config.apiUrl}/${element}/${id}`,
                    {

                    },{
                        headers: {                       
                            'Authorization': `Bearer ${authToken}`
                        }
                    })
                    console.log(response.data)
                    if(response.status==200){
                        setSetDb(prevSetDb => prevSetDb.filter(item => item.id !== id));
                    }
                }
                
        }catch(error){
            console.error("Error: ", error)
        }
    }

    const isFavorite =  (itemId) => setDb.has(itemId)
    const toggleFavorite = (itemId) =>{
        set.has(itemId)? set.delete(itemId) : set.add(itemId)
    }

    const renderHobbies = (items) => {
        const rows = [];
        if(setDb){
            for (let i = 0; i < items.length; i += 4) {
                const currentRow = items.slice(i, i + 4).map((item, index) => (
                  <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                      <TouchableOpacity key={item.id} style={[ isFavorite(item.id) && styles.shadowContainer]}
                          onPress={()=>{
                                  createDeleteFavorite(items, item.id)
                                  // toggleFavorite(item.id)
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
            <View>{renderHobbies(list)}</View>   
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