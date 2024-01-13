import React from "react"
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native"
import { sliderImages } from "../../../utils/sliderImages/sliderImages";


const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.8;
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

// const renderImage = (item) => {
//     const imageSource = require(`../../../../assets/images/${item.url}`);
//     return (
//       <View>
//         <Image source={imageSource} style={{ height: 340, width: 200 }} />
//       </View>
//     );
//   };

export default homeSwipper= () =>{
    return(
        <View style={{flex:1, marginTop:20}}>
            <FlatList data={sliderImages}
                horizontal
                keyExtractor={(item)=>item.id}
                renderItem={({item, index})=>{
                    return (
                    <View style={[styles.card, {
                                        marginLeft: index == 0 ? SIDECARD_LENGTH : SPACING,
                                        marginRight: index == sliderImages.length-1 ? SIDECARD_LENGTH : SPACING
                                    }
                                ]}>
                        <Image source={item.url} style={{height:'100%', width:'100%'}}/>
                    </View>
                    )
                }}
            />
        </View>
    )    
}

const styles = StyleSheet.create({
    card:{
        width: CARD_LENGTH,
        height:340,
        overflow:'hidden',
    }
})
