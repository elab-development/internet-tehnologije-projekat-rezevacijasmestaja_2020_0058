import React, { useState, useEffect } from 'react';
import { apiService } from './ApiService';
import ReservationCard from './ReservationCard';
import '../styles/Reservations.css';
import NavBar from './NavBar';
import Footer from './Footer';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(8);
  const [totalReservations, setTotalReservations] = useState(0);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await apiService.getReservations(window.sessionStorage.getItem("userID"), currentPage, reservationsPerPage);

        const reservationsWithImages = await Promise.all(
          response.data.data.map(async reservation => {
              const accommodation = reservation.accommodation;
              if (accommodation.slika) {
                  const binaryString = atob(accommodation.slika);
                  const len = binaryString.length;
                  const bytes = new Uint8Array(len);

                  for (let i = 0; i < len; i++) {
                      bytes[i] = binaryString.charCodeAt(i);
                  }

                  const imageBlob = new Blob([bytes], { type: 'image/jpeg' });
                  const imageObjectURL = URL.createObjectURL(imageBlob);

                  return {
                      ...reservation,
                      accommodation: { ...accommodation, putanja: imageObjectURL },
                  };
              }
              return reservation;
          })
      );

        // console.log(response);
        // console.log(response.data.data);
        // setReservations(response.data.data);
        setReservations(reservationsWithImages);
        setTotalReservations(response.data.total);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [currentPage, reservationsPerPage]);

  const handleCardClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCancelClick = () => {
    setShowDeletePopup(true);
};

const cancelDelete = () => {
    setShowDeletePopup(false);
};

  const handleCancelReservation = async (reservationId) => {
    try {
        console.log(reservationId)
      await apiService.cancelReservation(reservationId);
      setReservations(reservations.filter(reservation => reservation.rezervacijaID !== reservationId));
      setSelectedReservation(null);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
    }
  };

  const totalPages = Math.ceil(totalReservations/reservationsPerPage);

  return (
    <>
        <NavBar />
        <div className="my-reservations">
        {selectedReservation ? (
            <div className="reservation-details">
            <img src={selectedReservation.accommodation.putanja} alt={selectedReservation.accommodation.naziv} />
            <div>
              <h2>Reservation Details</h2>
              <p><strong>Accommodation:</strong> {selectedReservation.accommodation.naziv}</p>
              <p><strong>Location:</strong> {selectedReservation.accommodation.location.grad}, {selectedReservation.accommodation.location.drzava}</p>
              <p><strong>Check-in:</strong> {new Date(selectedReservation.datumPrijave).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(selectedReservation.datumOdjave).toLocaleDateString()}</p>
              <p><strong>Guests:</strong> {selectedReservation.brojOsoba}</p>
              <button style={{margin: '0 1rem 0 0'}} onClick={handleCancelClick}>Cancel Reservation</button>
              {showDeletePopup && (
                <>
                  <div className="overlay" onClick={cancelDelete}></div>
                  <div className="cancel-popup">
                    <div className="cancel-popup-content">
                      <p>Are you sure you want to cancel this reservation?</p>
                      <button onClick={() => handleCancelReservation(selectedReservation.rezervacijaID)}>Yes</button>
                      <button onClick={cancelDelete}>No</button>
                    </div>
                  </div>
                </>
              )}
              <button onClick={() => setSelectedReservation(null)}>Back</button>
            </div>
          </div>
        ) : (
            <>
            <h2>My Reservations</h2>
            <div className="reservations-list">
                {reservations.map(reservation => (
                <ReservationCard key={reservation.rezervacijaID} reservation={reservation} onClick={handleCardClick} />
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                ))}
            </div>
            </>
        )}
        </div>
        <Footer />
    </>
  );
};

export default Reservations;
