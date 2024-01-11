import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import  Modal  from "react-native-modal"
import { CustomColors } from "../../../styles/color"

const SongPlayer = ({songsList, currentIndex, playbackState, progress}) =>{
    return(
        <Modal isVisible style={{margin:0}}>
            <LinearGradient colors={['#067a02', '#064f03', '#032901', '#000000']}
                style={styles.container}
            >
        
                <Image source={require('../../../../assets/songImages/down-arrow.png')}
                    style={styles.icons}
                />
                <Image source={require('../../../../assets/images/logo.jpg')}
                    style={styles.songImg}
                /> 
                <Text style={{fontSize:30,color:'white', fontWeight:'600', marginTop:20}}>
                    {songsList[currentIndex].title}
                </Text>
                <Text style={{fontSize:16,color:'white', fontWeight:'600'}}>
                    {songsList[currentIndex].artist}
                </Text>
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
    songImg:{
        width:'80%',
        height:'30%',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 5
    },
})