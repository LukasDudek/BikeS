import React, {useState} from 'react';
import {JSON_SERWER} from '../../api/constatns';

const Workouts = ({users, setUsers, loginStatus, setLoginStatus, allKM, allTimeH, allTimeM}) => {

  const [treningData, setTreningData] = useState({
    id: loginStatus.loggedUser.workouts?.length,
    km: 0,
    h: 0,
    minutes: 0,
    localisation: "",
    date: ""
  })

  console.log(loginStatus);
  console.log(users);


  const handleAddWorkout = (e) => {
    if (loginStatus.status === false ) {
      alert("Musisz być zalogowany")
    } else {
      e.preventDefault();
    console.log("dodano trening");
  
    const newWorkout = [...loginStatus.loggedUser.workouts]
    newWorkout.push(treningData);

    fetch(`${JSON_SERWER}/users/${loginStatus.loggedUser.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        workouts: newWorkout,
        all_km: allKM
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(userWithNewWorkout => {
        const userscopy = [...users];
        const newArrUsers = userscopy.filter(users => users.id !== loginStatus.loggedUser.id);
        newArrUsers.push(userWithNewWorkout);

        setUsers(newArrUsers)
      })
      .catch(error => {
        console.log(error);
      });




      const loginDatewithtrening = {
        ...loginStatus, loggedUser:{
          ...loginStatus.loggedUser,
          workouts: newWorkout,
          all_km: allKM
      }
      }

      fetch(`${JSON_SERWER}/login`, {
        method: "PUT",
        body: JSON.stringify(loginDatewithtrening),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(updateLoginWithNewTrening => setLoginStatus({
          status: updateLoginWithNewTrening.status,
          loggedUser: updateLoginWithNewTrening.loggedUser
        }))
        .catch(error => {
          console.log(error);
        });
        console.log(loginStatus)
  
  }
}

  const handleDeleteWorkout = (e, id) =>{
    // e.preventDefault();
    const deleteWorkout = [...loginStatus.loggedUser.workouts]
    // const deletedWorkout = deleteWorkout.filter( deleteWorkout => deleteWorkout.id !== );
    const deletedWorkout = deleteWorkout.filter(el => el.id !== id);

    fetch(`${JSON_SERWER}/users/${loginStatus.loggedUser.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        workouts: deletedWorkout
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(userWithDeletedWorkout => {
        setUsers(prevState => prevState.filter(users => users.id !== loginStatus.loggedUser.id));
        console.log(users);

        setUsers((prevState) => ({
          ...prevState, userWithDeletedWorkout
        }));

        const userscopySec = [...users];
        const newArrUsersDel = userscopySec.filter(users => users.id !== loginStatus.loggedUser.id);
        newArrUsersDel.push(userWithDeletedWorkout);

        setUsers(newArrUsersDel);

      })
      .catch(error => {
        console.log(error);
      });

      const loginWithDeletedTrening = {
        ...loginStatus, loggedUser:{
          ...loginStatus.loggedUser,
          workouts: deletedWorkout}
      }

      fetch(`${JSON_SERWER}/login`, {
        method: "PUT",
        body: JSON.stringify(loginWithDeletedTrening),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(updateLoginWithDeletedTrening => setLoginStatus({
          status: updateLoginWithDeletedTrening.status,
          loggedUser: updateLoginWithDeletedTrening.loggedUser
        }))
        .catch(error => {
          console.log(error);
        });

  }

    return<>
    
  <div className="container-workouts">
      <form className="form-add-workouts">
        <div>
          <h1 className="add-workouts-string">Dodaj Trening</h1>
        </div>
        <div className="cont-inputs-add-workouts">
          <div className="inputs-add-workouts">
            <label>Ilość kilometrów: </label>
            <input style={{width: "30%"}} type="number" onChange={e => setTreningData({...treningData, km: e.target.value })}></input>
            <label>Czas jazdy: </label>
            <div className="add-time-of-ride">
              <input onChange={e => setTreningData({...treningData, h: e.target.value })} style={{width: "20%"}} placeholder="godziny" type="number"></input>
              <input onChange={e => setTreningData({...treningData, minutes: e.target.value })}style={{width: "20%"}} placeholder="minuty" type="number"></input>
            </div>
            <label>Lokalizacja: </label>
            <input type="text" onChange={e => setTreningData({...treningData, localisation: e.target.value })}></input>
            <label>Data: </label>
            <input type="datetime-local" onChange={e => setTreningData({...treningData, date: e.target.value })}></input>
          </div>
              
          <div>
            <button type='submit' onClick={handleAddWorkout} ><i className="fas fa-plus" style={{color: " rgba(172, 160, 5, 0.933)", fontSize:"200%", alignSelf: "flex-end"}}></i></button>
          </div>
        </div>  
      </form>
      <div className="general-info-workouts">
        <div className="all-kilometers inf-all-workouts">
          <h1>Wszystkie kilometry: <span>{allKM}</span></h1>
        </div>
        <div className="all-kcl inf-all-workouts">
          <h1>Wszystkie spalone kalorie: </h1>
        </div>
        <div className="all-workouts-time inf-all-workouts">
          <h1> Łączny czas treningów: <span>{allTimeH} h {allTimeM} m</span> </h1>
        </div>
    </div>
  </div>
  {loginStatus.status ? <div className="container-list-of-trening">
      {loginStatus.loggedUser.workouts.map((el, i) => {
        return<div className="cont-trening" key={i}>
          <div className='date-details'>
          <h1>{i + 1}</h1>
          <h1>{el.date}</h1>
          </div>

          <div className='cont-details'>
            <div className="first-half-tr">
              <h1><i className="fas fa-history"></i> {el.h} h {el.minutes} m</h1>
              <h1><i className="fas fa-road"></i> {el.km} km</h1>
            </div>

            <div className="mid-half">
            <h1> <i className="fas fa-map-marker-alt"></i> {el.localisation}</h1>
            </div>
              
            <div className="second-half-tr">
              <i className="fas fa-biking"></i>
              <button onClick={e => handleDeleteWorkout( e, el.id)} ><i style={{color: "red"}}className="fas fa-trash-alt"></i></button>
            </div>
          </div>
          
          
        </div>
      })}
  </div> : null}
  
    
    </>
}

export default Workouts;