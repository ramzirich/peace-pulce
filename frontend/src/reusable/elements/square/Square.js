import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CustomColors } from "../../../styles/color";

export const Square= ({tag, img_url=CustomColors.darkBlue, onPress = () =>{}, url=null}) =>{
    return(
        <View style={styles.conatiner}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.square} 
            >
                <Image source={url} style={styles.img}/>
            </TouchableOpacity>
            <View style={styles.constainer}>
                <Text style={styles.text}>{tag}</Text>
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
        height:55, 
        width:55,  
        borderRadius:10
    },
    img:{
        height:'100%',
        width:'100%',
        borderRadius:10
    },
    text:{
        color: CustomColors.white,
        fontSize:10,
        marginTop:5
    }
})