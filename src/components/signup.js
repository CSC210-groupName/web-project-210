import React, {Component} from 'react';
import axios from 'axios';
class signup extends Component{

  constructor(props){
    super(props);
    this.state={
      type: "USER_SIGNUP",
      UserName : "",
      name: "",
      password : ""
    };

    this.hideDisplay={
      display: "none"
    };
    this.showDisplay={
      display: "block"
    };
    this.SignupHandler=this.SignupHandler.bind(this);
  }

  SignupHandler(event){
    event.preventDefault();
    console.log(this.state);
    //state here contains the value for submit, great place for validation
    //axios
    var para = document.createElement("P");                       // Create a <p> element
    var t = document.createTextNode("SignUp successful");      // Create a text node
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("SignUpFeedback").appendChild(para);           // Append <p> to <div>
  }

  showloginForm(){
    //here button handling
    document.getElementById("loginForm").style.display="block";
    document.getElementById("signupForm").style.display="none";

  }



  render() {

    return (
      <div id="signupForm" style={this.hideDisplay}>
        <form onSubmit={this.SignupHandler}>
          <h3>User SignUp</h3>
          <label>UserName</label>
          <input type="text" name="Username"
          onChange={(event)=> this.setState({UserName: event.target.value})}
          value={this.state.UserName}
          required/>
          <br/>
          <label>Your Name</label>
          <input type="text" name="name"
          onChange={(event)=> this.setState({name: event.target.value})}
          value={this.state.name}
          required/>
          <br/>
          <label>Pasword</label>
          <input type="password" name="password"
          onChange={(event)=> this.setState({password: event.target.value})}
          value={this.state.password}
          required />
          <br/>
          <input type="submit" value="SignUp"/>
          <p>Already have a account? Login <input type="button" value="here" onClick={this.showloginForm}/></p>
        </form>
        <div id="SignUpFeedback">
        </div>
      </div>
    );
  }

}

export default signup;
