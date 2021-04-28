import React from 'react';

const PlanningTrenings = () => {

  return<div className="container-planning-trenings">
    <form className="form-add-workouts">
      <div>
        <h1 className="add-workouts-string">Zaplanuj Trening</h1>
      </div>
      <div className="cont-inputs-add-workouts">
        <div className="inputs-add-workouts">
          <label>Lokalizacja: </label>
          <input type="text"></input>
          <label>Data: </label>
          <input type="datetime-local"></input>
        </div>
        <div>
          <button type="submit"><i className="fas fa-plus" style={{color: "rgba(172, 160, 5, 0.933)", fontSize:"200%", alignSelf: "flex-end"}}></i></button>
        </div>
      </div>
    </form>
  </div>
}

export default PlanningTrenings;