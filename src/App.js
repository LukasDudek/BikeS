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

const defaultWeather = {
  main: {
    temp: ''
  }
}

// http://localhost:3005/users?login=pawel&password=AlaMaKota

function App() {
  const [users, setUsers] = useState([]);
  const [loginStatus, setLoginStatus] = useState({
    status: false,
    loggedUser: {}
  })
  const [currentWeather, setCurrentWeather] = useState(defaultWeather);
  const [workouts, setWorkouts] = useState([]);
  const [planningWorkouts, setPlanningWorkouts] = useState([]);

  

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
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/data/2.5/weather?q=${loginStatus.loggedUser.localisation}&appid=${API_KEY}`)
              .then (resp => resp.json())
              .then (data => setCurrentWeather(data))
              .catch (err => console.warn(err))
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
        <Route exact path="/" component={ () => <Home loginStatus={loginStatus} setLoginStatus={setLoginStatus} users={users} setUsers={setUsers} calCelsius={calCelsius} currentWeather={currentWeather} setCurrentWeather={setCurrentWeather} />} />
        <Route path="/weather" component={Weather}/>
        <Route path="/addWorkouts" component={ () => <Workouts workouts={workouts} setWorkouts={setWorkouts} users={users} setUsers={setUsers} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />}/>
        <Route path="/planningTrenings" component={PlanningTrenings}/>
      </Switch>
    </>
  </Router>
    </div>
  );
}

export default App;
