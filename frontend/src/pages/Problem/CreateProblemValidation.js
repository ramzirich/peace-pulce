import { Keyboard } from "react-native";

export const createProblemvalidation = (inputs, handleError) => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.problem) {
      handleError('Please input your problem', 'problem');
      isValid = false;
    } 
    else if(inputs.problem.length>200){
        handleError('Paroblem cannot exceed 2000 characters', 'problem');
        isValid = false;
    }

    if (!inputs.action) {
      handleError('Please input your action', 'action');
      isValid = false;
    }else if(inputs.action.length>3000){
        handleError('First name cannot exceed 3000 characters', 'action');
        isValid = false;
    }

    if (inputs.solution != "") {
        if(inputs.solution.length>3000){
            handleError('Phone number name cannot exceed 3000 characters', 'solution');
            isValid = false;
        }
    }

    if (inputs.ai_solution) {
       if(inputs.ai_solution.length>3000){
          handleError('last name cannot exceed 3000 characters', 'ai_solution');
          isValid = false;
      }
    }
    return isValid;
  }