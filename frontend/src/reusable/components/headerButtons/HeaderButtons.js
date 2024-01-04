import { StyleSheet, View } from "react-native"
import { Square } from "../../elements/square/Square"
// import { useNavigate } from "react-router-dom"

export const HeaderButton = ({navigation}) =>{
    // const navigate = useNavigate();
    // function pyNav 
    return(
        <View style={styles.container}>
            {/* <Square tag="Psychiatrist" onPress={() => navigate('/psychiatrists')}/> */}
            <Square tag="Psychiatrist" onPress={() =>navigation.navigate('psychiatrists')}/> 
            <Square tag="Volunteer"/>
            <Square tag="Songs"/>
            <Square tag="Videos"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    }
})