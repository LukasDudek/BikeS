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

  useEffect(()=> {
    fetch(`${JSON_SERWER}/users`)
        .then(data => data.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err))
  }, []);

  console.log(users);
  console.log(users.length);

  return (
    <div className="App container">
  <Router>
    <>
    <div></div>
    <Navigation />
      <Switch>
        <Route exact path="/" component={Home} users={users} setUsers={setUsers} />
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
