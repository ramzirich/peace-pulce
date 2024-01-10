import { Image, ScrollViewBase, Text, TouchableOpacity, View } from "react-native"
import Video from 'react-native-video';
import { config } from "../../../../config";
import { useRef, useState } from "react";
import Slider from "@react-native-community/slider";
import Orientation from "react-native-orientation-locker";
// import Orientation from "react-native-orientation-locker";

export default CustomVideo = ({oneVideo, isFirst, isLast, index}) =>{
    const [clickedVid, setClickedVid] = useState(false);
    const [paused, setPaused] = useState(true)
    const [progress, setProgress] = useState(null)
    const [fullScreen,setFullScreen]=useState(false)
    // const [vidWidth, setVidWdith] = useState(200)
    const ref = useRef();
    const format = seconds =>{ 
        let mins = parseInt(seconds/60)
            .toString()
            .padStart(2, '0');
        let secs = (Math.trunc(seconds) %60).toString().padStart(2,'0');
        return `${mins}:${secs}`
    }
    // const thumbnailImage = require('../../../../assets/images/logo.jpg');
    return(
        <TouchableOpacity style={{ width:fullScreen?'100%':200, height:fullScreen?600:360,
        borderRadius:20,
        borderTopLeftRadius: isFirst?0:20,
        borderBottomLeftRadius: isFirst?0:20,
        borderTopRightRadius: isLast?0:20,
        borderBottomRightRadius: isLast?0:20,
        marginRight: isLast?0:20,
 
        }}
        onPress={() =>{
            setClickedVid(true)
        }}>
            <Video 
                style={{ width:fullScreen?'100%':200, height:fullScreen?600:360,
                borderRadius:20,
                borderTopRightRadius: isLast?0:20,
                borderBottomRightRadius: isLast?0:20,
                borderTopLeftRadius: isFirst?0:20,
                borderBottomLeftRadius: isFirst?0:20,}}  
                key={oneVideo.id}
                paused = {paused}
                source={{uri: `${config.imgUrl}videos/${oneVideo.filename}`}}
                poster={'http://192.168.0.104:8000/images/user.jpg'}
                posterResizeMode={'stretch'}
                ref={ref}
                onProgress = {(x) =>{
                    // console.log(x)
                    setProgress(x)
                }}

                resizeMode="stretch" 
                // poster={thumbnailImage}
            /> 
            {clickedVid && (
                <TouchableOpacity
                style={{
                    width:'100%',
                    height:'100%',
                    position:'absolute',

                    backgroundColor:'rgba(0,0,0,0.3)',
                    
                    borderTopLeftRadius: isFirst?0:20,
                    borderBottomLeftRadius: isFirst?0:20,
                    borderTopRightRadius: isLast?0:20,
                    borderBottomRightRadius: isLast?0:20,
                    borderRadius:20,

                    justifyContent:'center',
                    alignItems:'center'
                }}
                >
                {!clickedVid && <Image style={{width:'100%',
                    height:'100%'}} source={require('../../../../assets/images/logo.jpg')} />} 
                <View style={{flexDirection:"row", gap:25}}>

                    <TouchableOpacity
                        onPress={() =>{
                            ref.current.seek(parseInt(progress.currentTime-10))
                        }}>
                        <Image
                            source={require('../../../../assets/videosimages/backward.png')}
                            style={{width:30, height:30, tintColor:'white'}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            setPaused(!paused)
                        }}>
                        <Image
                            source={paused? require('../../../../assets/videosimages/play-button.png')
                                            :require('../../../../assets/videosimages/pause.png')}
                            style={{width:30, height:30, tintColor:'white'}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>{
                            ref.current.seek(parseInt(progress.currentTime+10))
                        }}>
                        <Image
                            source={require('../../../../assets/videosimages/forward.png')}
                            style={{width:30, height:30, tintColor:'white'}}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width:'100%',
                        flexDirection: 'row',
                        justifyContent:'space-between',
                        position:'absolute',
                        bottom:5,
                        paddingHorizontal:5,
                        alignItems:'center'
                    }}>
                    <Text style={{color:'white'}}>
                        {progress && progress.currentTime !== null ? format(progress.currentTime):''}
                    </Text>  
                    <Slider 
                        style={{width:fullScreen?'90%':100, height:20}}
                        minimumValue={0}
                        maximumValue={progress && progress.seekableDuration !== null ? progress.seekableDuration: 1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        onValueChange={(x) =>{
                            ref.current.seek(x)
                        }}
                    />
                    <Text style={{color:'white'}}>
                        {progress && progress.seekableDuration !== null ? format(progress.seekableDuration):''}
                    </Text>  
                </View>


                <View
                    style={{
                        width:'100%',
                        flexDirection: 'row',
                        justifyContent:'space-between',
                        position:'absolute',
                        top:10,
                        paddingHorizontal:8,
                        alignItems:'center'
                    }}>
                    <TouchableOpacity onPress={() =>{
                        if(fullScreen){
                            Orientation.lockToPortrait();
                        }else{
                            Orientation.lockToLandscape();
                        }
                        setFullScreen(!fullScreen)
                    }}
                    >
                        <Image
                            source={fullScreen?require('../../../../assets/videosimages/minimize.png')
                                :require('../../../../assets/videosimages/full-size.png')}
                            style={{width:24, height:24, tintColor:'white'}}
                        /> 
                    </TouchableOpacity>    
                </View>

                </TouchableOpacity>
            )} 
        </TouchableOpacity>
       
    )
}