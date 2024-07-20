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
                console.log(response.data)
                setAccommodations(response.data);
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
