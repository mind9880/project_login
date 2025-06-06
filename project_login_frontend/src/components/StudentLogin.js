import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function StudentLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://172.25.5.128:8888/api/StudentLogin/', { username, password });
      console.log(response);

      console.log(response);
    if (response.data.success) {
      // Optional: Store token for authenticated requests
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      // Navigate to student dashboard
      navigate('/StudentDashboard');
    } else {
      alert('Invalid credentials');
    }
    
    } catch (error) {
      console.error('Login error:', error);
      console.log(<p>Login failed. Please try again.</p>);
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="links">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
}

export default StudentLogin;