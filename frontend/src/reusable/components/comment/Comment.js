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

            <Text style={styles.comment}>{item.comment}</Text>
            <View style={styles.comment_creation}>
                <View>
                    <Text style={styles.user_name}>{item.user.first_name} {item.user.last_name}</Text>
                </View>
                <View>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
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
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
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
        fontWeight: '300'
    }
})