import { config } from "../../../config"
import { Card } from "../../reusable/components/card/Card"
import LinearGradient from "react-native-linear-gradient"
import { CustomColors } from "../../styles/color"


export const ListOfVolunteer = ({navigation}) =>{
    const [volunteers, setVolunteers] = React.useState([]);

    useEffect(() =>{
        const fetchUserData = async() =>{
            try{
                const response =await  axios.get(`${config.apiUrl}/volunteers`);
                setVolunteers(response.data)
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData(); 
    }, [])
    const users = volunteers.map(volunteer => ({
        about :volunteer.about,
        id:volunteer.id,
        first_name: volunteer.user.first_name,
        last_name: volunteer.user.last_name,
        img_url: volunteer.user.img_url,
        phone:volunteer.user.phone
    }));
  
    return(
        <LinearGradient 
            colors={['#373b39','#214ae2', '#4752e2','#8962f3']} 
            style={{flex:1, paddingBottom:50, paddingTop:40, }}>
            <HeaderButton  navigation={navigation} />
            {doctors.length===0?     
                <Text style={{color:CustomColors.white, padding:40, fontSize:20}}>Loading...</Text> :
                <View style={{alignItems:'center', marginTop:20}}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                        data={users}
                        renderItem={({item})=>{
                        return <Card item={item} dr='Dr' navigation={navigation} pathName='psychiatrist'/>
                        }}
                        keyExtractor={(item) => item.id }
                        contentContainerStyle={{ paddingBottom: 20 }} 
                    />
                </View> 
            }
        </LinearGradient>
    )
} 