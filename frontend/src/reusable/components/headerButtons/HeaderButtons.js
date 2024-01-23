import { Image, StyleSheet, View } from "react-native"
import { Square } from "../../elements/square/Square"
import { useSelector } from "react-redux"

export const HeaderButton = ({navigation}) =>{
    const {userInfo} = useSelector(state => state.userInfoReducer)
    return(
        <View style={styles.container}>
            { userInfo.role_id ==1 && 
                <>
                    <Square tag="Psychiatrist" onPress={() =>navigation.navigate('psychiatrists')}
                        url={require('../../../../assets/headerImages/psychiatrist3.jpg')}
                    /> 
                    <Square tag="Volunteer" onPress={() =>navigation.navigate('volunteers')}
                        url={require('../../../../assets/headerImages/volunteer3.png')}
                    />
                </>
            }
            {userInfo.role_id ===2 &&
                <>
                    <Square tag="Patients" onPress={() =>navigation.navigate('patients')}
                        url={require('../../../../assets/headerImages/patient.jpg')}
                    />
                    <Square tag="Request" onPress={() =>navigation.navigate('request')}
                        url={require('../../../../assets/headerImages/request.jpg')}
                    /> 
                </>
            }
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