import React, { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"
import CreateProblem from "./CreateProblem"


export default Problem = () =>{
    const [isCreate, setIsCreate] = useState(true)
    return(
        <LinearGradient style={styles.container}
        colors={['#373b39','#214ae2', '#4752e2','#8962f3']} >
            <View style={styles.navigateBtn}>
                <TouchableOpacity style={[styles.btnStyle, styles.middle2]}>
                    <Text style={styles.btnTextStyle}>Create problem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnStyle, styles.middle]}>
                    <Text style={styles.btnTextStyle}>List of problems</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {isCreate && <CreateProblem/>}
            </ScrollView>
            

        </LinearGradient> 
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    navigateBtn:{
        flexDirection:'row',
        justifyContent:"space-between",
        width:"100%",
    },
    btnStyle:{
        width:"50%",
        height:100,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:"center"
    },
    middle:{
        borderLeftWidth:1,
        borderColor:'#e782f5'
    },
    middle2:{
        borderRightWidth:1,
        borderColor:'#e782f5'
    },
    btnTextStyle:{
        color:CustomColors.white,
        fontSize:16,
        fontWeight:"500",
        alignSelf:'center'
    }
})