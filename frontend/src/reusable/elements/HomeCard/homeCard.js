import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { config } from "../../../../config"
import { CustomButton } from "../Button/CustomButton"
import { CustomColors } from "../../../styles/color"


export default homeCard = ({item, index, listCount}) =>{
    const [isImage, setIsImage] = useState(true)
    const [displayedText, setDisplayedText] = useState('');
    const [displayedAuthor, setDisplayedAuthor] = useState('');
    // console.log('isImage', isImage) 
  useEffect(() => {
    if (!isImage) {
        // setDisplayedText('');
        animateText();     
    }
    if(isImage && displayedText.length == item.text.length && displayedAuthor.length == item.author.length ){
        setDisplayedText('')
        setDisplayedAuthor('')
    }
  }, [isImage]);

  const flip = () => {
    setIsImage(!isImage);
    // if(!isImage && displayedText==''){
    // }
  }; 

  const animateText = async () => {
    // let i=0;
    if(isImage==false && displayedText=='' && displayedAuthor == ''){
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
        for (let i=0;i < item.author.length && !isImage; i++) {
            await setAsyncTimeout(() => {
                setDisplayedAuthor((prevAuth) => prevAuth + item.author.charAt(i));
            }, 50);
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
        {/* <Text>{"tt \n tt"}</Text> */}
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        shadowColor: 'black',
        shadowOffset: {
        width: 4,
        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    img:{
        height:340,
        width:200,
        // shadowColor: 'black',
        // shadowOffset: {
        // width: 0,
        // height: 2,
        // },
        // shadowOpacity: 1,
        // shadowRadius: 2,
        // elevation: 3,
    },
    cardContainer:{
        padding:20,
        borderWidth: 1,
        borderColor: '#e782f5',
        // // backgroundColor: "transparent",
        // backgroundColor: "#8962f3",
        backgroundColor: '#9877E2',
        // backgroundColor: '#5962F3CC',
        // backgroundColor:'#4752e2',
        // backgroundColor:CustomColors.white,
        //   backgroundColor:'#7A76E1',
        //    backgroundColor:'#e782f5',
        backgroundColor:'transparent'
    },
    text:{
        fontSize: 16,
        color: CustomColors.white,
        // color: '#8962f3',
        fontWeight: "500",
        letterSpacing:0.4,
        lineHeight: 20,
    },
    author:{
        fontSize: 12,
        color: CustomColors.white,
        // color: "#8962f3",
        fontWeight:'300',
        alignSelf:'flex-end',
        paddingTop:10
    }
})