import React from 'react';
import LocationCard from './LocationCard';
import '../styles/LocationCards.css'; 

const locations = [
    {
        image: 'https://via.placeholder.com/640x480.png/007711?text=quidem',
        city: 'Paris',
        country: 'France',
    },
    {
        image: 'https://via.placeholder.com/640x480.png/007711?text=quidem',
        city: 'Tokyo',
        country: 'Japan',
    },
    {
        image: 'https://via.placeholder.com/640x480.png/007711?text=quidem',
        city: 'New York',
        country: 'USA',
    },
    {
        image: 'https://via.placeholder.com/640x480.png/007711?text=quidem',
        city: 'Sydney',
        country: 'Australia',
    },
    {
        image: 'https://via.placeholder.com/640x480.png/007711?text=quidem',
        city: 'Cape Town',
        country: 'South Africa',
    },
];

const LocationCards = () => {
    return (
        <div className="location-cards-container">
            <h2>Locations</h2>
            <div className="location-cards-row">
                {locations.slice(0, 3).map((location, index) => (
                    <LocationCard
                        key={index}
                        image={location.image}
                        city={location.city}
                        country={location.country}
                        className="small-card"
                    />
                ))}
            </div>
            <div className="location-cards-row">
                {locations.slice(3, 5).map((location, index) => (
                    <LocationCard
                        key={index}
                        image={location.image}
                        city={location.city}
                        country={location.country}
                        className="large-card"
                    />
                ))}
            </div>
        </div>
    );
}

export default LocationCards;
