import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';

import { CustomColors } from '../../styles/color';
import { CustomButton } from '../../reusable/elements/Button/CustomButton';
import { Input } from '../../reusable/elements/Input/Input';
import { config } from '../../../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Registervalidation } from './RegisterValidation';
import { setUserInfo } from '../../redux/actions/userActions';
import LinearGradient from 'react-native-linear-gradient';

export default Registration = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const dispatch = useDispatch();

  const validate = () => {
    const isValid = Registervalidation(inputs, handleError);
    if (isValid) {
      register(inputs);
    } 
  };
  
  const register = async(inputs) =>{
    try{
      const response = await axios.post(`${config.apiUrl}/register`, inputs);
      await AsyncStorage.setItem('authToken', response.data.authorisation.token);
      dispatch(setUserInfo(response.data.user))
      navigation.navigate('home')    
    }catch(error){
      if(error.response?.data.message == 'Wrong credentials'){
        setWrongCredentials(true)
        setTimeout(() => {
            setWrongCredentials(false);
        }, 3000);
        }else{
            console.error("Coudn't login: ", error.response?.data || error.message)
        }
    }
  }

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <LinearGradient  
      colors={['#8962f3', '#4752e2','#214ae2']} 
      style={styles.bigContainer}>
    
      <ScrollView showsVerticalScrollIndicator={false}>
      
      <View>
          <Image source={require('../../../assets/images/logo22.png')} style={styles.logo} /> 
      </View>
      <View style={styles.smallContainer}>
        <Input
          onChangeText={text => handleOnchange(text, 'first_name')}
          onFocus={() => handleError(null, 'first_name')}
          label="First name"
          placeholder="Enter your first name"
          error={errors.first_name} 
        />

        <Input
          onChangeText={text => handleOnchange(text, 'last_name')}
          onFocus={() => handleError(null, 'last_name')}
          label="Last Name"
          placeholder="Enter your last name"
          error={errors.last_name} 
        />

        <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            label="Email"
            placeholder="Enter your email address"
            error={errors.email} 
        />

        <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password 
        />
          
          <View style={styles.btn}>
              <CustomButton title="Register" onPress={validate} />
          </View>    
          {wrongCredentials && <Text style={styles.error}>Wrong Credentials</Text>}        
          <Text
              onPress={() => navigation.navigate('login')}
              style={{
              fontSize: 12,
              color:CustomColors.white,
              marginTop:5
              }}>
              Already have an account ?Login
          </Text>
      </View>
      
  </ScrollView>
 </LinearGradient>
)
}

  const styles = StyleSheet.create({
    bigContainer:{ 
      backgroundColor:CustomColors.white,
      flex:1,
      paddingHorizontal:30,
      flexDirection:'column', 
    },
    logo:{
      height:150,
      width:150,
      alignSelf:'center',
    },
    smallContainer:{
      paddingHorizontal: 30,
      paddingTop:20,
      paddingBottom:15,
      backgroundColor:CustomColors.purple,
      borderRadius:10
    },
    btn:{
      marginTop: 10,
      marginBottom:5
    },
  })