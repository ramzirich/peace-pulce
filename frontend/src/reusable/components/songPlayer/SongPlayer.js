import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import  Modal  from "react-native-modal"
import { CustomColors } from "../../../styles/color"
import Slider from "@react-native-community/slider"

const SongPlayer = ({songsList, currentIndex, playbackState, progress, isVisible, onClose}) =>{
    const format = seconds => {
        let mins = parseInt(seconds / 60)
          .toString()
          .padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
      };
    return(
        <Modal isVisible={isVisible} style={{margin:0}}>
            <LinearGradient colors={['#067a02', '#064f03', '#032901', '#000000']}
                style={styles.container}
            >
                <TouchableOpacity onPress={()=> onClose()}>
                    <Image source={require('../../../../assets/songImages/down-arrow.png')}
                        style={styles.icons}
                    />
                </TouchableOpacity>
                
                <Image source={require('../../../../assets/images/logo.jpg')}
                    style={styles.songImg}
                /> 
                <Text style={{fontSize:30,color:'white', fontWeight:'600', marginTop:20}}>
                    {songsList[currentIndex].title}
                </Text>
                <Text style={{fontSize:16,color:'white', fontWeight:'600'}}>
                    {songsList[currentIndex].artist}
                </Text>
                <Slider
                    style={{width: '90%', height: 40, alignSelf: 'center'}}
                    minimumValue={progress.position}
                    maximumValue={progress.duration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#fff"
                />
                <View
                    style={{
                        width: '90%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                    }}>
                    <Text style={{color: 'white'}}>{format(progress.position)}</Text>
                    <Text style={{color: 'white'}}>{format(progress.duration)}</Text>
                </View>
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