import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { config } from "../../../../config"


export default homeCard = ({item, index, listCount}) =>{
    const [isImage, setIsImage] = useState(true)
    const [displayedText, setDisplayedText] = useState('');
    const [continueTyping, setContinueTyping] = useState(true);
        // console.log("continueTyping", continueTyping)
        // console.log('display', displayedText) 
  useEffect(() => {
    if (!isImage) {
        // setDisplayedText('');
        animateText();
    }
    if(isImage){
        setContinueTyping(false);
        setDisplayedText('')
    }
  }, [isImage]);

  const flip = () => {
    setIsImage(!isImage);
    if (!isImage) {
        setDisplayedText('');
        // setContinueTyping(true);
    }
  }; 

  const animateText = async () => {
    // setContinueTyping(true);
    let i=0;
    for (i;i < item.text.length ; i++) {
        if(continueTyping){
            console.log("i1",i)
            i=0
            console.log("i2",i)
            break;
        }
      await setAsyncTimeout(() => {
        setDisplayedText((prevText) => prevText + item.text.charAt(i));
      }, 50);
    }
  };

  const setAsyncTimeout = (callback, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        callback();
        resolve();
      }, delay);
    });
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
            >
                <Text>{displayedText}</Text>
            </View>
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