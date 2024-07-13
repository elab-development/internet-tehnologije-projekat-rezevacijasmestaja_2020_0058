// src/components/AccommodationDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from './ApiService';
import '../styles/AccommodationDetail.css';

const AccommodationDetail = () => {
    const { id } = useParams();
    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Accommodation ID:", id); 
        const fetchAccommodation = async () => {
            try {
                const response = await apiService.getAccommodationById(id);
                console.log("API Response:", response.data);
                setAccommodation(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching accommodation:', error);
                setLoading(false);
            }
        };

        fetchAccommodation();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!accommodation) {
        return <div>Error loading accommodation data.</div>;
    }

    return (
        <div className="accommodation-detail-container">
            <h2>{accommodation.naziv}</h2>
            <img src={accommodation.putanja} alt={accommodation.naziv} className="accommodation-detail-image" />
            <p><strong>Description:</strong> {accommodation.opis}</p>
            <p><strong>Address:</strong> {accommodation.adresa}</p>
            <p><strong>Number of beds:</strong> {accommodation.brojKreveta}</p>
            <p><strong>Maximum number of people:</strong> {accommodation.maksimalanBrojOsoba}</p>
            <p><strong>Price per night:</strong> €{accommodation.cenaPoNoci}</p>
            <p><strong>Distance from center:</strong> {accommodation.udaljenostOdCentra} km</p>
            <p><strong>Location:</strong> {accommodation.location?.grad}, {accommodation.location?.drzava}</p>
            <p><strong>Accommodation Type:</strong> {accommodation.accommodation_type.naziv}</p>
        </div>
    );
};

export default AccommodationDetail;
