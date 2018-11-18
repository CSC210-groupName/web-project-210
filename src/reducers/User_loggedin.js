import { s as login_successful} from '../actions/login_successful';
import { s1 as logout } from '../actions/logout';

export default function loginOrOut(state=false, action){
  if(action.type===login_successful){
    return true;
  }else if(action.type===logout){
    return false;
  }
    return state;
}
