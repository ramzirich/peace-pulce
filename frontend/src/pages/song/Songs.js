import React, { useEffect, useState } from "react"
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"
import axios from "axios"
import { config } from "../../../config"
import TrackPlayer, { Capability, State, usePlaybackState, useProgress, } from "react-native-track-player"

export default Songs = () =>{
    const [songsList, setSongsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const playbackState = usePlaybackState();
    // console.log(playbackState)
    const sngs=[{
        id: 'trackId',
        url: 'http://192.168.0.104:8000/audio/1704966200.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
        artwork: require('../../../assets/images/logo.jpg'),
        },{
        id: 'trackIdd',
        url: 'http://192.168.0.104:8000/audio/1704966484.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
        artwork: require('../../../assets/images/logo.jpg')}];
    useEffect(() =>{
        const fetchSongsData = async() =>{
            try{
                const response = await axios.get(`${config.apiUrl}/songs`);
                setSongsList(response.data.data);
                // setupPlayer();
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchSongsData();
    }, [])

    useEffect(() => {
        setupPlayer();
      }, []);
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
                onPress={() =>{
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
        </LinearGradient>
    )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:30,
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
        marginTop:20,
        flexDirection:'row',
        gap:5
    },
    searchContainer:{
        width:'90%',
        height:40,
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
        height:40,
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
        height:'35%',
        alignSelf: 'center',
        marginTop: 20,
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
    }
})