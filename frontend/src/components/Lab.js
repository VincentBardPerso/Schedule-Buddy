import React from 'react'
import {useState} from 'react'
import './ColorDropdown.css';
const Labs= ({onLabAdded,onLabNameChange,onLabBuildingchange,onLabRoomChange,onLabStartTimeChange,onLabEndTimeChange,onLabDaysChange}) =>{
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
    let temp=[isMondayChecked,isTuesdayChecked,isWednesdayChecked,isThrusdayChecked,isFridayChecked];
    const [nameValue, setNameValue] = useState('');
    const [buildingValue, setBuildingValue] = useState('');
    const [roomValue, setRoomValue] = useState('');
    const [startTimeValue, setStartTimeValue] = useState('');
    const [endTimeValue, setEndTimeValue] = useState('');
    let frequencyValue = '';

    function add(){
        onLabDaysChange();
        onLabAdded(nameValue, buildingValue, roomValue, startTimeValue, endTimeValue, frequencyValue,temp, selectedColor);
        if((nameValue !== '') && (buildingValue !== '') && (roomValue !== '') && (startTimeValue !== '') && (endTimeValue !== '') && (frequencyValue !== '')){
            console.log("hey");
            setNameValue('');
            setBuildingValue('');
            setRoomValue('');
            setStartTimeValue('');
            setEndTimeValue('');
            setFrequencyUnchecked();
            setSelectedColor(colorOptions[4].value);
        }
        
    }
    function onLabNameChange(event){
        setNameValue(event.target.value)
    }
    function onLabBuildingchange(event){
        setBuildingValue(event.target.value)
    }
    function onLabRoomChange(event){
        setRoomValue(event.target.value)
    }
    function onLabStartTimeChange(event){
        setStartTimeValue(event.target.value)
    }
    function onLabEndTimeChange(event){
        setEndTimeValue(event.target.value)
    }
    
    function onLabDaysChange(){
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
            <div className="center pa4 pl6 pr6  shadow-5 mine mb3 " style={{width: '70%', minWidth:'500px', maxWidth:'700px' ,fontFamily: "Roboto", fontWeight:'bold', paddingRight:'7%', paddingLeft:'7%'}}>
                <legend class="f2 fw6 ph0 mh0 pa3 center">Lab Details</legend>
                <div className='pa0' style={{alignItems:'center', display:'flex'}}>
                    <div style={{width: '30%'}}>
                        <label className='left pr2 fr'> Lab Name</label>
                    </div>
                    <input style={{width: '70%'}} className="pa1 f4 w-70 center " type='text' value={nameValue} onChange={onLabNameChange}/>
                </div>
                <div className='pt3'>
                    <div className='pb3'>
                    <label className='pb3 f4 fw3'> Lab Location</label><br/>
                    </div>
                    <div className='pb3' style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                            <label className=' pr3 fr'>Building</label>
                        </div> 
                        <input style={{width: '70%'}} className="pa1 f4 w-70 center " value={buildingValue} type='text'  onChange={onLabBuildingchange}/><br/>
                    </div>
                    <div style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                            <label className=' pr4 fr'>Room</label> 
                        </div> 
                        <input className="pa1 f4 w-70 center " type='text' value={roomValue} style={{width: '70%'}} onChange={onLabRoomChange}/>
                    </div>
                    <div className='pa0 '>
                    <div className='pb2'>
                    <label className=' f4  '>Time</label><br/>
                    </div>
                    <div className='pb2' style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                            <label className='pr2 fr'> Start Time</label>
                        </div>
                        <input className="f4  center " type='time' value={startTimeValue} style={{width: '70%'}} onChange={onLabStartTimeChange}/><br/>
                    </div>
                    <div className='pb2' style={{alignItems:'center', display:'flex'}}>
                        <div style={{width: '30%'}}>
                        <label className='pr3 fr'> End Time</label> 
                        </div>
                        <input className="f4 w-70 center " type='time' value={endTimeValue} style={{width: '70%'}} onChange={onLabEndTimeChange}/><br/>
                    </div>
                </div>  
                </div>
                <div className='pt3 '>
                    <label className='pr2 mr2'> Frequency</label>
                    <input type="checkbox" className='mr2 pointer' checked={isMondayChecked} onChange={handleMondayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isTuesdayChecked} onChange={handleTuesdayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isWednesdayChecked} onChange={handleWednesdayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isThrusdayChecked} onChange={handleThrusdayCheckboxChange}/>
                    <input type="checkbox" className='mr2 pointer' checked={isFridayChecked} onChange={handleFridayCheckboxChange}/>
                </div>
                <div className='ml5 flex justify-center '>
                    <p className='f7 ml2 pl1'>M</p>
                    <p className='f7 ml2 pl1 '>T</p>
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
                
                <button className='w-20 grow f4 link ph3 pv2 dib pointer  bg-white-10 blue' onClick={() => {add()}}>
                Add
                </button>
            </div>
        </div>
    )
}

export default Labs;