import React, { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"
import CreateProblem from "./CreateProblem"
import ListOfProblems from "./ListOfProblems"


export default Problem = () =>{
    const [isCreate, setIsCreate] = useState(true)
    changeToCreatePage = () =>{
        setIsCreate(true)
    }

    changeToPageList = () =>{
        setIsCreate(false)
    }
    const border = isCreate?{ borderBottomWidth: 1.5, borderBottomColor: '#e782f5' } : {};
    const border1 = isCreate?  {}:{ borderBottomWidth: 1.5, borderBottomColor: '#e782f5' } ;
    
    return(
        <LinearGradient style={styles.container}
        colors={['black','#214ae2', '#4752e2','#8962f3']} >
            <View style={styles.navigateBtn}>
                <TouchableOpacity style={[styles.btnStyle, border]} onPress={changeToCreatePage}>
                    <Text style={styles.btnTextStyle}>Create problem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnStyle, border1]} onPress={changeToPageList}>
                    <Text style={styles.btnTextStyle}>List of problems</Text>
                </TouchableOpacity>
            </View>
            {isCreate && <ScrollView>
                <CreateProblem/>
            </ScrollView>
            }
                {isCreate == false && <ListOfProblems/>}
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
    border:{
        borderBottomWidth:1,
        borderColor:'#e782f5'
    },
    btnTextStyle:{
        color:CustomColors.white,
        fontSize:16,
        fontWeight:"500",
        alignSelf:'center'
    }
})