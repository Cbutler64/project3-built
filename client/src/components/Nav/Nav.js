import React from "react";
import { BrowserRouter as Router, Route, Sw } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import "./Nav.css";

const STYLE ={
  navLink:{
    color: 'white',
  },
  navLinkActive : {
    textDecorationLine: 'underline',
    textDecorationStyle: 'wavy'
  },
}

// Depending on the current path, this component sets the "active" class on the appropriate navigation NavLink item
const Navbar = props => (
 
  <nav className="navbar navbar-expand-lg navbar-dark bg-info">
    <NavLink to="#" className="navbar-brand"  >
      Vfriend
    </NavLink>
    <div>
      <ul className="navbar-nav">
        <li
          className={
            window.location.pathname === "/" 
              ? "nav-item active"
              : "nav-item"
          }
          
        >
          <NavLink to="/Home" className="nav-NavLink" style={STYLE.navLink} activeStyle={STYLE.navLinkActive}>
            Home
          </NavLink>
   
        </li>
        <li
          className={
            window.location.pathname === "/search"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <NavLink to="/search" className="nav-NavLink" style={STYLE.navLink} activeStyle={STYLE.navLinkActive} >
            Search
          </NavLink>
        </li>
        <li
          className={
            window.location.pathname === "/search"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <NavLink to="/members" className="nav-NavLink" style={STYLE.navLink} activeStyle={STYLE.navLinkActive} >
            Members
          </NavLink>
        </li>


         <li
          className={
            window.location.pathname === "/"
              ? "nav-item  test active"
              : "nav-item test"
          } id="sett"
        >
          <NavLink to="/" className="nav-NavLink" style={STYLE.navLink} >
          Log Out
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>

);

export default Navbar;
