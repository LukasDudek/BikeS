import React, {useState, useEffect} from 'react';
import {API_KEY, API_URL} from './api/constatns';

import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import Navigation from './components/Navigation';
import Weather from './components/Weather';
import Workouts from './components/Workouts/Workouts';
import PlanningTrenings from './components/PlanningTrenings'
import {JSON_SERWER} from './api/constatns';

// const defaultWeather = {
//   main: {
//     temp: ''
//   },
//   weather: []
// }

// http://localhost:3005/users?login=pawel&password=AlaMaKota

function App() {
  const [users, setUsers] = useState([]);
  const [loginStatus, setLoginStatus] = useState({
    status: false,
    loggedUser: {}
  })
  const [currentWeather, setCurrentWeather] = useState(null);
  const [allKM, setAllKM] = useState(0);
  const [allTimeH, setAllTimeH] = useState(0);
  const [allTimeM, setAllTimeM] = useState(0);



  useEffect(()=> {
    fetch(`${JSON_SERWER}/db`)
        .then(data => data.json())
        .then(data => {
          setUsers(data.users);
          setLoginStatus({
          status: data.login.status,
          loggedUser: data.login.loggedUser
        })})
        .catch(err => console.log(err))
        // return () => {

        // }
  }, []);

  useEffect(() => {
    if (loginStatus?.loggedUser?.localisation) {
      fetch(`${API_URL}/data/2.5/weather?q=${loginStatus.loggedUser.localisation}&appid=${API_KEY}`)
      .then (resp => resp.json())
      .then (data => data.cod === "400" ? console.log("bad query") : setCurrentWeather(data))
      .catch (err => console.warn(err))
    }

  }, [loginStatus])


  useEffect(()=> {
    if (loginStatus?.status === false ) {
      setAllKM(0);
      setAllTimeH(0);
      setAllTimeM(0);
    } else {
        let sumaTimeH = 0;
        let sumaTimeM = 0;
        let sumaKM = 0;
      for (let i = 0; i < loginStatus.loggedUser.workouts.length; i++) {
        sumaKM = +sumaKM + +loginStatus.loggedUser.workouts[i].km;
        sumaTimeH = +sumaTimeH + +loginStatus.loggedUser.workouts[i].h
        sumaTimeM = +sumaTimeM + +loginStatus.loggedUser.workouts[i].minutes
        if (sumaTimeM >= 60) {
          sumaTimeH = +sumaTimeH + (parseInt(+sumaTimeM/60))
          sumaTimeM = +sumaTimeM%60
          
        }
        } 
        return (
        setAllKM(sumaKM),
        setAllTimeH(sumaTimeH),
        setAllTimeM(sumaTimeM)
        )
    }

  }, [loginStatus])
  
  


  
  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }



  return (
    <div className="App container">
  <Router>
    <>
    <div></div>
    <Navigation />
      <Switch>
        <Route exact path="/" component={ () => <Home loginStatus={loginStatus} setLoginStatus={setLoginStatus} users={users} setUsers={setUsers} calCelsius={calCelsius} currentWeather={currentWeather} setCurrentWeather={setCurrentWeather} allKM={allKM} allTimeH={allTimeH} allTimeM={allTimeM} />} />
        <Route path="/weather" component={() => <Weather users={users} setUsers={setUsers} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />}/>
        <Route path="/addWorkouts" component={ () => <Workouts users={users} setUsers={setUsers} loginStatus={loginStatus} setLoginStatus={setLoginStatus} allKM={allKM} allTimeH={allTimeH} allTimeM={allTimeM} />}/>
        <Route path="/planningTrenings" component={() =>  <PlanningTrenings users={users} setUsers={setUsers} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />}/>
      </Switch>
    </>
  </Router>
    </div>
  );
}

export default App;
