import React, {Component} from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import signupAction from '../actions/signup';

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
    this.showloginForm=this.showloginForm.bind(this);
  }

  componentWillMount(){
  // if(!document.getElementById('page_css')) {
  //     var link = document.createElement('link');
  //     link.id = 'page_css';
  //     link.rel = 'stylesheet';
  //     link.href="index.css";
  //   document.head.appendChild(link);
  //   }else{
  //     var link1 = document.getElementById('page_css');
  //     link1.href="index.css";
  //   }
  }


  SignupHandler(event){
    event.preventDefault();
    console.log(this.state);
    axios.post('/auth/signupdefault', {
      name: this.state.name,
      username: this.state.UserName,
      password: this.state.password
    }).then(function(response) {
      console.log(response.data);
      if(response.data==='UserName already existed'){
        document.getElementById("SignUpFeedback").innerHTML='Result: '+ response.data;
      }else{
        axios.post('/auth/logindefault',{username: response.data.username, password: response.data.password}).then(
          resp=>{
            console.log(resp.data);
            if(resp.data==='success'){
              console.log("we are signed up and logged in!");
              document.getElementById("SignUpFeedback").innerHTML='we are signed up and logged in!';
                //vanilla js works after all....
                window.location.href = '/cal';
            }else{
              document.getElementById("SignUpFeedback").innerHTML='Something went wrong! Please contact us!';
            }
          }
        );
      }


    });

    this.setState({UserName : "", password : "", name: ""});   //clears up the form
  }

  showloginForm(){
    //here button handling
    this.setState({UserName : "", password : "", name: ""});
    document.getElementById("login-page").style.display="block";
    document.getElementById("signup-page").style.display="none";
    document.getElementById("SignUpFeedback").innerHTML="";


  }


  render() {
    return (
      <div id="signup-page" style={{display: 'none'}}>
        <div className="form">
        <form className="login-form" onSubmit={this.SignupHandler}>
            <input type="text"
                  placeholder = "your name"
                  name="name"
                  onChange={(event)=> this.setState({name: event.target.value})}
                  value={this.state.name}
                  required/>
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
            <button>Sign Up</button>
          </form>
          <button onClick={this.showloginForm}>Go to login</button>
            <a href="/auth/google">Signup with Google Oauth</a>
          <div>
            <p id="SignUpFeedback"></p>
          </div>
        </div>
      </div>
    );
  }
}


export default signup;
//
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({signup: signupAction}, dispatch);
// }
//
// export default connect(null, mapDispatchToProps)(signup);
