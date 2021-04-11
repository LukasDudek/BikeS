import React, {useState, useEffect} from 'react';

const WEATHER_URL = "http://localhost:3001/weather"

const Weather = () => {
    const [localisation, setLocalisation] = useState();

    const handleLocalisationInput = (e) => {
        setLocalisation(e.target.value)
    }

    return<>
    <div className='weather'>
      <label> Wpisz lokalizacje: </label>
      <input className="input-style" type="text" value={localisation} onChange={handleLocalisationInput}></input>
    <h1>{localisation}</h1>
    </div>
    </>
}


export default Weather;