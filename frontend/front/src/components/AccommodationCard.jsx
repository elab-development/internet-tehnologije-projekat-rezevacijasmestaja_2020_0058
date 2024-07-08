import React from 'react';
import '../styles/AccommodationCard.css';

const AccommodationCard = ({ image, name, location, price }) => {
    return (
        <div className="accommodation-card">
            <img src={image} alt={name} className="accommodation-image" />
            <div className="accommodation-details">
                <h3 className="accommodation-name">{name}</h3>
                <p className="accommodation-location">{location}</p>
                <p className="accommodation-price">€{price} per night</p>
            </div>
        </div>
    );
}

export default AccommodationCard;
