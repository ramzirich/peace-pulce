import {launchImageLibrary} from 'react-native-image-picker';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import { Button, Image, Text, View } from 'react-native';
import { useState } from 'react';


export default EmotionsPage = () =>{
  const [detectedEmotion, setDetectedEmotion] = useState('');
  const [imageUri, setImageUri] = useState(null);
  // console.log(imageUri)
  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
    };
    try {
      // const result = await ImagePicker.launchImageLibrary(options);
      // if (!result.cancelled) {
      //   return result.uri;
      // }
       const result = await launchImageLibrary(options);
       if (!result.cancelled) { 
        setImageUri(result.assets[0].uri)
        return result.assets[0].uri;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };
  
  const getImageAndDetectEmotions = async () => {
    // await requestPermission();
    const imageUrl = await selectImage();
    
    if (imageUrl) {
      
      // Process image for emotion detection
      detectEmotionsFromImage(imageUrl);
    }
  };

  const detectEmotionsFromImage = async (imageUrl) => {
    // Load the TensorFlow.js backend and Facemesh model
    console.log('ima',imageUrl)
    await tf.ready();
    console.log("..")
    await facemesh.load();
  
    // Load the image as a TensorFlow Image
    console.log(imageUrl)
    const response = await fetch(imageUrl);
    console.log(response)
    const blob = await response.blob();

    const image = await tf.browser.fromPixels(blob);
  
    // Detect faces in the image
    const predictions = await facemesh.estimateFaces(image);
  
    if (predictions.length > 0) {
      // Analyze facial features and predict emotions
      console.log("prediction",predictions)
      const face = predictions[0];
      // Your custom logic to map facial features to emotions goes here
      // (e.g., based on distance between landmark points)


      const keypoints = predictions[0].scaledMesh;

              const emotions = {
                angry: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 26],
                disgusted: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
                fearful: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
                happy: [48, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
                neutral: [27, 28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 42, 43, 44, 45],
                sad: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
                surprised: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 39, 40, 41],
              };
      
              const distances = [];
              for (let i = 0; i < Object.values(emotions).flat().length; i++) {
                for (let j = i + 1; j < Object.values(emotions).flat().length; j++) {
                  const a = keypoints[Object.values(emotions).flat()[i]];
                  const b = keypoints[Object.values(emotions).flat()[j]];
                  distances.push(Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2)));
                }
              }
              const averageDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
      
              console.log(averageDistance);
      
              let emotion = "unknown";
              if (averageDistance < 35) emotion = "neutral";
              else if (averageDistance < 50) emotion = "happy";
              else if (averageDistance < 70) emotion = "surprised";
              else if (averageDistance < 90) emotion = "sad";
              else if (averageDistance < 110) emotion = "disgusted";
              else if (averageDistance >= 110) emotion = "angry";
      
              console.log(emotion);
              setDetectedEmotion(emotion)
      // const emotion = "neutral"; // Replace with your logic
      // console.log("Predicted emotion:", emotion);
    } else {
      console.log("No face detected in the image");
    }
  
    // Clean up resources
    image.dispose();
  };

  return (
    <View>
      <Button title="Choose Image" onPress={getImageAndDetectEmotions} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Text>Detected Emotion: {detectedEmotion}</Text>
    </View>
  );
}

// import React, { useEffect, useRef } from "react";
// import { View, Dimensions, StyleSheet } from "react-native";
// import { Camera } from "react-native-vision-camera";
// import * as tf from "@tensorflow/tfjs";
// import * as facemesh from "@tensorflow-models/facemesh";

// const App = () => {
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     async function loadModel() {
//       const model = await facemesh.load();

//       const intervalId = setInterval(() => {
//         detectEmotions(model);
//       }, 1000);

//       return () => clearInterval(intervalId);
//     }

//     loadModel();
//   }, []);

//   async function detectEmotions(model) {
//     if (cameraRef.current) {
//       const camera = cameraRef.current;
//       const { width, height } = camera.getPreviewSize();

//       const { uri } = await camera.takePicture();

//       const imageTensor = await loadImage(uri);
//       const predictions = await model.estimateFaces(imageTensor);

//       if (predictions.length > 0) {
//         const keypoints = predictions[0].scaledMesh;

//         const emotions = {
//           angry: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 26],
//           disgusted: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
//           fearful: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
//           happy: [48, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
//           neutral: [27, 28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 42, 43, 44, 45],
//           sad: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
//           surprised: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 39, 40, 41],
//         };

//         const distances = [];
//         for (let i = 0; i < Object.values(emotions).flat().length; i++) {
//           for (let j = i + 1; j < Object.values(emotions).flat().length; j++) {
//             const a = keypoints[Object.values(emotions).flat()[i]];
//             const b = keypoints[Object.values(emotions).flat()[j]];
//             distances.push(Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2)));
//           }
//         }
//         const averageDistance = distances.reduce((a, b) => a + b, 0) / distances.length;

//         console.log(averageDistance);

//         let emotion = "unknown";
//         if (averageDistance < 35) emotion = "neutral";
//         else if (averageDistance < 50) emotion = "happy";
//         else if (averageDistance < 70) emotion = "surprised";
//         else if (averageDistance < 90) emotion = "sad";
//         else if (averageDistance < 110) emotion = "disgusted";
//         else if (averageDistance >= 110) emotion = "angry";

//         console.log(emotion);
//       }
//     }
//   }

//   const loadImage = async (uri) => {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const arrayBuffer = await blob.arrayBuffer();
//     const imageTensor = tf.node.decodeImage(new Uint8Array(arrayBuffer), 3);
//     return imageTensor;
//   };

//   return (
//     <View style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         style={styles.camera}
//         type={Camera.Constants.Type.front}
//         autoFocus={Camera.Constants.AutoFocus.on}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
// });

// export default App;
