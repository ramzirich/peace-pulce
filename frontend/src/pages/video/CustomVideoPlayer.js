import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { config } from "../../../config";
import CustomVideo3 from "../../reusable/components/video/CustomVideo3";

export default CustomVideoPlayer = () =>{
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
   
    return(
            <LinearGradient style={styles.bigcontainer}
                colors={['#214ae2', '#4752e2','#8962f3']}
            >
                {currentIndex == null &&
                    <Image source={require('../../../assets/images/logo22.png')}
                        style={{height:300, width:'100%'}}
                    />
                }
                {currentIndex!=null && 
                    <CustomVideo3 video={videos[currentIndex]}/>
                }
                <FlatList data={videos}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index})=>{
                        return (
                            <TouchableOpacity 
                                style={styles.small_container}
                                onPress={() =>{
                                    setCurrentIndex(index)
                                }}    
                            >
                                <View>
                                    <Image style={styles.img}
                                        source={{uri : `${config.imgUrl}${item.poster}`}} />
                                </View>
                                <View>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
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
        borderTopWidth: 1,
        borderColor: '#8b62e9',
        paddingHorizontal:20,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    img:{
        height:50,
        width:50,
        borderRadius:5
    },
    title:{
        color:'white'
    },
})