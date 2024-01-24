import React from 'react';
import CameraScreen from './CameraScreen';
import EmotionDisplay from './EmotionDisplay';
import { View } from 'react-native';


export default FaceEmotionDetection = () => {
  return (
    <View style={{ flex: 1, backgroundColor:'red' }}>
      <CameraScreen />
      <EmotionDisplay />
    </View>
  );
};
