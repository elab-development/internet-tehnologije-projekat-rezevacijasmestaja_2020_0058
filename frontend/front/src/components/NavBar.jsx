import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="navContainer">
        <span className="logo"><img src={logo} alt="SuiteEscape logo"/></span>
        <div className="navItems">
          <Link to="/add-listing" className="navButton">List Your Property</Link>
          <Link to="/login" className="navButton">Login</Link>
          <Link to="/register" className="navButton">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
