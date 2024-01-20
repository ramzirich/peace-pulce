import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CustomColors } from "../../../styles/color";

export const Square= ({tag, img_url=CustomColors.darkBlue, onPress = () =>{}, url=null, isIcon=false}) =>{
    return(
        <View style={styles.conatiner}>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.square,{height: isIcon? 30 : 55,width: isIcon? 30 : 55}]} 
            >
                {/* <Image source={url} style={[styles.img,{tintColor: isIcon? CustomColors.white : ""}]}/> */}
            </TouchableOpacity>
            <View style={styles.constainer}>
                {tag &&<Text style={styles.text}>{tag}</Text>}
            </View>
        </View>     
    )
}

const styles = StyleSheet.create({
    constainer:{
        alignItems: 'center', 
        justifyContent: 'center',
    },
    square:{ 
        borderRadius:10
    },
    img:{
        height:'100%',
        width:'100%',
        borderRadius:10,
    },
    text:{
        color: CustomColors.white,
        fontSize:12,
        marginTop:5,
        fontWeight:'600'
    }
})