import React, { Component } from 'react';

class CourseItem extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.building = props.building;
    this.room = props.room;
    this.startTime = props.startTime;
    this.endTime = props.endTime;
    this.frequency = props.frequency;
    this.color = props.color
    this.studyHours = props.studyHours
    this.automated = props.automated;
  }


  render() {
    return (
      <div className="center pa4  grow br3 shadow-5 mine mb3 " style={{width: '70%', minWidth:'500px', maxWidth:'700px' ,fontFamily: "Roboto", fontWeight:'bold', paddingRight:'7%', paddingLeft:'7%', background:this.color}}>
        <h2 >{this.name}</h2>
        <p>Location: {this.building} {this.room}</p>
        <p>Time: {this.startTime} - {this.endTime}</p>
        <p>Frequency: {this.frequency}</p>
        {this.automated === false ? <p>Study Time: {this.studyHours}H</p> : <p>Study Time: Automated</p>}
        
      </div>
    );
  }
}

export default CourseItem;