import React, { useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import  Modal  from "react-native-modal"
import { CustomColors } from "../../../styles/color"
import Slider from "@react-native-community/slider"
import TrackPlayer, { State } from "react-native-track-player"

const SongPlayer = ({songsList, currentIndex, playbackState, progress, isVisible, onClose, onChange}) =>{
    // console.log(songsList[currentIndex])
    const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex)
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
                    {songsList[currentIndex] && songsList[currentIndex].title}
                </Text>
                <Text style={{fontSize:16,color:'white', fontWeight:'600'}}>
                    {songsList[currentIndex] && songsList[currentIndex].artist}
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


                <View
                    style={{
                        width: '100%',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 30,
                    }}
                >
                    <TouchableOpacity onPress={async()=>{
                        if(currentSongIndex>0){
                            await TrackPlayer.skip(currentSongIndex - 1);
                            await TrackPlayer.play();
                            setCurrentSongIndex(currentSongIndex - 1);
                            onChange(currentSongIndex-1)
                        }
                        }}
                    >
                        <Image
                            source={require('../../../../assets/songImages/previous.png')}
                            style={{width: 35, height: 35, tintColor: 'white'}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                        onPress={async() => {
                        if (State.Playing == playbackState.state) {
                            await TrackPlayer.pause();
                        } else {
                            await TrackPlayer.skip(currentIndex);
                            await TrackPlayer.play();
                        }
                        }}>
                        <Image
                        source={
                            State.Playing == playbackState.state
                            ? require('../../../../assets/songImages/pause2.png')
                            : require('../../../../assets/songImages/play.png')
                        }
                        style={{width: 30, height: 30}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            if(currentSongIndex<songsList.length){
                                await TrackPlayer.skip(currentSongIndex + 1);
                                await TrackPlayer.play();
                                setCurrentSongIndex(currentSongIndex + 1);
                                onChange(currentSongIndex+1)
                            }
                        }}>
                        <Image
                        source={require('../../../../assets/songImages/next.png')}
                        style={{width: 35, height: 35, tintColor: 'white'}}
                        />
                    </TouchableOpacity>
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