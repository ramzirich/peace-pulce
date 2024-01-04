import React from 'react';
import { SafeAreaView, Switch, Text } from 'react-native';

import { Route, Routes } from 'react-router-dom';
import { NativeRouter } from 'react-router-native';
import Login from './src/pages/Login/Login';
import Home from './src/pages/Home/Home';
import { ListOfPsychiatrist } from './src/pages/listOfPsychiatrist/ListOfPsychiatrist';
import { PsychiatristInfo } from './src/pages/psychiatrist/PsychiatristInfo';
import { Provider } from 'react-redux';
import storee from './src/redux/storee';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';






function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
  //   <SafeAreaView>
  //   <NativeRouter> 
  //     <Routes>
  //       <Route path="/" element={<Login/>} /> 
  //      </Routes>
  //    </NativeRouter> 
  //  </SafeAreaView>
  
  // <Login />

/* <Text>Hii</Text> */


    // <Provider store={storee}>
    //   <NativeRouter> 
    //     <Routes>
    //       <Route path="/" element={<Login/>} /> 
    //        <Route path='/home' element={<Home/>} />
    //       <Route path='/psychiatrists' element={<ListOfPsychiatrist/>} />
    //       <Route path='/psychiatrist' element={<PsychiatristInfo/>} /> 
    //     </Routes>
    //   </NativeRouter> 
    //  </Provider>

    <Provider store={storee}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name="login" component={Login} /> 
           <Stack.Screen name="home" component={Home} /> 
           <Stack.Screen name="psychiatrists" component={ListOfPsychiatrist} /> 
             <Stack.Screen name="psychiatrist" component={PsychiatristInfo}  
             options={{title: 'id'}} />   
        </Stack.Navigator>
      </NavigationContainer>
     </Provider>



  // <SafeAreaView>
    // <NativeRouter> 
    //   <Routes>
    //     <Route path="/register" element={<Register/>}/> 
    //     <Route path="/" element={<Login/>}/> 
        // <Route path="/home" element={<AuthProvider><Home /></AuthProvider>} />
    //   </Routes>
    // </NativeRouter>
    // <AuthProvider>
    //   <AppNavigator />
    // </AuthProvider>
  // </SafeAreaView>
    
  )
}
// import store from './src/redux/storee';

export default App;
