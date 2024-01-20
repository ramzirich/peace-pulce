import axios from "axios"
import React, { useState } from "react"
import { Alert, Button, Image, StyleSheet, View } from "react-native"
// import LinearGradient from "react-native-linear-gradient"
import { config } from "../../../config"
import { useSelector } from "react-redux"
// import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage"
import LinearGradient from "react-native-linear-gradient"

export default Profile = () =>{
    const [image, setImage] = useState(null)
    const [imageuri, setImageuri] = useState(null)
    const {userInfo} = useSelector(state => state.userInfoReducer)

    const pickImage = () => {
        let options = {
            storageOptions:{
                path:'image'
            }
        }
        launchImageLibrary(options, response=>{
            setImage(response)
            setImageuri(response.assets[0].uri)
            console.log(response)
        })
    };

    const uploadImage = async () => {
        const formData = new FormData();
        // formData.append('image', {
        //     uri: image.assets[0].uri,  // Use uri instead of image.fileName
        //     type: image.assets[0].type,
        //     name: image.assets[0].fileName,
        // });
        formData.append('image', image.assets[0]);
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            const response = await axios.post(`${config.apiUrl}/image`, {image: formData}, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                  'Content-Type': 'multipart/form-data',
                },
            });
      
            const result = await response.json();
            console.log('Image upload result:', result);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        };
    return(
    //     // <LinearGradient 
    //     //     colors={['#8962f3', '#4752e2','#214ae2']} 
    //     //     style={styles.bigContainer}>
    //         // {/* <View>
    //         <View>
    //   <Button title="Pick Image" onPress={pickImage} />
    //   <Image source={{uri:imageuri}} style={{width:100, height:100}}/>
    //   {/* {image && <Image source={{ uri: userInfo.img_url }} style={{ width: 200, height: 200 }} />} */}
    //   {/* image && <Button title="Upload Image" onPress={uploadImage /> */}
    // {/* </View> */}
    //          </View> 

    //     {/* </LinearGradient> */}
    // )
        <LinearGradient colors={['#8962f3', '#4752e2','#214ae2']}  style={styles.bigContainer}>

        </LinearGradient>
   )
}

const styles = StyleSheet.create({
    bigContainer:{
        flex:1,
        paddingTop:40
    }
})