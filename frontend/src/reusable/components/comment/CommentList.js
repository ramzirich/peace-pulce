import { Button, FlatList, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Comment } from "./Comment"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { config } from "../../../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "react-test-renderer"
import { CustomButton } from "../../elements/Button/CustomButton"
import { CustomColors } from "../../../styles/color"

export const CommentList = ({id, request,  onRatingChange, userRating}) =>{
    let perPage =2;
    const [commentList, setCommentList] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [isShowInput, setIsShowInput] = useState(false);
    const [rating, setRating] = useState(userRating);
    const perPageRef = useRef(perPage);
 
    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const authToken = await AsyncStorage.getItem('authToken');
                const commentResponse = await axios.get(`${config.apiUrl}/patient_comments/${id}?perPage=${perPage}`,{
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                const commentCountResponse = await axios.get(`${config.apiUrl}/patient_comments/count/${id}?`,{
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                console.log(commentResponse?.data.data.data)
                setCommentCount(commentCountResponse.data);
                setCommentList(commentResponse?.data.data.data)
            }catch(error){
                console.error('Error fetching user data f:', error.message);
            }
        }
        fetchData();
    }, [id])

    useEffect(()=>{
        setRating(userRating)
        renderStars()
    },[userRating])

    const loadMore = async() =>{
        const authToken = await AsyncStorage.getItem('authToken');
        
        perPageRef.current = perPageRef.current + 2;
        const commentResponse = await axios.get(`${config.apiUrl}/patient_comments/${id}?perPage=${perPageRef.current}`,{
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });    
        setCommentList(commentResponse.data.data.data)
    }

    renderItem = ({item}) =>{
        return(
            <Comment item={item}/>
        )
    }

    const fetchCommentData = async() =>{
        try{
            const authToken = await AsyncStorage.getItem('authToken');
            const commentResponse = await axios.get(`${config.apiUrl}/patient_comments/${id}?perPage=${perPageRef.current}`,{
                headers:{
                    'Authorization': `Bearer ${authToken}`
                }
            });

            const commentCountResponse = await axios.get(`${config.apiUrl}/patient_comments/count/${id}?`,{
                headers:{
                    'Authorization': `Bearer ${authToken}`
                }
            });
    
            setCommentCount(commentCountResponse.data);
            setCommentList(commentResponse?.data.data.data)
        }catch(error){
            console.error('Error fetching user data f:', error.message);
        }
    }

    const deleteComment  = async(commentId) =>{
        try{
            const authToken = await AsyncStorage.getItem('authToken');
            const commentResponse = await axios.post(`${config.apiUrl}/patient_comment/delete/${commentId}`,{},{
                headers:{
                    'Authorization': `Bearer ${authToken}`
                }
            })
            fetchCommentData();
        }catch(error){
            console.error("Error in deleting comment: ", error)
        }
    }
    const showAddComment = () =>{
        setIsShowInput(!isShowInput)
    }

    const submitComment = async () => {
        try {
          const authToken = await AsyncStorage.getItem('authToken');
          const commentResponse = await axios.post(`${config.apiUrl}/patient_comment/create`,
            {
              comment: newComment,
              doctor_id : id,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          fetchCommentData();
          setNewComment(''); 
          setIsShowInput(false)
        } catch (error) {
          console.error('Error submitting comment:', error.message);
        }
      };

      const handleStarClick = async(selectedRating) => {
        try{
            const authToken = await AsyncStorage.getItem('authToken');
            const postRating = await axios.post(`${config.apiUrl}/rating`,
                {
                    rating: selectedRating,
                    doctor_id: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            )
            setRating(selectedRating)
            onRatingChange()
        }catch(error){
            console.log("Error in set rating: ",error)
        }
      };

      const renderStars = () => {
        const stars = [];
        const maxStars = 5;
        for (let i = 1; i <= maxStars; i++) {
          const starStyle = {
            color: i <= rating ? 'gold' : 'gray'
           
          };
          stars.push(
            <TouchableOpacity
              key={i}
              onPress={() => handleStarClick(i)}
              style={styles.star}
            >
              <Text style={starStyle}>★</Text>
            </TouchableOpacity>
          );
        }
    
        return stars;
      };

    return(
        <View>
            {
                request == 'accepted' && 
                    <View style={styles.spacebtw}>
                        <TouchableOpacity onPress={showAddComment}>
                            <Text style={styles.addcomment}>
                                {isShowInput? 'Hide Comment': 'Add Comment'} 
                            </Text>
                        </TouchableOpacity>
                         <View style={styles.row_five}>
                            <View>
                                <Text style={{color:CustomColors.white}}>
                                    Rate
                                </Text>
                            </View>
                            <View style={styles.starsContainer}>{renderStars()}</View> 
                        </View>
                    </View>
                
            } 
            { isShowInput == true &&
                <View style={[styles.spacebtw, {marginTop:5}]}>
                    <TextInput
                        value={newComment}
                        onChangeText={(text) => setNewComment(text)}
                        placeholder="Type your comment..."
                        multiline
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.postBtn} onPress={submitComment}>
                        <Text style={{color:CustomColors.white}}>Post</Text>
                    </TouchableOpacity>
                </View>
            } 
            <View style={{ marginTop: 20, paddingBottom: 25 }}>
                {commentList.length > 0 ? (
                commentList.map((item) => (
                    <Comment key={item.id} item={item}  onDelete={() => deleteComment(item.id)}/>
                ))
                ) : (
                    <></>
                )}
                {commentCount>commentList.length &&
                    <CustomButton title="Load more"
                        colorOfButton= '#8962f3'
                        onPress={loadMore}
                    />
                }
            </View> 
            {/* <TouchableOpacity onPress={showAddComment}>
                            <Text style={styles.addcomment}>
                                Add Comment
                            </Text>
                        </TouchableOpacity> 
            { isShowInput == true &&
                <View style={[styles.spacebtw, {marginTop:5}]}>
                    <TextInput
                        value={newComment}
                        onChangeText={(text) => setNewComment(text)}
                        placeholder="Type your comment..."
                        multiline
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.postBtn} onPress={submitComment}>
                        <Text style={{color:CustomColors.white}}>Post</Text>
                    </TouchableOpacity>
                </View>
            } */}
        </View>
        
    )
} 

const styles = StyleSheet.create({
    button:{
        width:'50%',
        alignSelf: 'center'
    },
    spacebtw:{
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
        alignItems:'center'
    },
    row_five:{
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    },
    input:{
        backgroundColor:CustomColors.white,
        borderWidth: 0.5,
        borderRadius:5,
        borderColor:'#e782f5',
        paddingHorizontal:10,
        width:'75%'
    },
    addcomment:{
        color:CustomColors.white,
        marginBottom:5
    },
    postBtn:{
        height: 40,
        width:'20%',
        backgroundColor:'#8962f3',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    starsContainer: {
        flexDirection: 'row',
        gap:5
      },
      star: {
        fontSize: 20,
      },
})