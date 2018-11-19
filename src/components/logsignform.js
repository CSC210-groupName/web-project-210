import React from 'react';
import Login from './login';
import Signup from './signup';

export default class Logsignform extends React.Component{


  componentDidMount(){
    if(!document.getElementById('page_css')) {
      var link = document.createElement('link');
      link.id = 'page_css';
      link.rel = 'stylesheet';
      link.href="indexStyle.css";
    document.head.appendChild(link);
    }else{
      var link1 = document.getElementById('page_css');
      link1.href="indexStyle.css";
    }
  }


  render(){
    return (
      <div>
        <Login />
        <Signup />
      </div>
    );
  }
}
