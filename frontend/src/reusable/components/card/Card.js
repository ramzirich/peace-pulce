import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"
import { config } from "../../../../config";

export const Card = ({dr =null, item, navigation, pathName}) =>{
    // console.log(item)
    const { first_name, last_name, about, img_url, id, specialization } = item;
    const imagePath = `${config.imgUrl}${img_url}`;
    return(
        <TouchableOpacity style={styles.card}
            onPress={()=>navigation.navigate('psychiatrist', {id:id})}>
            <View style={styles.img_container}>  
                <Image source={{ uri: imagePath }} style={styles.img} resizeMode="cover"/>
                {specialization && <Text>{specialization}</Text>}
            </View>
            <View style={styles.text_right}>
                <Text style={styles.name} numberOfLines={1}>{dr} {first_name} {last_name}</Text> 
                <View style={styles.info}>
                    <Text numberOfLines={5}>{about}</Text>     
                </View>     
            </View>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    card:{
        height:150,
        width:320,
        borderRadius: 30,
        backgroundColor: CustomColors.grey,
        marginBottom: 20,
        flexDirection: 'row',
        paddingTop:15,
        paddingHorizontal: 15,
        gap:10
    },
    text_right:{
        paddingLeft:30,
        width:200,
        paddingRight: 10,
        justifyContent: 'flex-start'
    },
    name:{
        fontSize:20,
        fontWeight: "bold",
    },
    info:{
       paddingTop:8
    },
    img_container:{
        alignItems :'flex-end',
        
    },
    img:{
       borderRadius: 10,
        height:120,
        width:90,
        backgroundColor:CustomColors.black,
        alignSelf: "flex-end"
    }
})