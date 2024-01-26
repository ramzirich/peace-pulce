import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import Video from "react-native-video"
import { config } from "../../../../config"
import { CustomColors } from "../../../styles/color"
import { useEffect, useRef, useState } from "react"
import Slider from "@react-native-community/slider"
import Orientation from "react-native-orientation-locker";

export default  CustomVideo3 = ({video}) =>{
    const [clicked, setClicked] = useState(false) 
    const [paused, setPaused] = useState(false)
    const [progress, setProgress] = useState(null)
    const [sliderValue, setSliderValue] = useState(null);
    const [fullScreen,setFullScreen]=useState(false)
    const format = seconds =>{ 
        let mins = parseInt(seconds/60) 
            .toString()
            .padStart(2, '0');
        let secs = (Math.trunc(seconds) %60).toString().padStart(2,'0');
        return `${mins}:${secs}`
    }
    useEffect(() => {
        if(progress){
            setSliderValue(progress.currentTime);
        }
    }, [progress]);  
    const ref=useRef();
    return(
        <>
            <TouchableOpacity style={[styles.big_container,{height:fullScreen?'100%':'45%'}]}
                activeOpacity={1}
                onPress={() =>{
                    setClicked(!clicked)
                }}
            >
                <Video style={styles.video} 
                        source={{uri : `${config.imgUrl}videos/${video.filename}`}}
                        paused={paused}
                        muted
                        ref={ref}
                        onProgress={(x) =>{
                            // console.log(x)
                            setProgress(x)
                        }}
                        poster={`${config.imgUrl}${video.poster}`}
                        posterResizeMode={'stretch'}
                        resizeMode="stretch"
                />
                {clicked && (
                    <View style={styles.video_container}>
                        <TouchableOpacity 
                                onPress={() =>{
                                    if(fullScreen){
                                        Orientation.lockToPortrait();
                                    }else{
                                        Orientation.lockToLandscape();
                                    }
                                    setFullScreen(!fullScreen)
                                }}
                            style={styles.maxmin}>
                            {!fullScreen &&
                            <Image source={require('../../../../assets/videosimages/full-size.png')}
                                style={styles.icons}
                            />
                            }
                            {!fullScreen &&
                            <Image source={require('../../../../assets/videosimages/full-size.png')}
                                style={styles.icons}
                            />
                            }
                        </TouchableOpacity>
                        <View style={styles.row}>

                            <TouchableOpacity 
                                onPress={() =>{
                                    ref.current.seek(parseInt(progress.currentTime)-10)
                                }}
                            >
                                <Image style={styles.icons}
                                    source={require('../../../../assets/videosimages/backward.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>{
                                    setPaused(!paused)
                                }}
                            >
                                <Image style={styles.icons}
                                    source={paused
                                        ?require('../../../../assets/videosimages/play-button.png')
                                        :require('../../../../assets/videosimages/pause.png')
                                    }/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>{
                                    ref.current.seek(parseInt(progress.currentTime)+10)
                                }}    
                            >
                                <Image style={styles.icons}
                                    source={require('../../../../assets/videosimages/forward.png')}/>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.timer}>

                            <Text style={{color:'white'}}>
                                {progress && progress.currentTime && format(progress.currentTime)}
                            </Text>
                            <Slider 
                                style={{width:'80%', height:20}}
                                minimumValue={0}
                                maximumValue={progress && progress.seekableDuration !== null && progress.seekableDuration}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                                value={sliderValue}
                                onValueChange={(x) =>{
                                    ref.current.seek(x)
                                }}
                            />
                            <Text style={{color:'white'}}>
                                {progress && progress.seekableDuration && format(progress.seekableDuration)}
                            </Text>

                        </View> 
                    </View>
                )}
            </TouchableOpacity>
            <Text style={styles.title}>{video.title}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    big_container:{
        // height:'45%',
        width:'100%'
    },
    video:{
        width:'100%',
        height:'100%'
    },
    video_container:{
        height:'100%',
        width:'100%',
        position:'absolute',
        justifyContent:'center',
        alignItems:'center'
    },
    maxmin:{
        position:'absolute',
        top:20,
        left:20
    },
    title:{
        fontSize:26,
        fontWeight:'bold',
        color: CustomColors.white,
        margin: 20
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:'100%'
        
    },
    icons:{
        height:30,
        width:30,
        tintColor: CustomColors.white,
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
})