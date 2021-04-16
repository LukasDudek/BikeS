import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";

import Clock from '../Clock';

const MENU_URL = "http://localhost:3001/menu"

const Navigation = () => {
    const [menuItems, SetMenuItems] = useState(false);

    useEffect(()=>{
        fetch(MENU_URL)
        .then(res => res.json())
        .then(data => SetMenuItems(data))
        .catch(err => console.warn(err))
    }, [])
    console.log(menuItems);

    return menuItems ? <>
		<div>
		<ul className="navigation">
        <div className="first-half-nav">
          <li className="logo"><NavLink to="/" activeClassName="active"></NavLink></li>
          {menuItems.map((el) => <li key={el.id}>
            <NavLink className="" to={el.link} activeClassName="active">{el.name}</NavLink>
          </li>
        )}
        </div>
    
        <div className="second-half-nav">
          <Clock />
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