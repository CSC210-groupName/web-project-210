import React, {Component} from 'react';

class signup extends Component{
  render() {
    return (
      <div>
        <form>
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
