import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { CustomHeader } from "../../reusable/components/header/CustomHeader"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import { CustomColors } from "../../styles/color"
import { CommentList } from "../../reusable/components/comment/CommentList"
import AsyncStorage from "@react-native-async-storage/async-storage"


export const PsychiatristInfo =({route}) =>{
    const {id, doctorInfo} = route.params;
    const {first_name, last_name, about, img_url, degree, specialization, hourly_rate } = doctorInfo;
    const imgUrl = `${config.imgUrl}${img_url}` 

    const [doctor, setDoctor] = useState({})
    const [ratingList, setRatingList] = useState([]);
    const [rating, setRating] = useState(0);
    const [ratingDistribution, setRatingDistribution] = useState({
        '0-2.5': 0,
        '2.5-3.75': 0,
        '3.75-5': 0,
      });  

    useEffect(() =>{
        const fetchUserData = async() =>{
            try{
                const authToken = await AsyncStorage.getItem('authToken');

                const ratingResponse = await axios.get(`${config.apiUrl}/rating/${id}`,{
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                setRatingList(ratingResponse.data)             
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        } 
        fetchUserData();
    }, [])

    useEffect(() =>{
            if(ratingList.length>0){
                const ratings = ratingList.map(item => parseFloat(item.rating));
                const ratingSum = ratings.reduce((sum, singleRating) => sum + singleRating, 0)
                const averageRateScore = ratingSum/ratingList.length;
                setRating(averageRateScore);

                const ratingDistributionResult = ratings.reduce((distribution, rating) =>{
                    if (rating >= 0 && rating < 2.5) {
                        distribution['0-2.5'] += 1;
                      } else if (rating >= 2.5 && rating <= 3.75) {
                        distribution['2.5-3.75'] += 1;
                      } else if (rating > 3.75 && rating <= 5) {
                        distribution['3.75-5'] += 1;
                      }
                      return distribution;
                    }, { '0-2.5': 0, '2.5-3.75': 0, '3.75-5': 0 });
              
                    setRatingDistribution(ratingDistributionResult);
            }else {
                setRatingDistribution({ '0-2.5': 0, '2.5-3.75': 0, '3.75-5': 0 });
            }
    }, [ratingList]) 
    
    return(    
        <ScrollView style={styles.big_container}>
            <View style={styles.profile}>
                <View style={styles.fullname}>
                    <Text style={styles.name}>Dr. {first_name}</Text>
                    <Text style={styles.name}>{last_name}</Text>
                    <Text style={styles.degree}>{degree}</Text>
                </View>
                <View>
                    <Image source={{uri : imgUrl}} style={styles.imgUrl} />
                </View>
            </View>
            
            <View>
                <Text style={styles.about}>{about}</Text>
            </View>

            <View style={styles.cost_rating}>
                <View style={styles.costRating_container}>
                    <View>
                        <Text style={styles.start}>★</Text>
                    </View>
                    <View>
                        <Text style={styles.subTitle}>Rating</Text>
                        <Text style={{fontSize:10, fontWeight:300}}>{ratingList.length} votes</Text>
                    </View>                        
                </View>

                <View style={styles.costRating_container}>
                    <View style={styles.cost_circle} />
                    <View>
                        <Text style={styles.subTitle}>Cost</Text>
                        <Text style={{fontSize:12, fontWeight:300}}>${hourly_rate}/hr</Text>
                    </View>
                </View>

            </View> 

            <View style={styles.emojies_container}>
                <View style={styles.emoji_info}>
                    <View>
                        <Text style={styles.emojies}>😊</Text>
                    </View>
                    <View>
                        <Text>{ratingDistribution['3.75-5']} votes</Text>
                    </View>
                </View>

                <View style={styles.emoji_info}>
                    <View>
                        <Text style={styles.emojies}>😐</Text>
                    </View>
                    <View>
                        <Text >{ratingDistribution['2.5-3.75']} votes</Text>
                    </View>
                </View>

                <View style={styles.emoji_info}>
                    <View>
                        <Text style={styles.emojies}>😡</Text>
                    </View>
                    <View>
                        <Text >{ratingDistribution['0-2.5']} votes</Text>
                    </View>
                </View>

            </View>

            
            <View>
            <CommentList id={id} />
            </View>   
               
        </ScrollView>        
    )
}

const styles = StyleSheet.create({
    big_container:{
        flex:1,
        paddingTop: 10,
        // paddingBottom: 200,
        paddingHorizontal:20,     
    },
    profile:{
        flexDirection:'row',
        marginBottom:20,
        justifyContent:'space-between',
    },
    fullname:{
        flexDirection:'column', 
    },
    name:{
        fontSize:32,
        fontWeight:'bold',
        color: CustomColors.black,
        letterSpacing:1,
    },
    imgUrl:{
        height:100,
        width:100,
        borderRadius:50,
    },
    about:{
        color: CustomColors.black,
        fontWeight:'500',
        letterSpacing:0.2,
    },
    info_card:{
        height:80,
        marginTop:20,
        backgroundColor: CustomColors.grey,
        borderRadius:20,
        padding: 10,
    },
    cost_rating:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:5
    },
    costRating_container:{
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    },
    cost_circle:{
        height:45,
        width:45,   
        backgroundColor:CustomColors.blue,
        borderRadius:22.5,
    },
    start:{
        fontSize:45,
        color:"gold"
    },
    subTitle:{
        fontSize:14,
        fontWeight:'bold'
    },
    emojies_container:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    emojies:{
        fontSize:35
    },
    emoji_angry:{
        color:'red'
    },
    emoji_info:{
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    }
})