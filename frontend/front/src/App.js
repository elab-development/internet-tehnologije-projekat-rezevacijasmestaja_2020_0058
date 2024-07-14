import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './components/Home.jsx';
import AccommodationDetail from './components/AccommodationDetail.jsx';
import LocationAccommodations from './components/LocationAccommodations.jsx';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodations/:id" element={<AccommodationDetail />} />
          <Route path="/locations/:locationId" element={<LocationAccommodations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </Router>

  );
}

export default App;
