import React, { useState } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"


export default homeCard = ({item, index, listCount}) =>{
    const [isImage, setIsImage] = useState(true)
    console.log(item)
          function flip(){
            setIsImage(!isImage)
            console.log(index, isImage)
          }
    return(
        <TouchableOpacity onPress={flip}>
        {isImage ?
            <Image
            source={item.url}
            style={[styles.img,
                    {
                        borderTopRightRadius: index==listCount?0:20,
                        borderBottomRightRadius: index==listCount?0:20,
                        borderTopLeftRadius: index==0?0:20,
                        borderBottomLeftRadius: index==0?0:20,
                        marginRight: index==listCount?0:20
                    }
                ]}
            />
            :<View 
                style={[styles.img,
                        {
                            borderTopRightRadius: index==listCount?0:20,
                            borderBottomRightRadius: index==listCount?0:20,
                            borderTopLeftRadius: index==0?0:20,
                            borderBottomLeftRadius: index==0?0:20,
                            marginRight: index==listCount?0:20,
                            backgroundColor:'white'
                        }
                    ]}
            ></View>
        }

      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    img:{
        height:340,
        width:200
    }
})