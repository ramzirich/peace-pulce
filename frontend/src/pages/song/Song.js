import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../styles/color"
import LinearGradient from "react-native-linear-gradient"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import TrackPlayer, { Capability } from "react-native-track-player"

export default Song = () =>{
    const [songs, setSongs] = useState([])
    const [currentIndex, setCurrentIndex] = useState([])

    const setupPlayer = async() =>{
        try{
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
            await TrackPlayer.add(songs)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() =>{
        const fetchSongData = async() =>{
            try{
                const response = await axios.get(`${config.apiUrl}/songs`);
                responseArray = response.data.data
                const modifiedSongs = responseArray.map(song =>({
                    ...song,
                    url: `${config.imgUrl}${song.url}`
                }));
                setSongs(modifiedSongs);
                setupPlayer()
            }catch(error){
                console.error('Error fetching songs: ', error)
            }
        }
        fetchSongData();
    },[])

    // console.log(songs)

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
                        <TouchableOpacity style={styles.songContainer}>
                            <View>
                                <Image source={require('../../../assets/songImages/music-player.png')}
                                    style={styles.song_player_img} />
                            </View>
                            <View>
                                <Text style={{color:'white'}}>{item.title}</Text>
                                <Text style={{color:'white', fontSize:10}}>{item.artist}</Text>
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