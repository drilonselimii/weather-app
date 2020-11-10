import React, { useState } from 'react';
import UnitSwitch from "./UnitSwitch"

const api = {
  key: "e290eb88d2d5938026ef99df369c6734",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const [isToggled, setIsToggled] = useState(false);
 

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

 let weatherType = "app";

 if (typeof weather.main != "undefined"){
  if(weather.weather[0].main === 'Clouds'){
    weatherType = "app clouds"
  }
  else if(weather.weather[0].main === 'Rain'){
    weatherType = "app rain"
  }
  else if(weather.weather[0].main === 'Snow'){
    weatherType = "app snow"
  }
  else  weatherType = "app"
 } else  weatherType = "app"

 let unit_result = 0;
 let unit = '';
 
 if(typeof weather.main != "undefined"){
 if(isToggled === false)
 {
   unit_result = Math.round(weather.main.temp);
   unit = 'C';
 }
 else {
   unit_result = Math.round(((weather.main.temp)*1.8)+32);
   unit = 'F';
 }}

  return (
    <div className={weatherType}>
     <main>
      <div className="search-box">
        <input type="text"
        className="search-bar"
        placeholder="Search..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        />
        <br />
        <br />
        <UnitSwitch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
        <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">
        {unit_result}° {unit}
        </div>
        <div className="weather">{weather.weather[0].main}</div>
      </div></div>
      ) : ('')}
     </main>
    </div>
  );
}

export default App;
