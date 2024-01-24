import React from "react"
import { config } from "../../../config"
import LinearGradient from "react-native-linear-gradient"


export default VolunteerUser = () =>{
    const {id, doctorInfo} = route.params;
    const {userInfo} = useSelector(state => state.userInfoReducer)
    const {first_name, last_name, about, img_url } = volunteerInfo;
    const imgUrl = `${config.imgUrl}${img_url}` 
    return(
        <LinearGradient>

        </LinearGradient>
    )
}