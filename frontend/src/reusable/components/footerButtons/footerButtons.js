import { StyleSheet, View } from "react-native"
import { Square } from "../../elements/square/Square"

export default footerButton= ({navigation}) =>{
    return(
        <View style={styles.container}>
            <Square  onPress={() =>navigation.navigate('video-chat')}
                url={require('../../../../assets/footerImages/chatai.png')}
            />
            <Square onPress={() =>navigation.navigate('psychiatrists')}
                url={require('../../../../assets/footerImages/chatai.png')}
            />
            <Square onPress={() =>navigation.navigate('psychiatrists')}
                url={require('../../../../assets/footerImages/photos.jpg')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:45,
        position:'absolute',
        bottom:0,
        backgroundColor:'#4752e2',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius:30,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        padding:20
    }
})