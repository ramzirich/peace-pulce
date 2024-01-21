import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"


export default Problem = () =>{
    return(
        <LinearGradient style={styles.container}
        colors={['#373b39','#214ae2', '#4752e2','#8962f3']} >
            <View style={styles.navigateBtn}>
                <TouchableOpacity style={[styles.btnStyle]}>
                    <Text style={styles.btnTextStyle}>Create problem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnStyle, styles.middle]}>
                    <Text style={styles.btnTextStyle}>List of problems</Text>
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
        justifyContent:"space-between",
        width:"100%",
    },
    btnStyle:{
        width:"50%",
        height:100,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:"center"
    },
    middle:{
        borderLeftWidth:1.5,
        borderColor:'#e782f5'
    },
    btnTextStyle:{
        color:CustomColors.white,
        fontSize:16,
        fontWeight:"500",
        alignSelf:'center'
    }
})