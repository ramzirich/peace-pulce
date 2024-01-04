import { Button, FlatList, SafeAreaView, ScrollView, SectionList, Text, TouchableOpacity, View } from "react-native"
import { Comment } from "./Comment"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const CommentList = ({id}) =>{
    // const [perPage, setPerPage] = useState(2); 
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
        const commentResponse = await axios.get(`${config.apiUrl}/patient_comments/5?perPage=${perPage}&page=1`,{
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        setCommentList(commentResponse.data)
    }
//     console.log(commentList)
//   console.log(perPage)
    renderItem = ({item}) =>{
        return(
            <Comment item={item}/>
        )
    }

    // const ListItem = ({ item }) => {
    //     return (
    //       <Comment item = {item} />
    //   };

    return(
        <View style={{marginTop:20}}>
            {commentList.length>0 ? <FlatList 
                data={commentList}
                renderItem={renderItem}
                // stickySectionHeadersEnabled={false}
                keyExtractor={(item) => item.id }
            /> : <Text>No comment</Text>}
            <Button title="Load more" onPress={loadMore}></Button>
        </View>
    //     <View >
    //     {commentList && commentList.length>0?
    //         <SafeAreaView style={{ flex: 1 }}>
    //     <SectionList
    //       contentContainerStyle={{ paddingHorizontal: 10 }}
    //       stickySectionHeadersEnabled={false}
         
    //       sections={commentList}
    //       renderItem={renderItem}
    //     />
    //   </SafeAreaView> :
    //   <Text>No comment</Text>
    //         }
      
    // </View>
        
    )
} 