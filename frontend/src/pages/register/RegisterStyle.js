import { StyleSheet } from "react-native";
import { CustomColors } from "../../styles/color";

export const registerStyles = StyleSheet.create({
    pageContainer :{
        backgroundColor: CustomColors.white,
        flex: 1
    },

    contentContainer:{
        paddingTop: 50,
        paddingHorizontal: 20
    },

    textStyle:{
        color: CustomColors.grey,
        fontSize: 18,
        marginVertical:10
    }
})