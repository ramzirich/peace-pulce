import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { CustomHeader } from "../../reusable/components/header/CustomHeader"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import { CustomColors } from "../../styles/color"
import { CommentList } from "../../reusable/components/comment/CommentList"
import AsyncStorage from "@react-native-async-storage/async-storage"


export const PsychiatristInfo =({route, navigation}) =>{
    // const {id}=useParams();
    const {id} = route.params;
   console.log(doctor)
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
                const response =await  axios.get(`${config.apiUrl}/doctor/${id}`);
                setDoctor(response.data)

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
        <>  
        <Image source={require('../../../assets/star-one-quarter.png')} style={{height:20, width:20}}  /> 
        <Image source={require('../../../assets/images/half-star.png')} style={{height:20, width:20}}  />   
        <ScrollView>
        {doctor && doctor.user && 
            <Image source={{ uri: `${config.imgUrl}${doctor.user.img_url}`}} 
                    style={{height: 400, width:'100%'}}
                    resizeMode="contain"
            />
        } 
            <View style={styles.big_container}>
                
                    
                    <View style={styles.info_card}>
                        {doctor && <Text>{doctor.about}</Text>}
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
                                <Text style={{fontSize:12, fontWeight:300}}>${doctor.hourly_rate}/hr</Text>
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
                    
                
            </View>
            </ScrollView>
        </>
        
    )
}

const styles = StyleSheet.create({
    big_container:{
        paddingHorizontal:20,
        
    },
    info_card:{
        height:80,
        // width:320,
        // alignSelf:"center",
        marginTop:20,
        backgroundColor: CustomColors.grey,
        borderRadius:20,
        padding: 10,
        marginBottom: 40
    },
    cost_rating:{
        flexDirection:'row',
        // paddingHorizontal
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20
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