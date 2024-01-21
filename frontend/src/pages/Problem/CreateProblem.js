import React, { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ProfileInput } from "../../reusable/elements/Input/ProfileInput"
import { Input } from "../../reusable/elements/Input/Input"
import { ProblemInput } from "../../reusable/elements/Input/ProblemInput"
import { CustomColors } from "../../styles/color"


export default CreateProblem = () =>{
    const [ severity, setSeverity] = useState(0);

    const renderBalls = () => {
        const balls = [];
        const maxBalls = 10;
        for (let i = 1; i <= maxBalls; i++) {
            let ballStyle;
            if(i<=4){           
                ballStyle = {
                    backgroundColor: i <= severity ? 'yellow' : '#828207'
                };
            }
            else if(i<=7){
                ballStyle = {
                    backgroundColor: i <= severity ? 'orange' : '#ad5e09'
                };
            }
            else if(i<=10){
                ballStyle = {
                    backgroundColor: i <= severity ? 'red' : '#7F4040'
                };
            }
          
            balls.push(
            <TouchableOpacity
              key={i}
              onPress={()=>setSeverity(i)}
              style={[styles.balls, ballStyle]}
            >
            </TouchableOpacity>
          );
        }
    
        return balls;
      };
    return(
        <View style={styles.container}>
                <ProfileInput
                    // onChangeText={text => handleOnchange(text, 'first_name')}
                    // onFocus={() => handleError(null, 'first_name')}
                    label="Problem"
                    placeholder= "What is the Problem!!! 😢"
                    // error={errors.first_name}
                    // defaultValue={userInfo.first_name}
                />
                <View style={styles.spaceTop}>
                    <Text style={styles.label}>Severity</Text>
                    <View style={styles.ballsContainer}>{renderBalls()}</View>
                </View>

                <ProfileInput
                    // onChangeText={text => handleOnchange(text, 'first_name')}
                    // onFocus={() => handleError(null, 'first_name')}
                    label="Action"
                    placeholder= "Tell me what happened 😧"
                    // error={errors.first_name}
                    // defaultValue={userInfo.first_name}
                />

                <ProfileInput
                    // onChangeText={text => handleOnchange(text, 'first_name')}
                    // onFocus={() => handleError(null, 'first_name')}
                    label="Solution"
                    placeholder= "Every problem has it's solution 🤓"
                    // error={errors.first_name}
                    // defaultValue={userInfo.first_name}
                />

                <ProfileInput
                    // onChangeText={text => handleOnchange(text, 'first_name')}
                    // onFocus={() => handleError(null, 'first_name')}
                    label="Ai Solution"
                    placeholder= "Need help!!!, Use our Ai 😎"
                    // error={errors.first_name}
                    // defaultValue={userInfo.first_name}
                /> 
        </View>
    )
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        paddingTop:30,
        paddingHorizontal:20,
        flexDirection:'column',
        gap:18
    },
    balls:{
        height:20,
        width:20,
        borderRadius:10
    },
    label:{
        fontSize:14,
        color:CustomColors.white,
        marginBottom:10
    },
    ballsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    }
})