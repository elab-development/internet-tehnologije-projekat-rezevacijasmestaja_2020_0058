import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Header.css';
import { FaSearch } from 'react-icons/fa';
import Search from './Search'

const Header = () => {

  return (
    <div className="header">
      <h1 className="title">Suite Escape</h1>
      <p className="slogan">Discover. Book. Escape.</p>

      <Search />

      {/* <div className="search">
        <div className="searchContainer">
            <input type="text" placeholder="Destination" className="input" />
            <div className="dateContainer">
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                placeholderText="Check in"
                className="datePicker"
            />
            <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                placeholderText="Check out"
                className="datePicker"
            />
            </div>
            <div className="guestsContainer">
            <input type="text" value={`${guests} Guests`} readOnly className="input" />
            <button onClick={decreaseGuests} className="guestButton">-</button>
            <button onClick={increaseGuests} className="guestButton">+</button>
            </div>
        </div>
      <button className="searchButton">
        <FaSearch className="searchIcon" />
      </button>
     </div> */}



    </div>
  );
};

export default Header;
