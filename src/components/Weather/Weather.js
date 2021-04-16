import React, {useState, useEffect} from 'react';
import {API_KEY, API_URL} from "../../api/constatns";
import moment from 'moment'

const WEATHER_URL = "http://localhost:3001/weather"

const Weather = () => {
    const [localisation, setLocalisation] = useState();
    const [forecast5, setForecast5] = useState(false);

    const handleClickAgree = () => {
        fetch(`${API_URL}/data/2.5/forecast?q=${localisation}&appid=${API_KEY}`)
        .then (resp => resp.json())
        .then (data => setForecast5(data))
        .catch (err => console.warn(err))
    }
    // console.log(forecast5.city.name);

    const handleLocalisationInput = (e) => {
        setLocalisation(e.target.value)
    }

    const calCelsius = (temp) => {
      let cell = Math.floor(temp - 273.15);
      return cell;
    }
    

    return<>
    <div className='weather'>
        <label> Wpisz lokalizacje: </label>
        <input placeholder="Wpisz miasto" className="input-style" type="text" value={localisation} onChange={handleLocalisationInput}></input>
        <button onClick={handleClickAgree} className="btn">Zatwierdź: {localisation}</button>
    </div>
    {forecast5 ? 
    <div className="weather-list-container">
      <div className="prelude-weather-list" >
        <div className="info-city">
          <h1>Pogoda w mieście: {forecast5.city.name}</h1>
          <h1>wschód słońca: {moment(forecast5.city.sunrise).format('hh:mm')} </h1>
          <h1>zachód słońca: {moment(forecast5.city.sunset).format('HH:mm')}</h1>
        </div>
        <div className="scale-bike">
          <div className="scale-bikes" >
            <i className="fas fa-bicycle" style={{color: "#451313", fontSize:"120%"}} ></i> 
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "maroon", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "#b70102", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "peru", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "orange", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "#e6d002", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "yellow", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "darkgreen", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "lime", fontSize:"120%"}} ></i>
          </div>
          <div className="arrow-scale">
            <i class="far fa-frown" style={{color: "white", fontSize:"180%", marginTop: "10px"}}></i>
            <i class="fas fa-long-arrow-alt-right" style={{color: "white", fontSize:"280%"}}
            ></i>
            <i class="far fa-smile-beam" style={{color: "white", fontSize:"180%", marginTop: "10px"}}></i>
          </div>
        
          
        </div>
      </div>  
      

      <div className="list-of-weather">
        {forecast5.list.map((el, i) => {
        let colorb = "white"
        console.log(calCelsius(el.main.temp))
        switch (true) {
            case(calCelsius(el.main.temp) >= 14 && el.weather[0].main !== "Rain") :
            colorb = "lime";
            break;
            case(calCelsius(el.main.temp) >= 14 && el.weather[0].main === "Rain") :
            colorb = "darkgreen";
            break;
            case(calCelsius(el.main.temp) >= 7 && el.weather[0].main !== "Rain") :
            colorb = "yellow";
            break;
            case(calCelsius(el.main.temp) >= 7 && el.weather[0].main === "Rain") :
            colorb = "#e6d002";
            break;
            case(calCelsius(el.main.temp) >= 0 && el.weather[0].main !== "Rain") :
            colorb = "orange";
            break;
            case(calCelsius(el.main.temp) >= 0 && el.weather[0].main === "Rain") :
            colorb = "peru";
            break;
            case(calCelsius(el.main.temp) >= -5 && el.weather[0].main !== "Rain") :
            colorb = "#d63638";
            break;
            case(calCelsius(el.main.temp) >= -5 && el.weather[0].main === "Rain") :
            colorb = "maroon";
            break;
            case(calCelsius(el.main.temp) < -5 && el.weather[0].main === "Rain") :
            colorb = "#451313";
            break;
            case(calCelsius(el.main.temp) < -5 && el.weather[0].main !== "Rain") :
            colorb = "#451313";
            break;
            default:
              console.log("Błędna wartość");
          }
        return<div 
        className="weather-box" key={i}>
          <h1>{el.dt_txt}</h1>
          <div className="weather-all"> 
            <div>
              <img style={{width: 200}} src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="Weather icon"></img>
            </div>
            <div className="tem-div">
              <span>{calCelsius(el.main.temp)}&deg;</span>
            </div> 
            
            
            
          </div>
          <div className="weather-box-content"> 
              {console.log(calCelsius(el.main.temp))}
              <h1>odczuwalna: {calCelsius(el.main.feels_like)}&deg;</h1>
              <h1>prędkość wiatru: {el.wind.speed}</h1>
              <h1>opady: {JSON.stringify(el.rain)}mm</h1>
              
            </div>
            <div className="bicycle-box-icon">
              <i className="fas fa-bicycle" style={{color: colorb, fontSize:"300%"}} ></i>
              <i class="fas fa-plus" style={{color: "green", fontSize:"200%", alignSelf: "flex-end"}}></i>
            </div>
      </div>
    })}
      </div>
    </div> : <h1>Twoja Pogoda</h1> }
    </>
}


export default Weather;
