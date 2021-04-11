import React from 'react'

import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import Navigation from './components/Navigation';
import Weather from './components/Weather';
import Workouts from './components/Workouts/Workouts';
import Map from './components/Map'


function App() {
  return (
    <div className="App">
  <Router>
    <>
    <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/weather" component={Weather}/>
        <Route path="/map" component={Map}/>
        <Route path="/workouts" component={Workouts}/>
      </Switch>
    </>
  </Router>
    </div>
  );
}

export default App;
