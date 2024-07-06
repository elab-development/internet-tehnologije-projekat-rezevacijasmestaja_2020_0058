import React from 'react';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Filters from './Filters.jsx';
import AccommodationCards from './AccommodationCards.jsx';

const Home= () =>{
    return (
        <div className="Homes">
        <NavBar />
        <Header />
        <Filters />
        <AccommodationCards/>
        <Footer />
        </div>
    );
}

export default Home;