import { Image, Keyboard, Linking, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import { CustomColors } from "../../styles/color"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LinearGradient from "react-native-linear-gradient"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"


export const PatientForVolunteer =({route}) =>{
    const {id, patientInfo} = route.params;
    const {first_name, last_name, img_url, phone, email} = patientInfo;
    const {userInfo} = useSelector(state => state.userInfoReducer);
    const imgUrl = `${config.imgUrl}${img_url}` 
    const navigation = useNavigation();

    const handleEmailPress = () => {
        Linking.openURL(`mailto:${email}`);
      };

    const handlePhonePress = () => {
    Linking.openURL(`tel:${phone}`);
    };

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
                        <Image source={require('../../../assets/images/phone.png')} 
                            style={[styles.icon]}/>
                            <Text style={[styles.white, styles.text]} 
                                onPress={() =>navigation.navigate('call', {phone})}
                            >
                                In App Call
                            </Text>
                    </View>
                </View>

                <View style={[styles.row_gap, {paddingVertical:30}]}>
                    <Image source={require('../../../assets/images/email.png')} 
                        style={[styles.icon,styles.icon_size]}/>
                    <Text 
                        style={[styles.white, styles.text]} onPress={handleEmailPress}
                    >
                        {email}
                    </Text>
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
    flexEnd:{
        flexDirection:'row',
        justifyContent:'flex-end'
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
    },
    noteContainer:{
        padding:20,
        borderWidth: 1, 
        borderColor: '#e782f5',
        borderRadius: 10,
        padding:15, 
        backgroundColor: CustomColors.white,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    row_gap_ten:{
        flexDirection:'row',
        gap:10,
    },
    noteicon:{
        height:20,
        width:20,
    },
    noteText:{
        fontSize:16,
        fontWeight:'500',
        color:"black"
    },
    noteContainerType:{
        borderWidth:1, 
        borderColor:"#e782f5", 
        paddingHorizontal:20, 
        borderRadius:20
    },
    postBtn:{
        height:25,
        width:50,
        backgroundColor: '#8962f3',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7
    },
    titleBtn:{
        paddingTop:'8%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:5
    }
})