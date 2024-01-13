import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { config } from "../../../config";

export default VideoPlayer = () =>{
    const [videos, setVideos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null)
    useEffect(()=>{
        const fetchVideoData = async() =>{
            try{
                const response = await axios.get(`${config.apiUrl}/videos`);
                setVideos(response.data.data);
            }catch(error){
                console.error("Error fetch videos: ", error)
            }
        }
        fetchVideoData()
    },[])
    console.log(videos)
    console.log(currentIndex)
    return(
            <LinearGradient style={styles.bigcontainer}
                colors={['#214ae2', '#4752e2','#8962f3']}
            >
                {currentIndex && 
                    <View style={{height:'50%', width:'100%'}}></View>
                }
                <FlatList data={videos}
                    // style={{flex:1}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index})=>{
                        return (
                            <TouchableOpacity 
                                style={styles.small_container}
                                onPress={() =>{
                                    setCurrentIndex(index)
                                }}    
                            >

                            </TouchableOpacity>
                        )
                    }}
                />
            </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bigcontainer:{
        flex:1
    },
    small_container:{
        height:70,
        width:'100%',
        borderBottomWidth: 1,
        borderColor: '#8b62e9',
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:'red'
    }
})