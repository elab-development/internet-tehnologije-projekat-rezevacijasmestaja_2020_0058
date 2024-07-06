import React from 'react';
import '../styles/LocationCard.css'; 

const LocationCard = ({ image, city, country }) => {
    return (
        <div className="location-card">
            <img src={image} alt={`${city}, ${country}`} className="location-image" />
            <div className="location-details">
                <p className="location-name">{city}, {country}</p>
            </div>
        </div>
    );
}

export default LocationCard;
