import React from "react"
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"
import LinearGradient from "react-native-linear-gradient"
import Slider from "@react-native-community/slider"

export default MusicPlayer = ({songs, currentIndex, playbackState, progress}) =>{
    return(
        <Modal isVisible>
            <LinearGradient style={styles.bigcontainer}
            colors={['#8962f3', '#4752e2', '#214ae2']}
            >
                <TouchableOpacity style={styles.arrow_container}>
                    <Image source={require('../../../../assets/songImages/down-arrow.png')}
                        style={styles.icons}
                    />
                </TouchableOpacity>

                <Image source={require('../../../../assets/songImages/music-player.png')}
                    style={styles.song_player_img}     
                />

                <View style={styles.title_container}>
                    <Text style={styles.title}>
                        {songs && songs[currentIndex] && songs[currentIndex].title}
                    </Text>
                    <Text style={[styles.title, styles.artist]}>
                        {songs && songs[currentIndex] && songs[currentIndex].artist}
                    </Text>
                </View>

                <Slider
                    style={{width: '90%', height: 40, alignSelf: 'center'}}
                    minimumValue={progress.position}
                    maximumValue={progress.duration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#fff"
                />
                
            </LinearGradient>

        </Modal>
    )
}

const styles = StyleSheet.create({
    bigcontainer:{
        flex:1,
    },
    arrow_container:{
        paddingTop : 30,
        paddingHorizontal:25
    },
    icons:{
        width:40,
        height:40,
        tintColor:CustomColors.white,     
    },
    song_player_img:{
        width:'80%',
        height: '50%',
        alignSelf:'center',
        marginTop:30,
        borderRadius: 20
    },
    title_container:{
        paddingHorizontal:'10%',
        paddingVertical: 20
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color: CustomColors.white,
    },
    artist:{
        fontSize:16,
        marginTop:5
    },
})