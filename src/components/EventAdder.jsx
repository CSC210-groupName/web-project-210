import React from "react";
import axios from 'axios';
import List from './List';
import { Redirect } from 'react-router';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
      sTime: new Date(),
      eTime: new Date(),
      eDate: new Date(),
      eName: '',
      eDesc: '',
      items: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlesTimeChange = this.handlesTimeChange.bind(this);
    this.handleeTimeChange = this.handleeTimeChange.bind(this);
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

  onEventSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.eDate.toString());
    var success;
    axios.post('/func/addevent', {
<<<<<<< HEAD
      // date: this.state['eDate'],
      // starttime: this.state['sTime'],
      // endtime: this.state['eTime'],
      date: this.state.eDate.getTime(),
      starttime: this.state.sTime.getTime(),
      endtime: this.state.eTime.getTime(),
=======
      date: this.state['eDate'],
      starttime: this.state['sTime'],
      endtime: this.state['eTime'],
>>>>>>> 06a5e784fd272705c269ab7bc2b13dcfae534255
      name: this.state['eName'],
      type: 'class',
      description: this.state['eDesc'],
    }).then(function(response) {
      success = response.data;
      console.log(success);
      document.getElementById("feedback").innerHTML='Result: '+ success;
    });
    // this.setState({
    //   sTime: '',
    //   eTime: '',
    //   eDate: new Date(),
    //   eName: '',
    //   eDesc: '',
    //   items: [this.state.sTime, this.state.eTime, this.state.eDate, this.state.eName, this.state.eDesc]
    // });
  }

  render() {
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
<<<<<<< HEAD
            <DatePicker selected={this.state.sTime} onChange={this.handlesTimeChange} showTimeSelect showTimeSelectOnly
                  timeIntervals={10}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
            /> <br></br>
            End Time: <br></br>
            <DatePicker selected={this.state.eTime} onChange={this.handleeTimeChange} showTimeSelect showTimeSelectOnly
                  timeIntervals={10}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
            /> <br></br>
            Date: <br></br>
            <DatePicker selected={this.state.eDate} onChange={this.handleChange} /> <br></br>

=======
            <input type="time" value={this.state.sTime} onChange={this.onsTimeChange} /> <br></br>
            End Time: <br></br>
            <input type="time" value={this.state.eTime} onChange={this.oneTimeChange} /> <br></br>
            Date: <br></br>
            <input type="date" value={this.state.eDate} onChange={this.oneDateChange} /> <br></br>
>>>>>>> 06a5e784fd272705c269ab7bc2b13dcfae534255
            Event Name: <br></br>
            <input value={this.state.eName} onChange={this.oneNameChange} /> <br></br>
            Event Description: <br></br>
            <textarea value={this.state.eDesc} onChange={this.oneDescChange} /> <br></br>
            <button>Submit</button>
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
