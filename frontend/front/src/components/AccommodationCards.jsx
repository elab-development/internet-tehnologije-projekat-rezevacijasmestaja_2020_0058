import React from 'react';
import AccommodationCard from './AccommodationCard';
import '../styles/AccommodationCards.css';

const accommodations = [
    {
        image: 'https://via.placeholder.com/640x480.png/0022aa?text=animi',
        name: 'Cozy Cottage',
        location: 'Countryside',
        price: '$100',
    },
    {
        image: 'https://via.placeholder.com/640x480.png/0022aa?text=animi',
        name: 'Modern Apartment',
        location: 'City Center',
        price: '$150',
    },
    {
        image: 'https://via.placeholder.com/640x480.png/0022aa?text=animi',
        name: 'Beach House',
        location: 'Seaside',
        price: '$200',
    },
];

const AccommodationCards = () => {
    return (
        <div className="accommodation-cards-container">
            <h2>Available accommodations</h2>
            <div className="accommodation-cards">
                {accommodations.map((accommodation, index) => (
                    <AccommodationCard
                        key={index}
                        image={accommodation.image}
                        name={accommodation.name}
                        location={accommodation.location}
                        price={accommodation.price}
                    />
                ))}
            </div>
        </div>
    );
}

export default AccommodationCards;
