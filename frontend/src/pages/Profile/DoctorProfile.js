import axios from "axios"
import React, { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { config } from "../../../config"
import { useDispatch, useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LinearGradient from "react-native-linear-gradient"
import { ProfileInput } from "../../reusable/elements/Input/ProfileInput"
import { CustomColors } from "../../styles/color"
import { setUserInfo } from "../../redux/actions/userActions"
import { Updatevalidation } from "./UpdateValidation"
import { DoctorProfileValidation } from "./DoctorValidation"

export default DoctorProfile = ({navigation}) =>{
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal]= useState(false)
    const [inputs, setInputs] = useState({
        about: '',
        degree: '',
        hourly_rate: '',
        specialization: '',
    });
    console.log(inputs)


    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const authToken = await AsyncStorage.getItem('authToken');
                const responseData = await axios.get(`${config.apiUrl}/doctor`,{
                    headers:{
                        "Authorization" :`Bearer ${authToken}`
                }
            })
            setInputs(responseData.data) 
            }catch(error){
                console.error("Error in fetching dctor info: ", error)
            }
        }
        fetchData()
    },[])

    const validate = () => {
        const isValid = DoctorProfileValidation(inputs, handleError);
        if (isValid) {
          update(inputs);
        } 
    };

    const update = async(inputs) =>{
        try{
            const authToken = await AsyncStorage.getItem('authToken');
            const response = await axios.post(`${config.apiUrl}/doctor/update`, inputs,{
                headers:{
                    'Authorization': `Bearer ${authToken}`
                }
            });
            setShowModal(true)    
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

    return(
        <LinearGradient colors={[ '#8962f3', '#4752e2', '#214ae2']}  style={styles.bigContainer}>
            <ScrollView>
                <View style={styles.medium_container}>          
                    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                        <Image style={{height:60, width:60, tintColor:'white'}} 
                            source={require('../../../assets/songImages/left.png')}/>
                    </TouchableOpacity>
                    <View style={styles.small_container}>
                        <ProfileInput
                            onChangeText={text => handleOnchange(text, 'inputs.degree')}
                            onFocus={() => handleError(null, 'inputs.degree')}
                            label="Degree"
                            placeholder= {inputs.degree}
                            error={errors.degree}
                            defaultValue={inputs.degree}
                        />
                        <ProfileInput
                            onChangeText={text => handleOnchange(text, 'hourly_rate')}
                            onFocus={() => handleError(null, 'hourly_rate')}
                            label="Hourly rate"
                            placeholder= {inputs.hourly_rate}
                            error={errors.hourly_rate}
                            defaultValue={inputs.hourly_rate} 
                        />
                    </View>
                    <View style={styles.gap_col}>
                        <ProfileInput
                            onChangeText={text => handleOnchange(text, 'specialization')}
                            onFocus={() => handleError(null, 'specialization')}
                            label="Specialization"
                            placeholder= {inputs.specialization}
                            error={errors.specialization} 
                            defaultValue={inputs.specialization} 
                        />
                        <ProfileInput
                            onChangeText={text => handleOnchange(text, 'about')}
                            onFocus={() => handleError(null, 'about')}
                            label="About"
                            placeholder= {inputs.about}
                            error={errors.about}
                            defaultValue={inputs.about} 
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.save_btn} onPress={validate}>
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