import { Button, FlatList, SafeAreaView, ScrollView, SectionList, Text, TouchableOpacity, View } from "react-native"
import { Comment } from "./Comment"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const CommentList = ({id}) =>{
    let perPage =2;
    const [commentList, setCommentList] = useState([]);

    useEffect(() =>{
        const fetcData = async() =>{
            try{
                const authToken = await AsyncStorage.getItem('authToken');
                const commentResponse = await axios.get(`${config.apiUrl}/patient_comments/${id}?perPage=${perPage}&page=1`,{
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                setCommentList(commentResponse?.data)
            }catch(error){
                console.error('Error fetching user data f:', error.message);
            }
        }
        fetcData();
    }, [])

    const loadMore = async() =>{
        const authToken = await AsyncStorage.getItem('authToken');
        perPage = perPage+2;
        const commentResponse = await axios.get(`${config.apiUrl}/patient_comments/${id}?perPage=${perPage}&page=1`,{
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

    return(
        <>
        <View style={{ marginTop: 20, paddingBottom: 25 }}>
    {commentList.length > 0 ? (
      commentList.map((item) => (
        <Comment key={item.id} item={item} />
      ))
    ) : (
      <Text>No comment</Text>
    )}
    <Button title="Load more" onPress={loadMore}></Button>
  </View> 
  
  </>    
    )
} 