import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"
import { config } from "../../../../config"

export const CustomHeader = () =>{
    const {userInfo} = useSelector(state => state.userInfoReducer)
    imgUrl = `${config.imgUrl}images/${userInfo.img_url}`
    if(userInfo && userInfo.name){
        userInfo.name  = userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1);
    }
    
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.profile_img}/>
            <View style={styles.user}>
                <Text style={{fontSize:16}}>Welcome {userInfo.name}</Text>
                <View style={styles.status_view}>
                    <TouchableOpacity style={styles.status_circle}>
                        <Image source={imgUrl} />
                    </TouchableOpacity>
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
        marginBottom: 20
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
    profile_img:{
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:CustomColors.blue
    }

})