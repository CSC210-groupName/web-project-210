import React from "react";
import List from './List';

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
    return (
      <div className="eventAdder">
        <h2>
          Event Adder
        </h2>
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
        </div>


      </div>
    );
  }
}

export default EventAdder;