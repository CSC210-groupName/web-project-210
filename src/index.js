
//import * as serviceWorker from './serviceWorker';

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

// import Login from "./components/login";
// import Signup from "./components/signup";
import LoginForm from './components/loginForm';
import reducers from "./reducers";
import Calendar from './components/Calendar';
import DailyCalendar from "./components/DailyCalendar"
import EventAdder from "./components/EventAdder"
import AssignmentAdder from "./components/AssignmentAdder"
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { Switch } from 'react-router';


ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <div>
    <BrowserRouter>
      <Switch>
        <Route path="/add_assignment" component={AssignmentAdder}/>
        <Route path="/add_event" component={EventAdder}/>
        <Route path="/day" component={DailyCalendar}/>
        <Route path="/cal" component={Calendar}/>
        <Route path="/" component={LoginForm}/>
      </Switch>
    </BrowserRouter>
    </div>
  </Provider>,
  document.querySelector("#root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
