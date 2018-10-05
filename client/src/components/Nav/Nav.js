import React from "react";
import { BrowserRouter as Router, Route, Sw } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Nav.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props => (
 
  <nav className="navbar navbar-expand-lg navbar-dark bg-info">
    <Link to="#" className="navbar-brand" >
      Vfriend
    </Link>
    <div>
      <ul className="navbar-nav">
        <li
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/Home" className="nav-link">
            Home
          </Link>
   
        </li>
        <li
          className={
            window.location.pathname === "/search"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/search" className="nav-link">
            Search
          </Link>
        </li>
        <li
          className={
            window.location.pathname === "/search"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/members" className="nav-link">
            Members
          </Link>
        </li>


         <li
          className={
            window.location.pathname === "/"
              ? "nav-item  test active"
              : "nav-item test"
          } id="sett"
        >
          <Link to="/" className="nav-link">
          Log Out
          </Link>
        </li>
      </ul>
    </div>
  </nav>

);

export default Navbar;
