import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"
import { config } from "../../../../config";

export const Card = ({dr =null, item, navigation, pathName}) =>{
    const { first_name, last_name, about, img_url, id, specialization } = item;
    const imagePath = `${config.imgUrl}${img_url}`;
   
    return(
        <TouchableOpacity style={styles.card}
            onPress={()=>navigation.navigate( pathName, {id:id, doctorInfo: item})}>
            <View style={styles.img_container}>  
                {img_url && <Image source={{ uri: imagePath }} style={styles.img} resizeMode="cover"/>}
                {img_url ==null && <Image source={require('../../../../assets/images/user.jpg')} style={styles.img} resizeMode="cover"/>}
            </View>
            <View style={styles.text_right}>
                <Text style={styles.name}>{dr} {first_name} {last_name}</Text>
                {specialization && <Text style={styles.specialization}>{specialization}</Text>} 
                {about && 
                    <View style={styles.info}>
                        <Text numberOfLines={5} style={{color:CustomColors.white}}>{about}</Text>     
                    </View>
                }     
            </View>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    card:{
        height:200,
        width:320,
        borderRadius: 30,
        borderWidth:1,
        borderColor:'#8b62e9',
        borderColor:'#e782f5',
        marginBottom: 20,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical:12.5,
        gap:7
    },
    text_right:{
        paddingHorizontal:7,
        width: '57%',
    },
    name:{
        fontSize:20,
        fontWeight: "bold",
        color: CustomColors.white
    },
    info:{
       paddingTop:8
    },
    img_container:{
        alignItems :'flex-end',
        width:'45%',
    },
    img:{
       borderRadius: 10,
        height:175,
        width:'100%',
        backgroundColor:CustomColors.black,
        alignSelf: "flex-end",
    },
    specialization:{
        fontSize:12,
        fontWeight:'300',
        color: CustomColors.white
    }
})