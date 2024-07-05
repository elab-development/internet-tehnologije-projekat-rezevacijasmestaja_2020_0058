import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaHotel } from 'react-icons/fa';
import '../styles/Filters.css';

const Filters = () => {
    return (
        <div className="filters-container">
            <Link to="/house" className="filter-icon">
                <FaHome />
                <span className="filter-text">House</span>
            </Link>
            <Link to="/flat" className="filter-icon">
                <FaBuilding />
                <span className="filter-text">Flat</span>
            </Link>
            <Link to="/apartment" className="filter-icon">
                <FaHotel />
                <span className="filter-text">Apartment</span>
            </Link>
        </div>
    );
};

export default Filters;