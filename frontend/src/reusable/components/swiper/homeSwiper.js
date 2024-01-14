// import React from "react"
// import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
// import Carousel from 'react-native-snap-carousel'; 
// import { sliderImages } from "../../../utils/sliderImages/sliderImages";

// export default HomeSwiper = () =>{
//     const {width:screenWidth} = Dimensions.get('window')
//     const sliderWidth = screenWidth
//     const itemWidth = screenWidth*8

//     const renderItem = ({item}) =>{
//         <View style={styles.itemContainer}>
//             <Image source={item.url} style={styles.imgItem}/>
//             <Text>hiii i am ramzo the coder</Text>
//         </View>
//     }

//     return(
//         <View style={{flex:1, backgroundColor:'green'}}>
//             <Carousel
//         style={{flex:1, backgroundColor:'black'}}
//             Layout='default'
//             data={sliderImages}
//             renderItem={renderItem}
//             sliderWidth={sliderWidth}
//             itemWidth={itemWidth}
//     />
//         </View>
        
//     )
// }

// styles=StyleSheet.create({
//     big_container:{
//         marginTop:20,
//         borderRadius:8,
//         justifyContent:'center',
//         height:340,
//         backgroundColor:'white'
//     },
//     imgItem:{
//         width:150,
//         height:200,

//     }
// })