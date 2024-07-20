import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/NewAccommodation.css';
import { apiService } from './ApiService';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewAccommodation = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [locations, setLocations] = useState([]);
  const [accommodationTypes, setAccommodationTypes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const accommodation = location.state?.accommodation || null;

  useEffect(() => {    
    apiService.getLocations()
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error fetching locations:', error));

    apiService.getAccommodationTypes()
      .then(response => setAccommodationTypes(response.data))
      .catch(error => console.error('Error fetching accommodation types:', error));

      if(accommodation){
          console.log(accommodation)
          setValue('naziv', accommodation.naziv);
          setValue('opis', accommodation.opis);
          // setValue('lokacijaID', accommodation.lokacijaID);
          setValue('adresa', accommodation.adresa);
          setValue('brojKreveta', accommodation.brojKreveta);
          setValue('maksimalanBrojOsoba', accommodation.maksimalanBrojOsoba);
          setValue('cenaPoNoci', accommodation.cenaPoNoci);
          setValue('udaljenostOdCentra', accommodation.udaljenostOdCentra);
          setValue('putanja', accommodation.putanja);
          // setValue('tipSmestajaID', accommodation.tipSmestajaID);
      }

  }, [accommodation, setValue]);

  useEffect(() => {
    if (accommodation && locations.length > 0 && accommodationTypes.length > 0) {
      setValue('lokacijaID', accommodation.lokacijaID);
      setValue('tipSmestajaID', accommodation.tipSmestajaID);
    }
  }, [locations, accommodationTypes, accommodation, setValue]);

  const onSubmit = data => {
    const userID = sessionStorage.getItem('userID');
    const newAccommodation = {
      naziv: data.naziv,
      opis: data.opis,
      lokacijaID: parseInt(data.lokacijaID), 
      adresa: data.adresa,
      brojKreveta: parseInt(data.brojKreveta), 
      maksimalanBrojOsoba: parseInt(data.maksimalanBrojOsoba), 
      cenaPoNoci: parseFloat(data.cenaPoNoci), 
      udaljenostOdCentra: parseFloat(data.udaljenostOdCentra), 
      putanja: data.putanja,
      tipSmestajaID: parseInt(data.tipSmestajaID), 
      userID: parseInt(userID) 
    };

    console.log(data);

    if(accommodation){
      apiService.updateAccommodation(accommodation.smestajID, newAccommodation)
        .then(response => {
          toast.success('Accommodation updated successfully', {autoClose: 1500});
          console.log('Accommodation updated:', response.data);
          setTimeout(() => navigate('/my-accommodations'), 2000);
        })
        .catch(error => {
          console.error('Error updating accommodation:', error);
          toast.error('Accommodation could not be updated');
          if (error.response) {
            console.error('Error response:', error.response.data);
          }
        });
    } else {
    apiService.addAccommodation(newAccommodation)
      .then(response => {
        toast.success('Accommodation created successfully', {autoClose: 1500});
        console.log('Accommodation added:', response.data);
        reset();
        setTimeout(() => navigate('/'), 2000);
      })
      .catch(error => {console.error('Error adding accommodation:', error);
        toast.error('Accommodation could not be created');
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
      });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (

    <>
      <NavBar />
      <ToastContainer />
      <div className="new-accommodation-form">
        <h2>{accommodation ? 'Update Accommodation' : 'Create New Accommodation'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('naziv')} placeholder="Name" required title='Accommodation name' />
          <textarea {...register('opis')} placeholder="Description" className="description" required title='Accommodation description'/>
          <select {...register('lokacijaID')} required disabled = {accommodation ? true : false} title='Accommodation location'>
            <option value="">Select Location</option>
            {locations.map(location => (
              <option key={location.lokacijaID} value={location.lokacijaID}>{location.grad}, {location.drzava}</option>
            ))}
          </select>
          <input {...register('adresa')} placeholder="Address" required disabled = {accommodation ? true : false} title='Accommodation street address'/>
          <input {...register('brojKreveta', { required: true, min: 1 })} type="number" placeholder="Number of Beds" title='Number of beds'/>
          {errors.brojKreveta && <p>{errors.brojKreveta.message}</p>}
          <input {...register('maksimalanBrojOsoba', { required: true, min: 1 })} type="number" placeholder="Max Number of People" title='Max number of people allowed'/>
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
            placeholder="Price per Night (€)" title='Price per night (€)'
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
            placeholder="Distance from Center (km)" title='Distance from city center (km)'
            disabled = {accommodation ? true : false} 
          />
          {errors.udaljenostOdCentra && <p>{errors.udaljenostOdCentra.message}</p>}
          <input {...register('putanja')} placeholder="Image URL" required title='Image URL'/>
          <select {...register('tipSmestajaID')} required disabled = {accommodation ? true : false} title='Accommodation type'>
            <option value="">Select Accommodation Type</option>
            {accommodationTypes.map(type => (
              <option key={type.tipSmestajaID} value={type.tipSmestajaID}>{type.naziv}</option>
            ))}
          </select>
          <div className="form-buttons">
            <button className = 'btnCreate' type="submit">{accommodation ? 'Update' : 'Create'}</button>
            <button type="button" className = 'btnBack' onClick={handleBackClick}>Back</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default NewAccommodation;
