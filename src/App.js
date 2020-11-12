import React, { useState } from 'react';
import UnitSwitch from './UnitSwitch'
import NextDay from './NextDay'
import ShowHideBtn from './ShowHideBtn';

const api = {
  key: "e290eb88d2d5938026ef99df369c6734",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const [isToggled, setIsToggled] = useState(false);

  const [isShown, setIsShown] = useState(false);
 

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
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

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay();
  let day1 = days[today+1];
  let day2 = days[today+2];
  let day3 = days[today+3];
  let day4 = days[today+4];
  let day5 = days[today+5];
  let day6 = days[today+6];
  let day7 = days[today+7];

 
  
 let weatherType = "app";

 if (typeof weather.list != "undefined"){
  if(weather.list[0].weather[0].main === 'Clouds'){
    weatherType = "app clouds"
  }
  else if(weather.list[0].weather[0].main === 'Rain'){
    weatherType = "app rain"
  }
  else if(weather.list[0].weather[0].main === 'Snow'){
    weatherType = "app snow"
  }
  else  weatherType = "app"
 } else  weatherType = "app"

 let unit_result = 0;
 let unit = '';
 
 if(typeof weather.list != "undefined"){
 if(isToggled === false)
 {
   unit_result = Math.round(weather.list[0].main.temp);
   unit = 'C';
 }
 else {
   unit_result = Math.round(((weather.list[0].main.temp)*1.8)+32);
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
      {(typeof weather.list != "undefined") ? (
        <div className="todayw-position">
        <div className="location-box">
        <div className="location">{weather.city.name}, {weather.city.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">
        {unit_result}° {unit}
        </div>
        <div className="weather">{weather.list[0].weather[0].main}</div>
      </div></div>
      ) : ('')}

      
     {(typeof weather.list != "undefined") ? ((isShown === true) ? ( 
      <div className="next7days">
       <NextDay day={day1} minTemp={Math.round(weather.list[1].main.temp_min)} maxTemp={Math.round(weather.list[1].main.temp_max)} main={weather.list[1].weather[0].main}/>
       <NextDay day={day2} minTemp={Math.round(weather.list[2].main.temp_min)} maxTemp={Math.round(weather.list[2].main.temp_max)} main={weather.list[2].weather[0].main}/>
       <NextDay day={day3} minTemp={Math.round(weather.list[3].main.temp_min)} maxTemp={Math.round(weather.list[3].main.temp_max)} main={weather.list[3].weather[0].main}/>
       <NextDay day={day4} minTemp={Math.round(weather.list[4].main.temp_min)} maxTemp={Math.round(weather.list[4].main.temp_max)} main={weather.list[4].weather[0].main}/>
       <NextDay day={day5} minTemp={Math.round(weather.list[5].main.temp_min)} maxTemp={Math.round(weather.list[5].main.temp_max)} main={weather.list[5].weather[0].main}/>
       <NextDay day={day6} minTemp={Math.round(weather.list[6].main.temp_min)} maxTemp={Math.round(weather.list[6].main.temp_max)} main={weather.list[6].weather[0].main}/>
       <NextDay day={day7} minTemp={Math.round(weather.list[7].main.temp_min)} maxTemp={Math.round(weather.list[7].main.temp_max)} main={weather.list[7].weather[0].main}/>
     </div>
     ) : ('')) : ('')}
      {(typeof weather.list != "undefined") ? (
     <ShowHideBtn isShown={isShown} hiden={() => setIsShown(!isShown)} />) : ('')}
     </main>
     
    </div>
  );
}

export default App;
