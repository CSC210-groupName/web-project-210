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

  //  this.props.signup();
    //state here contains the value for submit, great place for validation
    //axios
    //document.getElementById("SignUpFeedback").innerHTML="SignUp successful";

    //document.getElementById("SignUpFeedback").innerHTML="USername already taken";


    this.setState({UserName : "", password : "", name: ""});   //clears up the form
  }

  showloginForm(){
    //here button handling
    this.setState({UserName : "", password : "", name: ""});
    document.getElementById("loginForm").style.display="block";
    document.getElementById("signupForm").style.display="none";
    document.getElementById("SignUpFeedback").innerHTML="";


  }



  render() {

    return (
      <div id="signupForm" style={this.hideDisplay}>
        <form onSubmit={this.SignupHandler}>
          <h3>User SignUp</h3>
          <label className="prompt">UserName</label><br />
          <input type="text" name="Username" className="loginInput"
          onChange={(event)=> this.setState({UserName: event.target.value})}
          value={this.state.UserName}
          required/>
          <br/>
          <label className="prompt">Your Name</label><br />
          <input type="text" name="name" className="loginInput"
          onChange={(event)=> this.setState({name: event.target.value})}
          value={this.state.name}
          required/>
          <br/>
          <label className="prompt">Pasword</label><br />
          <input type="password" name="password" className="loginInput"
          onChange={(event)=> this.setState({password: event.target.value})}
          value={this.state.password}
          required />
          <br/>
          <input type="submit" value="SignUp"/>
          <p>Already have a account? Login <input type="button" value="here" onClick={this.showloginForm}/></p>
        </form>
        <div>
          <p id="SignUpFeedback"></p>
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
