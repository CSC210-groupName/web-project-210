import React from "react";
import axios from 'axios';
import List from './List';
import { Redirect } from 'react-router';

class AssignmentAdder extends React.Component {

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
      name: '',
      dueDate: new Date(),
      dueDateTime: new Date(),
      //potentially have start date as well?
      estimateTime: 0,
      maxTimeConsecutive: 0,
      // items: []
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onDueDateChange = (event) => {
    this.setState({ dueDate: event.target.value });
  }

  onDueTimeChange = (event) => {
    this.setState({ dueTime: event.target.value });
  }

  onEstimateTimeChange = (event) => {
    this.setState({ estimateTime: event.target.value });
  }

  onMaxTimeConsecutiveChange = (event) => {
    this.setState({ maxTimeConsecutive: event.target.value });
  }

  onAssignmentSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    var success;
    // TODO will need an endpoint for adding assignments

    // axios.post('/func/addevent', {
    //   date: this.state['eDate'],
    //   starttime: this.state['sTime'],
    //   endtime: this.state['eTime'],
    //   name: this.state['eName'],
    //   type: 'homework',
    //   description: this.state['eDesc'],
    // }).then(function(response) {
    //   success = response.data;
    //   console.log(success);
    //   document.getElementById("feedback").innerHTML='Result: '+ success;
    // });
    this.setState({
      name: '',
      dueDate: '',
      dueTime: '',
      estimateTime: '',
      maxTimeConsecutive: '',
//      items: [this.state.name, this.state.dueDate, this.state.dueTime, this.state.estimateTime, this.state.maxTimeConsecutive]
    });
  }

  render() {
    // if (localStorage.getItem("username") === null) {
    //   return (
    //         <Redirect
    //         to={{
    //           pathname: '/login',
    //           state: 'Please sign in!'
    //         }}
    //       />
    //     )
    // }
    return (
      <div className="assignemntAdder">
        <h2>
          Assignment Adder
        </h2>
        <div>
          <p id="loginmessage"></p>
        </div>
        <div>
          <form onSubmit={this.onAssignmentSubmit}>
            Assignment Name: <br></br>
            <input value={this.state.name} onChange={this.onNameChange} /> <br></br>
            Due Date: <br></br>
            <input type="date" value={this.state.dueDate} onChange={this.onDueDateChange} /> <br></br>
            Time Due: <br></br>
            <input type="time" value={this.state.dueTime} onChange={this.onDueTimeChange} /> <br></br>
            How many hours do you think this assignment will take?: <br></br>
            <input type="number" min="1" value={this.state.estimateTime} onChange={this.onEstimateTimeChange} /> <br></br>
            How long are you willing to work consecutively on a single day?: <br></br>
            <input type="number" min="1" max="24" value={this.state.maxTimeConsecutive} onChange={this.onMaxTimeConsecutiveChange} /> <br></br>
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

export default AssignmentAdder;
