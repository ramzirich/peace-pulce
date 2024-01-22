/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
//import {register} from '@videosdk.live/react-native-sdk'//
// import { Provider } from 'react-redux';

// const ReduxApp = () => (
//     <Provider store={store}>
//       <App />
//     </Provider> 
//   );
// register()//
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
