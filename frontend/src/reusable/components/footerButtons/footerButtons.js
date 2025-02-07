import { StyleSheet, View } from "react-native"
import { Square } from "../../elements/square/Square"

export default footerButton= ({navigation}) =>{
    return(
        <View style={styles.container}>
            <Square  onPress={() =>navigation.navigate('home')} isIcon={true}
                url={require('../../../../assets/footerImages/home2.png')}
            />
            <Square  onPress={() =>navigation.navigate('profile')} isIcon={true}
                url={require('../../../../assets/footerImages/profile3.png')}
            />
            <Square onPress={() =>navigation.navigate('problem')} isIcon={true}
                url={require('../../../../assets/footerImages/journal2.png')}
            />
            <Square onPress={() =>navigation.navigate('face')} isIcon={true}
                url={require('../../../../assets/footerImages/face-scan.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:60,
        position:'absolute',
        bottom:0,
        backgroundColor:'#4752e2',
        // backgroundColor:'#8962f3',
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        padding:20
    }
})