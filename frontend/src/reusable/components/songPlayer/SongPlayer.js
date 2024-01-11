import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import  Modal  from "react-native-modal"
import { CustomColors } from "../../../styles/color"

const SongPlayer = () =>{
    return(
        <Modal isVisible style={{margin:0}}>
            <LinearGradient colors={['#067a02', '#064f03', '#032901', '#000000']}
                style={styles.container}
            >
        
                <Image source={require('../../../../assets/songImages/down-arrow.png')}
                    style={styles.icons}
            /> 
            </LinearGradient>
        </Modal>
    )
}

export default SongPlayer;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:20,
        paddingHorizontal:20,
    },
    icons:{
        width:30,
        height:30,
        tintColor:CustomColors.white,
        
    },
})