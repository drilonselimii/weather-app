import React from 'react';
import './showhidebtn.css'


const ShowHideBtn = ({isShown, hiden }) => {
    return (
    <div>
    <label className="button">
        <input type="checkbox" checked={isShown} onChange={hiden} />
        <span className="changer"></span>
    </label>
    </div>
)
}
  
  export default ShowHideBtn;