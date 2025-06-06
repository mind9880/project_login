import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function TeacherDashboard() {
  const navigate = useNavigate();

  const handleCreateStudent = () => {
    navigate('/AddStudent');
  };
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Teacher Dashboard</h1>
      <p>This is where the Teacher can view assigned courses, grades, and more.</p>
      
      <div className="dashboard-actions">
        <Link to="/teacher-courses" className="dashboard-button">My Courses</Link>
        <Link to="/teacher-grades" className="dashboard-button">Grades</Link>
         <button onClick={handleCreateStudent}>Create Student</button>
        <Link to="/logout" className="dashboard-button">Logout</Link>
      </div>
    </div>
  );
}

export default TeacherDashboard;