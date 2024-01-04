import { SET_FIRST_NAME, SET_LAST_NAME } from "../actions/userActions";

const initialState ={
    firstName: '',
    lastName: ''
}

function userReducer(state = initialState, action){
    switch(action.type){
        case SET_FIRST_NAME:
            return{...state, firstName: action.payload};
        
        case SET_LAST_NAME:
            return{...state, lastName:action.payload};
        
        default:
            return{...state};
    }
}

export default userReducer;