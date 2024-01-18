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
import Songs from './src/pages/song/Songs';
import Song from './src/pages/song/Song';
import VideoPlayer from './src/pages/video/CustomVideoPlayer';
import CustomVideoPlayer from './src/pages/video/CustomVideoPlayer';
import VideoChat from './src/pages/VideoCat/VideoChat';


function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={storee}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="psychiatrists"> 
          <Stack.Screen name="login" component={Login} /> 
          <Stack.Screen name="register" component={Registration} /> 
          <Stack.Screen name="home" component={Home} /> 
          <Stack.Screen name="psychiatrists" component={ListOfPsychiatrist} /> 
          <Stack.Screen name="psychiatrist" component={PsychiatristInfo}  
          options={{title: 'id'}} /> 
          {/* <Stack.Screen name="songs" component={Songs} />   */}
          <Stack.Screen name="song" component={Song} />  
          <Stack.Screen name="video" component={CustomVideoPlayer} />  
          <Stack.Screen name="video-chat" component={VideoChat} />  
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