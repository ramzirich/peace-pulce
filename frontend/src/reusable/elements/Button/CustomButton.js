import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { CustomColors } from '../../../styles/color';


export const CustomButton = ({title, onPress = () => {}, colorOfButton='#4752e2'}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: colorOfButton,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5
      }}>
      <Text style={{color: CustomColors.white, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
