import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"

export default CustomModal = () =>{
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Changes Saved</Text>
            <TouchableOpacity style={styles.btn}>

            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:30,
        height:200,
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:CustomColors.white,
        fontSize:18,
        fontWeight:'500'
    },
    btn:{
        backgroundColor:'#8962f3',
        height:55,
        width:70
    }  
})