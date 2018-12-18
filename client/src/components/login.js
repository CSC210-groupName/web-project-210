import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import login_successful from '../actions/login_successful';
import  { Redirect } from 'react-router-dom';



class login extends Component{

  constructor(props){
    super(props);
    this.state={
      type: "USER_LOGIN",
      UserName : "",
      password : ""
    };

    this.hideDisplay={
      display: "none"
    };
    this.showDisplay={
      display: "block"
    };

    this.LoginHandler=this.LoginHandler.bind(this);
    this.showSignUpForm = this.showSignUpForm.bind(this);
  }

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


  LoginHandler(event){
    event.preventDefault();
    var success;
    axios.post('/auth/logindefault', {
      username: this.state['UserName'],
      password: this.state['password']
    }).then(function(response) {
      success = response.data;
      if(success==="success"){
        console.log(success);
        document.getElementById("loginFeedback").innerHTML=response.data;
        window.location.href = '/cal';
      }else{
        document.getElementById("loginFeedback").innerHTML='Invalid username or password';
      }
    });

    if (success) {
      this.props.login_successful();
    }

    this.setState({UserName : "", password : ""});
  }

  showSignUpForm(){
    //here button handling
    this.setState({UserName : "", password : ""});
    document.getElementById("login-page").style.display="none";
    document.getElementById("signup-page").style.display="block";
    document.getElementById("loginFeedback").innerHTML="";

  }

  render() {
    return (

      <div id="login-page">
        <div className="form">
        <form className="login-form" onSubmit={this.LoginHandler}>
            <input type="text" 
                  placeholder="username" 
                  name = "Username" 
                  onChange={(event)=> this.setState({UserName: event.target.value})}
                  value={this.state.UserName}
                  required/>
            <input type="password" 
                  placeholder="password"
                  name="password"
                  onChange={(event)=> this.setState({password: event.target.value})}
                  value={this.state.password}
                  required/>
            <button>Log in</button>
          </form>
          <button onClick={this.showSignUpForm}>Create an account</button>
          <a href="/auth/google">Login with Google Oauth</a>
          <div>
            <p id="loginFeedback"></p>
          </div>
        </div>
      </div>

    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({login_successful: login_successful},dispatch);
}

export default connect(null, mapDispatchToProps)(login);
