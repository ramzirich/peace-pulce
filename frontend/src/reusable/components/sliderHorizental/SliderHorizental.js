
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';

const ListItem = ({ item, isFirst, isLast }) => {
  return (
    <View style={[
        styles.item,      
    ]}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={[styles.itemPhoto,
                isFirst && styles.borderItem,
                isLast && styles.LastItem]}
        resizeMode="cover"
      />
    </View>
  );
};

export const SliderHorizental =  () => {
  return (
    <View style={styles.container}>
      <SafeAreaView >
      <FlatList
        horizontal
        data={SECTIONS[0].data}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => 
            <ListItem item={item} 
                       isFirst={index==0}
                       isLast ={index==SECTIONS[0].data.length-1} 
            />}
        showsHorizontalScrollIndicator={false} 
      />
      </SafeAreaView>
    </View>
  );
};

const SECTIONS = [
  {
    title: 'Made for you',
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },

];

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