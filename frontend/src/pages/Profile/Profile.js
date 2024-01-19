import React from "react"
import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"

export default Profile = () =>{
    return(
        <LinearGradient 
            colors={['#8962f3', '#4752e2', '#214ae2']}
            style={styles.bigContainer}>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bigContainer:{
        flex:1,
        paddingTop:20
    }
})