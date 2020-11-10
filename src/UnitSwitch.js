import React from 'react';
import './switchcss.css'


const UnitSwitch = ({isToggled, onToggle }) => {
    return (
    <div className="inline-switch">
    <span id="celsius" >°C</span>
    <label className="switch">
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span className="slider" />
    </label>
    <span id="farad" >°F</span>
    </div>
)
}
  
  export default UnitSwitch;