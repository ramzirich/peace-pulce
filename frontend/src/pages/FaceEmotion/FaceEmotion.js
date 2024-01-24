import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraKitCamera from 'react-native-camera-kit';

export default function FaceEmotion() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [faceData, setFaceData] = useState();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status } = await CameraKitCamera.requestCameraPermission();
      setHasCameraPermission(status === 'authorized');
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const getFaceDataView = () => {
    if (!faceData || faceData.length === 0) {
      return (
        <View style={styles.faces}>
          <Text>No face detected</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.faces}>
          {faceData.map((face, index) => {
            const eyesOpenScore =
              face.leftEyeOpenProbability > 0.4 &&
              face.rightEyeOpenProbability > 0.4;
            const winkingScore =
              !eyesOpenScore &&
              (face.leftEyeOpenProbability < 0.4 ||
                face.rightEyeOpenProbability < 0.4);
            const smilingScore = face.smilingProbability > 0.7;
            return (
              <View key={index}>
                <Text style={styles.faceDescriptions}>
                  Eyes opened: {eyesOpenScore ? '🟢' : '🔴'}
                </Text>
                <Text style={styles.faceDescriptions}>
                  Winking: {winkingScore ? '🟢' : '🔴'}
                </Text>
                <Text style={styles.faceDescriptions}>
                  Smiling: {smilingScore ? '🟢' : '🔴'}
                </Text>
              </View>
            );
          })}
        </View>
      );
    }
  };

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
  };

  return (
    <RNCamera
      style={styles.camera}
      type={RNCamera.Constants.Type.front}
      ratio="16:9"
      onFacesDetected={handleFacesDetected}
      faceDetectorSettings={{
        mode: Camera.Constants.FaceDetection.Mode.accurate,
        detectLandmarks: Camera.Constants.FaceDetection.Landmarks.all,
        runClassifications: Camera.Constants.FaceDetection.Classifications.all,
        minDetectionInterval: 100,
        tracking: true,
      }}
    >
      {getFaceDataView()}
    </RNCamera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faces: {
    backgroundColor: '#fff',
    color: '#000',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceDescriptions: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
});