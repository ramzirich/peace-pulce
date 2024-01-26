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
import { setImgUrl, setUserInfo } from "../../redux/actions/userActions"
import { Updatevalidation } from "./UpdateValidation"
import CustomModal from "../../reusable/components/modal/CustomModal"

export default Profile = ({navigation}) =>{
    const [errors, setErrors] = useState({});
    const {userInfo} = useSelector(state => state.userInfoReducer);
    const [imageuri, setImageuri] = useState(null)
    const [image, setImage] = useState(userInfo.img_url)
    const [showModal, setShowModal]= useState(false)
    const [inputs, setInputs] = useState({
        email: userInfo.email,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        password: '',
        phone:userInfo.phone
    });
    const initialEmail = userInfo.email

    const dispatch = useDispatch();

     useEffect(() =>{
        const uploadImage = async () => {
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
                            dispatch(setImgUrl(newImgUrl));
                            setImage(newImgUrl)
                            } else {
                            console.error('Error uploading image. Server responded with:', response);
                            }
                    } catch (error) {
                    }
            }    
        };
        uploadImage();
    },[imageuri])

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
       uploadImage()
    };

    const validate = () => {
        const isValid = Updatevalidation(inputs, handleError);
        if (isValid) {
          update(inputs);
        } 
    };

    const update = async(inputs) =>{
        try{
            const inputsWithoutEmail = { ...inputs };
            if (inputs.email === initialEmail) {
                delete inputsWithoutEmail.email;
            }
            if (inputs.password === '') {
                delete inputsWithoutEmail.password;
            }
            const authToken = await AsyncStorage.getItem('authToken');
            const response = await axios.post(`${config.apiUrl}/update/user`, inputsWithoutEmail,{
                headers:{
                    'Authorization': `Bearer ${authToken}`
                }
            });
            dispatch(setUserInfo(response.data.data))
            // navigation.navigate('home')
            showModal(true)    
        }catch(error){
            console.error("Error in saving changes: ", error.response?.data || error.message)
        }
    }

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    hideModal=()=>{
        setShowModal(false)
    }
    console.log(showModal)
    return(
        <LinearGradient colors={[ '#8962f3', '#4752e2', '#214ae2']}  style={styles.bigContainer}>
            <ScrollView>
                {showModal &&
                    <View style={{position:'absolute', top:'34%', width:'100%', padding:'5%', zIndex:2}}>
                        <CustomModal hideModal={hideModal}/>
                    </View>
                }
                <View style={styles.medium_container}>
                    <View style={[styles.spacebtw,{alignItems:'center'}]}>
                        <TouchableOpacity onPress={pickImage}>
                            {image? <Image source={{uri:`${config.imgUrl}${image}`}} style={styles.img} />
                                :
                                <Image  style={styles.img} 
                                    source={require('../../../assets/images/user.png')}/>
                            }
                        </TouchableOpacity>
                        {userInfo.role_id==2  &&
                            <TouchableOpacity onPress={() => navigation.navigate('doctor-profile')}>
                                <Image style={{height:60, width:60, tintColor:'white'}} 
                                    source={require('../../../assets/songImages/right.png')}/>
                            </TouchableOpacity>
                        }
                        {userInfo.role_id==3  &&
                            <TouchableOpacity onPress={() => navigation.navigate('volunteer-profile')}>
                                <Image style={{height:60, width:60, tintColor:'white'}} 
                                    source={require('../../../assets/songImages/right.png')}/>
                            </TouchableOpacity>
                        }

                    </View>
                    <View style={styles.small_container}>
                        <View style={styles.spacebtw}>
                            <View style={styles.width_fourty_five}>  
                                <ProfileInput
                                    onChangeText={text => handleOnchange(text, 'first_name')}
                                    onFocus={() => handleError(null, 'first_name')}
                                    label="First name"
                                    placeholder= {userInfo.first_name}
                                    error={errors.first_name}
                                    defaultValue={userInfo.first_name}
                                />
                            </View>
                            
                            <View style={styles.width_fourty_five}>  
                                <ProfileInput
                                    onChangeText={text => handleOnchange(text, 'last_name')}
                                    onFocus={() => handleError(null, 'last_name')}
                                    label="Last name"
                                    placeholder= {userInfo.last_name}
                                    error={errors.last_name}
                                    defaultValue={userInfo.last_name} 
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.gap_col}>
                        <ProfileInput
                            onChangeText={text => handleOnchange(text, 'email')}
                            onFocus={() => handleError(null, 'email')}
                            label="Email"
                            placeholder= {userInfo.email}
                            error={errors.email} 
                            defaultValue={userInfo.email} 
                        />
                        <ProfileInput
                            onChangeText={text => handleOnchange(text, 'password')}
                            onFocus={() => handleError(null, 'password')}
                            label="Password"
                            placeholder= "********"
                            password
                            error={errors.password} 
                        />
                        <ProfileInput
                            onChangeText={text => handleOnchange(text, 'phone')}
                            onFocus={() => handleError(null, 'phone')}
                            label="Phone Number"
                            placeholder= {userInfo.phone !== null ? userInfo.phone : '123456...'}
                            error={errors.phone}
                            defaultValue={userInfo.phone} 
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.save_btn} onPress={validate}>
                    <Text style={styles.save_text}>Save</Text>
                </TouchableOpacity>
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
        marginTop:10,
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