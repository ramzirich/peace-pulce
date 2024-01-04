import React from 'react';
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { CustomColors } from '../../styles/color';
import { Input } from '../../reusable/elements/Input/Input';
import { CustomButton } from '../../reusable/elements/Button/CustomButton';
import { config } from '../../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuth } from '../../utils/AuthContext';
import { validateLogin } from './LoginValidation';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { setFirstName, setLastName } from '../../redux/actions/userActions';
import { setUserInfo } from '../../redux/actions/userActions';
// import { useNavigation } from '@react-navigation/native';


export default Login = ({navigation}) =>{
    // const {firstName, lastName} = useSelector(state, state.userReducer)
    const [inputs, setInputs] = React.useState({
        email:'',
        password:''
    });

    const [errors, setErrors] = React.useState({});

    const dispatch = useDispatch();

    // const navigate = useNavigate();
    // const navigation = useNavigation();

    const validate = () => {
        const isValid = validateLogin(inputs, handleError);
        if (isValid) {
          login(inputs);
        }
      };

    const login = async(inputs) =>{
        try{
            const response = await axios.post(`${config.apiUrl}/login`, inputs);
            await AsyncStorage.setItem('authToken', response.data.authorisation.token);
            const authToken = await AsyncStorage.getItem('authToken');
            dispatch(setFirstName(response.data.user.first_name))
            dispatch(setLastName(response.data.user.last_name))
            dispatch(setUserInfo(response.data.user))
            // console.log(authToken);
            // console.log(response.data.user)
            // dispatch(setUser(response.data.user))
            // console.log(response.data.authorisation.token);
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

    return(
        <SafeAreaView style={styles.bigContainer}>
            <View style={styles.smallContainer}>
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

                <CustomButton title="Login" onPress={validate} />
                {/* <Text
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 16,
                    }}>
                    Already have account ?Login
                </Text> */}
                {/* </View> */}
            </View>
        </SafeAreaView>
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
    }
})