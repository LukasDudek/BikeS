import React, {useState, useEffect} from 'react';
import {API_KEY, API_URL} from "../../api/constatns";

const WEATHER_URL = "http://localhost:3001/weather"

const Weather = () => {
    const [localisation, setLocalisation] = useState();

    const handleClickAgree = () => {
        fetch(`${API_URL}/current?access_key=${API_KEY}&query=${localisation}`)
        .then (resp => resp.json())
        .then (data => console.log(data))
        .catch (err => console.warn(err))
    }

    const handleLocalisationInput = (e) => {
        setLocalisation(e.target.value)
    }

    return<>
    <div className='weather'>
        <label> Wpisz lokalizacje: </label>
        <input placeholder="Miasto bez polskich znaków" className="input-style" type="text" value={localisation} onChange={handleLocalisationInput}></input>
        <button onClick={handleClickAgree} className="btn">Zatwierdź: {localisation}</button>
    </div>
    </>
}


export default Weather;