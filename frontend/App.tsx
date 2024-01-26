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
import VolunteerProfile from './src/pages/Volunteer/VolunteerProfile';
import FaceEmotionDetection from './src/pages/FaceEmotion/FaceEmotionDetection';
import EmotionsPage from './src/pages/FaceEmotion/EmotionsPage';
import VolunteerUser from './src/pages/Volunteer/VolunteerUser';
import { ListOfPatientsForVolunteer } from './src/pages/ListOfPatients/ListOfPatientsForVolunteer';
import { PatientForVolunteer } from './src/pages/Patient/PatientForVolunteer';
import { RequestForVolunteer } from './src/pages/Request/requestForVolunteer';

//ource={require('../../../assets/images/try.jpeg')}

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={storee}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
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
          <Stack.Screen name="face" component={EmotionsPage} options={{ headerShown: false }} />  
          <Stack.Screen name="patient-for-volunteer" component={PatientForVolunteer}  
          options={{title: 'id', headerShown: false }}  />  
          <Stack.Screen name="patients-list-volunteer" component={ListOfPatientsForVolunteer} options={{ headerShown: false }} />  
          <Stack.Screen name="volunteer-profile" component={VolunteerProfile} options={{ headerShown: false }} />
          <Stack.Screen name="patient" component={PatientInfo}  
          options={{title: 'id', headerShown: false }}  /> 
          <Stack.Screen name="request-forvolunteer" component={RequestForVolunteer} options={{ headerShown: false }} />   
          <Stack.Screen name="volunteer-user" component={VolunteerUser}  
          options={{title: 'id', headerShown: false }}  />  
        </Stack.Navigator>
      </NavigationContainer>
     </Provider>
  )
}

export default App;
