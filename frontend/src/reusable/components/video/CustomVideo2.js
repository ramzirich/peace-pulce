import Video from 'react-native-video';
import { config } from '../../../../config';
import { Image, Platform, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

export default CustomVideo2 = ({oneVideo, isFirst, isLast}) =>{
    const [clicked, setClicked] = useState(true);
    const [paused, setPaused] = useState(true);
    console.log(clicked)
    const vidoStyle ={
        borderTopRightRadius: isLast?0:20,
        borderBottomRightRadius: isLast?0:20,
        borderTopLeftRadius: isFirst?0:20,
        borderBottomLeftRadius: isFirst?0:20,
        marginRight: isLast?0:20,
        // backgroundColor: paused?'red':''
    }
    return(
        <>
            <TouchableOpacity
                style={[styles.video, vidoStyle]}
                onPress={()=>{
                        setClicked(!clicked)
                }}  
            >
                {paused? 
                    <Image source={{uri:'http://192.168.0.104:8000/images/user.jpg'}} 
                        style={[vidoStyle, styles.video]}/>
                    :<></>
                }
                <Video 
                    style={[styles.video, vidoStyle]}
                    source={{uri: `${config.imgUrl}videos/${oneVideo.filename}`}}           
                    paused = {paused} 
                    ref={(ref) => {
                        this.player = ref  
                    }}                                    
                    poster={'http://192.168.0.104:8000/images/user.jpg'}
                    posterResizeMode={'stretch'}
                    resizeMode="stretch"
                />

                {clicked && 
                     <View style={styles.videoContainer}> 
                         <View  style={[styles.rowFlex, styles.gap]}>
                            <TouchableOpacity>
                                <Image
                                    source={require('../../../../assets/videosimages/backward.png')}
                                    style={styles.icons} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() =>{
                                    setPaused(!paused)
                                }}
                                >
                                <Image
                                    source={paused? require('../../../../assets/videosimages/play-button.png')
                                                    :require('../../../../assets/videosimages/pause.png')}
                                    style={styles.icons} />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image
                                    source={require('../../../../assets/videosimages/forward.png')}
                                    style={styles.icons} />
                            </TouchableOpacity>
                        </View> 
                        
                     </View>  
                } 
            </TouchableOpacity>   
        </>
    )
}

const styles = StyleSheet.create({
    video:{
        height:360,
        width:200,
        borderRadius:20,
        marginRight:20
    },
    videoContainer:{
        width:'100%',
        height:'100%',
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'rgba(0,0,0,0.3)',
    },
    rowFlex:{
        flexDirection:'row',
    },
    icons:{
        width:30, 
        height:30, 
        tintColor:'white'
    },
    gap:{
        gap:25
    }
})