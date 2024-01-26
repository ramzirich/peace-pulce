import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"

export default CustomModal = ({hideModal}) =>{
    return(
        <TouchableOpacity style={styles.container}
            onPress={hideModal}
        >
            <Text style={styles.text}>Changes Saved</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:30,
        height:200,
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(137, 98, 243, 0.8)',
        borderRadius: 10
    },
    text:{
        color:CustomColors.white,
        fontSize:18,
        fontWeight:'500'
    },
})