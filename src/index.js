
//import * as serviceWorker from './serviceWorker';

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Login from "./components/login";
import Signup from "./components/signup";
import reducers from "./reducers";


ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <div>
      <Login />
      <Signup />
    </div>
  </Provider>,
  document.querySelector("#root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
