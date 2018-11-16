import { s } from '../actions/login_successful';
import { s1 } from '../actions/logout';

export default function loginOrOut(state = null, action){
  if(action.type===s){
    return true;
  }else if(action.type===s1){
    return false;
  }
  return state;
}
