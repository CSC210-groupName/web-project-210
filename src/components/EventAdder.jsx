import React from "react";
import axios from 'axios';
import List from './List';
import { Redirect } from 'react-router';

class EventAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sTime: '',
      eTime: '',
      eDate: '',
      eName: '',
      eDesc: '',
      items: []
    };
  }

  onsTimeChange = (event) => {
    this.setState({ sTime: event.target.value });
  }

  oneTimeChange = (event) => {
    this.setState({ eTime: event.target.value });
  }

  oneDateChange = (event) => {
    this.setState({ eDate: event.target.value });
  }

  oneNameChange = (event) => {
    this.setState({ eName: event.target.value });
  }

  oneDescChange = (event) => {
    this.setState({ eDesc: event.target.value });
  }

  onEventSubmit = (event) => {
    event.preventDefault();
    var success;
    axios.post('http://127.0.0.1:5000/newevent', {
      username: localStorage.getItem("username"),
      date: this.state['eDate'],
      starttime: this.state['sTime'],
      endtime: this.state['eTime'],
      eventname: this.state['eName'],
      eventdesc: this.state['eDesc'],
    }).then(function(response) {
      success = response.data.success;
      document.getElementById("feedback").innerHTML='Result: '+ success;
    });
    this.setState({
      sTime: '',
      eTime: '',
      eDate: '',
      eName: '',
      eDesc: '',
      items: [this.state.sTime, this.state.eTime, this.state.eDate, this.state.eName, this.state.eDesc]
    });
  }

  render() {
    if (localStorage.getItem("username") === null) {
      return (
            <Redirect 
            to={{
              pathname: '/login',
              state: 'Please sign in!' 
            }} 
          />
        )
    }
    return (
      <div className="eventAdder">
        <h2>
          Event Adder
        </h2>
        <div>
          <p id="loginmessage"></p>
        </div>
        <div>
          <form onSubmit={this.onEventSubmit}>
            Start Time: <br></br>
            <input value={this.state.sTime} onChange={this.onsTimeChange} /> <br></br>
            End Time: <br></br>
            <input value={this.state.eTime} onChange={this.oneTimeChange} /> <br></br>
            Date: <br></br>
            <input value={this.state.eDate} onChange={this.oneDateChange} /> <br></br>
            Event Name: <br></br>
            <input value={this.state.eName} onChange={this.oneNameChange} /> <br></br>
            Event Description: <br></br>
            <textarea value={this.state.eDesc} onChange={this.oneDescChange} /> <br></br>
            <button>Submit</button>
          </form>
        </div>

        <div>
          <List items={this.state.items} />
          <p id="feedback"></p>
        </div>


      </div>
    );
  }
}

export default EventAdder;