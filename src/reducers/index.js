import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: books
});

export default rootReducer;



function books() {
  return [
    { title: "Javascript: The Good Parts", pages: 101 },
    { title: "Harry Potter", pages: 39 },
    { title: "The Dark Tower", pages: 85 },
    { title: "Eloquent Ruby", pages: 1 }
  ];
}
