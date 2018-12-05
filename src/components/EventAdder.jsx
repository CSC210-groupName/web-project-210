import React from "react";
import axios from 'axios';
import List from './List';
import { Redirect } from 'react-router';

class EventAdder extends React.Component {

  componentWillMount(){
    if(!document.getElementById('page_css')) {
      var link = document.createElement('link');
      link.id = 'page_css';
      link.rel = 'stylesheet';
      link.href="indexStyle.css";
    document.head.appendChild(link);
    }else{
      var link1 = document.getElementById('page_css');
      link1.href="addevent.css";
    }
  }

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
    console.log(this.state);
    var success;
    axios.post('/func/addevent', {
      date: this.state['eDate'],
      starttime: this.state['sTime'],
      endtime: this.state['eTime'],
      name: this.state['eName'],
      type: 'class',
      description: this.state['eDesc'],
    }).then(function(response) {
      success = response.data;
      console.log(success);
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
            <input type="time" value={this.state.sTime} onChange={this.onsTimeChange} /> <br></br>
            End Time: <br></br>
            <input type="time" value={this.state.eTime} onChange={this.oneTimeChange} /> <br></br>
            Date: <br></br>
            <input type="date" value={this.state.eDate} onChange={this.oneDateChange} /> <br></br>
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
