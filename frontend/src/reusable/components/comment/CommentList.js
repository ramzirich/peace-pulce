import { Button, FlatList, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Comment } from "./Comment"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { config } from "../../../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "react-test-renderer"
import { CustomButton } from "../../elements/Button/CustomButton"
import { CustomColors } from "../../../styles/color"

export const CommentList = ({id, request}) =>{
    let perPage =2;
    const [commentList, setCommentList] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [showInput, setShowInput] = useState(false);
    const perPageRef = useRef(perPage);

    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const authToken = await AsyncStorage.getItem('authToken');
                const commentResponse = await axios.get(`${config.apiUrl}/patient_comments/${id}?perPage=${perPageRef.current}&page=1`,{
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
                setCommentList(commentResponse?.data)
            }catch(error){
                console.error('Error fetching user data f:', error.message);
            }
        }
        fetchData();
    }, [id])

    const loadMore = async() =>{
        const authToken = await AsyncStorage.getItem('authToken');
        
        perPageRef.current = perPageRef.current + 2;
        console.log(perPageRef.current)
        const commentResponse = await axios.get(`${config.apiUrl}/patient_comments/${id}?perPage=${perPageRef.current}&page=1`,{
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });       
        setCommentList(commentResponse.data)
    }

    renderItem = ({item}) =>{
        return(
            <Comment item={item}/>
        )
    }

    const fetchCommentData = async() =>{
        try{
            const authToken = await AsyncStorage.getItem('authToken');
            const commentResponse = await axios.get(`${config.apiUrl}/patient_comments/${id}?perPage=${perPageRef.current}&page=1`,{
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
            setCommentList(commentResponse?.data)
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

    return(
        <View>
            {
                request == 'accepted' && 
                    <TouchableOpacity>
                        <Text style={styles.addcomment}>
                            Add Comment
                        </Text>
                    </TouchableOpacity>
                
            }
            { request == 'accepted' &&
                <TextInput
                    value={newComment}
                    onChangeText={(text) => setNewComment(text)}
                    placeholder="Type your comment..."
                    multiline
                    style={styles.input}
                />
            }
            <View style={{ marginTop: 20, paddingBottom: 25 }}>
                {commentList.length > 0 ? (
                commentList.map((item) => (
                    <Comment key={item.id} item={item}  onDelete={() => deleteComment(item.id)}/>
                ))
                ) : (
                    <></>
                /* <Text>No comment</Text> */
                )}
                {commentCount>commentList.length &&
                    <CustomButton title="Load more"
                        colorOfButton= '#8962f3'
                        onPress={loadMore}
                    />
                }
            </View> 
        </View>
        
    )
} 

const styles = StyleSheet.create({
    button:{
        width:'50%',
        alignSelf: 'center'
    },
    input:{
        backgroundColor:CustomColors.white,
        borderWidth: 0.5,
        borderRadius:5,
        borderColor:'#e782f5',
        paddingHorizontal:10
    },
    addcomment:{
        color:CustomColors.white,
        marginBottom:5
    }
})