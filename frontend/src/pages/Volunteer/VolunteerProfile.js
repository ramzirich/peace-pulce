import React from "react"
import { StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"

export default VolunteerProfile = () =>{
    return(
        <LinearGradient style={styles.bigContainer}
            colors={[ '#8962f3', '#4752e2', '#214ae2']}>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bigContainer:{
        flex:1,
        paddingTop:30
    }
})