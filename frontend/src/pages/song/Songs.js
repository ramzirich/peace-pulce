import React, { useEffect, useState } from "react"
import { Image, StatusBar, StyleSheet, Text, View } from "react-native"
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

    console.log(songsList)

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
        backgroundColor:'#704830',
        borderRadius: 3,
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
        backgroundColor: '#704830',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent :'center',
    },
    sortText:{
        fontWeight: '600',
        color: CustomColors.white 
    },
    songImg:{
        width:'70%',
        height:'35%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 5
    }
})