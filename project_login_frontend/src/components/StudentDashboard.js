import React from 'react';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Student Dashboard</h1>
      <p>This is where the Student can view their courses, grades, and more.</p>
      
      <div className="dashboard-actions">
        <Link to="/student-courses" className="dashboard-button">My Courses</Link>
        <Link to="/student-grades" className="dashboard-button">Grades</Link>
        <Link to="/logout" className="dashboard-button">Logout</Link>
      </div>
    </div>
  );
}

export default StudentDashboard;