import React from "react";
import axios from 'axios';
import List from './List';
import { Redirect } from 'react-router';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class EventAdder extends React.Component {

  componentWillMount(){
    axios.get('/auth/current_user').then(res=>{
      //console.log(typeof res.data);
      if(res.data===""){
        console.log("Redirect");
        this.props.history.push('/');
      }
    })
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
      sTime: new Date(),
      eTime: new Date(),
      eDate: new Date(),
      eName: '',
      eDesc: '',
      color: '#f6b73c'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlesTimeChange = this.handlesTimeChange.bind(this);
    this.handleeTimeChange = this.handleeTimeChange.bind(this);
    this.onEventSubmit = this.onEventSubmit.bind(this);
  }

  handlesTimeChange(date){
    this.setState({
      sTime: date
    });
  }

  handleeTimeChange(date){
    this.setState({
      eTime: date
    });
  }

  handleChange(date) {
    this.setState({
      eDate: date
    });
    //console.log(this.state.eDate);
  }

  oneNameChange = (event) => {
    this.setState({ eName: event.target.value });
  }

  oneDescChange = (event) => {
    this.setState({ eDesc: event.target.value });
  }

  onColorChange = (event) => {
    this.setState({ color: event.target.value });
  }

  onEventSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.eDate.toString());
    var success;
    var self = this;
    axios.post('/func/addevent', {
      // date: this.state['eDate'],
      // starttime: this.state['sTime'],
      // endtime: this.state['eTime'],
      date: this.state.eDate.getTime(),
      starttime: this.state.sTime.getTime(),
      endtime: this.state.eTime.getTime(),
      name: this.state['eName'],
      type: 'event',
      description: this.state['eDesc'],
      color: this.state['color']
    }).then(function(response) {
      success = response.data;
      console.log(success);
      document.getElementById("feedback").innerHTML='Result: '+ success;
      var inputDate = self.state['eDate'];
      var date = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 0, 0, 0);
      self.props.history.push({
            pathname: '/day',
            state: {
                currentDay: date
            }
        });
    });
  }

  render() {
    return (
      <div className="eventAdder">
        <div>
          <p id="loginmessage"></p>
        </div>
        <div className="form-style">
          <h1>
            Event Adder
          </h1>
          <form onSubmit={this.onEventSubmit}>
            <p>Event Name:</p>
            <input
              type="text"
              value={this.state.eName}
              onChange={this.oneNameChange} />
            <p>Event Description:</p>
            <textarea
              value={this.state.eDesc}
              onChange={this.oneDescChange} />
            <p>Start Time:</p>
            <DatePicker
              selected={this.state.sTime}
              onChange={this.handlesTimeChange}
              showTimeSelect showTimeSelectOnly
              timeIntervals={10}
              dateFormat="h:mm aa"
              timeCaption="Time" />
            <p>End Time:</p>
            <DatePicker
              selected={this.state.eTime}
              onChange={this.handleeTimeChange}
              showTimeSelect showTimeSelectOnly
              timeIntervals={10}
              dateFormat="h:mm aa"
              timeCaption="Time" />
            <p>Date:</p>
            <DatePicker
              selected={this.state.eDate}
              onChange={this.handleChange} />
            <p>Event Color</p>
            <input 
              type="color"
              value={this.state.color}
              onChange={this.onColorChange} />
            <button id="submit">Submit</button>
          </form>
        </div>

        <div>
          <p id="feedback"></p>
        </div>


      </div>
    );
  }
}

export default EventAdder;
