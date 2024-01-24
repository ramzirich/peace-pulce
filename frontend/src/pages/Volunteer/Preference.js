import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { config } from "../../../config"
import React from "react"
import { Image } from "react-native-svg"
import { CustomColors } from "../../styles/color"

export default  Preference = ({list, element, set, key}) =>{

    const createFavorite = async(items, id) =>{
        try{
                const authToken = await AsyncStorage.getItem('authToken')
                const response = await axios.post(`${config.apiUrl}/${element}/create`,{
                    key : id
                },{
                    headers: {                       
                        'Authorization': `Bearer ${authToken}`
                    }
                })
        }catch(error){
            console.error("Error of adding hobby: ", error)
        }
    }

    const isFavorite =  (itemId) => set.has(itemId)
    const toggleFavorite = (itemId) =>{
        set.has(itemId)? set.delete(itemId) : set.add(itemId)
    }

    const renderHobbies = (items) => {
        const rows = [];
        for (let i = 0; i < items.length; i += 4) {
          const currentRow = items.slice(i, i + 4).map((item, index) => (
            <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity key={item.id} style={[ isFavorite(item.id) && styles.shadowContainer]}
                    onPress={()=>{
                            createFavorite(items, item.id)
                            toggleFavorite(item.id)}
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
    };

    return(
        <View>{renderHobbies(list)}</View>    
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