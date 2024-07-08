import React, { useState, useEffect } from 'react';
import AccommodationCard from './AccommodationCard';
import { apiService } from './ApiService';
import '../styles/AccommodationCards.css';

/*const accommodations = [
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
*/

const AccommodationCards = () => {
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await apiService.getAccommodations();
                console.log(response.data); // Dodaj ovu liniju za proveru podataka
                setAccommodations(response.data);
            } catch (error) {
                console.error('Error fetching accommodations:', error);
            }
        };

        fetchAccommodations();
    }, []);

    return (
        <div className="accommodation-cards-container">
            <h2>Available accommodations</h2>
            <div className="accommodation-cards">
                {accommodations.map((accommodation) => (
                    <AccommodationCard
                        key={accommodation.smestajID} // Dodaj jedinstveni key
                        image={accommodation.putanja}
                        name={accommodation.naziv}
                        location={accommodation.adresa}
                        price={accommodation.cenaPoNoci}
                    />
                ))}
            </div>
        </div>
    );
};

export default AccommodationCards;