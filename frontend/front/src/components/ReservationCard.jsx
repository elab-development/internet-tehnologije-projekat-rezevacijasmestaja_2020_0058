import React from 'react';
import '../styles/ReservationCard.css';

const ReservationCard = ({ reservation, onClick }) => {
  return (
    <div className="reservation-card" onClick={() => onClick(reservation)}>
      <img src={reservation.accommodation.putanja} alt={reservation.accommodation.naziv} />
      <div className="reservation-info">
        <h2>{reservation.accommodation.naziv}</h2>
        <p>{reservation.accommodation.location.grad}, {reservation.accommodation.location.drzava}</p>
        <p>Check-in: {new Date(reservation.datumPrijave).toLocaleDateString()}</p>
        <p>Check-out: {new Date(reservation.datumOdjave).toLocaleDateString()}</p>
        <p>Guests: {reservation.brojOsoba}</p>
      </div>
    </div>
  );
};

export default ReservationCard;
