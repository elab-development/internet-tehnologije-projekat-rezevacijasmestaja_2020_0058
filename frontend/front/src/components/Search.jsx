import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSearch } from 'react-icons/fa';
import '../styles/Search.css';
import { apiService } from './ApiService';
import AccommodationCard from './AccommodationCard';

const SearchComponent = () => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [guests, setGuests] = useState(1);
  const [destination, setDestination] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const increaseGuests = () => setGuests(guests + 1);
  const decreaseGuests = () => setGuests(guests > 1 ? guests - 1 : 1);

  const handleSearch = () => {
    if (!destination || !startDate || !endDate) {
      alert("Please fill in all fields");
      return;
    }

    if (endDate <= startDate) {
      alert("Check-out date cannot be before check-in date");
      return;
    }

    // console.log("Search data:", { destination, startDate, endDate, guests });
    apiService.searchAccommodations(destination, startDate, endDate, guests)
      .then(response => {

        const accommodationsWithImages = response.data.map(accommodation => {
          if (accommodation.slika) {
              const binaryString = atob(accommodation.slika);
              const len = binaryString.length;
              const bytes = new Uint8Array(len);

              for (let i = 0; i < len; i++) {
                  bytes[i] = binaryString.charCodeAt(i);
              }

              const imageBlob = new Blob([bytes], { type: 'image/jpeg' });
              const imageObjectURL = URL.createObjectURL(imageBlob);

              return { ...accommodation, putanja: imageObjectURL };
          }
          return accommodation;
      });

        // const data = response.data;
        // console.log(data);

        setResults(accommodationsWithImages);

        // setResults(data);

        if (accommodationsWithImages.length === 0) {
          setErrorMessage('No accommodations available for the selected dates. Please choose different dates.');
        } else {
          setErrorMessage('');
        }
      })
      .catch(error => {
        console.error("There was an error with the search!", error);
        setErrorMessage('There was an error with the search. Please try again later.');
      });
  }

  useEffect(() => {
    if (destination) {
      apiService.getUnavailableDates(destination)
        .then(response => {
          setUnavailableDates(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching unavailable dates!", error);
        });
    }
  }, [destination]);

  return (
    <div className="search">
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Destination"
          className="input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <div className="dateContainer">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            placeholderText="Check in"
            className="datePicker"
            minDate={new Date()}
            excludeDates={unavailableDates}
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            placeholderText="Check out"
            className="datePicker"
            minDate={startDate || new Date()}
            excludeDates={unavailableDates}
          />
        </div>
        <div className="guestsContainer">
          <input type="text" value={`${guests} Guests`} readOnly className="input" data-testid="guests-text"/>
          <button onClick={decreaseGuests} className="guestButton">-</button>
          <button onClick={increaseGuests} className="guestButton">+</button>
        </div>
      </div>
      <button className="searchButton" onClick={handleSearch} data-testid="search-button">
        <FaSearch className="searchIcon" />
      </button>

      {errorMessage && <p>{errorMessage}</p>}
      <div className="results">
        {results.map(accommodation => (
          <AccommodationCard
            id={accommodation.smestajID}
            image={accommodation.putanja}
            name={accommodation.naziv}
            location={accommodation.location}
            price={accommodation.cenaPoNoci}
            isMyAccommodation={accommodation.userID == window.sessionStorage.getItem('userID')}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
