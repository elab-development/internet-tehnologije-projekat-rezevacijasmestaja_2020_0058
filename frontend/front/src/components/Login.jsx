import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from './ApiService';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await apiService.login(email, password);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        <p>You don't have an account? <Link to="/register">Register here</Link> </p> {/*Izmenjeno*/}
        </form>
      </div>
    </div>
  );
};

export default Login;
