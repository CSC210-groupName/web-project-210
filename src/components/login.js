import React, {Component} from 'react';

class login extends Component{

  constructor(props){
    super(props);
    this.state={
      type: "USER_LOGIN",
      UserName : "",
      password : ""
    };

    this.LoginHandler=this.LoginHandler.bind(this);
  }


  LoginHandler(event){
    event.preventDefault();
    console.log(this.state);
    //state here contains the value for submit, great place for validation

  }

  render() {
    return (
      <div>
        <form onSubmit={this.LoginHandler}>
          <h3>User Login</h3>
          <label>UserName</label>
          <input type="text" name="Username"
          onChange={(event)=> this.setState({UserName: event.target.value})}
          value={this.state.UserName}
          required/>
          <br/>
          <label>Pasword</label>
          <input type="password" name="password"
          onChange={(event)=> this.setState({password: event.target.value})}
          value={this.state.password}
          required />
          <br/>
          <input type="submit" value="login"/>
          <p>Don't have a account? SignUp <input type="button" value="here"/></p>
        </form>
      </div>
    );
  }
}

export default login;