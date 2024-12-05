import React, { useEffect, useState } from 'react';
import AccommodationCard from './AccommodationCard'; 
import '../styles/MyAccommodations.css';
import { apiService } from './ApiService';
import NavBar from './NavBar';
import Footer from './Footer';

const MyAccommodations = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = window.sessionStorage.getItem('userID');

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await apiService.getAccommodationsByUserId(userId);
                // console.log(response.data);

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
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar />
            <div className="my-accommodations">
                <h1>My Accommodations</h1>
                <div className="accommodation-cards">
                    {accommodations.map(accommodation => (
                        <AccommodationCard
                            key={accommodation.smestajID}
                            id={accommodation.smestajID}
                            image={accommodation.putanja}
                            name={accommodation.naziv}
                            location={accommodation.lokacija}
                            price={accommodation.cenaPoNoci}
                            isMyAccommodation={true}
                        />
                    ))}
                </div>
            </div>
            <Footer />            
        </>
    );
};

export default MyAccommodations;
