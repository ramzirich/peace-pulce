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

export default Registration = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});

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
      // await AsyncStorage.getItem('authToken');
      dispatch(setUserInfo(response.data.user))
      navigation.navigate('home')    
    }catch(error){
        console.error("Coudn't login: ", error.response?.data || error.message)
    }
  }

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <ScrollView>
    <SafeAreaView style={styles.bigContainer}>
    
    <View>
        <Image source={require('../../../assets/images/logo.jpg')} style={styles.logo} /> 
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
        <Text
            onPress={() => navigation.navigate('login')}
            style={{
            fontSize: 12,
            color:CustomColors.white
            }}>
            Already have an account ?Login
        </Text>
    </View>
    
</SafeAreaView>
</ScrollView>
)
}

  const styles = StyleSheet.create({
    bigContainer:{ 
      backgroundColor:CustomColors.BabyBlue,
      height:'100%',
      paddingHorizontal:30,
      flexDirection:'column', 
      justifyContent:'center' 
    },
    smallContainer:{
      padding: 30, 
      backgroundColor:CustomColors.purple,
      borderRadius:10
    },
    btn:{
      marginTop:20,
      marginBottom:5
    },
      logo:{
      height:200,
      width:200,
      alignSelf:'center',
      marginBottom:20,
      }
  })