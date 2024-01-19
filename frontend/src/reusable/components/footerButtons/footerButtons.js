import { StyleSheet, View } from "react-native"
import { Square } from "../../elements/square/Square"

export default footerButton= ({navigation}) =>{
    return(
        <View style={styles.container}>
            <Square  onPress={() =>navigation.navigate('video-chat')} isIcon={true}
                url={require('../../../../assets/footerImages/home.png')}
            />
            <Square onPress={() =>navigation.navigate('psychiatrists')} isIcon={true}
                url={require('../../../../assets/footerImages/journal2.png')}
            />
            <Square onPress={() =>navigation.navigate('psychiatrists')} isIcon={true}
                url={require('../../../../assets/footerImages/face-scan.png')}
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