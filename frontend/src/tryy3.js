import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SingleStarRating = ({ rating }) => {
  // Calculate the width of the filled star based on the fractional part of the rating
  const filledStarWidth = `${(rating % 1) * 100}%`;

  return (
    <View style={styles.singleStarRating}>
      <Text style={{ width: filledStarWidth }}>★</Text>
      <Text style={{ width: `calc(100% - ${filledStarWidth})` }}>☆</Text>
    </View>
  );
};

const YourComponent = () => {
  const [rating, setRating] = React.useState(4);

  return (
    <View style={styles.container}>
      <SingleStarRating rating={rating} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  singleStarRating: {
    flexDirection: 'row',
    fontSize: 24, // Adjust the font size as needed
  },
});

export default YourComponent;