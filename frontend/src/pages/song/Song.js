import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../styles/color"
import LinearGradient from "react-native-linear-gradient"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import TrackPlayer, { Capability, usePlaybackState, State, useProgress } from "react-native-track-player"

export default Song = () =>{
    const [songs, setSongs] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const playbackState = usePlaybackState();
    const progress = useProgress();
    console.log(playbackState)

    const setupPlayer = async() =>{
        try{
            if(songs.length != 0){
                await TrackPlayer.setupPlayer()
                await TrackPlayer.updateOptions({
                    capabilities: [ 
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                    ],
                compactCapabilities: [Capability.Play, Capability.Pause],
              });
              console.log(songs);
                await TrackPlayer.add(songs)
            }
        }catch(error){
            
            console.log(error)
        }
    }

    useEffect(() =>{
        const fetchSongData = async() =>{
            try{
                const response = await axios.get(`${config.apiUrl}/songs`);
                responseArray = response.data.data
                const modifiedSongs = responseArray.map(song =>{
                    const { created_at, updated_at, ...rest } = song
                        return{
                    ...rest,
                    id: song.id.toString(),
                    url: `${config.imgUrl}audio/${song.url}`,
                    artwork: `${config.imgUrl}${song.artwork}`,
                    }
                });
                setSongs(modifiedSongs);
                setupPlayer()
            }catch(error){
                console.error('Error fetching songs: ', error)
            }
        }
        fetchSongData();
    },[]) 

    useEffect(() => {
        setupPlayer();
      }, [songs]);

    return(
        <LinearGradient style={styles.bigcontainer}
            colors={['#8962f3', '#4752e2', '#214ae2']}
        >
        <Image style={styles.img_container}
                source={require('../../../assets/images/logo.jpg')}
        />

        <View style={styles.small_container}>
            <FlatList data={songs} 
                renderItem={({item, index}) =>{
                    return(
                        <TouchableOpacity 
                            onPress={async() =>{
                                await TrackPlayer.pause()
                                await TrackPlayer.skip(index);
                                await TrackPlayer.play()
                                setCurrentIndex(index)
                            }}
                            style={styles.songContainer}>
                            <View>
                                <Image source={require('../../../assets/songImages/music-player.png')}
                                    style={styles.song_player_img} />
                            </View>
                            <View>
                                <Text style={{color:'white'}}>{item.title}</Text>
                                <Text style={{color:'white', fontSize:10}}>{item.artist}</Text>
                            </View>
                            <View>
                                {index == currentIndex && State.Playing == playbackState.state &&(
                                    <Image 
                                        source={require('../../../assets/songImages/playing.png')}
                                        style={styles.icons}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    )
                }}

            />
        </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bigcontainer:{
        flex:1,
        backgroundColor: CustomColors.purple,
    },
    img_container:{
        height: "40%",
        width:'100%',
    },
    small_container:{
        flex:1,
        padding:20,
    },
    songContainer:{
        width:'100%', 
        height: 70,
        flexDirection:'row',
        gap:5,
        alignItems: 'center',
        padding:20,
        // backgroundColor: '#8b62e9',
        borderRadius: 20,
        marginBottom:10,
        borderWidth: 1,
        borderColor: '#8b62e9'
    },
    song_player_img:{
        width:50,
        height:50,
        borderRadius: 25
    },
    icons:{
        width:18, 
        height:18, 
        tintColor: CustomColors.white,
    }
})