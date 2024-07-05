import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/SELogo.png';
import '../styles/NavBar.css';

const NavBar = () => {
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navBar ${shadow ? 'shadow' : ''}`}>
      <div className="navContainer">
        <span className="logo"><img src={logo} alt="SuiteEscape logo" /></span>
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
