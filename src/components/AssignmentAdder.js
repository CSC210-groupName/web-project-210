import React from "react";
import axios from 'axios';
import List from './List';
import { Redirect } from 'react-router';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class AssignmentAdder extends React.Component {

  componentWillMount(){
    axios.get('/auth/current_user').then(res=>{
      //console.log(typeof res.data);
      if(res.data.user){
        console.log("Redirect");
        this.props.history.push('/');
      }
    });
    if(!document.getElementById('page_css')) {
      var link = document.createElement('link');
      link.id = 'page_css';
      link.rel = 'stylesheet';
      link.href="addevent.css";
    document.head.appendChild(link);
    }else{
      var link1 = document.getElementById('page_css');
      link1.href="addevent.css";
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dueDate: new Date(),
      dueTime: new Date(),
      //potentially have start date as well?
      estimateTime: 0,
      maxTimeConsecutive: 0,
      color: '#f6b73c'
    };
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleDueTimeChange = this.handleDueTimeChange.bind(this);
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleDueDateChange(date) {
    this.setState({ dueDate: date });
  }

  handleDueTimeChange (date) {
    this.setState({ dueTime: date });
  }

  onEstimateTimeChange = (event) => {
    this.setState({ estimateTime: event.target.value });
  }

  onMaxTimeConsecutiveChange = (event) => {
    this.setState({ maxTimeConsecutive: event.target.value });
  }

  onColorChange = (event) => {
    this.setState({ color: event.target.value });
  }

  onAssignmentSubmit = (event) => {
    var self = this;
    event.preventDefault();
    //console.log(this.state);
    var success;
    // TODO will need an endpoint for adding assignments

    var thisName = "Submit " + this.state.name,
        thisDueDate = this.state.dueDate.getTime(),
        thisDueTimeStart = this.state.dueTime.getTime(),
        thisDueTimeEnd = this.state.dueTime.getTime() + 600000,
        thisColor = this.state.color

    axios.post('/func/addassignment', {
      name: this.state.name,
      dueDate: this.state.dueDate.getTime(),
      estimateTime: this.state.estimateTime,
      maxTimeConsecutive: this.state.maxTimeConsecutive,
      color: this.state.color
    }).then(function(response) {
      console.log(response.data);
      axios.post('/func/addevent', {
        date: thisDueDate,
        starttime: thisDueTimeStart,
        endtime: thisDueTimeEnd,
        name: thisName,
        type: 'homework',
        description: '',
        color: thisColor
      })
      for (var i = 0; i < response.data.length; i++) {
        axios.post('/func/addevent', {
          date: response.data[i].date+1,
          starttime: response.data[i].starttime,
          endtime: response.data[i].endtime,
          name: response.data[i].name,
          type: 'homework',
          description: '',
          color: response.data[i].color
        }).then(function (res) {
          console.log(res);
        });
      }
    });
    self.props.history.push({
      pathname: '/day'
    });
    this.setState({
      name: '',
      dueDate: new Date(),
      dueTime: new Date(),
      estimateTime: '',
      maxTimeConsecutive: '',
    });
  }

  render() {
    return (
      <div className="assignemntAdder">
        <div>
          <p id="loginmessage"></p>
        </div>
        <div className="form-style">
          <h1>
            Assignment Adder
          </h1>
          <form onSubmit={this.onAssignmentSubmit}>
            <p>Assignment Name:</p>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onNameChange} />
            <p>Due Date:</p>
            <DatePicker
              selected={this.state.dueDate}
              onChange={this.handleDueDateChange} />
            <p>Time Due:</p>
            <DatePicker
              type="time"
              selected={this.state.dueTime}
              onChange={this.handleDueTimeChange}
              showTimeSelect showTimeSelectOnly
              timeIntervals={10}
              dateFormat="h:mm aa"
              timeCaption="Time" />
            <p>How many hours do you think this assignment will take?</p>
            <input
              type="number"
              min="1"
              value={this.state.estimateTime}
              onChange={this.onEstimateTimeChange} />
            <p>How long are you willing to work consecutively on a single day?</p>
            <input
              type="number"
              min="1"
              max="24"
              value={this.state.maxTimeConsecutive}
              onChange={this.onMaxTimeConsecutiveChange} />
            <p>Assignment Color:</p>
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

export default AssignmentAdder;
