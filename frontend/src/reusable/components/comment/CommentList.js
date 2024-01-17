import { Button, FlatList, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Comment } from "./Comment"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "react-test-renderer"
import { CustomButton } from "../../elements/Button/CustomButton"

export const CommentList = ({id}) =>{
    let perPage =2;
    const [commentList, setCommentList] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    console.log(commentCount)

    useEffect(() =>{
        const fetcData = async() =>{
            try{
                const authToken = await AsyncStorage.getItem('authToken');
                const commentResponse = await axios.get(`${config.apiUrl}/patient_comments/${id}?perPage=${perPage}&page=1`,{
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
        <View style={{ marginTop: 20, paddingBottom: 25 }}>
            {commentList.length > 0 ? (
            commentList.map((item) => (
                <Comment key={item.id} item={item} />
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
    )
} 

const styles = StyleSheet.create({
    button:{
        width:'50%',
        alignSelf: 'center'
    }
})