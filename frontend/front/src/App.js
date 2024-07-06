import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './components/Home.jsx';

function App() {
  return (
    <Router className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>

  );
}

export default App;
