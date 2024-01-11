import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"
import { Card } from "../card/Card"
// import { useNavigate } from "react-router-dom"


export const SliderVertical  = ({userList, dr=null, navigation}) =>{
//    const navigate = useNavigate();
    renderItem = ({item}) =>{
        return(
            <Card first_name={item.first_name} text={item.about}
              last_name={item.last_name} dr={dr} imgUrl={item.img_url}
              id={item.id} navigation={navigation}
              />
        ) 
    }

    return(
        <View style={{alignItems:'center', marginTop:20}}>
            <FlatList 
                data={userList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id }
            />
        </View>
    )
} 
