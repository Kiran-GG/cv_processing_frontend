// pages/LoginPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // ✅ Import the CSS

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('${process.env.REACT_APP_BACKEND_URL}/api/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed: Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
            required
          />
          <button type="submit" className="login-button">Login</button>
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
