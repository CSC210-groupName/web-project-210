import { s } from '../actions/login_successful';
import { s1 } from '../actions/logout';

export default function loginOrOut(state, action){
  if(!state || !state.user_loginStatus){
    return{
      ...state,
      user_loginStatus: false
    }
  }

  if(action.type===s){
    return {
      ...state,
      user_loginStatus: true
    };
  }else if(action.type===s1){
    return {
      user_loginStatus: false
    };
  }

    return state;
}
