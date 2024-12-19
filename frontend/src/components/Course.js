import React from 'react'
import {useState} from 'react'
import './ColorDropdown.css';
import StudyHoursSlider from './StudyHoursSlider';
import '@fontsource/roboto'


const Forms= ({onCourseAdded, onCourseNameChange,onCourseBuildingChange,onCourseRoomChange,onCourseStartTimeChange,onCourseEndTimeChange}) =>{
    const [isMondayChecked, setIsMondayChecked] = useState(false);
    function handleMondayCheckboxChange(event) {
        setIsMondayChecked(event.target.checked);
        onCourseDaysChange();
      }
    const [isTuesdayChecked, setIsTuesdayChecked] = useState(false);
    function handleTuesdayCheckboxChange(event) {
        setIsTuesdayChecked(event.target.checked);
        onCourseDaysChange();
    }
    const [isWednesdayChecked, setIsWednesdayChecked] = useState(false);
    function handleWednesdayCheckboxChange(event) {
        setIsWednesdayChecked(event.target.checked);
        onCourseDaysChange();
    }
    const [isThrusdayChecked, setIsThrusdayChecked] = useState(false);
    function handleThrusdayCheckboxChange(event) {
        setIsThrusdayChecked(event.target.checked);
        onCourseDaysChange();
    }
    const [isFridayChecked, setIsFridayChecked] = useState(false);
    function handleFridayCheckboxChange(event) {
        setIsFridayChecked(event.target.checked);
        onCourseDaysChange();
    }
    let temp=[isMondayChecked,isTuesdayChecked,isWednesdayChecked,isThrusdayChecked,isFridayChecked];
    const [nameValue, setNameValue] = useState('');
    const [buildingValue, setBuildingValue] = useState('');
    const [roomValue, setRoomValue] = useState('');
    const [startTimeValue, setStartTimeValue] = useState('');
    const [endTimeValue, setEndTimeValue] = useState('');
    let frequencyValue = '';

    function add(){
        onCourseDaysChange();
        onCourseAdded(nameValue, buildingValue, roomValue, startTimeValue, endTimeValue, frequencyValue, temp, selectedColor, studyHours, automated);
        if((nameValue !== '') && (buildingValue !== '') && (roomValue !== '') && (startTimeValue !== '') && (endTimeValue !== '') && (frequencyValue !== '')){
            setNameValue('');
            setBuildingValue('');
            setRoomValue('');
            setStartTimeValue('');
            setEndTimeValue('');
            setFrequencyUnchecked();
            setSelectedColor(colorOptions[4].value);
            setHours(1);
        }
        
    }
    function onCourseNameChange(event){
        setNameValue(event.target.value)
    }
    function onCourseBuildingChange(event){
        setBuildingValue(event.target.value)
    }
    function onCourseRoomChange(event){
        setRoomValue(event.target.value)
    }
    function onCourseStartTimeChange(event){
        setStartTimeValue(event.target.value);
        console.log(event.target.value);
    }
    function onCourseEndTimeChange(event){
        setEndTimeValue(event.target.value)
    }
    
    function onCourseDaysChange(){
        let tempFreq='';
        if (isMondayChecked){
            tempFreq += " Mo";
        }
        if(isTuesdayChecked){
            tempFreq += " Tu";
        }
        if(isWednesdayChecked){
            tempFreq += ' We';
        }
        if(isThrusdayChecked){
            tempFreq += ' Th';
        }
        if(isFridayChecked){
            tempFreq += ' Fr';
        }
        frequencyValue = tempFreq;
        console.log(tempFreq);

    }
    function setFrequencyUnchecked(){
        setIsMondayChecked(false);
        setIsTuesdayChecked(false);
        setIsFridayChecked(false);
        setIsThrusdayChecked(false);
        setIsWednesdayChecked(false);
    }

    

    function handleColorChange(newColor) {
        setSelectedColor(newColor);
    }

    const [studyHours, setHours] = useState(1);

    function handleSliderChange(value) {
        setHours(value);
    }

    const colorOptions = [
        { label: 'Royalblue', value: 'royalblue' },
        { label: 'Lightcoral', value: 'lightcoral' },
        { label: 'Bisque', value: 'bisque' },
        { label: 'Palegreen', value: 'palegreen' },
        { label: 'Skyblue', value: 'skyblue' },
        { label: 'Lemonchiffon', value: 'lemonchiffon' },
        { label: 'Orange', value: 'orange' },
        { label: 'Plum', value: 'plum' }
      ];
    
      const [selectedColor, setSelectedColor] = useState(colorOptions[4].value);

      function handleColorChange(event) {
        const selectedValue = event.target.value;
        setSelectedColor(selectedValue);
        
      }

      const [automated, setAutomated] = useState(false);
      const [sliderVisible, setSliderVisible] = useState('visible')

    function handleCheckboxChange(event) {
        setAutomated(event.target.checked);
        if(automated === false){
            setSliderVisible("hidden");
        }
        else{
            setSliderVisible("visible");
        }
    }

    return(
        <div>
            <div className="center pa4 pl6 pr6  shadow-5 mine mb3" style={{width: '70%', minWidth:'500px', maxWidth:'700px' ,fontFamily: "Roboto", fontWeight:'bold', paddingRight:'7%', paddingLeft:'7%'}}>
            <legend class="f2 fw6 ph0 mh0 pa3 center">Course Details</legend>
                <div className='pa0' style={{alignItems:'center', display:'flex'}}>
                    <div style={{width: '30%'}}>
                        <label className='left pr2 fr'> Course Name</label>
                    </div>
                    <input id='name' className="pa1 f4 w-70 center " type='text' value={nameValue} onChange={onCourseNameChange} style={{width: '70%'}}/>
                </div>
                <div className='pt3'>
                    <div className='pb3'>
                    <label className='pb3 f4 '> Class Location</label><br/>
                    </div>
                    <div className='pb3'style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                            <label className=' pr3 fr' >Building</label>
                        </div>
                        <input className="pa1 f4   " type='text' value={buildingValue} style={{width: '70%'}} onChange={onCourseBuildingChange} /><br/>
                    </div>
                    <div style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                            <label className=' pr4 fr'>Room</label> 
                        </div>
                        <input className="pa1 f4 w-70 center " type='text' value={roomValue} style={{width: '70%'}} onChange={onCourseRoomChange}/><br/>
                    </div>
                <div className='pa0 '>
                    <div className='pb2'>
                    <label className=' f4  '>Time</label><br/>
                    </div>
                    <div className='pb2' style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                            <label className='pr2 fr'> Start Time</label>
                        </div>
                        <input className="f4  center " type='time' value={startTimeValue} style={{width: '70%'}} onChange={onCourseStartTimeChange}/><br/>
                    </div>
                    <div className='pb2' style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                        <label className='pr3 fr'> End Time</label> 
                        </div>
                        <input className="f4 w-70 center " type='time' value={endTimeValue} style={{width: '70%'}} onChange={onCourseEndTimeChange}/><br/>
                    </div>
                </div> 
                </div>
                <div className='pt3 '>
                    <label className='pr2 mr3'> Frequency</label>
                    <input type="checkbox" className='mr2 pointer' checked={isMondayChecked} onChange={handleMondayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isTuesdayChecked} onChange={handleTuesdayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isWednesdayChecked} onChange={handleWednesdayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isThrusdayChecked} onChange={handleThrusdayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isFridayChecked} onChange={handleFridayCheckboxChange}/>
                </div>
                <div className='ml5 flex justify-center pl1'>
                    <p className='f7 ml3 pl1'>M</p>
                    <p className='f7 ml2 pl1'>T</p>
                    <p className='f7 ml2 pl1'>W</p>
                    <p className='f7 ml2 pl1'>T</p>
                    <p className='f7 ml2 pl1'>F</p>
                </div>
                <div className="color-dropdown-container">
                    <label htmlFor="color-dropdown" className="color-dropdown-label">Choose a color:</label>
                        <select
                            id="color-dropdown"
                            value={selectedColor}
                            onChange={handleColorChange}
                            className="color-dropdown-select"
                            style={{background: selectedColor}}
                        >
                        {colorOptions.map((color) => (
                        <option key={color.value} style={{ backgroundColor: color.value }} value={color.value}>
                            {color.label}
                        </option>
                        ))}
                    </select>
                </div>
            <div style={{justifyContent:"center", alignItems:"center", display:"flex"}}>
                <label>
                    Automated time selection
                </label>
                <input type="checkbox" checked={automated} onChange={handleCheckboxChange} style={{width:"40px", height:"20px"}}/>
            </div>
                <div style={{visibility:sliderVisible}}>
                    <StudyHoursSlider value={studyHours} onSliderChange={handleSliderChange}></StudyHoursSlider>
                </div>
                
                <button className='w-20 grow f4 link ph3 pointer pv2 dib  bg-white-10 dblue' onClick={() => { add();}}>
                Add
                </button>
            </div>
        </div>
    )
}

export default Forms;