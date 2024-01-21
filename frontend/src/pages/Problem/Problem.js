import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"


export default Problem = () =>{
    return(
        <LinearGradient style={styles.container}
        colors={['#373b39','#214ae2', '#4752e2','#8962f3']} >
            <View style={styles.navigateBtn}>
                <TouchableOpacity style={styles.btnTextStyle}>
                    <Text style={styles.btnTextStyle}>Create problem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnTextStyle}>
                    <Text style={styles.btnTextStyle}>Create problem</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient> 
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    navigateBtn:{
        flexDirection:'row',
        justifyContent:"space-between"
    },
    btnStyle:{
        width:"50%",
        height:100,
    },
    btnTextStyle:{
        color:CustomColors.white,
        fontSize:16,
        fontWeight:"500"
    }
})