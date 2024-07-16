// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { apiService } from './ApiService';
// import '../styles/AccommodationDetail.css';

// const AccommodationDetail = () => {
//     const { id } = useParams();
//     const [accommodation, setAccommodation] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         console.log("Accommodation ID:", id); 
//         const fetchAccommodation = async () => {
//             try {
//                 const response = await apiService.getAccommodationById(id);
//                 console.log("API Response:", response.data);
//                 setAccommodation(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching accommodation:', error);
//                 setLoading(false);
//             }
//         };

//         fetchAccommodation();
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!accommodation) {
//         return <div>Error loading accommodation data.</div>;
//     }

//     return (
//         <div className="accommodation-detail-container">
//             <h2>{accommodation.naziv}</h2>
//             <img src={accommodation.putanja} alt={accommodation.naziv} className="accommodation-detail-image" />
//             <p><strong>Description:</strong> {accommodation.opis}</p>
//             <p><strong>Address:</strong> {accommodation.adresa}</p>
//             <p><strong>Number of beds:</strong> {accommodation.brojKreveta}</p>
//             <p><strong>Maximum number of people:</strong> {accommodation.maksimalanBrojOsoba}</p>
//             <p><strong>Price per night:</strong> €{accommodation.cenaPoNoci}</p>
//             <p><strong>Distance from center:</strong> {accommodation.udaljenostOdCentra} km</p>
//             <p><strong>Location:</strong> {accommodation.location?.grad}, {accommodation.location?.drzava}</p>
//             <p><strong>Accommodation Type:</strong> {accommodation.accommodation_type.naziv}</p>
//         </div>
//     );
// };

// export default AccommodationDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { apiService } from './ApiService';
// import '../styles/AccommodationDetail.css';

// const AccommodationDetail = () => {
//     const { id } = useParams();
//     const [accommodation, setAccommodation] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [guests, setGuests] = useState(1);
//     const [showPopup, setShowPopup] = useState(false);
//     const [totalPrice, setTotalPrice] = useState(0);

//     useEffect(() => {
//         const fetchAccommodation = async () => {
//             try {
//                 const response = await apiService.getAccommodationById(id);
//                 setAccommodation(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching accommodation:', error);
//                 setLoading(false);
//             }
//         };

//         fetchAccommodation();
//     }, [id]);

//     const handleReserve = () => {
//         if (!startDate || !endDate || guests < 1) {
//             alert("Please select check-in date, check-out date, and number of guests.");
//             return;
//         }

//         const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
//         setTotalPrice(nights * accommodation.cenaPoNoci);
//         setShowPopup(true);
//     };

//     const confirmReservation = async () => {
//         try {
//             const reservationData = {
//                 datumPrijave: startDate.toISOString().split('T')[0],
//                 datumOdjave: endDate.toISOString().split('T')[0],
//                 brojOsoba: guests,
//                 smestajID: accommodation.smestajID,
//             };
//             await apiService.createReservation(reservationData);
//             setShowPopup(false);
//             alert("Reservation successful!");
//         } catch (error) {
//             console.error('Error creating reservation:', error);
//             alert("There was an error creating your reservation. Please try again.");
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!accommodation) {
//         return <div>Error loading accommodation data.</div>;
//     }

//     return (
//         <div className="accommodation-detail-container">
//             <h2>{accommodation.naziv}</h2>
//             <div className="details-left">
//                 <p><strong>Description:</strong> {accommodation.opis}</p>
//                 <p><strong>Address:</strong> {accommodation.adresa}</p>
//                 <p><strong>Number of beds:</strong> {accommodation.brojKreveta}</p>
//                 <p><strong>Maximum number of people:</strong> {accommodation.maksimalanBrojOsoba}</p>
//                 <p><strong>Price per night:</strong> €{accommodation.cenaPoNoci}</p>
//                 <p><strong>Distance from center:</strong> {accommodation.udaljenostOdCentra} km</p>
//                 <p><strong>Location:</strong> {accommodation.location?.grad}, {accommodation.location?.drzava}</p>
//                 <p><strong>Accommodation Type:</strong> {accommodation.accommodation_type.naziv}</p>
//             </div>
//             <div className="details-right">
//                 <img src={accommodation.putanja} alt={accommodation.naziv} className="accommodation-detail-image" />
//                 <div className="reservation-form">
//                     <DatePicker selected={startDate} onChange={date => setStartDate(date)} placeholderText="Check in" />
//                     <DatePicker selected={endDate} onChange={date => setEndDate(date)} placeholderText="Check out" minDate={startDate} />
//                     <input type="number" value={guests} onChange={e => setGuests(e.target.value)} min="1" placeholder="Number of guests" />
//                     <button onClick={handleReserve}>Reserve</button>
//                 </div>
//             </div>
//             {showPopup && (
//                 <div className="reservation-popup">
//                     <h3>Confirm Reservation</h3>
//                     <p><strong>Accommodation:</strong> {accommodation.naziv}</p>
//                     <p><strong>Location:</strong> {accommodation.location?.grad}, {accommodation.location?.drzava}</p>
//                     <p><strong>Check-in:</strong> {startDate.toDateString()}</p>
//                     <p><strong>Check-out:</strong> {endDate.toDateString()}</p>
//                     <p><strong>Guests:</strong> {guests}</p>
//                     <p><strong>Total Price:</strong> €{totalPrice}</p>
//                     <button onClick={confirmReservation}>Confirm</button>
//                     <button onClick={() => setShowPopup(false)}>Cancel</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AccommodationDetail;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { apiService } from './ApiService';
import '../styles/AccommodationDetail.css';
import NavBar from './NavBar.jsx'

const AccommodationDetail = () => {
    const { id } = useParams();
    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guests, setGuests] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchAccommodation = async () => {
            try {
                const response = await apiService.getAccommodationById(id);
                setAccommodation(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching accommodation:', error);
                setLoading(false);
            }
        };

        fetchAccommodation();
    }, [id]);

    const handleReserve = () => {
        if (!startDate || !endDate || guests < 1) {
            alert("Please select check-in date, check-out date, and number of guests.");
            return;
        }

        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        setTotalPrice(nights * accommodation.cenaPoNoci);
        setShowPopup(true);
    };

    const confirmReservation = async () => {
        try {
            const reservationData = {
                datumPrijave: startDate.toISOString().split('T')[0],
                datumOdjave: endDate.toISOString().split('T')[0],
                brojOsoba: guests,
                smestajID: accommodation.smestajID,
            };
            //console.log(reservationData);
            await apiService.createReservation(reservationData);
            setShowPopup(false);
            alert("Reservation successful!");
        } catch (error) {
            console.error('Error creating reservation:', error);
            console.log(error.response.data);
            alert("There was an error creating your reservation. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!accommodation) {
        return <div>Error loading accommodation data.</div>;
    }

    return (
        <div className="aacommodation-detail">
            <NavBar />
            <div className="accommodation-detail-container">
            
            <div className="details-left">
                <div className="accommodation-info-text">
                    <h2>{accommodation.naziv}</h2>
                    <p><strong>Description:</strong> {accommodation.opis}</p>
                    <p><strong>Address:</strong> {accommodation.adresa}</p>
                    <p><strong>Number of beds:</strong> {accommodation.brojKreveta}</p>
                    <p><strong>Maximum number of people:</strong> {accommodation.maksimalanBrojOsoba}</p>
                    <p><strong>Price per night:</strong> €{accommodation.cenaPoNoci}</p>
                    <p><strong>Distance from center:</strong> {accommodation.udaljenostOdCentra} km</p>
                    <p><strong>Location:</strong> {accommodation.location?.grad}, {accommodation.location?.drzava}</p>
                    <p><strong>Accommodation Type:</strong> {accommodation.accommodation_type.naziv}</p>
                </div>
                
                <div className="reservation-form">
                    <DatePicker className="datePicker" selected={startDate} onChange={date => setStartDate(date)} placeholderText="Check in" />
                    <DatePicker className="datePicker" selected={endDate} onChange={date => setEndDate(date)} placeholderText="Check out" minDate={startDate} />
                    <input type="number" value={guests} onChange={e => setGuests(e.target.value)} min="1" placeholder="Number of guests" />
                    <button className="reserve-button" onClick={handleReserve}>Reserve</button>
                    <p><strong>Total Price:</strong> €{totalPrice}</p>
                </div>
            </div>
            <div className="details-right">
                <img src={accommodation.putanja} alt={accommodation.naziv} className="accommodation-detail-image" />
                
            </div>
            {showPopup && (
                <div className="reservation-popup">
                    <h3>Confirm Reservation</h3>
                    <p><strong>Accommodation:</strong> {accommodation.naziv}</p>
                    <p><strong>Location:</strong> {accommodation.location?.grad}, {accommodation.location?.drzava}</p>
                    <p><strong>Check-in:</strong> {startDate.toDateString()}</p>
                    <p><strong>Check-out:</strong> {endDate.toDateString()}</p>
                    <p><strong>Guests:</strong> {guests}</p>
                    <p><strong>Total Price:</strong> €{totalPrice}</p>
                    <button onClick={confirmReservation}>Confirm</button>
                    <button onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
            )}
        </div>
        </div>
        
    );
};

export default AccommodationDetail;

