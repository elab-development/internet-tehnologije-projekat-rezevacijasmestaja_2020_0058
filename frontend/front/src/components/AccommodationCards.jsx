import React, { useState, useEffect } from 'react';
import AccommodationCard from './AccommodationCard';
import { apiService } from './ApiService';
import '../styles/AccommodationCards.css';
 
const AccommodationCards = ({ accomodations }) => {
    const [accommodations, setAccommodations] = useState([]);
 
    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await apiService.getAccommodations();
                let nizKartice = [];
                let nizIndexi = [];
                for(let i = 0; i < 3; ){
                    let rnd = Math.floor(Math.random() * response.data.length);
                    if(nizIndexi.includes(rnd)){
                        continue;
                    }
                    nizKartice[i] = response.data[rnd];
                    nizIndexi[i] = rnd;
                    i++;
                }
                console.log(nizKartice);
                setAccommodations(nizKartice);
                // console.log(accommodations);
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
                        key={accommodation.smestajID}
                        image={accommodation.putanja}
                        name={accommodation.naziv}
                        location={accommodation.lokacija}
                        price={accommodation.cenaPoNoci}
                    />
                ))}
            </div>
        </div>
    );
};
 
export default AccommodationCards;
 