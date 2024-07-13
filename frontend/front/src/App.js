import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './components/Home.jsx';
import AccommodationDetail from './components/AccommodationDetail.jsx';

function App() {
  return (
    <Router className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodations/:id" element={<AccommodationDetail />} />
        </Routes>
    </Router>

  );
}

export default App;
