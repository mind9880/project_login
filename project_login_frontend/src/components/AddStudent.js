import React, { useState } from 'react';
import axios from 'axios';

const allClasses = [
  { id: 1, name: 'UKG' }, { id: 2, name: 'Class 1' }, { id: 3, name: 'Class 2' },
  { id: 4, name: 'Class 3' }, { id: 5, name: 'Class 4' }, { id: 6, name: 'Class 5' },
  { id: 7, name: 'Class 6' }, { id: 8, name: 'Class 7' }, { id: 9, name: 'Class 8' },
  { id: 10, name: 'Class 9' }, { id: 11, name: 'Class 10' },
];

const AddStudent = () => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', date_of_birth: '', gender: 'M',
    address: '', parent_contact: '', student_class: '',
  });

  const [classAllowed, setClassAllowed] = useState(true);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token'); // Token from DRF auth

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "student_class" && value !== "") {
  if (!token) {
    alert("🔐 No token found. Please login.");
    return;
  }

  try {
    const res = await axios.get('http://172.25.5.128:8888/api/teacher-classrooms/', {
      headers: { Authorization: `Token ${token}` }
    });

    console.log("📦 Response from teacher-classrooms:", res.data);

    const assignedClassId = res.data?.[0]?.id;
    console.log("✅ Extracted Assigned Class ID:", assignedClassId);

    if (!assignedClassId) {
      alert("⚠️ No assigned class found.");
      setClassAllowed(false);
      return;
    }

    const isAllowed = parseInt(value) === parseInt(assignedClassId);
    setClassAllowed(isAllowed);

    if (!isAllowed) {
      alert("❌ You cannot assign students to this class.");
    }
  } catch (error) {
    console.error("❌ Error checking assigned class:", error);
    setClassAllowed(false);
    alert("❌ Could not verify your class assignment.");
  }
}

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.student_class || !classAllowed) {
      return alert("Please select your assigned class to add a student.");
    }

    if (!token) {
      alert("🔐 No token found. Please login.");
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://172.25.5.128:8888/api/AddStudent/', formData, {
        headers: { Authorization: `Token ${token}` }
      });

      alert('✅ Student created successfully!');
      setFormData({
        username: '', email: '', password: '', date_of_birth: '', gender: 'M',
        address: '', parent_contact: '', student_class: ''
      });
      setClassAllowed(true);
    } catch (err) {
      console.error("❌ Error adding student:", err);
      alert("❌ Could not add student. Please check inputs or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>

      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />

      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>

      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      <input type="text" name="parent_contact" placeholder="Parent Contact" value={formData.parent_contact} onChange={handleChange} required />

      <label>
        Select Class:
        <select name="student_class" value={formData.student_class} onChange={handleChange} required>
          <option value="">-- Select Class --</option>
          {allClasses.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
      </label>

      {!classAllowed && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          ❌ You can only assign students to your assigned class.
        </p>
      )}

      <button type="submit" disabled={loading || !classAllowed}>
        {loading ? 'Creating...' : 'Create Student'}
      </button>
    </form>
  );
};

export default AddStudent;
