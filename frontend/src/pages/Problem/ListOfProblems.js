import axios from "axios";
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import { config } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomColors } from "../../styles/color";

export default ListOfProblems = () =>{
    const [listOfProblems, setListOfProblems] = useState(null);
    useEffect(() =>{
        const fetchList = async() =>{
            try{
                const authToken = await AsyncStorage.getItem('authToken');
                const response = await axios.get(`${config.apiUrl}/problems`,{
                    headers:{
                        "Authorization":`Bearer ${authToken}`
                    }
                })
                setListOfProblems(response.data)
            }catch(error){
                console.error("Error in fetching list: ", error);
            }
        }
        fetchList()
    },[])

   
    return(
        <View style={styles.container}>
            { listOfProblems &&<FlatList 
                data={listOfProblems}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>{
                    const renderBalls = () => {
                        const balls = [];
                        const maxBalls = 10;
                        for (let i = 1; i <= maxBalls; i++) {
                            let ballStyle;
                            if(i<=4){           
                                ballStyle = {
                                    backgroundColor: i <= item.severity ? 'yellow' : '#828207'
                                };
                            }
                            else if(i<=7){
                                ballStyle = {
                                    backgroundColor: i <= item.severity ? 'orange' : '#ad5e09'
                                };
                            }
                            else if(i<=10){
                                ballStyle = {
                                    backgroundColor: i <= item.severity ? 'red' : '#7F4040'
                                };
                            }
                        
                            balls.push(
                                <View key={i} style={[styles.balls, ballStyle]}/>
                            );
                        }
                    return balls;
                };

                    return (<View style={styles.cardContainer}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Problem: <Text style={styles.text}>{item.problem}</Text></Text> 
                        </View>

                        <View style={[styles.row,{width:"100%"}]}>
                            <Text style={styles.label}>Severity: </Text> 
                            <View style={[styles.ballsContainer,{width:"70%"}]}>{renderBalls()}</View>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Action: <Text style={styles.text}>{item.action}</Text></Text> 
                        </View>
                        
                        {item.solution && <View style={styles.row}>
                            <Text style={styles.label}>Solution: <Text style={styles.text}> {item.solution}</Text></Text> 
                        </View>
                        }

                        {item.ai_solution && <View style={styles.alignstart}>
                            <Text style={styles.label}>Ai Helper: <Text style={styles.text}> {item.ai_solution}</Text></Text> 
                        </View>
                        }
                    </View>
                    )
                }}
            />
            }
            {listOfProblems == null && 
                <View style={{marginTop:60,paddingLeft:20, flexDirection:'row', alignItems:'center', gap:10}}>
                    <Text style={{color:CustomColors.white, fontSize:20, fontWeight:'500'}}>Loading</Text>
                    <ActivityIndicator size="small" color={CustomColors.white} />
                </View>
            }
            {listOfProblems && listOfProblems.lenght ==0 && 
                <View style={{marginTop:60,paddingLeft:20, flexDirection:'row', alignItems:'center', gap:10}}>
                    <Text style={{color:CustomColors.white, fontSize:20, fontWeight:'500'}}>No Problems 😄</Text>
                </View>
            }
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
        gap:10
    },
    cardContainer:{
        borderWidth:1,
        borderColor:'#e782f5',
        borderRadius:10,
        padding:20,
        marginBottom:20,
    },
    row:{
        flexDirection:'row',
        gap:3,
        alignItems:'center',
        paddingBottom:5
    },
    label:{
        fontSize:14,
        fontWeight:'500',
        color:CustomColors.white
    },
    text:{
        fontSize:12,
        color:CustomColors.white
    },
    balls:{
        height:12,
        width:12,
        borderRadius:6
    },
    ballsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
})