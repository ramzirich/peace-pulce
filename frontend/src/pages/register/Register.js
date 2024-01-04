import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

import { CustomColors } from '../../styles/color';
import { CustomButton } from '../../reusable/elements/Button/CustomButton';
import { Input } from '../../reusable/elements/Input/Input';
import { config } from '../../../config';
import axios from 'axios';

const Registration = () => {
    // const to = AsyncStorage.getItem('user');
    // const err = JSON.parse(to);
    // console.log(err);
  const [inputs, setInputs] = React.useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }else if(inputs.email.length>100){
        handleError('Email cannot exceed 100 characters', 'email');
        isValid = false;
    }

    if (!inputs.first_name) {
      handleError('Please input first name', 'first_name');
      isValid = false;
    }else if(inputs.first_name.length>20){
        handleError('First name cannot exceed 20 characters', 'first_name');
        isValid = false;
    }

    if (!inputs.last_name) {
        handleError('Please input last name', 'last_name');
        isValid = false;
      }else if(inputs.last_name.length>20){
          handleError('last name cannot exceed 20 characters', 'last_name');
          isValid = false;
      }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError('Min password length of 8', 'password');
      isValid = false;
    }else if(inputs.password.length>20){
        handleError('last name cannot exceed 20 characters', 'last_name');
        isValid = false;
    }else if(!inputs.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,20}$/)){
        handleError('The password must contain at least one uppercase letter, one lowercase letter,' +
                        'one numeric digit, one special character.', 'password');
    }

    if (isValid) {
      register(inputs);
    }
  };

  const register = async(inputs) =>{
    try{
        const response = await axios.post(`${config.apiUrl}/register`, inputs);
        await AsyncStorage.setItem('authToken', response.data.authorisation.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user))
        
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
    <SafeAreaView style={{backgroundColor: CustomColors.white, flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>

        <Text style={{color: CustomColors.black, fontSize: 40, fontWeight: 'bold'}}>
          Register
        </Text>
        <Text style={{color: CustomColors.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Register
        </Text>

        <View style={{marginVertical: 20}}>
            <Input
                onChangeText={text => handleOnchange(text, 'first_name')}
                onFocus={() => handleError(null, 'first_name')}
                label="First Name"
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

          <CustomButton title="Register" onPress={validate} />
          {/* <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have account ?Login
          </Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;