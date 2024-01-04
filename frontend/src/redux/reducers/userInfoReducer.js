import { SET_USER} from "../actions/userActions";

const initialState ={
    userInfo:{
        first_name:'',
        last_name:'',
        role_id:0,
        email:'',
        img_url:''
    }
}

function userInfoReducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return{...state, userInfo: action.payload};
        
        default:
            return{...state};
    }
}

export default userInfoReducer;