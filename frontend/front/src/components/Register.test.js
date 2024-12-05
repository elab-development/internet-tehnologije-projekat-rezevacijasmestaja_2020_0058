import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './Register';
import { apiService } from './ApiService';
import '@testing-library/jest-dom';

// Mock apiService
jest.mock('./ApiService', () => ({
  apiService: {
    register: jest.fn(),
  },
}));

describe('Register Component', () => {

  test('renders the register form', () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId('register-button')).toBeInTheDocument();
  });

  test('handles form submission and successful registration', async () => {
    apiService.register.mockResolvedValueOnce({});

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'Pera Peric' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'pera@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(apiService.register).toHaveBeenCalledWith({
        name: 'Pera Peric',
        email: 'pera@gmail.com',
        password: 'password123',
      });
    });
  });

  test('handles form submission with error', async () => {
    apiService.register.mockRejectedValueOnce(new Error('Registration failed'));

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'Pera Peric' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'pera@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(screen.getByText(/Registration failed. Please try again./i)).toBeInTheDocument();
    });
  });

  test('contains a link to the login page', () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in/i).closest('a')).toHaveAttribute('href', '/login');
  });
});
