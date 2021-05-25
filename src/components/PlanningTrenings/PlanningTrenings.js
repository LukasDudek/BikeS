import React, { useState } from 'react';
import {JSON_SERWER} from '../../api/constatns';

const PlanningTrenings = ({loginStatus, setLoginStatus, users, setUsers}) => {
  const [planData, setPlanData] = useState({
    id: loginStatus.loggedUser.planning_Workouts?.length,
    localisation: "",
    date: ""
  })

  const handleAddPlaningWorkout = (e) => {
    if (loginStatus.status === false ) {
      alert("Musisz być zalogowany")
    } else {

      e.preventDefault();
    console.log("dodano zaplanowaną jazdę");

    const newPlan = [...loginStatus.loggedUser.planning_Workouts]
    newPlan.push(planData);

    fetch(`${JSON_SERWER}/users/${loginStatus.loggedUser.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        planning_Workouts: newPlan,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(userWithNewPlaningWorkout => {
      const userscopyP = [...users];
      const newArrUsersP = userscopyP.filter(users => users.id !== loginStatus.loggedUser.id);
      newArrUsersP.push(userWithNewPlaningWorkout);

      setUsers(newArrUsersP)
    })
    .catch(error => {
      console.log(error);
    });

    const loginDatewithPlan = {
      ...loginStatus, loggedUser:{
        ...loginStatus.loggedUser,
        planning_Workouts: newPlan
      }
    }

    fetch(`${JSON_SERWER}/login`, {
      method: "PUT",
      body: JSON.stringify(loginDatewithPlan),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(updateLoginWithNewPlan => setLoginStatus({
        status: updateLoginWithNewPlan.status,
        loggedUser: updateLoginWithNewPlan.loggedUser
      }))
      .catch(error => {
        console.log(error);
      });
      console.log(loginStatus)


    }
  }

  const handleDeletePlanningWorkout = (e, id) =>{

    const deletePlanWorkout = [...loginStatus.loggedUser.planning_Workouts]

    const deletedPlanWorkout = deletePlanWorkout.filter(el => el.id !== id);

    fetch(`${JSON_SERWER}/users/${loginStatus.loggedUser.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        workouts: deletedPlanWorkout
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(userWithDeletedPlanWorkout => {
        setUsers(prevState => prevState.filter(users => users.id !== loginStatus.loggedUser.id));
        console.log(users);

        setUsers((prevState) => ({
          ...prevState, userWithDeletedPlanWorkout
        }));

        const userscopySecond = [...users];
        const newArrUsersDelete = userscopySecond.filter(users => users.id !== loginStatus.loggedUser.id);
        newArrUsersDelete.push(userWithDeletedPlanWorkout);

        setUsers(newArrUsersDelete);

      })
      .catch(error => {
        console.log(error);
      });

      const loginWithDeletedPlanTrening = {
        ...loginStatus, loggedUser:{
          ...loginStatus.loggedUser,
          planning_Workouts: deletedPlanWorkout}
      }

      fetch(`${JSON_SERWER}/login`, {
        method: "PUT",
        body: JSON.stringify(loginWithDeletedPlanTrening),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(updateLoginWithDeletedPlanTrening => setLoginStatus({
          status: updateLoginWithDeletedPlanTrening.status,
          loggedUser: updateLoginWithDeletedPlanTrening.loggedUser
        }))
        .catch(error => {
          console.log(error);
        });

  }


  return<div className="container-planning-trenings">
    <form className="form-add-workouts">
      <div>
        <h1 className="add-workouts-string">Zaplanuj Trening</h1>
      </div>
      <div className="cont-inputs-add-workouts">
        <div className="inputs-add-workouts">
          <label>Lokalizacja: </label>
          <input type="text" onChange={e => setPlanData({...planData, localisation: e.target.value })}></input>
          <label>Data: </label>
          <input type="datetime-local" onChange={e => setPlanData({...planData, date: e.target.value })}></input>
        </div>
        <div>
          <button onClick={handleAddPlaningWorkout} type="submit"><i className="fas fa-plus" style={{color: "rgba(172, 160, 5, 0.933)", fontSize:"200%", alignSelf: "flex-end"}}></i></button>
        </div>
      </div>
    </form>

    {loginStatus.status ? <div className="container-list-of-plan">
      {loginStatus.loggedUser.planning_Workouts.map((el, i) => {
        return<div className="cont-plan" key={i}>
          <div className='date-details-plan'>
          <h1>{i + 1}</h1>
          <h1>{el.date.slice(0,10)}</h1>
          <h1>{el.date.slice(11,16)}</h1>
          </div>

          <div className='cont-details-plan'>
            
            <div className="second-sect-pl">
            <h1> <i className="fas fa-map-marker-alt"></i> {el.localisation}</h1>
            </div>
              
            <div className="third-sect-pl">
              <i className="fas fa-biking"></i>
              <button onClick={e => handleDeletePlanningWorkout( e, el.id)} ><i style={{color: "red"}}className="fas fa-trash-alt"></i></button>
            </div>
          </div>
          
          
        </div>
      })}
  </div> : null}

  </div>

  
}

export default PlanningTrenings;