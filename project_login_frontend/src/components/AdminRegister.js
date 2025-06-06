import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error
    setError('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://172.25.5.128:8888/api/AdminRegister/', {
        username,
        email,
        password,
      });

      if (response.data.success) {
        // Redirect on success
        navigate('/adminlogin');
      } else {
        // If backend sends success: false, show backend message or generic error
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      // Detailed error handling
      if (error.response) {
        // Backend responded with an error status code
        console.error('Backend error data:', error.response.data);
        setError(error.response.data.message || 'Registration failed due to server error');
      } else if (error.request) {
        // Request was made but no response
        console.error('No response received:', error.request);
        setError('No response from server, please try again later');
      } else {
        // Something else happened
        console.error('Error', error.message);
        setError('An error occurred: ' + error.message);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Admin Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default AdminRegister;