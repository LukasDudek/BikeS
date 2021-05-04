import React, {useState, useEffect} from 'react';
import {JSON_SERWER} from '../../api/constatns';
// import {API_KEY, API_URL} from "../../api/constatns";

const LoggedIn = ({loginStatus, setLoginStatus, calCelsius, currentWeather}) => {
  console.log(currentWeather);

  const handleLogOut = () => {
    const loginDate = {
      status: false,
      loggedUser: {}
    }

    fetch(`${JSON_SERWER}/login`, {
      method: "PUT",
      body: JSON.stringify(loginDate),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(user => setLoginStatus({
        status: user.status,
        loggedUser: user.loggedUser
      }))
      .catch(error => {
        console.log(error);
      });
      console.log("Wylogowano");
      console.log(loginStatus);
      console.log(currentWeather.weather[0])
  }
  let colora = "white"
  
  if (currentWeather !== null) {
    
        switch (true) {
            case(calCelsius(currentWeather.main.temp) >= 14 && currentWeather.weather[0].main !== "Rain") :
            colora = "lime";
            break;
            case(calCelsius(currentWeather.main.temp) >= 14 && currentWeather.weather[0].main === "Rain") :
            colora = "rgba(15, 111, 31, 0.51)";
            break;
            case(calCelsius(currentWeather.main.temp) >= 7 && currentWeather.weather[0].main !== "Rain") :
            colora = "yellow";
            break;
            case(calCelsius(currentWeather.main.temp) >= 7 && currentWeather.weather[0].main === "Rain") :
            colora = "rgba(235, 247, 7, 0.56)";
            break;
            case(calCelsius(currentWeather.main.temp) >= 0 && currentWeather.weather[0].main !== "Rain") :
            colora = "orange";
            break;
            case(calCelsius(currentWeather.main.temp) >= 0 && currentWeather.weather[0].main === "Rain") :
            colora = "rgba(205, 155, 3, 0.64)";
            break;
            case(calCelsius(currentWeather.main.temp) >= -5 && currentWeather.weather[0].main !== "Rain") :
            colora = "#d63638";
            break;
            case(calCelsius(currentWeather.main.temp) >= -5 && currentWeather.weather[0].main === "Rain") :
            colora = "maroon";
            break;
            case(calCelsius(currentWeather.main.temp) < -5 && currentWeather.weather[0].main === "Rain") :
            colora = "#451313";
            break;
            case(calCelsius(currentWeather.main.temp) < -5 && currentWeather.weather[0].main !== "Rain") :
            colora = "#451313";
            break;
            default:
              console.log("Błędna wartość");
          }
  }
  

  return<>
  <div className="logged-in-conteiner">
    <div className='logged-in-title-profile'>
      <div className="logged-in-conteiner-title">
        <h1 > Witaj w BikeS </h1>
      </div>
      <div className="profile"> 
          <h1>{loginStatus.loggedUser.login}</h1>
          <h2><i className="fas fa-road"></i> {loginStatus.loggedUser.all_km} km</h2>
          <h2><i className="fas fa-history"></i> {loginStatus.loggedUser.all_time} h</h2>
          <h2><i className="fas fa-bicycle"></i> {loginStatus.loggedUser.type_of_bike}</h2>
          <h2><i className="fas fa-male"></i><i className="fas fa-arrows-alt-v"></i> {loginStatus.loggedUser.height} cm </h2>
          <h2><i className="fas fa-weight"></i> {loginStatus.loggedUser.weight} kg</h2>
          <button onClick={handleLogOut} className="btn">Wyloguj</button>
      </div>
    </div>

    <div className='logged-in-weather-conteiner'>
      
      {currentWeather && (
    
        <div className="logged-in-weather">
        <h1>{loginStatus.loggedUser.localisation}</h1>
        <div className='logged-in-icon'>
          {loginStatus.status ? <h1>{calCelsius(currentWeather.main.temp)}&deg;C </h1> : null}
          <img style={{width: 200}} src={`http://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`} alt="current weather icon"></img>
        </div>
         {/* optional changing , property*/}
        <h1><i className="fas fa-street-view"></i><i className="fas fa-thermometer-half"></i>  {calCelsius(currentWeather.main.feels_like)}&deg;</h1>
        <h1><i className="fas fa-wind"></i> {currentWeather.wind.speed}</h1>
        {currentWeather.rain && <h1><i className="fas fa-cloud-rain"></i> {Object.values(currentWeather.rain)[0]} </h1>}
        <i className="fas fa-bicycle" style={{color: colora === undefined ? "white" : colora, fontSize:"300%"}} ></i>
      </div>
      )}
        

      
    </div>
  </div>
  

  </>
}

export default LoggedIn;
