import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import { CustomColors } from '../../../styles/color';

export const ProfileInput = ({
  label,
  error,
  password,
  defaultValue,
  onFocus = () => {},
  onChangeText,
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(defaultValue);
  const handleTextChange = (text) => {
    setInputValue(text);
    onChangeText && onChangeText(text);
  };
  return (
    <View style={{marginBottom: 10}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? CustomColors.red
              : isFocused
              ? '#e782f5'
              : "#e782f5",
            alignItems: 'center',
            borderWidth:1
          },
        ]}>
        {/* <Icon
          name={iconName}
          style={{color: COLORS.darkBlue, fontSize: 22, marginRight: 10}}
        /> */}
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          value={inputValue}
          onChangeText={handleTextChange}
          placeholderTextColor={CustomColors.grey}
          placeholder={isFocused ? '' : props.placeholder} 
          style={{color: CustomColors.white, flex: 1, borderRadius:5}}
          {...props}
        />
        {/* {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: CustomColors.darkBlue, fontSize: 22}}
          />
        )} */}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: CustomColors.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 4,
    fontSize: 14,
    color: CustomColors.white,
    paddingBottom:5
  },
  inputContainer: {
    height: 45,
    backgroundColor: "transparent",
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius:5,
    marginTop:2
    // borderWidth:1,
    // borderBlockColor:'#e782f5',
    // borderColor:'#e782f5'
  },
});
