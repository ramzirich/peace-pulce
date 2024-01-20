import { SET_IMG_URL, SET_USER} from "../actions/userActions";

const initialState ={
    userInfo:{
        first_name:'',
        last_name:'',
        role_id:0,
        email:'',
        img_url:'',
        phone:'',
    }
}

function userInfoReducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return{...state, userInfo: action.payload};
        case SET_IMG_URL:
            return{
                ...state,
                userInfo: { ...state.userInfo, img_url: action.payload },
            }
        default :
            return{...state};
    }
}

export default userInfoReducer;