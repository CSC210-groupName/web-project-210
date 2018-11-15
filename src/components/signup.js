import React, {Component} from 'react';

class signup extends Component{

  constructor(props){
    super(props);
    this.state={
      type: "USER_SIGNUP",
      UserName : "",
      password : ""
    };

    this.SignupHandler=this.SignupHandler.bind(this);
  }

  SignupHandler(event){
    event.preventDefault();
    console.log(this.state);

  }

  render() {
    return (
      <div>
        <form onSubmit={this.SignupHandler}>
          <h3>User SignUp</h3>
          <input type="text" name="Username"
          onChange={(event)=> this.setState({UserName: event.target.value})}
          value={this.state.UserName}
          required/>
          <br/>
          <input type="password" name="password"
          onChange={(event)=> this.setState({password: event.target.value})}
          value={this.state.password}
          required />
          <br/>
          <input type="submit" value="SignUp"/>
        </form>
      </div>
    );
  }

}

export default signup;
