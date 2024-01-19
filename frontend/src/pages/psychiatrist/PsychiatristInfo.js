import { Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import { CustomColors } from "../../styles/color"
import { CommentList } from "../../reusable/components/comment/CommentList"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LinearGradient from "react-native-linear-gradient"
import { useSelector } from "react-redux"


export const PsychiatristInfo =({route}) =>{
    const {id, doctorInfo} = route.params;
    const {userInfo} = useSelector(state => state.userInfoReducer)
    const {first_name, last_name, about, img_url, degree, specialization, hourly_rate } = doctorInfo;
    const imgUrl = `${config.imgUrl}${img_url}` 

    const [ratingList, setRatingList] = useState([]);
    // console.log(ratingList)
    const [rating, setRating] = useState(0);
    const [ratingDistribution, setRatingDistribution] = useState({
        '0-2.5': 0,
        '2.5-3.75': 0,
        '3.75-5': 0,
      });  
    const [request, setRequest] = useState(null);
    const [userRating, setUserRating] = useState(null)
      console.log("userRating",userRating)
    useEffect(() =>{
        const fetchUserData = async() =>{
            try{
                const authToken = await AsyncStorage.getItem('authToken');

                const ratingResponse = await axios.get(`${config.apiUrl}/rating/${id}`,{
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                const requestResponse = await axios.get(`${config.apiUrl}/doctor_request/${id}`,{
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                setRequest(requestResponse.data.request)
                setRatingList(ratingResponse.data)
                const recordWithMatchingUserId = ratingResponse.data.find(record => record.user.id === userInfo.id)
                // console.log(recordWithMatchingUserId.rating) 
                if(recordWithMatchingUserId){
                    setUserRating(recordWithMatchingUserId.rating)
                }            
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

    async function sendCancelRequest (){
        try{
            if(request =='null'|| !request){
                const authToken = await AsyncStorage.getItem('authToken');

                const requestResponse = await axios.post(`${config.apiUrl}/doctor_request/create`,{
                    'doctor_id' : id
                }, {
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                if(requestResponse.status == 201){
                    setRequest('requested')
                }
            }
            if(request=='accepted' || request==='requested'){        
                const authToken = await AsyncStorage.getItem('authToken');
                const requestDeleteResponse = await axios.post(`${config.apiUrl}/doctor_request/delete/${id}`,{
                } ,{
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                if(requestDeleteResponse.status == 200){
                    setRequest(null)
                }
            }
        }catch(error){
            console.error(error)
        }
    }

    onRatingChange = async() =>{
        const authToken = await AsyncStorage.getItem('authToken');

        const ratingResponse = await axios.get(`${config.apiUrl}/rating/${id}`,{
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });

        setRatingList(ratingResponse.data)     
    }

    return(    
        <LinearGradient style={styles.big_container}
            colors={['#8962f3', '#4752e2','#214ae2']} 
        >
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profile}>
                <View style={styles.fullname}>
                    <Text style={[styles.name, styles.white]}>Dr. {first_name}</Text>
                    <Text style={[styles.name, styles.white]}>{last_name}</Text>
                    <Text style={[styles.degree, styles.white]}>{specialization}</Text>
                    <Text style={[styles.degree, styles.white]}>{degree}</Text>

                    <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
                    <View style={styles.costRating_container}>
                    <View>
                        {rating ==0 && 
                            <Image style={styles.star} source={require('../../../assets/stars/empty-star.png')} />   
                        }
                        {rating >0 && rating<2 && 
                            <Image style={styles.star} source={require('../../../assets/stars/quarter-star.png')} />   
                        }
                        {rating >=2 && rating<3 && 
                            <Image style={styles.star} source={require('../../../assets/stars/half-star.png')} />   
                        }
                        {rating >= 3 && rating<=4 && 
                            <Image style={styles.star} source={require('../../../assets/stars/34star.png')} />   
                        }
                        {rating >4 && 
                            <Image style={styles.star} source={require('../../../assets/stars/full-star.png')} />   
                        }
                    </View>
                    <View>
                        {ratingList.length==1? 
                            <Text style={[{fontSize:10, fontWeight:300}, styles.white]}>
                                {ratingList.length} vote
                            </Text>
                            :   <Text style={[{fontSize:10, fontWeight:300}, styles.white]}>
                                    {ratingList.length} votes
                                </Text>
                        }  
                    </View>                        
                </View>
                        <View>
                        <Text style={[{fontSize:12, fontWeight:300}, styles.white]}>${hourly_rate}/hr</Text>
                        </View>
                        
                    </View>
                </View>
                <View>
                    <Image source={{uri : imgUrl}} style={styles.imgUrl} />
                </View>
            </View>
            
            <View>
                <Text style={styles.about}>{about}</Text>
            </View>

            <View style={styles.emojies_container}>
                <View style={styles.emoji_info}>
                    <View>
                        <Text style={styles.emojies}>😊</Text>
                    </View>
                    <View>
                        <Text style={styles.white}>{ratingDistribution['3.75-5']} votes</Text>
                    </View>
                </View>

                <View style={styles.emoji_info}>
                    <View>
                        <Text style={styles.emojies}>😐</Text>
                    </View>
                    <View>
                        <Text style={styles.white}>{ratingDistribution['2.5-3.75']} votes</Text>
                    </View>
                </View>

                <View style={styles.emoji_info}>
                    <View>
                        <Text style={styles.emojies}>😡</Text>
                    </View>
                    <View>
                        <Text style={styles.white}>{ratingDistribution['0-2.5']} votes</Text>
                    </View>
                </View>
            </View>
               
            <TouchableOpacity onPress={sendCancelRequest}>
                {!request && <Text style={styles.request}>Request doctor -&gt;</Text>}
                {(request=='requested') && <Text style={[styles.request,{color:"red"}]}>Cancel request</Text>}
            </TouchableOpacity>

            <View>
                <CommentList id={id} request={request} onRatingChange={onRatingChange} userRating={userRating} />
            </View>   
        </ScrollView> 
        </LinearGradient>       
    ) 
}

const styles = StyleSheet.create({
    big_container:{
        flex:1,
        paddingTop: 20,
        paddingHorizontal:20,     
    },
    profile:{
        flexDirection:'row',
        marginBottom:20,
        justifyContent:'space-between',
    },
    white:{
        color:CustomColors.white,
    },
    fullname:{
        flexDirection:'column',
        width:'60%' 
    },
    name:{
        fontSize:26,
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
        color:CustomColors.white,
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
        gap:2,
        alignItems:'center'
    },
    cost_circle:{
        height:45,
        width:45,   
        backgroundColor:CustomColors.blue,
        borderRadius:22.5,
    },
    star:{
        width:30,
        height:30,
    },
    subTitle:{
        fontSize:14,
        fontWeight:'bold'
    },
    emojies_container:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:20
    },
    emojies:{
        fontSize:25
    },
    emoji_angry:{
        color:'red'
    },
    emoji_info:{
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    },
    request:{
        color: CustomColors.white,
        alignSelf:'flex-end',
        paddingBottom:10
    },
    comment:{
        color: CustomColors.white,
        alignSelf:'flex-start',
        paddingBottom:10
    }
})