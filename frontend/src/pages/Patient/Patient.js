import { Image, Keyboard, Linking, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import { CustomColors } from "../../styles/color"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LinearGradient from "react-native-linear-gradient"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"


export const PatientInfo =({route}) =>{
    const {id, patientInfo} = route.params;
    const {first_name, last_name, img_url, phone, email} = patientInfo;
    const {userInfo} = useSelector(state => state.userInfoReducer);
    const [note, setNote] = useState(null);
    const [typedNote, setTypedNote] = useState(null);
    const [noteId, setNoteId] = useState(0)
    const [isEditing, setIsEditing] = useState(false);
    const [isVisibleNote, setIsVisibleNote] = useState(false)
    const imgUrl = `${config.imgUrl}${img_url}` 
    const navigation = useNavigation();

    const handleEmailPress = () => {
        Linking.openURL(`mailto:${email}`);
      };

    const handlePhonePress = () => {
    Linking.openURL(`tel:${phone}`);
    };
    
    useEffect(() =>{
        const fetchUserData = async() =>{
            try{
                const authToken = await AsyncStorage.getItem('authToken');

                const requestResponse = await axios.get(`${config.apiUrl}/doctor_note/${id}`,{
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                });  
                setNoteId(requestResponse.data.id)
                setNote(requestResponse.data.note)        
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        } 
        fetchUserData();
    }, [])

    const startEditing = () => {
        setIsEditing(true);
      };
    
      const cancelEditing = () => {
        setIsEditing(false);
        setNote(note);
      };

    updateNote= async()=>{
    try {
        const authToken = await AsyncStorage.getItem('authToken');

        const requestResponse = await axios.post(`${config.apiUrl}/doctor_note/update/${noteId}`,{
            note: note
        }, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        setIsEditing(false);
        Keyboard.dismiss();
        const updatednoteFromApi = requestResponse.data.data.note;
        setNote(updatednoteFromApi);
        } catch (error) {
        console.error('Error updating comment:', error.message);
        }
    }

    addNote = async() =>{
        try{
            const authToken = await AsyncStorage.getItem('authToken');
            const requestResponse = await axios.post(`${config.apiUrl}/doctor_note/create`,{
                note: typedNote,
                patient_id : id
            }, {
                headers:{
                    'Authorization': `Bearer ${authToken}`
                }
            });
        }catch(error){
            console.error("Error in posting data: ", error)
        }
    }

    return(   
        <LinearGradient style={styles.big_container}
            colors={['#8962f3', '#4752e2','#214ae2']} 
        >     
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{uri : imgUrl}} style={styles.imgUrl} />
                <View style={styles.profile}>
                    <View style={styles.fullname}>
                        <Text style={[styles.name, styles.white]}>{first_name} {last_name}</Text>
                    </View>
                </View>  

                <View style={styles.spacebtw}>
                    <View style={styles.row_gap}>
                        <Image source={require('../../../assets/images/phone.png')} 
                            style={styles.icon}/>
                        <Text style={[styles.white, styles.text]}
                            onPress={handlePhonePress} underlayColor="transparent"
                        >
                            {phone}
                        </Text>
                    </View>
                    <View style={styles.row_gap}>
                        <Image source={require('../../../assets/images/phone.png')} 
                            style={[styles.icon]}/>
                            <Text style={[styles.white, styles.text]} 
                                onPress={() =>navigation.navigate('call', {phone})}
                            >
                                In App Call
                            </Text>
                    </View>
                </View>

                <View style={[styles.row_gap, {paddingVertical:30}]}>
                    <Image source={require('../../../assets/images/email.png')} 
                        style={[styles.icon,styles.icon_size]}/>
                    <Text 
                        style={[styles.white, styles.text]} onPress={handleEmailPress}
                    >
                        {email}
                    </Text>
                </View>

                {
                    !note &&
                        <>
                            <View style={styles.titleBtn}>
                                <View>
                                    <Text style={[styles.white, styles.text]} 
                                        onPress={() =>setIsVisibleNote(!isVisibleNote)}
                                    >
                                    Add Notes
                                    </Text>
                                </View>
                                {
                                    typedNote &&
                                    <TouchableOpacity style={styles.postBtn}
                                        onPress={addNote}    
                                    >
                                        <Text style={[styles.white,{fontSize:14}]} >POST</Text>
                                    </TouchableOpacity>
                                }
                                
                            </View>
                            {isVisibleNote && 
                                <View style={{paddingTop:20}}>
                                    <View style={styles.noteContainerType}>
                                    <TextInput
                                        value={typedNote}
                                        onChangeText={(text) => setTypedNote(text)}
                                        multiline
                                        autoFocus
                                        style={{width:'100%', color:CustomColors.white}}
                                    />
                                    </View>
                                </View>
                            }
                        </>      
                }

                {note  &&
                    <>
                        <View style={{paddingTop:30,paddingBottom:20}}>
                            <View style={styles.noteContainer}>
                                <View style={styles.spacebtw}>
                                    <View>
                                        <Text style={styles.noteText}>Notes</Text>
                                    </View>
                                    <TouchableOpacity onPress={startEditing}>
                                        <Image style={[styles.noteicon]} 
                                            source={require('../../../assets/images/edit.png')}/>
                                    </TouchableOpacity>
                                </View>
                            {isEditing ? (
                                <TextInput
                                    value={note}
                                    onChangeText={(text) => setNote(text)}
                                    multiline
                                    autoFocus
                                />
                                ) : (
                                <View style={{paddingTop:10}}>
                                    <Text style={styles.comment}>{note}</Text>
                                </View>
                               
                            )}
                            {isEditing && (
                                <View style={styles.spacebtw}>
                                    <TouchableOpacity onPress={cancelEditing}>
                                        <Image style={styles.noteicon} 
                                            source={require('../../../assets/images/cancel.jpg')} 
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={updateNote}>
                                        <Image style={styles.noteicon} 
                                            source={require('../../../assets/images/done.jpg')}     
                                        />
                                        {/* <Text>-&gt;</Text> */}
                                    </TouchableOpacity>
                                </View>
                            )}
                            </View>
                        </View>
                    </>
                }
        </ScrollView> 
        </LinearGradient>       
    ) 
}

const styles = StyleSheet.create({
    big_container:{
        flex:1,
        paddingTop: 40,
        paddingHorizontal:20,     
    },
    profile:{
        flexDirection:'row',
        paddingVertical:40,
        justifyContent:'space-between',
    },
    white:{
        color:CustomColors.white,
    },
    fullname:{
        flexDirection:'column',
        width:'55%', 
    },
    name:{
        fontSize:26,
        fontWeight:'bold',
        color: CustomColors.black,
        letterSpacing:1,
    },
    imgUrl:{
        height:120,
        width:120,
        borderRadius:60,
        alignSelf:'center'
    },
    spacebtw:{
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
        alignItems:'center'
    },
    row_gap:{
        flexDirection:'row',
        gap:7,
        alignItems:'center'
    },
    flexEnd:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    icon:{
        backgroundColor:'transparent', 
        width:16, 
        height:16, 
        tintColor:'white'
    },
    icon_size:{
        width:20,
        height:20
    },
    text:{
        fontSize:16
    },
    noteContainer:{
        padding:20,
        borderWidth: 1, 
        borderColor: '#e782f5',
        borderRadius: 10,
        padding:15, 
        backgroundColor: CustomColors.white,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    row_gap_ten:{
        flexDirection:'row',
        gap:10,
    },
    noteicon:{
        height:20,
        width:20,
    },
    noteText:{
        fontSize:16,
        fontWeight:'500',
        color:"black"
    },
    noteContainerType:{
        borderWidth:1, 
        borderColor:"#e782f5", 
        paddingHorizontal:20, 
        borderRadius:20
    },
    postBtn:{
        height:25,
        width:50,
        backgroundColor: '#8962f3',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7
    },
    titleBtn:{
        paddingTop:'8%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:5
    }
})