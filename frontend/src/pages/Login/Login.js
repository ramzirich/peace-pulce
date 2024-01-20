import React from 'react';
import { Image, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../../styles/color';
import { Input } from '../../reusable/elements/Input/Input';
import { CustomButton } from '../../reusable/elements/Button/CustomButton';
import { config } from '../../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateLogin } from './LoginValidation';
import { useDispatch } from 'react-redux';
import { setFirstName, setLastName } from '../../redux/actions/userActions';
import { setUserInfo } from '../../redux/actions/userActions';
import LinearGradient from 'react-native-linear-gradient';


export default Login = ({navigation}) =>{
    const [inputs, setInputs] = React.useState({
        email:'',
        password:''
    });

    const [errors, setErrors] = React.useState({});

    const dispatch = useDispatch();

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

    return(
        <LinearGradient 
            // colors={['#8962f3', '#4752e2','#214ae2', '#1d50e0']} 
            colors={['#8962f3', '#4752e2','#214ae2']} 
            style={styles.bigContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <View>
                    <Image source={require('../../../assets/images/logo22.png')} style={styles.logo} /> 
                </View>
                <View style={styles.smallContainer}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        label="Email"
                        placeholder="example@gmail.com"
                        error={errors.email} 
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        label="Password"
                        placeholder="********"
                        error={errors.password}
                        password 
                    />
                    
                    <View style={styles.btn}>
                        <CustomButton title="Log in" onPress={validate} />
                    </View>         
                    <Text
                        onPress={() => navigation.navigate('register')}
                        style={{
                        fontSize: 12,
                        color:CustomColors.white,
                        marginTop:5
                        }}>
                        Don't have an account? Register
                    </Text>
                </View>
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
        paddingTop:20,
    },
    logo:{
        height:200,
        width:200,
        alignSelf:'center',
        marginBottom: 5,
    },
    smallContainer:{
        padding: 30, 
        backgroundColor:CustomColors.purple,
        borderRadius:10,
        
    },
    btn:{
        marginTop:20,
        marginBottom:7
    },
})