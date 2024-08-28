import React, { useState, useEffect } from 'react';
import AccommodationCard from './AccommodationCard';
import { apiService } from './ApiService';
import '../styles/AccommodationCards.css';
 
const AccommodationCards = () => {
    const [accommodations, setAccommodations] = useState([]);
 
    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await apiService.get3RandomAccommodations();

                const accommodationsWithImages = await Promise.all(
                    response.data.map(async accommodation => {
                        if (accommodation.slika) {
                            const binaryString = atob(accommodation.slika);
                            const len = binaryString.length;
                            const bytes = new Uint8Array(len);

                            for (let i = 0; i < len; i++) {
                                bytes[i] = binaryString.charCodeAt(i);
                            }

                            const imageBlob = new Blob([bytes], { type: 'image/jpeg' });
                            const imageObjectURL = URL.createObjectURL(imageBlob);

                            return { ...accommodation, putanja: imageObjectURL };
                        }
                        return accommodation;
                    })
                );

                setAccommodations(accommodationsWithImages);
            } catch (error) {
                console.error('Error fetching accommodations:', error);
            }
        };
 
        fetchAccommodations();
    }, []);
 
    return (
        <div className="accommodation-cards-container">
            <h2>Recommended accommodations around the world</h2>
            <div className="accommodation-cards">
                {accommodations.map((accommodation) => (
                    <AccommodationCard
                        key={accommodation.smestajID}
                        id={accommodation.smestajID}
                        image={accommodation.putanja}
                        name={accommodation.naziv}
                        location={accommodation.lokacija}
                        price={accommodation.cenaPoNoci}
                        isMyAccommodation={accommodation.user.id == window.sessionStorage.getItem('userID')}
                    />
                ))}
            </div>
        </div>
    );
};
 
export default AccommodationCards;
 