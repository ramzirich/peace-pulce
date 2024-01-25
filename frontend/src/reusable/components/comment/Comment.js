import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { config } from "../../../../config";
import { CustomColors } from "../../../styles/color";
import { useSelector } from "react-redux";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const Comment = ({item, onDelete}) =>{
    const {userInfo} = useSelector(state => state.userInfoReducer)
    const [isEditing, setIsEditing] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(item.comment);

    let imagePath = null
    if(item.user.img_url){
        imagePath = `${config.imgUrl}${item.user.img_url}`;
    }
    function formatDate(inputDateString) {
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        };
      
        const formattedDate = new Date(inputDateString).toLocaleDateString(undefined, options);
        return formattedDate;
      }
      
      const inputDateString = item.user.created_at;
      const formattedDate = formatDate(inputDateString);

      const startEditing = () => {
        setIsEditing(true);
      };
    
      const cancelEditing = () => {
        setIsEditing(false);
        setUpdatedComment(item.comment);
      };

      updateComment= async()=>{
        try {
            const authToken = await AsyncStorage.getItem('authToken');

            const requestResponse = await axios.post(`${config.apiUrl}/patient_comment/update/${item.id}`,{
                comment: updatedComment
            }, {
                headers:{
                    'Authorization': `Bearer ${authToken}`
                }
            });
            setIsEditing(false);
            Keyboard.dismiss();
            const updatedCommentFromApi = requestResponse.data.data.comment;
            setUpdatedComment(updatedCommentFromApi);
          } catch (error) {
            console.error('Error updating comment:', error.message);
          }
      }
   
    return(
        <View style={styles.container}>
            {imagePath ?
                <View style={styles.space_between}>
                    <View style={styles.comment_profile}>
                        <View style={styles.img_container}>  
                            <Image source={{ uri: imagePath }} style={styles.img} resizeMode="cover"/>    
                        </View> 
                        <View>
                            <Text style={styles.user_name}>{item.user.first_name} {item.user.last_name}</Text> 
                            <Text style={styles.date}>{formattedDate}</Text> 
                        </View>
                    </View>
                    {userInfo.id == item.patient_id &&
                        <View style={[styles.row_gap_ten,{gap:20} ]}>
                            <TouchableOpacity onPress={startEditing}>
                                <Image style={styles.icon} source={require('../../../../assets/images/edit.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onDelete()}>
                                <Image style={[styles.icon]} source={require('../../../../assets/images/delete.png')}/>
                            </TouchableOpacity>
                        </View>
                    }
                </View>      
                :   <TouchableOpacity style={styles.img}>
                        <Text style={{fontSize:10, alignItems:'center'}}>No image</Text>
                    </TouchableOpacity>       
            }
            {isEditing ? (
                <TextInput
                value={updatedComment}
                onChangeText={(text) => setUpdatedComment(text)}
                multiline
                autoFocus
                />
            ) : (
                <Text style={styles.comment}>{updatedComment}</Text>
            )}
            {isEditing && (
                <View style={styles.row_gap_ten}>
                <TouchableOpacity onPress={updateComment}>
                    <Image style={styles.icon} source={require('../../../../assets/images/done.jpg')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelEditing}>
                    <Image style={styles.icon} source={require('../../../../assets/images/cancel.jpg')} />
                </TouchableOpacity>
                </View>
            )}
        </View>
    ) 
}

const styles = StyleSheet.create({
    container:{
        marginBottom:10,
        borderWidth: 1, 
        borderColor: '#ddd',
        borderRadius: 10,
        padding:15, 
        backgroundColor: CustomColors.white,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    icon:{
        height:20,
        width:20,
    },
    space_between:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    row_gap_ten:{
        flexDirection:'row',
        gap:10,
    },
    img_container:{
        marginBottom: 7   
    },  
    img:{
        height:50,
        width:50,
        borderRadius:25,
        backgroundColor:CustomColors.grey,
        justifyContent:'center',
        paddingLeft:3
    },
    comment_profile:{
        flexDirection:'row',
        gap:5
    },
    comment:{
        marginBottom:5
    },
    comment_creation:{
        flexDirection:'row',
        gap: 10
    },
    user_name:{
        fontWeight:'bold'
    },
    date:{
        fontWeight: '300',
        fontSize:12
    }
})