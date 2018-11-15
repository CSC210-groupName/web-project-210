import React, {Component} from 'react';

class signup extends Component{



  SignupHandler(event){
    event.preventDefault();
    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.SignupHandler}>
          <h3>User Signup</h3>
          <input type="text" required/>
          <br/>
          <input type="password" required/>
          <br/>
          <input type="submit" value="Signup"/>
        </form>
      </div>
    );
  }
}

export default signup;
