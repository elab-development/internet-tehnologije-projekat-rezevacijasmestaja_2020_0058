import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Filters />
      <Footer />
    </div>
  );
}

export default App;
