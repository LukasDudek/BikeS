import React from 'react';

const Home = () => {

  // const sendData = {
  //   login: "",
  //   password: "",
  //   id: users.length + 1,
  //   age: 0,
  //   height: 0,
  //   weight: 0,
  //   type_of_bike: "",
  //   localisation: "",
  //   workouts: [],
  //   all_km: 0,
  //   all_time: 0
  // }

  // fetch(`${API}/users`, {
  //   method: "POST",
  //   body: JSON.stringify(sendData),
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  
    
    return<>
    <div className='login-register-container'>
      <div className="home-login">
        <div>
        <h1>Logowanie</h1>
        <form>
            <input placeholder="Login" className="input-style" type="text"></input>
            <input  placeholder="Hasło" className="input-style" type="password"></input>
          <button className="btn" type="submit">Zaloguj</button>
        </form>
        </div>
      </div>

      <div className="home-register">
        <div>
          <h1>Rejestracja</h1>
        </div>
        <form>
          <section className="reg-container-form">
            <div className="register-log-pasw">
              <div>
                <label>Login </label>
                <input placeholder="Login" className="input-style" type="text"></input>
              </div>
              <div>
                <label>Hasło </label>
                <input placeholder="Hasło" className="input-style" type="password"></input>
              </div>
            </div>

            <div className="register-other">
              
                <label>Wiek </label>
                <input placeholder="lat" className="input-style" type="number"></input>
                <div className="cm-kg">
                  <div class="cm">
                    <label>Wzrost </label>
                    <input placeholder="cm" className="input-style" type="number"></input>
                  </div>
                  <div class="kg">
                    <label>Waga </label>
                    <input placeholder="kg" className="input-style" type="number"></input>
                  </div>
                </div>
                <label>Typ roweru </label>
                <select className="input-style" type="text">
                  <option>Szosowy</option>
                  <option>Górski</option>
                  <option>Miejski</option>
                  <option>Gravelowy</option>
                  <option>Trekkingowy</option>
                  <option>Crossowy</option>
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
                <label>lokalizacja </label>
                <input placeholder="miasto" className="input-style" type="text"></input>
            
            </div>
          </section>
          <button className="btn" type="submit">Zarejestruj</button>
          
        </form>
      </div>

    </div>
    
    
    </>
}

export default Home;
