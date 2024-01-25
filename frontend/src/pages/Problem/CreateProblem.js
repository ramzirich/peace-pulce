import React, { useEffect, useState } from "react"
import {  ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ProfileInput } from "../../reusable/elements/Input/ProfileInput"
import { CustomColors } from "../../styles/color"
import { createProblemvalidation } from "./CreateProblemValidation"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { config } from "../../../config"


export default CreateProblem = () =>{
    const [key, setKey] = useState(0);
    const [ severity, setSeverity] = useState(0);
    const [ aiSolution, setAiSolution] = useState('');
    const [generateResponse, setGenerateResponse] = useState(false);
    const [severityError, setSeverityError] = useState(false)
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        problem: '',
        severity: severity,
        action: '',
        solution: '',
        ai_solution:''
    });

    useEffect(() => {
        setInputs(prevInputs => ({
            ...prevInputs,
            ai_solution: aiSolution
        }));
    }, [aiSolution]);
    // const animateText = async () => {
    //     for (let i=0;i < aiSolution.length ; i++) {
    //         await setAsyncTimeout(() => {
    //             setAiSolution((prevText) => prevText + aiSolution.charAt(i));
    //         }, 50);
    //     }       
    // };
    
    // const setAsyncTimeout = (callback, delay) => {
    //     return new Promise((resolve) => { 
    //         setTimeout(() => {
    //             callback();
    //             resolve();
    //         }, delay);
    //     }); 
    // };

    const validateForAi = () => {
        setErrors({})
        const isValid = createProblemvalidation(inputs, handleError);
        if (isValid ) {
            textForAi= `problem:${inputs.problem}, action:${inputs.action}`
            createProblemRequestForAi(textForAi);
        }
    };

    const createProblemRequestForAi = async(textForAi) =>{
        try{
            setAiSolution("");
            setGenerateResponse(true);
            const response = await axios.get(`${config.apiUrl}/openai`, 
                {
                    params:{
                        user_prompt: textForAi
                    }        
                }
            );
            setGenerateResponse(false);
            setAiSolution(response.data.data.choices[0].message.content)
            inputs.ai_solution = response.data.data.choices[0].message.content
            // for (let i=0;i < response.data.data.choices[0].message.content; i++) {
            //     await setAsyncTimeout(() => {
            //         setAiSolution((prevText) => prevText + aiSolution.charAt(i));
            //     }, 50);
            // } 
        }catch(error){
            console.error("Error: ", error.response?.data || error.message)
        }
    }

    const validate = () => {
        const isValid = createProblemvalidation(inputs, handleError);
        if(severity ===0){
            setSeverityError(true)
        }
        if (isValid && severity !== 0) {
          createProblemRequest(inputs);
        }
    };

    const createProblemRequest = async(inputs) =>{
        try{
            const inputsWithoutSolution = { ...inputs };
            if (inputs.solution === '') {
                delete inputsWithoutSolution.solution;
            }
            if (inputs.ai_solution === '') {
                delete inputsWithoutSolution.ai_solution;
            }
            console.log(inputsWithoutSolution)
            const authToken = await AsyncStorage.getItem('authToken');
            const response = await axios.post(`${config.apiUrl}/problem/create`, inputsWithoutSolution,{
                headers:{
                    'Authorization': `Bearer ${authToken}`
                }
            });
            setSeverity(0)
            setAiSolution('')
            setInputs({
                problem: '',
                severity: severity,
                action: '',
                solution: '',
                ai_solution:''
            }) 
            setKey(prevKey => prevKey + 1); 
        }catch(error){
            console.error("Error in saving changes: ", error.response?.data || error.message)
        }
    }

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    const renderBalls = () => {
        const balls = [];
        const maxBalls = 10;
        for (let i = 1; i <= maxBalls; i++) {
            let ballStyle;
            if(i<=4){           
                ballStyle = {
                    backgroundColor: i <= severity ? 'yellow' : 'rgba(225, 245, 5,0.5)'
                };
            }
            else if(i<=7){
                ballStyle = {
                    backgroundColor: i <= severity ? 'orange' : 'rgba(245, 181, 5,0.8)'
                };
            }
            else if(i<=10){
                ballStyle = {
                    backgroundColor: i <= severity ? 'red' : 'rgba(245, 5, 5, 0.6)'
                };
            }
          
            balls.push(
            <TouchableOpacity
              key={i}
              onPress={()=>{
                setSeverity(i)
                setSeverityError(false)
                inputs.severity = i
                }
              }    
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
                    key={`problem-${key}`}
                    onChangeText={text => handleOnchange(text, 'problem')}
                    onFocus={() => handleError(null, 'problem')}
                    label="Problem"
                    placeholder= "What is the Problem?? 😢"
                    error={errors.problem}
                    defaultValue= {inputs.problem}
                />
                <View style={styles.spaceTop}>
                    <Text style={styles.label}>Severity</Text>
                    <View style={styles.ballsContainer}>{renderBalls()}</View>
                    {severityError && (
                        <Text style={{marginTop: 7, color: CustomColors.red, fontSize: 12}}>
                            Choose problem severity level
                        </Text>
                        )
                    }
                </View>

                <ProfileInput
                    key={`action-${key}`}
                    onChangeText={text => handleOnchange(text, 'action')}
                    onFocus={() => handleError(null, 'action')}
                    label="Action"
                    placeholder= "Tell me what you did 😧"
                    error={errors.action}
                />

                <ProfileInput
                    key={`solution-${key}`}
                    onChangeText={text => handleOnchange(text, 'solution')}
                    onFocus={() => handleError(null, 'solution')}
                    label="Solution"
                    placeholder= "Every problem has its solution 🤓"
                    error={errors.solution}
                />
                <View>
                    <Text style={styles.label} onPress={validateForAi}>
                        Need help? Click here to use our AI 😎
                    </Text>
                    {generateResponse == true && <Text style={styles.label}>Generate Response..</Text>}
                    {aiSolution !== ""&& <Text style={styles.label}>{aiSolution}</Text>}
                </View>
                <TouchableOpacity style={styles.save_btn} onPress={validate}>
                    <Text style={styles.save_text}>Save</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        paddingTop:30,
        paddingBottom:10,
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
    },
    save_btn:{
        marginTop:20,
        backgroundColor :'#4752e2',
        width:"50%",
        height:50,
        alignSelf:"center",
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    save_text:{
        color:CustomColors.white,
        fontSize: 18,
        fontWeight:'500'
    }
})