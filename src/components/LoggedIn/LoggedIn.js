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
  }

  return<>
  <h1> zalogowano</h1>
{console.log("ok")}
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
      {setTimeout(() => {
        <div className="logged-in-weather">
        <h1>{loginStatus.loggedUser.localisation}</h1>
        <div className='logged-in-icon'>
          {loginStatus.status ? <h1>{calCelsius(currentWeather.main.temp)}&deg;C </h1> : null}
          <img style={{width: 200}} src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="current weather icon"></img>
        </div>
        <h1><i className="fas fa-street-view"></i><i className="fas fa-thermometer-half"></i>  {calCelsius(currentWeather.main.feels_like)}&deg;</h1>
        <h1><i className="fas fa-wind"></i> {currentWeather.wind.speed}</h1>
        {currentWeather.rain && <h1><i className="fas fa-cloud-rain"></i> {Object.values(currentWeather.rain)[0]} </h1>}
        <i className="fas fa-bicycle" style={{color: 'white', fontSize:"300%"}} ></i>
      </div>
      }, 3000)}
      
    </div>
  </div>
  

  </>
}

export default LoggedIn;
