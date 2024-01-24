import React from 'react';

const EmotionDisplay = ({ faces }) => {
  return (
    <View>
      {faces.map((face) => (
        <View key={face.box.toString()}>
          <Text>Emotion: {face.emotion}</Text>
          <Text>Probability: {face.probability.toFixed(2)}</Text>
          {/* Render visual representation of emotion */}
        </View>
      ))}
    </View>
  );
};

export default EmotionDisplay;