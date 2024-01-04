import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"

export const CustomHeader = ({img_url=CustomColors.darkBlue, name='Ramzi'}) =>{
    if(name){
        name  = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.profile_img}/>
            <View style={styles.user}>
                <Text style={{fontSize:16}}>Welcome {name}</Text>
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
        // marginLeft:10,
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