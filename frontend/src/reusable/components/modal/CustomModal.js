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
        width:'90%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'whitesmoke',
        borderRadius: 10
    },
    text:{
        color:CustomColors.white,
        fontSize:18,
        fontWeight:'500'
    },
})