import React from 'react';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import AccommodationCards from './AccommodationCards.jsx';
import LocationCards from './LocationCards.jsx';

const Home= () =>{
    return (
        <div className="Homes">
        <NavBar />
        <Header />
        <AccommodationCards/>
        <LocationCards/>
        <Footer />
        </div>
    );
}

export default Home;