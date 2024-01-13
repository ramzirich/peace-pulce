import React from "react"
import { Dimensions, FlatList, Image, View } from "react-native"
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
        <View style={{flex:1}}>
            <FlatList data={sliderImages}
                keyExtractor={(item)=>item.id}
                renderItem={({item, index})=>{
                    return (
                    <View>
                        <Image source={item.url} style={{height:340, width:200}}/>
                    </View>
                    )
                }}
            />
        </View>
    )    
}