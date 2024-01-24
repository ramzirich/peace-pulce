import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import * as emotionDetection from '@tensorflow-models/emotion-detection';

const model = await faceDetection.loadFromUri('/path/to/face_detection_model');
const emotionModel = await emotionDetection.loadGraphModel('/path/to/emotion_detection_model');

const detectFaces = async (imageUri) => {
  const image = await tf.browser.fromPixels(imageUri);
  const detections = await model.estimateFaces(image, false);

  const faces = detections.map(async(detection) => {
    // Extract face region and predict emotion
    const faceBox = detection.box;
    const face = image.slice([faceBox.ymin, faceBox.xmin, faceBox.ymax, faceBox.xmax]);
    const emotion = await emotionModel.predict(face);

    return {
      box: faceBox,
      emotion: emotion.className, // Assuming model outputs class names
      probability: emotion.probability,
    };
  });

  return faces;
};

export default detectFaces;