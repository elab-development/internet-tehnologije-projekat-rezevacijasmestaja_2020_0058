import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { apiService } from './ApiService';
import '../styles/AccommodationDetail.css';
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx';
import Map from './Map.jsx';

const AccommodationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guests, setGuests] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [reservedDates, setReservedDates] = useState([]);
    const isMyAccommodation = location.state?.isMyAccommodation || false;
    
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

        const fetchReservedDates = async () => {
            try {
                const response = await apiService.getReservedDates(id);
                const dates = response.data.map(reservation => ({
                    start: new Date(reservation.datumPrijave),
                    end: new Date(reservation.datumOdjave)
                }));
                setReservedDates(dates);
            } catch (error) {
                console.error('Error fetching reserved dates:', error);
            }
        };

        fetchAccommodation();
        fetchReservedDates();
    }, [id]);

    const isDateDisabled = date => {
        return reservedDates.some(({ start, end }) => date >= start && date <= end);
    };

    const handleReserve = () => {
        if (!startDate || !endDate || guests < 1) {
            alert("Please select check-in date, check-out date, and number of guests.");
            return;
        }

        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        isMyAccommodation ? setTotalPrice(0) : setTotalPrice(nights * accommodation.cenaPoNoci);
        setShowPopup(true);
    };

    const deleteAccommodation = async () => {
        try {
            await apiService.deleteAccommodation(id);
            alert('Accommodation deleted successfully');
            navigate('/'); 
        } catch (error) {
            console.error('Error deleting accommodation:', error);
            alert('There was an error deleting the accommodation. Please try again.');
        }
    };

    const handleDeleteClick = () => {
        setShowDeletePopup(true);
    };

    const handleUpdateClick = () => {
        navigate('/edit-accommodation', {state: {accommodation}});
    };

    const cancelDelete = () => {
        setShowDeletePopup(false);
    };

    const confirmReservation = async () => {
        try {
            const reservationData = {
                datumPrijave: startDate.toISOString().split('T')[0],
                datumOdjave: endDate.toISOString().split('T')[0],
                brojOsoba: guests,
                smestajID: accommodation.smestajID,
                userID: window.sessionStorage.getItem("userID")
            };
            console.log(reservationData);
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
                    <DatePicker className="datePicker" selected={startDate} onChange={date => setStartDate(date)} placeholderText="Check in" minDate={new Date()} excludeDates={reservedDates.flatMap(({start, end}) => {
                        const dates =[];
                        for(let d = new Date(start); d <= end; d.setDate(d.getDate()+1)){
                            dates.push(new Date(d));
                        }
                        return dates;
                    })}/>
                    <DatePicker className="datePicker" selected={endDate} onChange={date => setEndDate(date)} placeholderText="Check out" minDate={startDate || new Date()} excludeDates={reservedDates.flatMap(({start, end}) => {
                        const dates =[];
                        for(let d = new Date(start); d <= end; d.setDate(d.getDate()+1)){
                            dates.push(new Date(d));
                        }
                        return dates;
                    })}/>
                    <input type="number" value={guests} onChange={e => setGuests(e.target.value)} min="1" placeholder="Number of guests" />
                    <button className="reserve-button" onClick={handleReserve}>Reserve</button>
                    <p><strong>Total Price:</strong> €{totalPrice}</p>
                </div>
            </div>
            <div className="details-right">
                <img src={accommodation.putanja} alt={accommodation.naziv} className="accommodation-detail-image" />
                {window.sessionStorage.getItem("role") === "admin" || isMyAccommodation ? (
                    <>
                    <button className='btnDelete' onClick={handleDeleteClick}>Delete this accommodation</button>
                    {showDeletePopup && (
                        <>
                            <div className="overlay" onClick={cancelDelete}></div>
                            <div className="delete-popup">
                                <div className="delete-popup-content">
                                    <p>Are you sure you want to delete this accommodation?</p>
                                    <button onClick={deleteAccommodation}>Yes</button>
                                    <button onClick={cancelDelete}>No</button>
                                </div>
                            </div>
                        </>
                      )}
                    </>
                ) : (
                    <></>
                )}
                {isMyAccommodation ? (
                    <button className='btnUpdate' onClick={handleUpdateClick}>Update this accommodation</button>
                ):(
                    <></>
                )}

                <div>
                    <Map address={ accommodation.location.grad + ' ' + accommodation.adresa}></Map>
                </div>
                
            </div>
            {showPopup && (
                window.sessionStorage.getItem("token") ? (
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
                ) : (
                    <div className="reservation-popup">
                        <h3>Notification</h3>
                        <p>You must log in to make a reservation.</p>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                )
            )}
        </div>
        <Footer />
        </div>
        
    );
};

export default AccommodationDetail;

