import React from 'react';
import {useState} from 'react'
import './ColorDropdown.css';
const Work= ({onWorkAdded,onWorkNameChange,onWorkLocationChange,onWorkStartTimeChange,onWorkEndTimeChange,onWorkDaysChange}) =>{
    const [isMondayChecked, setIsMondayChecked] = useState(false);
    function handleMondayCheckboxChange(event) {
        setIsMondayChecked(event.target.checked);
      }
    const [isTuesdayChecked, setIsTuesdayChecked] = useState(false);
    function handleTuesdayCheckboxChange(event) {
        setIsTuesdayChecked(event.target.checked);
    }
    const [isWednesdayChecked, setIsWednesdayChecked] = useState(false);
    function handleWednesdayCheckboxChange(event) {
        setIsWednesdayChecked(event.target.checked);
    }
    const [isThrusdayChecked, setIsThrusdayChecked] = useState(false);
    function handleThrusdayCheckboxChange(event) {
        setIsThrusdayChecked(event.target.checked);
    }
    const [isFridayChecked, setIsFridayChecked] = useState(false);
    function handleFridayCheckboxChange(event) {
        setIsFridayChecked(event.target.checked);
    }
    const [isSaturdayChecked, setIsSaturdayChecked] = useState(false);
    function handleSaturdayCheckboxChange(event) {
        setIsSaturdayChecked(event.target.checked);
    }
    const [isSundayChecked, setIsSundayChecked] = useState(false);
    function handleSundayCheckboxChange(event) {
        setIsSundayChecked(event.target.checked);
    }
    let temp=[isMondayChecked,isTuesdayChecked,isWednesdayChecked,isThrusdayChecked,isFridayChecked,isSaturdayChecked,isSundayChecked];
    const [nameValue, setNameValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [startTimeValue, setStartTimeValue] = useState('');
    const [endTimeValue, setEndTimeValue] = useState('');
    let frequencyValue = '';

    function add(){
        onWorkDaysChange();
        onWorkAdded(nameValue, locationValue, startTimeValue, endTimeValue, frequencyValue, temp, selectedColor);
        if((nameValue !== '') && (locationValue !== '') && (startTimeValue !== '') && (endTimeValue !== '') && (frequencyValue !== '')){
            setNameValue('');
            setLocationValue('');
            setStartTimeValue('');
            setEndTimeValue('');
            setFrequencyUnchecked();
            setSelectedColor(colorOptions[4].value)
        }  
    }

    function onWorkNameChange(event){
        setNameValue(event.target.value)
    }

    function onWorkLocationChange(event){
        setLocationValue(event.target.value)
    }

    function onWorkStartTimeChange(event){
        setStartTimeValue(event.target.value)
    }

    function onWorkEndTimeChange(event){
        setEndTimeValue(event.target.value)
    }
    
    function onWorkDaysChange(){
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
        if(isSaturdayChecked){
            tempFreq += ' Sa';
        }
        if(isSundayChecked){
            tempFreq+= ' Su'
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
        setIsSundayChecked(false);
        setIsSaturdayChecked(false);
    }

    

    function handleColorChange(newColor) {
        setSelectedColor(newColor);
        
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
    
    return(
        <div>
            <div className="center pa4 pl6 pr6  shadow-5 mine mb3 mt3 " style={{width: '70%', minWidth:'500px', maxWidth:'700px' ,fontFamily: "Roboto", fontWeight:'bold', paddingRight:'7%', paddingLeft:'7%'}}>
                <legend class="f2 fw6 ph0 mh0 pa3 center">Job Details</legend>
                <div className='pa0' style={{alignItems:'center', display:'flex'}}>
                    <div style={{width: '30%'}}>
                        <label className='left pr2 fr'>Job Name</label>
                    </div>
                <input style={{width: '70%'}} className="pa1 f4 w-70 center " type='text' value={nameValue} onChange={onWorkNameChange}/>
                </div>
                <div className='pt3'>
                    <div className='pb3'>
                    <label className='pb3 f4 fw3'> Job Location</label><br/>
                    </div>
                    <div className='pb3'style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                            <label className=' pr3 fr' >Location</label> 
                        </div>
                        <input className="pa1 f4 w-70 center " type='text' value={locationValue} style={{width: '70%'}} onChange={onWorkLocationChange}/><br/>
                    </div>
                    <div className='pa0 '>
                    <div className='pb2'>
                    <label className=' f4  '>Time</label><br/>
                    </div>
                    <div className='pb2' style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                            <label className='pr2 fr'> Start Time</label>
                        </div>
                        <input className="f4  center " type='time' value={startTimeValue} style={{width: '70%'}} onChange={onWorkStartTimeChange}/><br/>
                    </div>
                    <div className='pb2' style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                        <label className='pr3 fr'> End Time</label> 
                        </div>
                        <input className="f4 w-70 center " type='time' value={endTimeValue} style={{width: '70%'}} onChange={onWorkEndTimeChange}/><br/>
                    </div>
                </div>                
                </div>
                <div className='pt3 '>
                    <label className='pr2 mr2'> Frequency</label>
                    <input type="checkbox" className='mr2 pointer' checked={isMondayChecked} onChange={handleMondayCheckboxChange} />
                    <input type="checkbox" className='mr2 pointer' checked={isTuesdayChecked} onChange={handleTuesdayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isWednesdayChecked} onChange={handleWednesdayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isThrusdayChecked} onChange={handleThrusdayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isFridayChecked} onChange={handleFridayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isSaturdayChecked} onChange={handleSaturdayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isSundayChecked} onChange={handleSundayCheckboxChange}/>
                </div>
                <div className='ml5 flex justify-center'>
                    <p className='f7 ml2 '>M</p>
                    <p className='f7 ml2 pl1'>T</p>
                    <p className='f7 ml2 pl1'>W</p>
                    <p className='f7 ml2 pl1'>T</p>
                    <p className='f7 ml2 pl1'>F</p>
                    <p className='f7 ml2 pl1'>S</p>
                    <p className='f7 ml2 pl1'>S</p>
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
                <button className='w-20 grow f4 link ph3 pv2 dib white pointer bg-white-10 blue' onClick={() => {add()}}>
                Add
                </button>
            </div>
        </div>
    )
}

export default Work;