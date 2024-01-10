
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import CustomVideo from '../video/CustomVideo'; 
import { CustomColors } from '../../../styles/color';

const ListItem = ({ item, isFirst, isLast }) => {
  return (
      <CustomVideo oneVideo={item} isFirst={isFirst} isLast={isLast} /> 
  );
};

export const SliderHorizental =  ({videos}) => {
  const [videoIndex, setVideoIndex] = useState(0)
  // console.log(videos[videoIndex].duration)
  // console.log(videos);
  console.log(videoIndex)
  return (
    <View style={styles.container}>
      <SafeAreaView >
      <FlatList
        // pagingEnabled ////
        onScroll={e =>{
          const x = e.nativeEvent.contentOffset.x;
          setVideoIndex((x/200).toFixed(0))
        }}
        horizontal
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => 
            <CustomVideo2 oneVideo={item}
                       isFirst={index==0}
                       isLast ={index==videos.length-1}                  
            />}
        showsHorizontalScrollIndicator={false} 
      />
       <View style={styles.videoLength}>
      {videos[videoIndex] && <Text style={{color:'red'}}> {videos[videoIndex].duration} </Text> } 
      </View>
      </SafeAreaView>
      {/* {videos[0] && <Video 
                style={{ width:200, height:360,
                borderRadius:20}}
                mute
                source={{uri: `${config.imgUrl}videos/${videos[0].filename}`}}/>} */}
    </View>
  );
}; 

import Video from 'react-native-video';
import { config } from '../../../../config';
import CustomVideo2 from '../video/CustomVideo2';
const styles = StyleSheet.create({
  container: {
    marginTop:20
  },
  item: {
    // marginRight: 20,
    // marginLeft: 0
  },
  itemPhoto: {
    width: 200,
    height: 340,
    borderRadius:20,
    marginRight: 20,
    marginLeft: 0
  },
  borderItem:{
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  LastItem:{
    marginRight:-20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  videoLength:{
    width:100,
    height:100,
    borderRadius: 50,
    marginTop: 20,
    backgroundColor: CustomColors.black,
    alignSelf: "center"
  }
});



// const [videoData, setVideoData] = useState([]);

//   useEffect(() => {
//     const fetchVideoData = async () => {
//       try {
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${SECTIONS[0].data.map(
//             (item) => item.id
//           ).join(',')}&key=YOUR_YOUTUBE_API_KEY`
//         );
//         const result = await response.json();
//         const itemsWithThumbnails = SECTIONS[0].data.map((item, index) => ({
//           ...item,
//           thumbnail: result.items[index]?.snippet?.thumbnails?.medium?.url || '',
//         }));
//         setVideoData(itemsWithThumbnails);
//       } catch (error) {
//         console.error('Error fetching video data:', error);
//       }
//     };

//     fetchVideoData();
//   }, []);