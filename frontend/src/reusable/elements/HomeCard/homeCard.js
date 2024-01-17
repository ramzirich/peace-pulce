import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { config } from "../../../../config"
import { CustomButton } from "../Button/CustomButton"
import { CustomColors } from "../../../styles/color"


export default homeCard = ({item, index, listCount}) =>{
    const [isImage, setIsImage] = useState(true)
    const [displayedText, setDisplayedText] = useState('');
    // console.log('isImage', isImage) 
  useEffect(() => {
    if (!isImage) {
        // setDisplayedText('');
        animateText();     
    }
    if(isImage && displayedText.length == item.text.length ){
        setDisplayedText('')
    }
  }, [isImage]);

  const flip = () => {
    setIsImage(!isImage);
    // if(!isImage && displayedText==''){
    // }
  }; 

  const animateText = async () => {
    // let i=0;
    if(isImage==false && displayedText==''){
        for (let i=0;i < item.text.length && !isImage; i++) {
            // if(isImage){
            //     break
            // }
            // console.log("imaaage", isImage)
            await setAsyncTimeout(() => {
                // if(isImage==false){
                    setDisplayedText((prevText) => prevText + item.text.charAt(i));
                // }  else {
                //     return // Set the flag to false to stop the loop
                //   }
                // console.log("isIm", isImage)
                // if(isImage){
                //     return
                // }
            }, 50);
            // if (isImage) {
            //     break;
            //   }
        } 
    }
    
  };

  const setAsyncTimeout = (callback, delay) => {
    // if(isImage==false){
        return new Promise((resolve) => { 
            setTimeout(() => {
              callback();
              resolve();
            }, delay);
          });
    //}
    
  };
    return(
        <TouchableOpacity onPress={flip}>
        {isImage ?
            <Image
            source={{uri: `${config.imgUrl}${item.url}`}}
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
                style={[styles.img, styles.cardContainer,
                        {
                            borderTopRightRadius: index==listCount?0:20,
                            borderBottomRightRadius: index==listCount?0:20,
                            borderTopLeftRadius: index==0?0:20,
                            borderBottomLeftRadius: index==0?0:20,
                            marginRight: index==listCount?0:20,
                        }
                    ]}
            >
                <Text style={styles.text}>{displayedText}</Text>
            </View>
        }
        {/* <Text>{"tt \n tt"}</Text> */}
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    img:{
        height:340,
        width:200
    },
    cardContainer:{
        padding:20,
        borderWidth: 1,
        borderColor: '#e782f5',
        backgroundColor: "transparent"
    },
    text:{
        fontSize: 16,
        color: CustomColors.white,
        fontWeight: "500",
        letterSpacing:0.4,
        lineHeight: 20,
    }
})