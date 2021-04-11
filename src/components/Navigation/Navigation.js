import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";

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
    <ul className="navigation">
    <li className="logo"><NavLink to="/" activeClassName="active"></NavLink></li>
        {menuItems.map((el) => <li key={el.id}>
            <NavLink to={el.link} activeClassName="active">{el.name}</NavLink>
        </li>
        )}
    </ul>
    </> :
    <>
    <h1> Loading... </h1>
    </>
}

export default Navigation;