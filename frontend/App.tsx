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
        </Stack.Navigator>
      </NavigationContainer>
     </Provider>
  )
}

export default App;



// FAILURE: Build failed with an exception.

// * What went wrong:
// A problem occurred configuring root project 'frontend'.
// > Could not determine the dependencies of null.
//    > Could not resolve all task dependencies for configuration ':classpath'.
//       > Could not resolve com.google.gms:google-services:4.4.0.
//         Required by:
//             project :
//          > Could not resolve com.google.gms:google-services:4.4.0.
//             > Could not get resource 'https://dl.google.com/dl/android/maven2/com/google/gms/google-services/4.4.0/google-services-4.4.0.pom'.
//                > Could not GET 'https://dl.google.com/dl/android/maven2/com/google/gms/google-services/4.4.0/google-services-4.4.0.pom'.  
//                   > No such host is known (dl.google.com)
//          > Could not resolve com.google.gms:google-services:4.4.0.
//             > Could not get resource 'https://repo.maven.apache.org/maven2/com/google/gms/google-services/4.4.0/google-services-4.4.0.pom'.
//                > Could not GET 'https://repo.maven.apache.org/maven2/com/google/gms/google-services/4.4.0/google-services-4.4.0.pom'.     
//                   > No such host is known (repo.maven.apache.org)

// * Try:
// > Run with --stacktrace option to get the stack trace.
// > Run with --info or --debug option to get more log output.
// > Run with --scan to get full insights.
// > Get more help at https://help.gradle.org.

// BUILD FAILED in 21s
// info Run CLI with --verbose flag for more details.