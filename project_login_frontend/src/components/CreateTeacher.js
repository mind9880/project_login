

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTeacher.css';

const CreateTeacher = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('teacher');
  const [classroom, setClassroom] = useState('');
  const [subject, setSubject] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

const handleCreate = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://172.25.5.128:8888/api/CreateTeacher/', {
      user: {
        username: name.replace(/\s+/g, '').toLowerCase(),
        email: email,
        password: password,
        role: role,
      },
      name: name,
      role: role,
      assigned_classes: [classroom], // ensure classroom is in an array
      subject: subject,
    });
      console.log('Teacher created:', response);
       alert('Teacher created successfully!');

      setMessage('Teacher created successfully!');
      setName('');
      setEmail('');
      setRole('teacher');
      setClassroom('');
      setSubject('');
      setPassword('');

      navigate('/AdminDashboard');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error creating teacher');
      console.error('Create teacher error:', error);
    }
  };

  return (
    <div>
      <h2>Create Teacher</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input
            type="text"
            placeholder="Teacher Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Teacher Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Role Selection */}
        <div>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="teacher">Subject Teacher</option>
            <option value="class_teacher">Class Teacher</option>
          </select>
        </div>

        {/* Classroom Dropdown (Always Visible) */}
        <div>
          <select value={classroom} onChange={(e) => setClassroom(e.target.value)} required>
            <option value="">Select Classroom</option>
            <option value="UKG">UKG</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
        </div>

        {/* Subject Input (Always Visible) */}
        <div>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <input
            type="password"
            placeholder="Teacher Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {message && <p style={{ color: 'red' }}>{message}</p>}

        <div>
          <button type="submit">Create Teacher</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeacher;
