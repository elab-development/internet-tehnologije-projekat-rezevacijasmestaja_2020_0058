import React from 'react';
import '../styles/AccommodationCard.css';

const AccommodationCard = ({ id, image, name, location, price }) => {
    const handleClick = () => {
        window.open(`/accommodations/${id}`, '_blank');
    };

    return (
        <div className="accommodation-card" onClick={handleClick}>
            <img src={image} alt={name} className="accommodation-image" />
            <div className="accommodation-details">
                <h3 className="accommodation-name">{name}</h3>
                <p className="accommodation-location">{location.grad}, {location.drzava}</p>
                <p className="accommodation-price">€{price} per night</p>
            </div>
        </div>
    );
}

export default AccommodationCard;
