import { FlatList, ScrollView, View } from "react-native"
import { Card } from "../card/Card"


export const SliderVertical  = ({userList, dr=null, navigation}) =>{
    renderItem = () =>{
        return userList.map((item) =>(
            <Card key={item.id} dr={dr} item={item} navigation={navigation} pathName='psychiatrist'/>         
        ))       
    }

    return(
        <View style={{alignItems:'center', marginTop:20}}>
            {renderItem()}
        </View>         
    )
} 
