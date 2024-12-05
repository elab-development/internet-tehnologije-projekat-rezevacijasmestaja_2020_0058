import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Header.css';
import Search from './Search'

const Header = () => {

  return (
    <div className="header">
      <h1 className="title">Suite Escape</h1>
      <p className="slogan">Discover. Book. Escape.</p>

      <Search />

    </div>
  );
};

export default Header;
