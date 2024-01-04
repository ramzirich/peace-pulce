export const SET_FIRST_NAME = 'SET_FIRST_NAME';
export const SET_LAST_NAME = 'SET_LAST_NAME';
export const SET_USER = 'SET_USER';

export const setFirstName = firstName=> dispatch =>{
  dispatch({
    
    type: 'SET_FIRST_NAME',
    payload: firstName,
  })
};

export const setLastName = lastName=> dispatch =>{
  dispatch({
    
    type: 'SET_LAST_NAME',
    payload: lastName,
  })
};

export const setUserInfo = userInfo=> dispatch =>{
  dispatch({
    
    type: 'SET_USER',
    payload: userInfo,
  })
};