import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";

import Clock from '../Clock';

const MENU_URL = "http://localhost:3001/menu"

const Navigation = () => {
    const [menuItems, SetMenuItems] = useState(false);
    const hamburger = document.getElementById('hamburger');
    const navHam = document.getElementById('navHam');

    const hamburgerMenu = (e) =>{
      navHam.classList.toggle('show');
    }

    useEffect(()=>{
        fetch(MENU_URL)
        .then(res => res.json())
        .then(data => SetMenuItems(data))
        .catch(err => console.warn(err))
    }, [])

    return menuItems ? <>
		<div>
		<ul className="navigation-cont" >
      <div className="navigation">
        <li style={{color: 'black', display: 'flex', justifyContent:'center', alignSelf:'center', marginLeft: "2%"}}><i className="fas fa-bicycle"></i>
          </li>
        
        <div className="first-half-nav" id='nav'>
            
            {menuItems.map((el) => <li key={el.id}>
              <NavLink className="" to={el.link} activeClassName="active">{el.name}</NavLink>
            </li>
          )}

        </div>
      
          <div className="second-half-nav">
            <Clock />
          </div>
          <button onClick={hamburgerMenu} className="hamburger" id="hamburger">
              <i className="fas fa-bars"></i>
          </button>
      </div>
      <div className="navigation-hamburger" id='navHam'>
        {menuItems.map((el) => <li key={el.id}>
                <NavLink className="" to={el.link} activeClassName="active">{el.name}</NavLink>
              </li>
            )}
      </div>

    </ul>
		</div>
    </> :
    <>
		<div>
		<h1> Loading... </h1>
		</div>
    </>
}

export default Navigation;