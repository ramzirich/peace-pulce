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
        <Stack.Navigator initialRouteName="home"> 
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
