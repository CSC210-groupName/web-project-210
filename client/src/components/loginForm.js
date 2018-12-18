import React from 'react';
import Login from './login';
import Signup from './signup';

export default class LoginForm extends React.Component{


  componentWillMount(){
    if(!document.getElementById('page_css')) {
      var link = document.createElement('link');
      link.id = 'page_css';
      link.rel = 'stylesheet';
      link.href="index.css";
    document.head.appendChild(link);
    }else{
      var link1 = document.getElementById('page_css');
      link1.href="index.css";
    }
  }


  render(){
    return (
      <div id="loginForm">
        <Login />
        <Signup />
      </div>
    );
  }
}
