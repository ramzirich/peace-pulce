import axios from "axios"
import React, { useEffect, useState } from "react"
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { config } from "../../../config"
import { useDispatch, useSelector } from "react-redux"
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage"
import LinearGradient from "react-native-linear-gradient"
import { ProfileInput } from "../../reusable/elements/Input/ProfileInput"
import { CustomColors } from "../../styles/color"
import { setImgUrl } from "../../redux/actions/userActions"

export default Profile = ({navigation}) =>{
    const [image, setImage] = useState(null)
    const [imageuri, setImageuri] = useState(null)
    const [inputs, setInputs] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        phone:''
    });
    const [errors, setErrors] = useState({});
    const {userInfo} = useSelector(state => state.userInfoReducer);

    const dispatch = useDispatch();

    useEffect(() =>{
        const uploadImage = async () => {
            console.log(image)
            if(image != null){ 
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
                            const newImgUrl = "images/" + response.data.data;
                            console.log(newImgUrl);
                            dispatch(setImgUrl(newImgUrl));
                            console.log('Image uploaded successfully');
                            } else {
                            console.error('Error uploading image. Server responded with:', response);
                            }
                    } catch (error) {
                        console.error('Error uploading image:', error);
                    }
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
        <LinearGradient colors={[ '#8962f3', '#4752e2', '#214ae2']}  style={styles.bigContainer}>
            <ScrollView>
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
                            placeholder= "********"
                            password
                            //   error={errors.first_name} 
                        />
                        <ProfileInput
                            //   onChangeText={text => handleOnchange(text, 'first_name')}
                            //   onFocus={() => handleError(null, 'first_name')}
                            label="Phone Number"
                            placeholder= {userInfo.phone !== null ? userInfo.phone : '123456...'}
                            //   error={errors.first_name} 
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.save_btn}>
                    <Text style={styles.save_text}>Save</Text>
                </TouchableOpacity>
            {/* <FooterButtons navigation={navigation} /> */}
            </ScrollView>
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
        paddingTop:30,
        paddingBottom:10
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
    },
    save_btn:{
        marginTop:20,
        backgroundColor :'#8962f3',
        width:"50%",
        height:50,
        alignSelf:"center",
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    save_text:{
        color:CustomColors.white,
        fontSize: 18,
        fontWeight:'500'
    }
})