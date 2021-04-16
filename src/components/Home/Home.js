import React from 'react';

const Home = () => {
    
    return<>
    <div className="home">
      <div>
      <h1>Witaj !</h1>
      <form>
        <div>
          <label>Login </label>
          <input className="input-style" type="text"></input>
        </div>
        <div>
          <label>Hasło </label>
          <input className="input-style" type="password"></input>
        </div>
        <button className="btn" type="submit">Zaloguj</button>
      </form>
      <h2>Śledź swoje treningi</h2>
      </div>
    </div>
    
    </>
}

export default Home;
