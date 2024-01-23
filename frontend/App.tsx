import React from 'react';

import Login from './src/pages/Login/Login';
import Home from './src/pages/Home/Home';
import { ListOfPsychiatrist } from './src/pages/listOfPsychiatrist/ListOfPsychiatrist';
import { PsychiatristInfo } from './src/pages/psychiatrist/PsychiatristInfo';
import { Provider } from 'react-redux';
import storee from './src/redux/storee';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import Registration from './src/pages/register/Register';
import Song from './src/pages/song/Song';
import CustomVideoPlayer from './src/pages/video/CustomVideoPlayer';
import VideoChat from './src/pages/VideoCat/VideoChat';
import Profile from './src/pages/Profile/Profile';
import Problem from './src/pages/Problem/Problem';
import DoctorProfile from './src/pages/Profile/DoctorProfile';
import { ListOfPatients } from './src/pages/ListOfPatients/ListOfPatients';
import { PatientInfo } from './src/pages/Patient/Patient';
import CallPage from './src/pages/Call/CallPage';
import { RequestFromPatient } from './src/pages/Request/request';
import { ListOfVolunteer } from './src/pages/Volunteer/ListVolunteer';


function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={storee}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login"> 
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} /> 
          <Stack.Screen name="register" component={Registration} options={{ headerShown: false }} /> 
          <Stack.Screen name="home" component={Home} options={{ headerShown: false }} /> 
           <Stack.Screen name="psychiatrists" component={ListOfPsychiatrist}  options={{ headerShown: false }}/> 
          <Stack.Screen name="psychiatrist" component={PsychiatristInfo}  
          options={{title: 'id', headerShown: false }}  /> 
          <Stack.Screen name="song" component={Song}  options={{ headerShown: false }} />  
          <Stack.Screen name="video" component={CustomVideoPlayer} options={{ headerShown: false }} />  
          <Stack.Screen name="video-chat" component={VideoChat} options={{ headerShown: false }} />  
          <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />  
          <Stack.Screen name="problem" component={Problem} options={{ headerShown: false }} /> 
          <Stack.Screen name="doctor-profile" component={DoctorProfile} options={{ headerShown: false }} />
          <Stack.Screen name="call" component={CallPage} options={{ headerShown: false }} />
          <Stack.Screen name="patients" component={ListOfPatients} options={{ headerShown: false }} />
          <Stack.Screen name="request" component={RequestFromPatient} options={{ headerShown: false }} />
          <Stack.Screen name="volunteers" component={ListOfVolunteer} options={{ headerShown: false }} />
          <Stack.Screen name="patient" component={PatientInfo}  
          options={{title: 'id', headerShown: false }}  />  
        </Stack.Navigator>
      </NavigationContainer>
     </Provider>
  )
}

export default App;
