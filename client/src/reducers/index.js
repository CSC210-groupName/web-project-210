import { combineReducers } from "redux";
import User from './User_loggedin';


const rootReducer = combineReducers({
  user_loginStatus: User
});

export default rootReducer;



// function books() {
//   return [
//     { title: "Javascript: The Good Parts", pages: 101 },
//     { title: "Harry Potter", pages: 39 },
//     { title: "The Dark Tower", pages: 85 },
//     { title: "Eloquent Ruby", pages: 1 }
//   ];
// }
