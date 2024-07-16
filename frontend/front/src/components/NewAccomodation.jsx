// src/components/NewAccommodation.jsx

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../styles/NewAccommodation.css';
import { apiService } from './ApiService';

const NewAccommodation = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [locations, setLocations] = useState([]);
  const [accommodationTypes, setAccommodationTypes] = useState([]);

  useEffect(() => {
    // Fetch locations
    apiService.getLocations()
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error fetching locations:', error));

    // Fetch accommodation types
    apiService.getAccommodationTypes()
      .then(response => setAccommodationTypes(response.data))
      .catch(error => console.error('Error fetching accommodation types:', error));
  }, []);

  const onSubmit = data => {
    const userID = sessionStorage.getItem('userID');
    const newAccommodation = {
      naziv: data.naziv,
      opis: data.opis,
      lokacijaID: parseInt(data.lokacijaID), // Ensure this is an integer
      adresa: data.adresa,
      brojKreveta: parseInt(data.brojKreveta), // Ensure this is an integer
      maksimalanBrojOsoba: parseInt(data.maksimalanBrojOsoba), // Ensure this is an integer
      cenaPoNoci: parseFloat(data.cenaPoNoci), // Ensure this is a float
      udaljenostOdCentra: parseFloat(data.udaljenostOdCentra), // Ensure this is a float
      putanja: data.putanja,
      tipSmestajaID: parseInt(data.tipSmestajaID), // Ensure this is an integer
      userID: parseInt(userID) // Ensure this is an integer
    };

    console.log(data);

    apiService.addAccommodation(newAccommodation)
      .then(response => {
        console.log('Accommodation added:', response.data);
        reset();
      })
      .catch(error => {console.error('Error adding accommodation:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
      });
  };

  return (
    <div className="new-accommodation-form">
      <h2>Create New Accommodation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('naziv')} placeholder="Name" required />
        <textarea {...register('opis')} placeholder="Description" className="description" required />
        <select {...register('lokacijaID')} required>
          <option value="">Select Location</option>
          {locations.map(location => (
            <option key={location.lokacijaID} value={location.lokacijaID}>{location.grad}, {location.drzava}</option>
          ))}
        </select>
        <input {...register('adresa')} placeholder="Address" required />
        <input {...register('brojKreveta', { required: true, min: 1 })} type="number" placeholder="Number of Beds" />
        {errors.brojKreveta && <p>{errors.brojKreveta.message}</p>}
        <input {...register('maksimalanBrojOsoba', { required: true, min: 1 })} type="number" placeholder="Max Number of People" />
        {errors.maksimalanBrojOsoba && <p>{errors.maksimalanBrojOsoba.message}</p>}
        <input 
          {...register('cenaPoNoci', { 
            required: true, 
            pattern: {
              value: /^\d*\.?\d+$/,
              message: "Please enter a valid price"
            },
            validate: value => parseFloat(value) > 0 || "Price must be greater than 0"
          })} 
          placeholder="Price per Night (€)" 
        />
        {errors.cenaPoNoci && <p>{errors.cenaPoNoci.message}</p>}
        <input 
          {...register('udaljenostOdCentra', { 
            required: true, 
            pattern: {
              value: /^\d*\.?\d+$/,
              message: "Please enter a valid distance"
            },
            validate: value => parseFloat(value) > 0 || "Distance must be greater than 0"
          })} 
          placeholder="Distance from Center (km)" 
        />
        {errors.udaljenostOdCentra && <p>{errors.udaljenostOdCentra.message}</p>}
        <input {...register('putanja')} placeholder="Image URL" required />
        <select {...register('tipSmestajaID')} required>
          <option value="">Select Accommodation Type</option>
          {accommodationTypes.map(type => (
            <option key={type.tipSmestajaID} value={type.tipSmestajaID}>{type.naziv}</option>
          ))}
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewAccommodation;
