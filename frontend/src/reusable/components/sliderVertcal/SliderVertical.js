import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"
import { Card } from "../card/Card"
// import { useNavigate } from "react-router-dom"


export const SliderVertical  = ({userList, dr=null, navigation}) =>{
    renderItem = ({item}) =>{
        return(
            <Card dr={dr} item={item} navigation={navigation} 
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
