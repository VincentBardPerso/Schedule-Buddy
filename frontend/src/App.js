import ParticlesBg from "particles-bg"
import 'tachyons'
import './App.css';
import { Component } from 'react';
import Forms from './components/Course';
import SignIn from "./components/SignIn";
import CourseItem from "./components/CourseItem";
import LabItem from "./components/LabItem";
import WorkItem from "./components/WorkItem";
import Lab from './components/Lab'
import Work from './components/Work'
import Logo from './components/Logo/Logo.js'
import Tilt from 'react-parallax-tilt'
import Ad from './components/Ad';
import SleepTracker from "./components/SleepHours";
import fileDownload from 'js-file-download'
import "@fontsource/roboto";


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      idnum: 0,
      course_name: '',
      course_building: '',
      course_room:'',
      course_start_time:'',
      course_end_time:'',
      course_days:'',
      course_color:'',
      automated:'',
      estimated_time_needed:[],
      lab_name:'',
      lab_building:'',
      lab_room:'',
      lab_start_time:'',
      lab_end_time:'',
      lab_days:'',
      lab_color:'',
      work_name:'',
      work_location:'',
      work_start_time:'',
      work_end_time:'',
      work_days:'', 
      work_color:'',
      courses: [],
      labs: [],
      work: [],
      sleep_time: "22:00",
      wake_time:'08:30',
      sleep_hours:"22:00 - 08:30",
      hasAd: true,
      isGenrated: false,
      jpeg: ''
    }
    this.handleRemoveCourse = this.handleRemoveCourse.bind(this);
    this.handleRemoveLab = this.handleRemoveLab.bind(this);
    this.handleRemoveWork = this.handleRemoveWork.bind(this);
    this.onCourseAdded = this.onCourseAdded.bind(this);
    this.onLabAdded = this.onLabAdded.bind(this);
    this.onWorkAdded = this.onWorkAdded.bind(this);
    this.handleSleepHoursChange = this.handleSleepHoursChange.bind(this);
  }

  handleSleepHoursChange(sleepHours, sleepTime, wakeTime) {
    this.setState({ sleep_hours: sleepHours });
    this.setState({sleep_time: sleepTime});
    this.setState({wake_time: wakeTime});

  }
  onCourseAdded(nameInput, buildingInput, roomInput, startTimeInput, endTimeInput, frequencyInput,temp, selectedColor, studyHours, automated){
    this.state.course_name = nameInput;
    this.state.course_building = buildingInput;
    this.state.course_room = roomInput;
    this.state.course_end_time = endTimeInput;
    this.state.course_start_time = startTimeInput;
    this.state.course_days = frequencyInput;
    this.state.course_color = selectedColor;
    this.state.estimated_time_needed = studyHours;
    this.state.automated = automated;
  

    const newCourse = {
      id: this.state.idnum += 1, 
      name: this.state.course_name,
      building: this.state.course_building,
      room: this.state.course_room,
      startTime: this.state.course_start_time,
      endTime: this.state.course_end_time,
      frequency: this.state.course_days,
      color: this.state.course_color,
      studyHours: this.state.estimated_time_needed,
      automated: this.state.automated
    };

    if ((this.state.course_name !== '') && (this.state.course_building !== '') && (this.state.course_room !== '') && (this.state.course_start_time !== '') && (this.state.course_end_time !== '') && (this.state.course_days !== '')){
      this.setState({
        courses: [...this.state.courses, newCourse],
      });
      this.finalObjCourseAdd(newCourse,temp);
    }

    else{
      alert("Invalid Inputs");
    }
    console.log(this.state.courses);
  }

  finalObjCourseAdd = (newCourse,temp)=>{
    final_obj.have.courses.course_name.push(newCourse.name);
    final_obj.have.courses.location.building.push(newCourse.building);
    final_obj.have.courses.location.room.push(newCourse.room);
    final_obj.have.courses.frequency.push(temp);
    final_obj.have.courses.time.push([newCourse.startTime,newCourse.endTime]);
    final_obj.have.courses.estimated_time_needed.push([newCourse.studyHours]);
    final_obj.have.courses.colour.push([newCourse.color]);
    final_obj.have.courses.automated.push([newCourse.automated]);
  }

  finalObjCourseDelete = (id) =>{
    final_obj.have.courses.course_name.splice(id-1,1);
    final_obj.have.courses.location.building.splice(id-1,1);
    final_obj.have.courses.location.room.splice(id-1,1);
    final_obj.have.courses.frequency.splice(id-1,1);
    final_obj.have.courses.time.splice(id-1,1);
    final_obj.have.courses.estimated_time_needed.splice(id-1,1);
    final_obj.have.courses.colour.splice(id-1, 1);
    final_obj.have.courses.automated.splice(id-1, 1);
  }

  handleRemoveCourse(id) {
    this.finalObjCourseDelete(id);
    console.log("Removing course at index:", id);
    const newCourses = this.state.courses.filter(course => {return course.id !== id} );
    console.log("New course list:", newCourses);
    this.setState({
      courses: newCourses,
    });
    this.render();
  }

  onLabAdded(nameInput, buildingInput, roomInput, startTimeInput, endTimeInput, frequencyInput,temp, selectedColor){
    
    this.state.lab_name = nameInput;
    this.state.lab_building = buildingInput;
    this.state.lab_room = roomInput;
    this.state.lab_end_time = endTimeInput;
    this.state.lab_start_time = startTimeInput;
    this.state.lab_days = frequencyInput;
    this.state.lab_color = selectedColor;


    const newLab = {
      id: this.state.idnum += 1, 
      name: this.state.lab_name,
      building: this.state.lab_building,
      room: this.state.lab_room,
      startTime: this.state.lab_start_time,
      endTime: this.state.lab_end_time,
      frequency: this.state.lab_days,
      color: this.state.lab_color,
    };

    if ((this.state.lab_name !== '') && (this.state.lab_building !== '') && (this.state.lab_room !== '') && (this.state.lab_start_time !== '') && (this.state.lab_end_time !== '') && (this.state.frequency !== "")){
      this.setState({
        labs: [...this.state.labs, newLab],
      });
      this.finalObjLabAdd(newLab,temp);
    }
    else{
      alert("Invalid Inputs");
    }
  }

  finalObjLabAdd = (newLab,temp)=>{
    final_obj.have.labs.lab_name.push(newLab.name);
    final_obj.have.labs.location.building.push(newLab.building);
    final_obj.have.labs.location.room.push(newLab.room);
    final_obj.have.labs.frequency.push(temp);
    final_obj.have.labs.time.push([newLab.startTime,newLab.endTime]);
    final_obj.have.labs.colour.push([newLab.color]);
  }
  
  finalObjLabDelete = (id) =>{
    final_obj.have.labs.lab_name.splice(id-1,1);
    final_obj.have.labs.location.building.splice(id-1,1);
    final_obj.have.labs.location.room.splice(id-1,1);
    final_obj.have.labs.frequency.splice(id-1,1);
    final_obj.have.labs.time.splice(id-1,1);
    final_obj.have.labs.colour.splice(id-1, 1);
  }

  handleRemoveLab(id) {
    this.finalObjLabDelete(id);
    const newLabs = this.state.labs.filter(lab => {return lab.id !== id} );
    this.setState({
      labs: newLabs,
    });
    this.render();
  }


  onWorkAdded(nameInput, locationInput, startTimeInput, endTimeInput, frequencyInput,temp, selectedColor){
    this.state.work_name = nameInput;
    this.state.work_location = locationInput;
    this.state.work_end_time = endTimeInput;
    this.state.work_start_time = startTimeInput;
    this.state.work_days = frequencyInput;
    this.state.work_color = selectedColor;

    const newWork = {
      id: this.state.idnum += 1, 
      name: this.state.work_name,
      building: this.state.work_location,
      startTime: this.state.work_start_time,
      endTime: this.state.work_end_time,
      frequency: this.state.work_days,
      color: this.state.work_color
    };
    if ((this.state.work_name !== '') && (this.state.work_location !== '') && (this.state.work_start_time !== '') && (this.state.work_end_time !== '') && (this.state.frequency !== '')){
      this.setState({
        work: [...this.state.work, newWork],
      });
      this.finalObjWorkAdd(newWork,temp);
    }
    else{
      alert("Invalid Inputs");
    }
    
  }

  finalObjWorkAdd = (newWork,temp)=>{
    final_obj.have.work.job_position.push(newWork.name);
    final_obj.have.work.location.push(newWork.building);
    final_obj.have.work.frequency.push(temp);
    final_obj.have.work.time.push([newWork.startTime,newWork.endTime]);
    final_obj.have.work.colour.push([newWork.color]);
  }

  finalObjWorkDelete = (id) =>{
    final_obj.have.work.job_position.splice(id-1,1);
    final_obj.have.work.location.splice(id-1,1);
    final_obj.have.work.frequency.splice(id-1,1);
    final_obj.have.work.time.splice(id-1,1);
    final_obj.have.work.colour.splice(id-1, 1);
  }

  handleRemoveWork(id) {
    this.finalObjWorkDelete(id);
    const newWork = this.state.work.filter(work => {return work.id !== id} );
    this.setState({
      work: newWork,
    });
    this.render();
  }

  onButtonSubmit = () =>{
    console.log(final_obj.have.courses.course_name.length);
    if (final_obj.have.courses.course_name.length === 0){
      alert("No Courses Entered");
    }
    else{
      let temp_course_count=final_obj.have.courses.course_name.length;
  
      final_obj.have.extras.waketime.splice(0, 1);
      final_obj.have.extras.sleeptime.splice(0, 1);
      final_obj.have.extras.sleeptime.push([this.state.sleep_time]);
      final_obj.have.extras.waketime.push([this.state.wake_time]);
      console.log(final_obj);
      let obj=JSON.stringify(final_obj);
      console.log(obj)
      
    
        fetch(`http://localhost:8000/api/generate-schedule`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: obj
        })
        .then(response => response.text())
        .then((responseText) => {
          // console.log(JSON.parse(responseText)[0].weeklyschedule);
          this.setState({
            isGenrated: true,
            jpeg: JSON.parse(responseText)[0].weeklyschedule
          })
      })
    }
    
  }
    // console.log(obj)
    // console.log(JSON.parse(obj))
    onButtonDownload = () =>{
      let temp_course_count=final_obj.have.courses.course_name.length;
      final_obj.have.extras.waketime.splice(0, 1);
      final_obj.have.extras.sleeptime.splice(0, 1);
      final_obj.have.extras.sleeptime.push([this.state.sleep_time]);
      final_obj.have.extras.waketime.push([this.state.wake_time]);
      console.log(final_obj);
      let obj=JSON.stringify(final_obj);
      fetch(`http://localhost:8000/api/generate-schedule`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: obj
      })
      .then(response => response.text())
      .then((responseText) => {
        fileDownload(JSON.parse(responseText)[0].icsfile, "cal.ics")
        // console.log(JSON.parse(responseText)[0].weeklyschedule);
    })
    }
  
  

  render(){
    const { sleep_hours } = this.state;
    
    const courseList = this.state.courses.map((course) => {
      return (
        <div key={course.id} className="course-container">
          
          <CourseItem
            name={course.name}
            building={course.building}
            room={course.room}
            startTime={course.startTime}
            endTime={course.endTime}
            frequency={course.frequency}
            color={course.color}
            studyHours={course.studyHours}
            automated={course.automated}
          />
          <button className='w-20 grow f4 link ph3 pointer pv2 dib  bg-white-10 dblue' onClick={() => this.handleRemoveCourse(course.id)}>
            X
          </button>
        </div>
      );
    });

    const labList = this.state.labs.map((lab) => {
      return (
        <div key={lab.id} className="course-container">
          
          <LabItem
            name={lab.name}
            building={lab.building}
            room={lab.room}
            startTime={lab.startTime}
            endTime={lab.endTime}
            frequency={lab.frequency}
            color={lab.color}
          />
          <button className='w-20 grow f4 link ph3 pointer pv2 dib  bg-white-10 dblue' onClick={() => this.handleRemoveLab(lab.id)}>
            X
          </button>
        </div>
      );
    });

    const workList = this.state.work.map((work,) => {
      return (
        <div key={work.id} className="course-container">
          
          <WorkItem
            name={work.name}
            building={work.building}
            room={work.room}
            startTime={work.startTime}
            endTime={work.endTime}
            frequency={work.frequency}
            color={work.color}
          />
          <button className='w-20 grow f4 link ph3 pointer pv2 dib  bg-white-10 dblue' onClick={() => this.handleRemoveWork(work.id)}>
            X
          </button>
        </div>
      );
    });

    return(
      <div className="App">  
        <Logo/>
        <Forms onCourseAdded={this.onCourseAdded} onCourseNameChange={this.onCourseNameChange} onCourseBuildingChange={this.onCourseBuildingChange} onCourseRoomChange={this.onCourseRoomChange} onCourseStartTimeChange={this.onCourseStartTimeChange} onCourseEndTimeChange={this.onCourseEndTimeChange} onCourseDaysChange={this.onCourseDaysChange}/> 
        {courseList}
        <Lab onLabAdded={this.onLabAdded} onLabNameChange={this.onLabNameChange} onLabBuildingchange={this.onLabBuildingchange} onLabRoomChange={this.onLabRoomChange} onLabStartTimeChange={this.onLabStartTimeChange} onLabEndTimeChange={this.onLabEndTimeChange} onLabDaysChange={this.onLabDaysChange}/>
        {labList}
        {this.state.hasAd ? <Ad height="250px" link="https://wingsquad.com/wp-content/uploads/wingsquad-delivery-ad-350x250-1.jpg"/>: <br/>}
        <Work onWorkAdded={this.onWorkAdded} onWorkNameChange={this.onWorkNameChange} onWorkLocationChange={this.onWorkLocationChange} onWorkStartTimeChange={this.onWorkStartTimeChange} onWorkEndTimeChange={this.onWorkEndTimeChange} onWorkDaysChange={this.onWorkDaysChange}/>
        {workList}
        <SleepTracker onSleepHoursChange={this.handleSleepHoursChange} />
        <p style={{fontFamily: "Roboto"}}>Current sleep hours: {this.state.sleep_hours}</p>

        <button className='w-30 grow f4 link pointer ph3 pv2 dib white bg-silver mb4' style={{fontFamily: "Roboto"}} onClick={this.onButtonSubmit}>Generate Schedule Image</button><br/>
        <button className='w-30 grow f4 link pointer ph3 pv2 dib white bg-silver mb4' style={{fontFamily: "Roboto"}} onClick={this.onButtonDownload}>Download .ics File</button>
        {this.state.isGenrated ? <img style={{width:'75%',height:'auto'}} src={`data:image/jpeg;base64, ${this.state.jpeg}`} /> : <br/>}
        {this.state.hasAd ? <Ad height="250px" link="https://wingsquad.com/wp-content/uploads/wingsquad-delivery-ad-350x250-1.jpg"/>: <br/>}
      </div>
    );
  }
}

let final_obj={
  have: {
    courses:
      {
        course_name: [],
        estimated_time_needed:[],
        location: 
        {
          building: [],
          room:[]
        },
        frequency: [],
        time: [],
        colour:[],
        automated:[] 
      },
    labs:{
      lab_name: [],
      location: 
      {
        building: [],
        room:[]
      },
      frequency: [],
      time: [],
      colour:[] 
    },
    work:{
      job_position: [],
      location: [],
      frequency: [],
      time: [] ,
      colour:[] 
    },
    extras:{
      waketime:[],
      sleeptime:[]
    }
  }
}    

export default App;
