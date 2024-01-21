import { Keyboard } from "react-native";

export const DoctorProfileValidation = (inputs, handleError) => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.degree) {
      handleError('Please input degree', 'degree');
      isValid = false;
    } 
    else if(inputs.degree.length>255){
        handleError('Degree cannot exceed 255 characters', 'degree');
        isValid = false;
    }

    if (!inputs.about) {
      handleError('Please input about', 'about');
      isValid = false;
    }else if(inputs.about.length>500){
        handleError('About cannot exceed 500 characters', 'about');
        isValid = false;
    }

    if (!inputs.hourly_rate) {
        handleError('Please input hourly rate', 'hourly_rate');
        isValid = false;
      }

    if (!inputs.specialization) {
        handleError('Please input specialization', 'specialization');
        isValid = false;
      }else if(inputs.specialization.length>255){
          handleError('Specialization cannot exceed 255 characters', 'specialization');
          isValid = false;
      }
    return isValid;
  };