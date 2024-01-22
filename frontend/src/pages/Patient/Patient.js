import { Image, Linking, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import { CustomColors } from "../../styles/color"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LinearGradient from "react-native-linear-gradient"
import { useSelector } from "react-redux"


export const PatientInfo =({route}) =>{
    const {id, patientInfo} = route.params;
    const {userInfo} = useSelector(state => state.userInfoReducer)
    const {first_name, last_name, img_url, phone, email} = patientInfo;
    const imgUrl = `${config.imgUrl}${img_url}` 

    const handleEmailPress = () => {
        Linking.openURL(`mailto:${email}`);
      };

    const handlePhonePress = () => {
    Linking.openURL(`tel:${phone}`);
    };
    
    useEffect(() =>{
        const fetchUserData = async() =>{
            try{
                const authToken = await AsyncStorage.getItem('authToken');

                // const requestResponse = await axios.get(`${config.apiUrl}/doctor_request/${id}`,{
                //     headers:{
                //         'Authorization': `Bearer ${authToken}`
                //     }
                // });          
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        } 
        fetchUserData();
    }, [])


    return(   
        <LinearGradient style={styles.big_container}
            colors={['#8962f3', '#4752e2','#214ae2']} 
        >     
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{uri : imgUrl}} style={styles.imgUrl} />
                <View style={styles.profile}>
                    <View style={styles.fullname}>
                        <Text style={[styles.name, styles.white]}>{first_name} {last_name}</Text>
                    </View>
                </View>  

                <View style={styles.spacebtw}>
                    <View style={styles.row_gap}>
                        <Image source={require('../../../assets/images/phone.png')} 
                            style={styles.icon}/>
                        <Text style={[styles.white, styles.text]}
                            onPress={handlePhonePress} underlayColor="transparent"
                        >
                            {phone}
                        </Text>
                    </View>
                    <View style={styles.row_gap}>
                        <Image source={require('../../../assets/images/email.png')} 
                            style={[styles.icon,styles.icon_size]}/>
                        <Text 
                            style={[styles.white, styles.text]} onPress={handleEmailPress} underlayColor="transparent"
                        >
                            {email}
                        </Text>
                    </View>
                </View>
        </ScrollView> 
        </LinearGradient>       
    ) 
}

const styles = StyleSheet.create({
    big_container:{
        flex:1,
        paddingTop: 40,
        paddingHorizontal:20,     
    },
    profile:{
        flexDirection:'row',
        paddingVertical:40,
        justifyContent:'space-between',
    },
    white:{
        color:CustomColors.white,
    },
    fullname:{
        flexDirection:'column',
        width:'55%', 
    },
    name:{
        fontSize:26,
        fontWeight:'bold',
        color: CustomColors.black,
        letterSpacing:1,
    },
    imgUrl:{
        height:120,
        width:120,
        borderRadius:60,
        alignSelf:'center'
    },
    spacebtw:{
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
        alignItems:'center'
    },
    row_gap:{
        flexDirection:'row',
        gap:7,
        alignItems:'center'
    },
    icon:{
        backgroundColor:'transparent', 
        width:16, 
        height:16, 
        tintColor:'white'
    },
    icon_size:{
        width:20,
        height:20
    },
    text:{
        fontSize:16
    }
})