import React, { useEffect, useState } from "react"
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"
import axios from "axios"
import { config } from "../../../config"
import TrackPlayer, { Capability, State, usePlaybackState, useProgress, } from "react-native-track-player"
import SongPlayer from "../../reusable/components/songPlayer/SongPlayer"

export default Songs = () =>{
    const [songsList, setSongsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const playbackState = usePlaybackState();
    const progress = useProgress();
    // console.log(playbackState)
    const sngs=[{
        id: 'trackId',
        url: 'http://192.168.0.104:8000/audio/1704966200.mp3',
        title: 'Enigama',
        artist: 'eni',
        artwork: require('../../../assets/images/logo.jpg'),
        },{
        id: 'trackIdd',
        url: 'http://192.168.0.104:8000/audio/1704966484.mp3',
        title: 'Inferia',
        artist: 'unknown',
        artwork: require('../../../assets/images/logo.jpg')}];
    useEffect(() =>{
        const fetchSongsData = async() =>{
            try{
                const response = await axios.get(`${config.apiUrl}/songs`);
                setSongsList(response.data.data);
                setupPlayer();
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchSongsData();
    }, [])

    useEffect(() => {
        if(State.Playing == playbackState.state){
            if(progress.position.toFixed(0) == progress.duration.toFixed(0)){
                if(currentIndex<sngs.length){  ///sngs
                    setCurrentIndex(currentIndex+1)
                }   
            }
        }
      }, [progress]);
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
            await TrackPlayer.add(sngs)
        }catch(error){
            console.log(error)
        }
    }

    // console.log(State.Playing)

    return(
        <LinearGradient colors={['#a34c0d', '#592804', '#241001', '#000000']}
            style={styles.container}
        >
            <StatusBar translucent backgroundColor={'transparent'} />
            <Image source={require('../../../assets/songImages/left.png')}
                style={styles.icons}
            /> 
            <View style={styles.upperSmallContainer}>
                <View style={styles.searchContainer}>
                    <Image source={require('../../../assets/songImages/search2.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.searchText}>Find in Playlist</Text>
                </View>

                <View style={styles.sortContainer}>
                    <Text style={styles.sortText}>Sort</Text>
                </View>
            </View>
            <Image source={{uri : `${config.imgUrl}images/psy1.jpg`}}
                    style={styles.songImg}
            />
            <Text style={{fontSize:30,color:'white', fontWeight:'600', marginTop:20}}>
                {sngs[currentIndex].title}
            </Text>
            <View style={styles.spotifyConainer}>
                <Image source={require('../../../assets/songImages/spotify.png')}
                        style={styles.spotifyIcon}
                />
                <Text style={styles.spotifyText}>Calm Music</Text>
            </View>

            <View style={styles.spotifyConainer}>
                <Text style={styles.spotifyText}>20,169 saves</Text>
                <Text style={styles.spotifyText}>4h 26m</Text>
            </View>

            <View style={[styles.spotifyConainer, [styles.spacebetween]]}>
                <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                    <Image source={require('../../../assets/songImages/plus.png')}
                        style={styles.icons}
                    />
                    <Image source={require('../../../assets/songImages/arrow-down.png')}
                        style={styles.icons}
                    />
                    <Image source={require('../../../assets/songImages/option.png')}
                        style={styles.icons}
                    />
                </View>

                <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                    <Image source={require('../../../assets/songImages/shuffle.png')}
                        style={styles.icons}
                    />
                    <TouchableOpacity style={{backgroundColor:'red'}} onPress={async() =>{
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
                        (<Image source={require('../../../assets/songImages/play-button.png')}
                            style={styles.playIcon}
                        />)
                    }
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList data={sngs} renderItem={({item, index}) =>{
                return <TouchableOpacity style={styles.songContainer}
                onPress={async() =>{
                    await TrackPlayer.pause()
                    await TrackPlayer.skip(index);
                    await TrackPlayer.play()
                    setCurrentIndex(index)
                }}>
                           <View style={{flexDirection:'row', gap:10}}>
                                <Image source={{uri : `${config.imgUrl}images/psy1.jpg`}}
                                        style={{width:50, height:50}}
                                /> 
                                <View>
                                    <Text style={{color:'white'}}>{item.title}</Text>
                                    <Text style={{color:'white', fontSize:10}}>{item.artist}</Text>
                                </View>
                                {index == currentIndex && State.Playing == playbackState.state &&(
                                    <Image 
                                        source={require('../../../assets/songImages/playing.png')}
                                        style={{width:18, height:18, tintColor:'white', marginRight:20}}

                                    />
                                )}
                           </View>
                           <Image source={require('../../../assets/songImages/option.png')}
                                style={styles.icons}
                            />
                        </TouchableOpacity>
            }}
            />
            <View style={styles.songProgress}>
                <View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
                    <Image source={require('../../../assets/images/logo.jpg')} style={{height:25, width:25}}/>
                        <View>
                            <Text style={{color:'white'}}>{sngs[currentIndex].title}</Text>
                            <Text style={{color:'white', fontSize:10}}>{sngs[currentIndex].artist}</Text>
                        </View>
                </View>
                <TouchableOpacity onPress={async() =>{
                        if(State.Playing== playbackState.state){
                            await TrackPlayer.pause();
                        }else{
                            await TrackPlayer.skip(currentIndex);
                            await TrackPlayer.play()
                        }
                    }}>
                    <Image source={
                        State.Playing == playbackState.state?
                        require('../../../assets/songImages/pause2.png')
                        : require('../../../assets/songImages/play.png')
                    }
                    style={{width:25, height: 25, tintColor:'white'}}
                />
                </TouchableOpacity>
            </View>
            <SongPlayer />
        </LinearGradient>
    )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:10,
        paddingHorizontal:20,
    },
    icons:{
        width:24,
        height:24,
        tintColor:CustomColors.white
    },
    upperSmallContainer:{
        width:'90%',
        // alignSelf:'center',
        marginTop:10,
        flexDirection:'row',
        gap:5
    },
    searchContainer:{
        width:'90%',
        height:30,
        backgroundColor:'#b06a41',
        borderRadius: 5,
        flexDirection:'row',
        paddingLeft:15,
        alignItems:'center'
    },
    searchText:{
        marginLeft:10,
        color: CustomColors.white
    },
    sortContainer:{
        width:'15%',
        height:30,
        backgroundColor: '#b06a41',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent :'center',
    },
    sortText:{
        fontWeight: '600',
        color: CustomColors.white 
    },
    songImg:{
        width:'80%',
        height:'30%',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 5
    },
    spotifyConainer:{
        flexDirection:'row',
        marginTop: 20,
    },
    spotifyIcon:{
        height:18,
        width:18
    },
    spotifyText:{
        color: CustomColors.white,
        fontSize: 14,
        marginLeft: 10
    },
    spacebetween:{
        justifyContent:'space-between'
    },
    playIcon:{
        height:50,
        width:50
    },
    songContainer:{
        width:'100%', 
        height: 50,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal:20
    },
    songProgress:{
        width:'100%',
        height:40,
        position:'absolute',
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.8)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20,
        
    }
})