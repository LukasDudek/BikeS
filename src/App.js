import React, {useState, useEffect} from 'react'

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

// http://localhost:3005/users?login=pawel&password=AlaMaKota

function App() {
  const [users, setUsers] = useState([]);
  const [loginStatus, setLoginStatus] = useState({
    status: false,
    loggedUser: {}
  })

  useEffect(()=> {
    fetch(`${JSON_SERWER}/db`)
        .then(data => data.json())
        .then(data => setUsers(data.users) && setLoginStatus({
          status: data.login.status,
          loggedUser: data.login.loggedUser
        }))
        .catch(err => console.log(err))
  }, []);

  // useEffect(()=> {
  //   fetch(`${JSON_SERWER}/login`)
  //       .then(data => data.json())
  //       .then(data => setLoginStatus(data.status) && setLoggedUser(data.loggedUser))
  //       .catch(err => console.log(err))
  // }, [loginStatus]);

  console.log(users);
  console.log(loginStatus);


  return (
    <div className="App container">
  <Router>
    <>
    <div></div>
    <Navigation />
      <Switch>
        <Route exact path="/" component={ () => <Home loginStatus={loginStatus} setLoginStatus={setLoginStatus} users={users} setUsers={setUsers} />} />
        <Route path="/weather" component={Weather}/>
        <Route path="/addWorkouts" component={Workouts}/>
        <Route path="/planningTrenings" component={PlanningTrenings}/>
      </Switch>
    </>
  </Router>
    </div>
  );
}

export default App;
