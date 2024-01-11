import React from "react"
import { Image, StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"

export default Songs = () =>{
    return(
        <LinearGradient colors={['#a34c0d', '#592804', '#241001', '#000000']}
            style={styles.container}
        >
            <Image source={require('../../../assets/songImages/left.png')}
                style={styles.icons}
            /> 
        </LinearGradient>
    )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:30,
        paddingHorizontal:20,
    },
    icons:{
        width:20,
        height:20,
        tintColor:CustomColors.white
    }
})