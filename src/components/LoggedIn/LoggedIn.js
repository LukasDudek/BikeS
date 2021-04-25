import React, {useState} from 'react';
import {JSON_SERWER} from '../../api/constatns';

const LoggedIn = ({loginStatus, setLoginStatus}) => {

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
  <div className="logged-in-conteiner">
    <h1>{loginStatus.loggedUser.login}</h1>
    <h1>{loginStatus.loggedUser.localisation}</h1>
    <h1>Przejechane kilometry: {loginStatus.loggedUser.all_km}</h1>
    <h1>Łączny czas treningów: {loginStatus.loggedUser.all_time}</h1>
    <h1> Witaj w aplikacja BikeS </h1> 
    <button onClick={handleLogOut} className="btn">Wyloguj</button>
  </div>
  

  </>
}

export default LoggedIn;
