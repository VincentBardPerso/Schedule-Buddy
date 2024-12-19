import React, { useState } from 'react';

function StudyHoursSlider({ value, onSliderChange }) {
  function handleChange(event) {
    onSliderChange(parseInt(event.target.value));
  }

  return (
    <div
      style={{
        borderRadius: '0.25rem',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: "60px"
      }}
    >
      <label title="Number of hours you would like to spend on studying this course's material throughout the week" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Study Hours:</label>
      <input
        type="range"
        min="1"
        max="12"
        id="study-hours"
        value={value}
        onChange={handleChange}
        style={{
          width: '80%',
          margin: '0 0.5rem'
        }}
      />
      <output style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{value} hours</output>
    </div>
  );
}

export default StudyHoursSlider;