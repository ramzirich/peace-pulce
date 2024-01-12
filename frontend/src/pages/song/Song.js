import { Image, StyleSheet, View } from "react-native"
import { CustomColors } from "../../styles/color"
import LinearGradient from "react-native-linear-gradient"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"

export default Song = () =>{
    const [songs, setSongs] = useState([])

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
            }catch(error){
                console.error('Error fetching songs: ', error)
            }
        }
        fetchSongData();
    },[])

    console.log(songs)

    return(
        <LinearGradient style={styles.bigcontainer}
            colors={['#8962f3', '#4752e2', '#214ae2']}
        >
        <Image style={styles.img_container}
                source={require('../../../assets/images/logo.jpg')}
        />

        <View style={styles.small_container}>

        </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bigcontainer:{
        flex:1,
        backgroundColor: CustomColors.purple
    },
    img_container:{
        height: "40%",
        width:'100%',
    },
    small_container:{
        padding:20,
    }
})