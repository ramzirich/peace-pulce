import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"




const images = [
    'https://cdn.pixabay.com/photo/2017/08/18/16/38/paper-2655579_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/09/15/16/30/autumn-941304_1280.jpg',
    'https://cdn.pixabay.com/photo/2014/12/15/15/36/cloth-569222_1280.jpg'
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Tajroube = () =>{
    const [imgActive, setImgActive] = React.useState(0);

    onchange = (nativeEvent) =>{
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x/ nativeEvent.layoutMeasurement.width);
            if(slide != imgActive){
                setImgActive(slide)
            }
        }
    }

    return(
        <SafeAreaView style= {styles.container}>
        
            <View style={styles.wrap} >
                <ScrollView
                    onScroll={({nativeEvent}) => onchange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    style={styles.wrap}
                >
                {
                    images.map((e, index) =>(
                        <Image
                            key={e}
                            resizeMode="stretch"
                            style={styles.wrap}
                            source={{uri: e}} 
                        />
                    ))
                }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Tajroube;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center"
    },
    wrap:{
        width:200 ,
        height:HEIGHT *0.25
    },
    scrollView: {
        flex: 1,
      },
      scrollContent: {
        alignItems: 'center',
      },
      imageContainer: {
        width: 360, // Adjusted width to leave 25 on each side
        marginHorizontal: 25,
        height: HEIGHT * 0.25,
        justifyContent: 'center',
      },
      image: {
        width: '100%',
        height: '100%',
      },
})
