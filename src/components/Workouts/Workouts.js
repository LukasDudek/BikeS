import React, {useState} from 'react';

const Workouts = ({workouts, setWorkouts, setUsers, loginStatus, setLoginStatus}) => {

  const [treningData, setTreningData] = useState({
    km: 0,
    h: 0,
    minutes: 0,
    localisation: "",
    date: ""
  })

  const handleAddWorkout = (e) => {
    !loginStatus.staus ? alert("Musisz być zalogowany") :
    e.preventDefault();
    console.log("dodano trening");
    // setWorkouts(prev => [...prev, treningData]); // zle
    // setLoginStatus({...loginStatus, loggedUser.workouts.push(treningData)});

    // const upadteWorkouts = {
    //   ...setUsers, workouts: [...prev, trainingData]
    // }

    // fetch(`${JSON_SERWER}/users/${loggedUser.id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(upadteWorkouts),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(userWithNewWorkout => {
    //     setLoginStatus({
    //     ...loginStatus,
    //     loggedUser: userWithNewWorkout });
    //     setUsers(userWithNewWorkout);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    //   console.log(loginStatus);
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
            <button onClick={handleAddWorkout} type="submit"><i className="fas fa-plus" style={{color: " rgba(172, 160, 5, 0.933)", fontSize:"200%", alignSelf: "flex-end"}}></i></button>
          </div>
        </div>  
      </form>
      <div className="general-info-workouts">
        <div className="all-kilometers inf-all-workouts">
          <h1>Wszystkie kilometry:</h1>
        </div>
        <div className="all-kcl inf-all-workouts">
          <h1>Wszystkie spalone kalorie: </h1>
        </div>
        <div className="all-workouts-time inf-all-workouts">
          <h1> Łączny czas treningów: </h1>
        </div>
    </div>
  </div>
    
    </>
}

export default Workouts;