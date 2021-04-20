import React from 'react';

const Workouts = () => {

    return<>
    
  <div className="container-workouts">
      <form className="form-add-workouts">
        <div>
          <h1 className="add-workouts-string">Dodaj Trening</h1>
        </div>
        <div className="cont-inputs-add-workouts">
          <div className="inputs-add-workouts">
            <label>Ilość kilometrów: </label>
            <input style={{width: "30%"}} type="number"></input>
            <label>Czas jazdy: </label>
            <div className="add-time-of-ride">
              <input style={{width: "20%"}} placeholder="godziny" type="number"></input>
              <input style={{width: "20%"}} placeholder="minuty" type="number"></input>
            </div>
            <label>Lokalizacja: </label>
            <input type="text"></input>
            <label>Data: </label>
            <input type="datetime-local"></input>
          </div>
              
          <div>
            <button type="submit"><i class="fas fa-plus" style={{color: "green", fontSize:"200%", alignSelf: "flex-end"}}></i></button>
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