import React, { useState, useEffect } from 'react';
import AccommodationCard from './AccommodationCard';
import { useParams } from 'react-router-dom';
import { apiService } from './ApiService';
import '../styles/LocationAccommodations.css';
import NavBar from './NavBar';
import Footer from './Footer';

const LocationAccommodations = () => {
    const { locationId } = useParams();
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await apiService.getAccommodationsByLocationId(locationId);

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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching accommodations:', error);
                setLoading(false);
            }
        };

        fetchAccommodations();
    }, [locationId]);

    if (loading) {
        return <p>Loading accommodations...</p>;
    }

    return (
        <>
        <NavBar/>
        <div className="location-accommodations-container">
            <h2>Accommodations in this location</h2>
            <div className="location-accommodations">
                {accommodations.length > 0 ? (
                    accommodations.map((accommodation) => (
                        <AccommodationCard
                            key={accommodation.smestajID}
                            id={accommodation.smestajID}
                            image={accommodation.putanja}
                            name={accommodation.naziv}
                            location={accommodation.lokacija}
                            price={accommodation.cenaPoNoci}
                            isMyAccommodation={accommodation.user.id == window.sessionStorage.getItem('userID')}
                        />
                    ))
                ) : (
                    <p className="no-accommodations">No accommodations found for this location.</p>
                )}
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default LocationAccommodations;
