import { Button, Text, TouchableOpacity, View } from "react-native";
import { CustomColors } from "../../../styles/color";

export const Square= ({tag, img_url=CustomColors.darkBlue, onPress = () =>{}}) =>{
    return(
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
            onPress={onPress}
                style={{backgroundColor:img_url, height:65, width:65, marginBotton: 5, borderRadius:10}} />
            <Text style={{fontSize:10}}>{tag}</Text>
        </View>     
    )
}