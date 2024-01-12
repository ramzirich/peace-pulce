import { StyleSheet, View } from "react-native"
import { CustomColors } from "../../styles/color"
import LinearGradient from "react-native-linear-gradient"

export default Song = () =>{
    return(
        <LinearGradient style={styles.bigcontainer}
            colors={['#8962f3', '#4166ea', '#4752e2', '#214ae2']}
        > 

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bigcontainer:{
        flex:1,
        backgroundColor: CustomColors.purple
    }
})