import {View, Text, FlatList, Dimensions, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useState} from 'react';


const {height, width} = Dimensions.get('window');

export  const Tajroube2= () =>{
  const [data, SetData] = useState([1, 1, 1, 1, 1]);
  const [currentIndex, setCurrentIndex] = useState(0);
//   console.log(currentIndex)
  return (
   
   
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        //   onScroll={e => {
        //     const x = e.nativeEvent.contentOffset.x;
        //     setCurrentIndex((x / width).toFixed(0));
            
        //   }}
          horizontal
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: width - 130,
                  height: height,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:'blue'
                }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    width: 200,
                    height: 360,
                    backgroundColor: 'green',
                    borderRadius: 20,
                  }}></TouchableOpacity>
              </View>
            );
          }}
        />
    </View>
  );
}