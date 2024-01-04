import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { config } from "../../../../config";
import { CustomColors } from "../../../styles/color";

export const Comment = ({item}) =>{
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
      
      // Example usage:
      const inputDateString = item.user.created_at;
      const formattedDate = formatDate(inputDateString);
   
    return(
        <View style={styles.container}>
            {imagePath ? 
                <View style={styles.img_container}>  
                    <Image source={{ uri: imagePath }} style={styles.img} resizeMode="cover"/>   
                </View> : 
                <TouchableOpacity style={styles.img}>
                    <Text style={{fontSize:10, alignItems:'center'}}>No image</Text>
                </TouchableOpacity> 
            }

            <Text>{item.comment}</Text>
            <View style={styles.comment_creation}>
                <View>
                    <Text style={styles.user_name}>{item.user.first_name} {item.user.last_name}</Text>
                </View>
                <View>
                    <Text>{formattedDate}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:10,
        // flexDirection:'row',
       
    },
    img_container:{
        // flexDirection:'row',
        // justifyContent:"flex-start",
       
    },  
    img:{
        height:50,
        width:50,
        borderRadius:25,
        backgroundColor:CustomColors.grey,
        justifyContent:'center',
        paddingLeft:3
    },
    comment_creation:{
        flexDirection:'row',
        gap: 10
    },
    user_name:{
        fontWeight:'bold'
    }
})