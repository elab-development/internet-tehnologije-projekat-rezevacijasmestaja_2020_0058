import React from 'react';
import LocationCard from './LocationCard';
import '../styles/LocationCards.css'; 

const locations = [
    {
        image: 'path/to/image1.jpg',
        city: 'Paris',
        country: 'France',
    },
    {
        image: 'path/to/image2.jpg',
        city: 'Tokyo',
        country: 'Japan',
    },
    {
        image: 'path/to/image3.jpg',
        city: 'New York',
        country: 'USA',
    },
    {
        image: 'path/to/image4.jpg',
        city: 'Sydney',
        country: 'Australia',
    },
    {
        image: 'path/to/image5.jpg',
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
