import React, {useState} from 'react';
import {JSON_SERWER} from '../../api/constatns';
// import {API_KEY, API_URL} from '../../api/constatns'
import LoggedIn from '../LoggedIn';

const Home = ({ users, setUsers, loginStatus, setLoginStatus, calCelsius, currentWeather, setCurrentWeather, allKM, allTimeH, allTimeM}) => {
  const [registerDate, setRegisterDate] = useState({login:"", password:"", age: 0, height: 0, weight: 0, type_of_bike:"", localisation:"",workouts:[], planning_Workouts:[], all_km: 0, all_time: 0})
  const [loginValues, setLoginValues] = useState({
    login: "",
    password: ""
  });
  const [loginErr, setLoginErr] = useState("");
  const [registerErr, setRegisterErr] = useState("");
  const [registerSucces, setRegisterSucces] = useState("");
  

  const handleRegister = (e) => {
    document.getElementById("home-register").classList.toggle("hidden");
    e.target.classList.toggle("hidden");
  }




  const handleLoginSubmmit = (e) => {
    e.preventDefault();

    for (let i = 0; i < users.length; i++){
      if (users[i].login !== loginValues.login) {
        setLoginErr("Zły login");
      } else {
        if (users[i].password !== loginValues.password) {
          setLoginErr("Złe hasło");
          break;
        } else {
          console.log("zalogowano");
          setLoginErr(" ");

          const loginDate = {
            status: true,
            loggedUser: users[i]
          }

          fetch(`${JSON_SERWER}/login`, {
            method: "PUT",
            body: JSON.stringify(loginDate),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(user => setLoginStatus({
              status: user.status,
              loggedUser: user.loggedUser
            }))
            .catch(error => {
              console.log(error);
            });
            
        
            console.log(loginStatus);
        }
      }
    }
  }



  const handleRegisterSubmmit = (e) => {
    e.preventDefault();
    const reg = /[0-9!@#$%^&*()_*,./;;'"`]/g;
    

    if(registerDate.login.length < 3){
      setRegisterErr("Login musi mieć min. 3 znaki");
    } else if(registerDate.password.length < 3){
      setRegisterErr("Hasło musi mieć min. 3 znaki");
    } else if(registerDate.age < 0){
      setRegisterErr("Wiek musi być liczbą dodatnią");
    } else if(registerDate.height < 0){
      setRegisterErr("Wzrost musi być liczbą dodatnią");
    } else if(registerDate.weight < 0){
      setRegisterErr("Waga musi być liczbą dodatnią");
    } else if(registerDate.localisation.length < 2 || registerDate.localisation.match(reg) != null){
      setRegisterErr("Miasto musi mieć min. 2 znaki i nie zawierać liczb ani znaków specjalnych");
    } else{
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
        document.getElementById("show-hide-register").classList.toggle("hidden");
        document.getElementById("home-register").classList.toggle("hidden");
        setRegisterErr("");
        setRegisterSucces("Zarejestrowano");
        window.location.reload();
    }
  }


  
    return<>
    {!loginStatus.status ? <div className='login-register-container'>
      <div className="home-login">
        <div>
        <h1>Logowanie</h1>
        <form onSubmit={handleLoginSubmmit}>
            <input placeholder="Login" className="input-style" type="text" onChange={e => setLoginValues({...loginValues, login: e.target.value })}></input>
            <input  placeholder="Hasło" className="input-style" type="password" onChange={e => setLoginValues({...loginValues, password: e.target.value })}></input>
            <h6>{loginErr}</h6>
          <button className="btn" type="submit">Zaloguj</button>
        </form>
        </div>
      </div>
      <h3 className="register-succes">{registerSucces}</h3>
      <button onClick={handleRegister} className="btn" id="show-hide-register">Zarejestruj</button>

      <div id="home-register" className="home-register hidden">
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
          <h6>{registerErr}</h6>
          <button className="btn" type="submit">Zarejestruj</button>
          
        </form>
      </div>

    </div>: <>
    <LoggedIn loginStatus={loginStatus} setLoginStatus={setLoginStatus} calCelsius={calCelsius} currentWeather={currentWeather} allKM={allKM} allTimeH={allTimeH} allTimeM={allTimeM}/>
    </> }
    
    </>
}

export default Home;
