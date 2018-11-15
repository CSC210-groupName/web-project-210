import React, {Component} from 'react';

class login extends Component{
  render() {
    return (
      <div>
        <form>
          <h3>User Login</h3>
          <input type="text" required/>
          <br/>
          <input type="password" required />
          <br/>
          <input type="submit" value="login"/>
        </form>
      </div>
    );
  }
}

export default login;
