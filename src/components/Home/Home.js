import React, {useState} from 'react';
import {JSON_SERWER} from '../../api/constatns'

const Home = ({ users, setUsers }) => {
  const [registerDate, setRegisterDate] = useState({login:"", password:"", age: 0, height: 0, weight: 0, type_of_bike:"", localisation:"",workouts:[], all_km: 0, all_time: 0})
  const [loginValues, setLoginValues] = useState({
    login: "",
    password: ""
  });

  console.log(users);

  const handleLoginSubmmit = (e) => {
    e.preventDefault();
    for (let i=0; i < users.length; i++){
      if (users[i].login == loginValues.login && users[i].password == loginValues.password) {
        console.log("zalogowano");
      } else {
        console.log("zły login lub hasło");
      }
    }
    
  }

  const handleRegisterSubmmit = (e) => {
    e.preventDefault();

    fetch(`${JSON_SERWER}/users`, {
    method: "post",
    body: JSON.stringify(registerDate),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(user => () => setUsers(user))
    .catch(error => {
      console.log(error);
    });
    console.log(registerDate);

  }

    return<>
    <div className='login-register-container'>
      <div className="home-login">
        <div>
        <h1>Logowanie</h1>
        <form onSubmit={handleLoginSubmmit}>
            <input placeholder="Login" className="input-style" type="text" onChange={e => setLoginValues({...loginValues, login: e.target.value })}></input>
            <input  placeholder="Hasło" className="input-style" type="password" onChange={e => setLoginValues({...loginValues, password: e.target.value })}></input>
          <button className="btn" type="submit">Zaloguj</button>
        </form>
        </div>
      </div>

      <div className="home-register">
        <div>
          <h1>Rejestracja</h1>
        </div>
        <form onSubmit={handleRegisterSubmmit}>
          <section className="reg-container-form">
            <div className="register-log-pasw"> 
              <div>
                <label htmlFor="nameRegister">Login </label>
                <input id="nameRegister" placeholder="Login" className="input-style" type="text" onChange={e => setRegisterDate({...registerDate, login: e.target.value })}></input>
              </div>
              <div>
                <label htmlFor="passRegister" >Hasło </label>
                <input id="passRegiter" placeholder="Hasło" className="input-style" type="password" onChange={e => setRegisterDate({...registerDate, password: e.target.value })}></input>
              </div>
            </div>

            <div className="register-other">
              
                <label htmlFor="ageRegister">Wiek </label>
                <input id="ageRegister" placeholder="lat" className="input-style" type="number" onChange={e => setRegisterDate({...registerDate, age: e.target.value })}></input>
                <div className="cm-kg">
                  <div className="cm">
                    <label htmlFor="heightRegister">Wzrost </label>
                    <input id="heightRegister" placeholder="cm" className="input-style" type="number" onChange={e => setRegisterDate({...registerDate, height: e.target.value })}></input>
                  </div>
                  <div className="kg">
                    <label htmlFor="weightRegister" >Waga </label>
                    <input id="weightRegister" placeholder="kg" className="input-style" type="number" onChange={e => setRegisterDate({...registerDate, weight: e.target.value })}></input>
                  </div>
                </div>
                <label htmlFor="typeOfBikeRegister">Typ roweru </label>
                <select id="typeOfBikeRegister" className="input-style" type="text" onChange={e => setRegisterDate({...registerDate, type_of_bike: e.target.value })}>
                  <option>Szosowy</option>
                  <option>Górski</option>
                  <option>Miejski</option>
                  <option>Gravel</option>
                  <option>Trekking</option>
                  <option>Cross</option>
                  <option>Fitness</option>
                  <option>Elektryczny/E-bike</option>
                  <option>Fatbike</option>
                  <option>BMX</option>
                  <option>Street.Trial</option>
                  <option>Dirt</option>
                  <option>Składak</option>
                  <option>Tandem</option>
                  <option>Beach cruiser</option>
                  <option>Cargo</option>
                  <option>Rower poziomy</option>
                  <option>Ostre koło/Wolne koło</option>
                </select>
                <label htmlFor="localisationRegister">lokalizacja </label>
                <input id="localisationRegister" placeholder="miasto" className="input-style" type="text" onChange={e => setRegisterDate({...registerDate, localisation: e.target.value })}></input>
            
            </div>
          </section>
          <button className="btn" type="submit">Zarejestruj</button>
          
        </form>
      </div>

    </div>
    
    
    </>
}

export default Home;
