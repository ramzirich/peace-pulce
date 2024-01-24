import React from "react"
import { config } from "../../../config"
import LinearGradient from "react-native-linear-gradient"
import { useSelector } from "react-redux";
import { Image, ScrollView, Text, View } from "react-native";

export default VolunteerUser = ({route}) =>{
    const {id, doctorInfo} = route.params;
    const {userInfo} = useSelector(state => state.userInfoReducer)
    const {first_name, last_name, about, img_url } = volunteerInfo;
    const imgUrl = `${config.imgUrl}${img_url}` 
    return(
        <LinearGradient style={styles.big_container}
        colors={['#8962f3', '#4752e2','#214ae2']} 
        >     
        <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Image source={{uri : imgUrl}} style={styles.image} /> */}
        <View style={styles.profile}>
            <View style={styles.fullname}>
                <Text style={[styles.name, styles.white]}>Dr. {first_name}</Text>
                <Text style={[styles.name, styles.white]}>{last_name}</Text>
                <Text style={[styles.degree, styles.white]}>{specialization}</Text>
                <Text style={[styles.degree, styles.white]}>{degree}</Text>
                
                <View style={{flexDirection:"row", gap:30, alignItems:'center'}}>
                    <View>
                        <Text style={[{fontSize:12, fontWeight:300}, styles.white]}>${hourly_rate}/hr</Text>
                    </View>    
                </View>
                <View style={{marginTop: 7, flexDirection:'row', alignItems:'center', gap:8}}>
                    <View>
                        <Image source={require('../../../assets/images/phone.png')} 
                                style={[styles.icon]}/>
                    </View>
                    <View>
                        <Text onPress={() =>navigation.navigate('call', {phone})} style={{color:'white'}}>
                            Call me
                        </Text>
                    </View>
                </View>
            </View>
            <View>
                <Image source={{uri : imgUrl}} style={styles.imgUrl} />
            </View>
        </View>
        
        <View style={styles.aboutContainer}>
            <Text style={styles.aboutheader}>About</Text>
            <Text style={styles.about}>{about}</Text>
        </View>
        </ScrollView>
        </LinearGradient>
    )
}