import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../styles/color"
import LinearGradient from "react-native-linear-gradient"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import TrackPlayer, { Capability, usePlaybackState, State, useProgress } from "react-native-track-player"
import MusicPlayer from "../../reusable/components/songPlayer/MusicPlayer"

export default Song = () =>{
    const [songs, setSongs] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(false);
    const playbackState = usePlaybackState();
    const progress = useProgress();
    // console.log(playbackState)

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
    
    useEffect(() => {
    if(State.Playing == playbackState.state){
        if(progress.position.toFixed(0) == progress.duration.toFixed(0)){
            if(currentIndex<songs.length){  
                // console.log(currentIndex) 
                setCurrentIndex(currentIndex+1)
                // console.log('aff',currentIndex) 
            }   
        }
    }
    }, [progress]);
    // console.log(progress)
    // console.log(currentIndex)
    // console.log('song', isVisible)

    return(
        <LinearGradient style={styles.bigcontainer}
            colors={['#8962f3', '#4752e2', '#214ae2']}
        >
            <Image style={styles.img_container}
                    source={require('../../../assets/images/logo.jpg')}
            />

            <View style={styles.title_container}>
                <Text style={styles.title}>
                    {songs && songs[currentIndex] && songs[currentIndex].title}
                </Text>
                <TouchableOpacity  onPress={async() =>{
                    if(State.Playing== playbackState.state){
                        await TrackPlayer.pause(); 
                    }else{
                        await TrackPlayer.skip(currentIndex);
                        await TrackPlayer.play()
                    }
                }}>
                    {State.Playing==playbackState.state ?(
                        <Image source={require('../../../assets/songImages/pause.png')}
                            style={styles.playIcon}
                        />) : 
                        (<Image source={require('../../../assets/songImages/playpng.png')}
                            style={styles.playIcon}
                        />)
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.small_container}>
                <FlatList data={songs} 
                    showsVerticalScrollIndicator = {false}
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
                                <View style={styles.song_details_container}>
                                    <View style={styles.song_profile}>
                                        <View style={styles.img_view}>
                                        <Image source={require('../../../assets/songImages/music-player.png')}
                                            style={styles.song_player_img} />
                                        </View>       
                                        <View>
                                            <Text style={{color:'white'}}>
                                                {item && item.title}
                                            </Text>
                                            <Text style={{color:'white', fontSize:10}}>{item.artist}</Text>
                                        </View>
                                    </View>
                                    
                                    <View>
                                        {index == currentIndex && State.Playing == playbackState.state &&(
                                            <Image 
                                                source={require('../../../assets/songImages/playing.png')}
                                                style={[styles.icons, styles.end]}
                                            />
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

            <TouchableOpacity style={styles.song_bottom_container}
            activeOpacity={1}
                onPress={() =>{
                    setIsVisible(true)
                }}
            >
                <View style={styles.row_ten}>
                    <Image style={styles.img_bottom} source={require('../../../assets/songImages/music-player.png')}/>
                    <View>
                        <Text style={{color:'white'}}>
                            {songs && songs[currentIndex] && songs[currentIndex].title}
                        </Text>
                        <Text style={{color:'white', fontSize:10}}>
                            {songs && songs[currentIndex] && songs[currentIndex].artist}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={async() =>{
                        if(State.Playing== playbackState.state){
                            await TrackPlayer.pause();
                        }else{
                            // await TrackPlayer.skip(currentIndex);
                            await TrackPlayer.play()
                        }
                    }}>
                    <Image source={
                        State.Playing == playbackState.state?
                        require('../../../assets/songImages/pause2.png')
                        : require('../../../assets/songImages/play.png')
                    }
                    style={styles.icons_bottom}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
            {isVisible==true && 
                <MusicPlayer 
                    songs={songs}
                    currentIndex={currentIndex} 
                    playbackState = {playbackState}
                    progress = {progress}
                    isVisible={isVisible}
                    onClose={()=>{
                        setIsVisible(false)
                    }}
                    onChange={(x)=>{
                        // console.log("x",x)
                        setCurrentIndex(x)
                    }}
                />
            }
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bigcontainer:{
        flex:1,
        backgroundColor: CustomColors.purple,
    },
    img_container:{
        height: "30%",
        width:'100%',
    },
    title_container:{
        paddingHorizontal:20,
        paddingTop: 20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color: CustomColors.white 
    },
    playIcon:{
        height:45,
        width:45,
        tintColor: CustomColors.white,
        // tintColor: "#a906f9",
        // tintColor:'#8705c7',
        // tintColor: '#e87cf6'
        // tintColor: '#e77df4'
    },
    small_container:{
        flex:1,
        padding:20,
        paddingBottom: 58
    },
    songContainer:{
        width:'100%', 
        height: 70,
        padding:20,
        // backgroundColor: '#8b62e9',
        borderRadius: 20,
        marginBottom:10,
        borderWidth: 1,
        borderColor: '#8b62e9',
        paddingBottom:40
    },
    song_details_container:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    song_profile:{
        flexDirection:'row',
        gap: 5,
    },
    img_view:{
        flexDirection:'column',
        justifyContent:'center',
    },
    song_player_img:{
        width:50,
        height:50,
        borderRadius: 25,     
    },
    icons:{
        width:18, 
        height:18, 
        tintColor: CustomColors.white,
    },
    end:{
        alignSelf:'flex-end'
    },
    song_bottom_container:{
        width:'100%',
        height:60,
        position:'absolute',
        bottom:0,
        backgroundColor:'#4752e2',
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingRight:20
    },
    row_ten:{
        flexDirection:'row',
        gap:10,
        alignItems: 'center'
    },
    img_bottom:{
        width:60,
        height: 60,
        borderTopLeftRadius: 30,
    },
    icons_bottom:{
        width:25, 
        height: 25, 
        tintColor:'white'
    },
})