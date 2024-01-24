import React, { useState, useEffect } from 'react';
import { RNCamera } from 'react-native-camera';
import detectFaces from '../../utils/faceDetection';
// import { detectFaces } from './utils/faceDetection';

const CameraScreen = () => {
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    const camera = {
      type: RNCamera.Constants.Type.front,
    };

    const capture = async () => {
      if (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        const detectedFaces = await detectFaces(data.uri);
        setFaces(detectedFaces);
      }
    };

    setInterval(capture, 500); 
  }, [camera]);

  return (
    <RNCamera ref={(ref) => { camera = ref; }} {...camera}>
      {/* Render detected faces and emotions */}
    </RNCamera>
  );
};

export default CameraScreen;