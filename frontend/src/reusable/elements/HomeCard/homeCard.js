import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { config } from "../../../../config"
import { CustomColors } from "../../../styles/color"


export default homeCard = ({item, index, listCount}) =>{
    const [isImage, setIsImage] = useState(true)
    const [displayedText, setDisplayedText] = useState('');
    const [displayedAuthor, setDisplayedAuthor] = useState('');

  useEffect(() => {
    if (!isImage) {
        animateText();     
    }
    if(isImage && displayedText.length == item.text.length && displayedAuthor.length == item.author.length ){
        setDisplayedText('')
        setDisplayedAuthor('')
    }
  }, [isImage]);

  const flip = () => {
    setIsImage(!isImage);
  }; 

  const animateText = async () => {
    if(isImage==false && displayedText=='' && displayedAuthor == ''){
        for (let i=0;i < item.text.length && !isImage; i++) {
            await setAsyncTimeout(() => {
                    setDisplayedText((prevText) => prevText + item.text.charAt(i));
            }, 50);
        }
        for (let i=0;i < item.author.length && !isImage; i++) {
            await setAsyncTimeout(() => {
                setDisplayedAuthor((prevAuth) => prevAuth + item.author.charAt(i));
            }, 50);
        }
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
        <TouchableOpacity onPress={flip} style={styles.container}>
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
                <Text style={styles.author}>{displayedAuthor}</Text>
            </View>
        }
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        shadowColor: 'black',
        shadowOffset: {
        width: 2,
        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
        paddingTop:8
    },
    img:{
        height:380,
        width:240,
    },
    cardContainer:{
        padding:20,
        borderWidth: 1,
        borderColor: '#e782f5',
        backgroundColor: 'transparent',
    },
    text:{
        fontSize: 16,
        color: CustomColors.white,
        fontWeight: "500",
        letterSpacing:0.4,
        lineHeight: 20,
    },
    author:{
        fontSize: 12,
        color: CustomColors.white,
        fontWeight:'300',
        alignSelf:'flex-end',
        paddingTop:10
    }
})