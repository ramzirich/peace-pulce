import axios from "axios"
import React, { useEffect, useState } from "react"
import { Alert, Button, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { config } from "../../../config"
import { useSelector } from "react-redux"
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage"
import LinearGradient from "react-native-linear-gradient"
import { Input } from "../../reusable/elements/Input/Input"
import { ProfileInput } from "../../reusable/elements/Input/ProfileInput"
import FooterButtons from "../../reusable/components/footerButtons/footerButtons"

export default Profile = ({navigation}) =>{
    const [image, setImage] = useState(null)
    const [imageuri, setImageuri] = useState(null)
    const {userInfo} = useSelector(state => state.userInfoReducer);

    useEffect(() =>{
        const uploadImage = async () => {
            try {
            const formData = new FormData();
            formData.append('image', {
                uri: image.assets[0].uri,
                type: image.assets[0].type,
                name: image.assets[0].fileName,
            });
            formData.append('image', image.assets[0]);
            
            const authToken = await AsyncStorage.getItem('authToken');
            const response = await axios.post(`${config.apiUrl}/image`,formData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            
                if (response.status === 200) {
                    console.log('Image uploaded successfully');
                    } else {
                    console.error('Error uploading image. Server responded with:', response);
                    }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
        uploadImage();
    },[image])

    const pickImage = async() => {
        let options = {
            storageOptions:{
                path:'image'
            }
        }
        launchImageLibrary(options, response=>{
            setImage(response)
            setImageuri(response.assets[0].uri)
        })
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
        <LinearGradient colors={[ '#214ae2', '#4752e2','#8962f3']}  style={styles.bigContainer}>
            <View style={styles.medium_container}>
                <View>
                    <TouchableOpacity onPress={pickImage}>
                        {imageuri ? <Image source={{uri:imageuri}} style={styles.img} />
                            :
                            <Image  style={styles.img} 
                                source={{uri: `${config.imgUrl}${userInfo.img_url}`}}/>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.small_container}>
                    <View style={styles.spacebtw}>
                        <View style={styles.width_fourty_five}>  
                            <ProfileInput
                                //   onChangeText={text => handleOnchange(text, 'first_name')}
                                //   onFocus={() => handleError(null, 'first_name')}
                                label="First name"
                                placeholder= {userInfo.first_name}
                                //   error={errors.first_name} 
                            />
                        </View>
                        
                        <View style={styles.width_fourty_five}>  
                            <ProfileInput
                                //   onChangeText={text => handleOnchange(text, 'first_name')}
                                //   onFocus={() => handleError(null, 'first_name')}
                                label="Last name"
                                placeholder= {userInfo.last_name}
                                //   error={errors.first_name} 
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.gap_col}>
                    <ProfileInput
                        //   onChangeText={text => handleOnchange(text, 'first_name')}
                        //   onFocus={() => handleError(null, 'first_name')}
                        label="Email"
                        placeholder= {userInfo.email}
                        //   error={errors.first_name} 
                    />
                    <ProfileInput
                        //   onChangeText={text => handleOnchange(text, 'first_name')}
                        //   onFocus={() => handleError(null, 'first_name')}
                        label="Password"
                        placeholder= {userInfo.last_name}
                        password
                        //   error={errors.first_name} 
                    />
                    <ProfileInput
                        //   onChangeText={text => handleOnchange(text, 'first_name')}
                        //   onFocus={() => handleError(null, 'first_name')}
                        label="Phone Number"
                        placeholder= {userInfo.phone !== null ? userInfo.phone : 'Enter your phone number'}
                        //   error={errors.first_name} 
                    />
            </View>
            </View>
            <FooterButtons navigation={navigation} />
        </LinearGradient>
   )
}

const styles = StyleSheet.create({
    bigContainer:{
        flex:1,
        paddingTop:40,
        
    },
    medium_container:{
        paddingHorizontal:20
    },
    small_container:{
        paddingTop:30
    },
    img:{
        height:120,
        width:120,
        borderRadius:60,
        resizeMode:'stretch'
    },
    spacebtw:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    width_fourty_five:{
        width:"45%"
    },
    gap_col:{
        flexDirection:'column',
        gap:10
    }
})