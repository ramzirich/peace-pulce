import Video from 'react-native-video';
import { config } from '../../../../config';
import { Image, Platform, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Slider from '@react-native-community/slider';
import Orientation from "react-native-orientation-locker";

export default CustomVideo2 = ({oneVideo, isFirst, isLast}) =>{
    const [clicked, setClicked] = useState(true);
    const [paused, setPaused] = useState(true);
    const [progress, setProgress] = useState(null);
    const [fullScreen,setFullScreen]=useState(false)

    const toggleFullscreen = () => {
        setFullScreen(!fullScreen);
    };
    // console.log(fullScreen)
    const ref = useRef();
    const playInFullscreen = () => {
        if (ref.current) {
            if(fullScreen){
                setFullScreen(false) 
                ref.current.dismissFullscreenPlayer();
            }else{
                setFullScreen(true)
                ref.current.presentFullscreenPlayer();
            }
        }
    };
      
    const format = seconds =>{ 
        let mins = parseInt(seconds/60) 
            .toString()
            .padStart(2, '0');
        let secs = (Math.trunc(seconds) %60).toString().padStart(2,'0');
        return `${mins}:${secs}`
    }
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
                style={fullScreen? styles.fullscreenVideo:[styles.video, vidoStyle]}
                onPress={()=>{
                        setClicked(!clicked)
                }}  
            >
                {paused? 
                    <Image source={{uri:'http://192.168.0.104:8000/images/user.jpg'}} 
                        style={fullScreen? styles.fullscreenVideo:[vidoStyle, styles.video]}/>
                    :<></>
                } 
                <Video 
                    style={fullScreen? styles.fullscreenVideo:[styles.video, vidoStyle]}
                    source={{uri: `${config.imgUrl}videos/${oneVideo.filename}`}}           
                    paused = {paused}
                    onBuffer ={this.onBuffer} 
                    ref={ref}
                    // ref={videoRef}
                    onProgress={(x) =>{
                        setProgress(x)
                        }
                    }                                    
                    poster={'http://192.168.0.104:8000/images/user.jpg'}
                    posterResizeMode={'stretch'}
                    resizeMode="stretch"
                    fullscreenAutorotate
                />

                {clicked && 
                    <>
                        <View style={styles.videoContainer}> 
                            <View  style={[styles.rowFlex, styles.gap]}>
                                <TouchableOpacity
                                    onPress={() =>{
                                        ref.current.seek(parseInt(progress.currentTime)-10)
                                    }} >
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

                                <TouchableOpacity
                                    onPress={() =>{
                                        ref.current.seek(parseInt(progress.currentTime)+10)
                                        }
                                    }
                                >
                                    <Image
                                        source={require('../../../../assets/videosimages/forward.png')}
                                        style={styles.icons} />
                                </TouchableOpacity>
                            </View> 
                        </View>

                        <View style={styles.sizeIconsContainer}>
                             <TouchableOpacity //onPress={() =>{
                                    // if(fullScreen){
                                    //     Orientation.lockToPortrait();
                                    //     playInFullscreen(); 
                                    // }else{
                                    //     Orientation.lockToLandscape();
                                    //     playInFullscreen(); 
                                    // }
                                    // setFullScreen(!fullScreen)
                                  
                                    //     setFullScreen(!fullScreen); */}
                                         onPress={playInFullscreen} 
                                    // }}

                            
                            >
                                <Image
                                    source={fullScreen?require('../../../../assets/videosimages/minimize.png')
                                                        :require('../../../../assets/videosimages/full-size.png')}
                                    style={styles.icons} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.timer}>
                            <Text style={{color:'white'}}>
                                {progress && progress.currentTime && format(progress.currentTime)}
                            </Text>

                            <Slider 
                                style={{width:100, height:20}}
                                minimumValue={0}
                                maximumValue={progress && progress.seekableDuration !== null && progress.seekableDuration}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                                onValueChange={(x) =>{
                                    ref.current.seek(x)
                                }}
                            />

                            <Text style={{color:'white'}}>
                                {progress && progress.seekableDuration && format(progress.seekableDuration)}
                            </Text>
                        </View> 
                    </> 
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
        marginRight:20,
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
    },
    timer:{
        width:'100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 5,
        paddingHorizontal:10,
        alignItems:'center'
    },
    sizeIconsContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 10,
        paddingHorizontal:10,
        alignItems:'center'
    },
    fullscreenVideo: {
        // height:500,
        // width:500
       
        
        width:360,
        height:360
    },
})