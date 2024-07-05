import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Footer />
    </div>
  );
}

export default App;
