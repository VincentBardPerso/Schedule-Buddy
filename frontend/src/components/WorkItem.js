import React, { Component } from 'react';

class WorkItem extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.building = props.building;
    this.room = props.room;
    this.startTime = props.startTime;
    this.endTime = props.endTime;
    this.frequency = props.frequency;
    this.color = props.color;
  }

 

  render() {
    console.log(this.color);
    return (
      <div className="center pa4  grow br3 shadow-5 mine mb3 " style={{width: '70%', minWidth:'500px', maxWidth:'700px' ,fontFamily: "Roboto", fontWeight:'bold', paddingRight:'7%', paddingLeft:'7%', background:this.color}}>
        <h2 >{this.name}</h2>
        <p>Location: {this.building} {this.room}</p>
        <p>Time: {this.startTime} - {this.endTime}</p>
        <p>Frequency: {this.frequency}</p>
      </div>
    );
  }
}

export default WorkItem;