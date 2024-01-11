import React, { useEffect, useState } from "react"
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"
import axios from "axios"
import { config } from "../../../config"

export default Songs = () =>{
    const [songsList, setSongsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() =>{
        const fetchSongsData = async() =>{
            try{
                const response = await axios.get(`${config.apiUrl}/songs`);
                setSongsList(response.data.data);
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchSongsData();
    }, [])

    // console.log(songsList)

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
                    <TouchableOpacity>
                    <Image source={require('../../../assets/songImages/play-button.png')}
                        style={styles.playIcon}
                    />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList data={songsList} renderItem={({item, index}) =>{
                return <TouchableOpacity style={styles.songContainer}>
                           <View style={{flexDirection:'row', gap:10}}>
                                <Image source={{uri : `${config.imgUrl}images/psy1.jpg`}}
                                        style={{width:50, height:50}}
                                /> 
                                <View>
                                    <Text style={{color:'white'}}>{item.title}</Text>
                                    <Text style={{color:'white', fontSize:10}}>{item.artist}</Text>
                                </View>
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