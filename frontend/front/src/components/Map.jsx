import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ address }) => {
    const [coordinates, setCoordinates] = useState([44.7866, 20.4489]); // Default to Belgrade coordinates
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (address) {
            axios.get('https://nominatim.openstreetmap.org/search?format=json&q=' + address)
                .then((geocodingResponse) => {
                    if (geocodingResponse.data.length > 0) {
                        const { lat, lon } = geocodingResponse.data[0];
                        setCoordinates([parseFloat(lat), parseFloat(lon)]);
                    } else {
                        console.error('No coordinates found for the given address.');
                    }
                })
                .catch((geocodingError) => {
                    console.error('Error fetching coordinates:', geocodingError);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [address]);

    return (
        <div style={{ border: '5px solid #8be8e5', borderRadius: '10px', overflow: 'hidden', height: '30vh', width: '25rem', margin: '40px 0 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {loading ? (
                <div className='d-flex flex-wrap justify-content-center align-item-center' style={{width:"100%", display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p>Loading...</p>
                </div>
            ) : (
                <MapContainer className='MapContainer' center={coordinates} zoom={15} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={coordinates}>
                        <Popup>{address || 'Marker Content'}</Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default Map;