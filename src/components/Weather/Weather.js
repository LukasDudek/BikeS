import React, {useState} from 'react';
import {API_KEY, API_URL, JSON_SERWER} from "../../api/constatns";
import { useHistory } from 'react-router-dom'


const Weather = ({loginStatus, setLoginStatus, users, setUsers}) => {
  const history = useHistory()
  const [localisation, setLocalisation] = useState();
  const [forecast5, setForecast5] = useState(false);

    const handleClickAgree = () => {
        fetch(`${API_URL}/data/2.5/forecast?q=${localisation}&appid=${API_KEY}`)
        .then (resp => resp.json())
        .then (data => setForecast5(data))
        .catch (err => console.warn(err))
    }


    const handleLocalisationInput = (e) => {
        setLocalisation(e.target.value)
    }

    const calCelsius = (temp) => {
      let cell = Math.floor(temp - 273.15);
      return cell;
    }
    
    const handleSaveCity = (e) => {
      if (loginStatus.status === false ) {
        alert("Musisz być zalogowany")
      } else {

        e.preventDefault();

        fetch(`${JSON_SERWER}/users/${loginStatus.loggedUser.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            localisation: localisation,
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .then(userWithNewLocalisation => {
          const userscopyL = [...users];
          const newArrUsersL = userscopyL.filter(users => users.id !== loginStatus.loggedUser.id);
          newArrUsersL.push(userWithNewLocalisation);
          setUsers(newArrUsersL);
        })
        .catch(error => {
          console.log(error);
        });

        const loginDatewithLocalisation = {
          ...loginStatus, loggedUser:{
            ...loginStatus.loggedUser,
            localisation: localisation
          }
        }
        
        fetch(`${JSON_SERWER}/login`, {
          method: "PUT",
          body: JSON.stringify(loginDatewithLocalisation),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(updateLoginWithLocalisation => setLoginStatus({
            status: updateLoginWithLocalisation.status,
            loggedUser: updateLoginWithLocalisation.loggedUser
          }))
          .catch(error => {
            console.log(error);
          });
      }
    }

    return<>
    <div className='weather'>
        <label> Wpisz lokalizacje: </label>
        <input placeholder="Wpisz miasto" className="input-style" type="text" value={localisation} onChange={handleLocalisationInput}></input>
        <button onClick={handleClickAgree} className="btn">Szukaj</button>
        {localisation?.length > 1 ? <button onClick={(e) => {history.push(`/`); handleSaveCity(e);} }
          className="btn">Zapisz jako domyślną miejscowość: <br></br>{localisation}</button> : null}
        
    </div>
    {forecast5 ? 
    <div className="weather-list-container">
      <div className="prelude-weather-list" >
        <div className="scale-bike">
          <div className="scale-bikes" >
            <i className="fas fa-bicycle" style={{color: "#451313", fontSize:"120%"}} ></i> 
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "maroon", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "#b70102", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "rgba(205, 155, 3, 0.64)", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "orange", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "rgba(235, 247, 7, 0.56)", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "yellow", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "rgba(15, 111, 31, 0.51)", fontSize:"120%"}} ></i>
            <i> </i>
            <i className="fas fa-bicycle" style={{color: "lime", fontSize:"120%"}} ></i>
          </div>
          <div className="arrow-scale">
            <i className="far fa-frown" style={{color: "white", fontSize:"120%", marginTop: "10px"}}></i>
            <i className="fas fa-long-arrow-alt-right" style={{color: "white", fontSize:"180%"}}
            ></i>
            <i className="far fa-smile-beam" style={{color: "white", fontSize:"120%", marginTop: "10px"}}></i>
          </div>
        
          
        </div>
      </div>  
      

      <div className="list-of-weather">
        {forecast5.list.map((el, i) => {
        let colorb = "white"
        switch (true) {
            case(calCelsius(el.main.temp) >= 14 && el.weather[0].main !== "Rain") :
            colorb = "lime";
            break;
            case(calCelsius(el.main.temp) >= 14 && el.weather[0].main === "Rain") :
            colorb = "rgba(15, 111, 31, 0.51)";
            break;
            case(calCelsius(el.main.temp) >= 7 && el.weather[0].main !== "Rain") :
            colorb = "yellow";
            break;
            case(calCelsius(el.main.temp) >= 7 && el.weather[0].main === "Rain") :
            colorb = "rgba(235, 247, 7, 0.56)";
            break;
            case(calCelsius(el.main.temp) >= 0 && el.weather[0].main !== "Rain") :
            colorb = "orange";
            break;
            case(calCelsius(el.main.temp) >= 0 && el.weather[0].main === "Rain") :
            colorb = "rgba(205, 155, 3, 0.64)";
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
              <img className="weather-img" src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="Weather icon"></img>
            </div>
            <div className="tem-div">
              <span>{calCelsius(el.main.temp)}&deg;</span>
            </div> 
            
            
            
          </div>
          <div className="weather-box-content"> 
              {console.log(calCelsius(el.main.temp))}
              <h1><i className="fas fa-street-view"></i><i className="fas fa-thermometer-half"></i> {calCelsius(el.main.feels_like)}&deg;</h1>
              <h1><i className="fas fa-wind"></i> {el.wind.speed}</h1>
              {el.rain && <h1><i className="fas fa-cloud-rain"></i> {Object.values(el.rain)[0]} </h1>}
              
            </div>
            <div className="bicycle-box-icon">
              <i className="fas fa-bicycle bike-w" style={{color: colorb}} ></i>
              <i onClick={() => history.push(`/planningTrenings?location=${localisation}`)} className="fas fa-plus" style={{color: "green", fontSize:"200%", alignSelf: "flex-end"}}></i>
            </div>
      </div>
    })}
      </div>
    </div> : 
      <div className="scale-bike-conteiner-m"> 
        <div style={{width: "auto", alignSelf:'center'}}className="scale-bike-m">
          <div className="scale-bikes-m" style={{flexDirection: "column"}} >
            <div>
              <h1 className="skala-m">Skala rowerowa na podstawie pogody</h1>
            </div>
            <div>
              <i className="fas fa-bicycle" style={{color: "#451313", fontSize:"280%"}} ></i> 
              <i> </i>
              <i className="fas fa-bicycle" style={{color: "maroon", fontSize:"280%"}} ></i>
              <i> </i>
              <i className="fas fa-bicycle" style={{color: "#b70102", fontSize:"280%"}} ></i>
              <i> </i>
              <i className="fas fa-bicycle" style={{color: "rgba(205, 155, 3, 0.64)", fontSize:"280%"}} ></i>
              <i> </i>
              <i className="fas fa-bicycle" style={{color: "orange", fontSize:"280%"}} ></i>
              <i> </i>
              <i className="fas fa-bicycle" style={{color: "rgba(235, 247, 7, 0.56)", fontSize:"280%"}} ></i>
              <i> </i>
              <i className="fas fa-bicycle" style={{color: "yellow", fontSize:"280%"}} ></i>
              <i> </i>
              <i className="fas fa-bicycle" style={{color: "rgba(15, 111, 31, 0.51)", fontSize:"280%"}} ></i>
              <i> </i>
              <i className="fas fa-bicycle" style={{color: "lime", fontSize:"280%"}} ></i>
            </div>
            <div className="arrow-scale-m">
              <i className="far fa-frown" style={{color: "lightgray", fontSize:"220%", marginTop: "10px"}}></i>
              <i className="fas fa-long-arrow-alt-right" style={{color: "lightgray", fontSize:"330%"}}
              ></i>
              <i className="far fa-smile-beam" style={{color: "lightgray", fontSize:"220%", marginTop: "10px"}}></i>
            </div>
          </div>  
        </div>
      </div>
    }
    </>
}


export default Weather;
