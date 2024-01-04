import { Keyboard } from "react-native";

export const validateLogin = (inputs, handleError) =>{
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
        handleError('Please input email', 'email');
        isValid = false;
      } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
        handleError('Please input a valid email', 'email');
        isValid = false;
      }else if(inputs.email.length>100){
          handleError('Email cannot exceed 100 characters', 'email');
          isValid = false;
      }

      if (!inputs.password) {
        handleError('Please input password', 'password');
        isValid = false;
      } else if (inputs.password.length < 8) {
        handleError('Min password length of 8', 'password');
        isValid = false;
      }else if(inputs.password.length>20){
          handleError('last name cannot exceed 20 characters', 'last_name');
          isValid = false;
      }else if(!inputs.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,20}$/)){
          handleError('The password must contain at least one uppercase letter, one lowercase letter,' +
                          'one numeric digit, one special character.', 'password');
      }
    
    return isValid;
}