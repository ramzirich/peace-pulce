import { Image, StyleSheet, View } from "react-native"
import { Square } from "../../elements/square/Square"
// import { useNavigate } from "react-router-dom"

export const HeaderButton = ({navigation}) =>{
    return(
        <View style={styles.container}>
            <Square tag="Psychiatrist" onPress={() =>navigation.navigate('psychiatrists')}
                url={require('../../../../assets/headerImages/psychiatrist3.jpg')}
            /> 
            <Square tag="Volunteer"
                url={require('../../../../assets/headerImages/volunteer3.png')}
            />
            <Square tag="Songs" onPress={() =>navigation.navigate('song')}
                url={require('../../../../assets/headerImages/musicplayer3.jpg')}
            /> 
            <Square tag="Videos" onPress={() =>navigation.navigate('video')}
                url={require('../../../../assets/headerImages/videoplayer3.jpg')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    img:{
        height:35,
        width:35
    }
})