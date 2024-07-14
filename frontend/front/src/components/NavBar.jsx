import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/SELogo.png';
import '../styles/NavBar.css';
import { apiService } from './ApiService';

const NavBar = () => {
  const [shadow, setShadow] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUser = apiService.getLoginInfo();
    if (storedUser && storedUser.email) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    apiService.logout().then(() => {
      setUser(null);
      navigate('/');
    });
  };

  return (
    <div className={`navBar ${shadow ? 'shadow' : ''}`}>
      <div className="navContainer">
        <span className="logo"><img src={logo} alt="SuiteEscape logo" /></span>
        <div className="navItems">
          <Link to="/add-listing" className="navButton">List Your Property</Link>
          {user ? (
            <button className="logoutButton" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="navButton">Login</Link>
              <Link to="/register" className="navButton">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
