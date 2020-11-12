import React from 'react'
import './nextday.css'

function NextDay(props){
return(
    <div className="nextday">
        <table >
        <tr className="row">        
            <td className="col1">{props.day}</td>
            <td className="col2">Min Temp: {props.minTemp}° C</td>
            <td className="col3">Max Temp: {props.maxTemp}° C</td>
            <td className="col4">{props.main}</td></tr>
        </table>
    </div>
)
}

export default NextDay