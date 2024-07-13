import React, { useState, useEffect } from 'react';
import LocationCard from './LocationCard';
import { apiService } from './ApiService';
import '../styles/LocationCards.css'; 

const LocationCards = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await apiService.getLocations();
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    return (
        <div className="location-cards-container">
            <h2>Locations</h2>
            <div className="location-cards-row">
                {locations.slice(0, 3).map((location) => (
                    <LocationCard
                        locationId={location.lokacijaID}
                        image={location.putanja}
                        city={location.grad}
                        country={location.drzava}
                        className="small-card"
                    />
                ))}
            </div>
            <div className="location-cards-row">
                {locations.slice(3, 5).map((location) => (
                    <LocationCard
                        locationId={location.lokacijaID}
                        image={location.putanja}
                        city={location.grad}
                        country={location.drzava}
                        className="large-card"
                    />
                ))}
            </div>
        </div>
    );
}

export default LocationCards;
