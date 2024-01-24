import * as tf from '@tensorflow/tfjs';
import emotionNet from '../models/emotionNet.json';

const model = await tf.loadGraphModel(emotionNet);

const predictEmotion = async (face) => {
  const tensor = tf.expandDims(face, 0); // Make it a batch of size 1
  const prediction = await model.predict(tensor);
  // Convert output probabilities to an array
  const probabilities = prediction.dataSync();
  return {
    className: tf.argMax(prediction, 1).dataSync()[0], // Get index of max probability
    probability: probabilities[tf.argMax(prediction, 1).dataSync()[0]],
  };
};

export default predictEmotion;