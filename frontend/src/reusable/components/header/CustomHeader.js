import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"
import { config } from "../../../../config"
import { useSelector } from "react-redux"

export const CustomHeader = () =>{
    const {userInfo} = useSelector(state => state.userInfoReducer)
    let imgUrl;
    if(userInfo && userInfo.img_url){
        imgUrl = `${config.imgUrl}${userInfo.img_url}`
    }
    
    if(userInfo && userInfo.name){
        userInfo.name  = userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1);
    }
   
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.profile_img}>
                {imgUrl && 
                    <Image source={{uri : imgUrl}} style={styles.profile_img}/>
                }
            </TouchableOpacity>
            <View style={styles.user}>
                {userInfo && userInfo.first_name? 
                    <Text style={{fontSize:16}}>Welcome {userInfo.first_name}</Text>
                    : ""
                }
                <View style={styles.status_view}>
                    <TouchableOpacity style={styles.status_circle}/>
                    <Text style={{fontSize:12}}>Status</Text>
                </View>      
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'start',
        marginTop:10,
        marginBottom: 20,
        paddingLeft: 15
    },
    profile_img:{
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:CustomColors.blue
    },
    user:{
        paddingStart:5,
        justifyContent:"center"
    },
    status_view:{
        flexDirection: 'row',
        alignItems:"center",
        gap:5
    },
    status_circle:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:CustomColors.green
    },
})