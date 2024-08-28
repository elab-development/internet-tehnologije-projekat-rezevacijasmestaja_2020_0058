import React from 'react';
import '../styles/LocationCard.css'; 

const LocationCard = ({ locationId, image, city, country }) => {
    const handleClick = () => {
        window.open(`/locations/${locationId}`, '_blank');
    };

    return (
        <div className="location-card" onClick={handleClick}>
            <img src={image} alt={`${city}, ${country}`} className="location-image" />
            <div className="location-details">
                <p className="location-name">{city}, {country}</p>
            </div>
        </div>
    );
}

export default LocationCard;
