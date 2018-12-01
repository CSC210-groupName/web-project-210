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
        document.getElementById("loginFeedback").innerHTML='Result: '+ response.data;
        //vanilla js works after all....
        window.location.href = '/cal';
      }
      //localStorage.setItem("username", username);
      document.getElementById("loginFeedback").innerHTML='Result: invalid userName or password';
    });

//this function means we are good to login
    if (success) {
      this.props.login_successful();
    }

    //user feedbacks for different situation
    //document.getElementById("loginFeedback").innerHTML="login successful";
    //document.getElementById("loginFeedback").innerHTML="Username NOT found";
    //document.getElementById("loginFeedback").innerHTML="Password is incorrect";



    //state here contains the value for submit, great place for validation
    //axios makes http request to the backend
    this.setState({UserName : "", password : ""});
  }

  showSignUpForm(){
    //here button handling
    this.setState({UserName : "", password : ""});
    document.getElementById("loginForm").style.display="none";
    document.getElementById("signupForm").style.display="block";
    document.getElementById("loginFeedback").innerHTML="";

  }

  render() {
    return (
      <div id="loginForm">
        <form onSubmit={this.LoginHandler}>
          <h3>User Login</h3>
          <label>UserName</label>
          <input type="text" name="Username"
          onChange={(event)=> this.setState({UserName: event.target.value})}
          value={this.state.UserName}
          required/>
          <br/>
          <label>Password</label>
          <input type="password" name="password"
          onChange={(event)=> this.setState({password: event.target.value})}
          value={this.state.password}
          required />
          <br/>
          <input type="submit" value="login"/>
          <p>Don't have a account? SignUp <input type="button" value="here" onClick={this.showSignUpForm}/></p>
        </form>
        <a href="/auth/google">login with Google Oauth</a>
        <div>
          <p id="loginFeedback"></p>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({login_successful: login_successful},dispatch);
}

export default connect(null, mapDispatchToProps)(login);
