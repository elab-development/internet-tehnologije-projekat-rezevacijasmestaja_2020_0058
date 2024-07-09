import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSearch } from 'react-icons/fa';
import '../styles/Search.css';
import { useState } from 'react';

const SearchComponent = () => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const increaseGuests = () => setGuests(guests + 1);
  const decreaseGuests = () => setGuests(guests > 1 ? guests - 1 : 1);

  return (
    <div className="search">
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
    </div>
  );
};

export default SearchComponent;
