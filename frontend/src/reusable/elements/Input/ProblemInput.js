import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import { CustomColors } from '../../../styles/color';

export const ProblemInput = ({
  label,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
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
            //   ? CustomColors.darkBlue
            //   : CustomColors.light,
            alignItems: 'center',
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
          style={{color: CustomColors.darkBlue, flex: 1, borderRadius:5}}
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
  },
  inputContainer: {
    height: 45,
    backgroundColor: "transparent",
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius:5
  },
});
