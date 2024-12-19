// SleepTracker.js
import './SleepHours.css';
import React, { Component } from 'react';

class SleepTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sleepTime: '22:00',
      wakeTime: '08:30',
    };

    this.handleSleepTimeChange = this.handleSleepTimeChange.bind(this);
    this.handleWakeTimeChange = this.handleWakeTimeChange.bind(this);
    this.calculateSleepHours = this.calculateSleepHours.bind(this);
  }

  handleSleepTimeChange(event) {
    this.setState({ sleepTime: event.target.value }, this.calculateSleepHours);
  }

  handleWakeTimeChange(event) {
    this.setState({ wakeTime: event.target.value }, this.calculateSleepHours);
  }

  calculateSleepHours() {
    const { sleepTime, wakeTime } = this.state;
    if (sleepTime && wakeTime) {
      const sleepHours = `${sleepTime} - ${wakeTime}`;
      this.props.onSleepHoursChange(sleepHours, sleepTime, wakeTime);
    }
  }

  render() {
    return (
      <div className="center pa4  shadow-5 mine mb3 " style={{width: '70%', minWidth:'500px', maxWidth:'700px' ,fontFamily: "Roboto", fontWeight:'bold', paddingRight:'7%', paddingLeft:'7%'}}>
      <legend class="f2 fw6 ph0 mh0 pa3 center">Sleep Hours</legend>
      <div className="SleepTracker">
        <label>
          Sleep Time:
          <input type="time" value={this.state.sleepTime} onChange={this.handleSleepTimeChange} />
        </label>
        <label>
          Wake Time:
          <input type="time" value={this.state.wakeTime} onChange={this.handleWakeTimeChange} />
        </label>
      </div>
      </div>
    );
  }
}

export default SleepTracker;