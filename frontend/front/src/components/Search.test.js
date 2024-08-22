import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchComponent from './Search';
import { apiService } from './ApiService';
import { act } from 'react';
import '@testing-library/jest-dom';

// Mocking the ApiService
jest.mock('./ApiService', () => ({
  apiService: {
    searchAccommodations: jest.fn(),
    getUnavailableDates: jest.fn(),
  },
}));

describe('SearchComponent', () => {
  test('renders search component with input fields and buttons', () => {
    render(<SearchComponent />);

    expect(screen.getByPlaceholderText(/Destination/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Check in/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Check out/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /-/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /\+/i })).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument(); 
  });

  test('alerts when search is triggered without required fields', () => {
    global.alert = jest.fn();
    render(<SearchComponent />);

    const searchButton = screen.getByTestId('search-button'); 

    // Trigger search without entering required fields
    fireEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledWith('Please fill in all fields');
  });

});
