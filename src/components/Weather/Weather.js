import React, {useState, useEffect} from 'react';
import {API_KEY, API_URL} from "../../api/constatns";
import moment from 'moment'

const WEATHER_URL = "http://localhost:3001/weather"

const Weather = () => {
    const [localisation, setLocalisation] = useState();
    const [forecast5, setForecast5] = useState(false);
    const [colorBike, setColorBike] = useState("white");

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
    // const colorFunc = (color) => {
    //   setColorBike(color)
    // }
    // console.log(colorBike);

    // useEffect(() => {
    //   colorFunc()
    //   console.log(colorBike);
    // }, [colorBike])
    

      

    return<>
    <div className='weather'>
        <label> Wpisz lokalizacje: </label>
        <input placeholder="Wpisz miasto" className="input-style" type="text" value={localisation} onChange={handleLocalisationInput}></input>
        <button onClick={handleClickAgree} className="btn">Zatwierdź: {localisation}</button>
    </div>
    {forecast5 ? <div>
      <h1>Pogoda w mieście: {forecast5.city.name}</h1>
      <div>
        <h1>wschód słońca: {moment(forecast5.city.sunrise).format('LT')} {forecast5.city.sunrise} ?</h1>
        <h1>zachód słońca: {moment(forecast5.city.sunset).format('LT')} {forecast5.city.sunset} ?</h1>
        {forecast5.list.map((el, i) => <li key={i}>
        <h1>{el.dt_txt}</h1>
        <img src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="Weather icon"></img>
          {calCelsius(el.main.temp)}&deg;
          {/* {calCelsius(el.main.temp) >= 10 ? () => colorFunc("green") : () => colorFunc("red")} */}
          {console.log(calCelsius(el.main.temp))}
          <div style={{width: 50, height: 50, backgroundColor: colorBike}}></div>
          <h1>odczuwalna: {calCelsius(el.main.feels_like)}&deg;</h1>
          prędkość wiatru: {el.wind.speed}
      </li>)}</div>
    </div> : <h1>Twoja Pogoda</h1> }
    </>
}


export default Weather;

// opady:{el.rain.['3h']} mm
// dlaczego to nie działa ?


// switch (true) {
//   case(calCelsius(el.main.temp) >= 10) :
//   setColorBike("green");
//   break;
//   case(calCelsius(el.main.temp) >= 5) :
//   setColorBike("orange");
//   break;
//   case(calCelsius(el.main.temp) <= 0) :
//   setColorBike("red");
//   break;
//   default:
//     console.log("Błędna wartość");
// }