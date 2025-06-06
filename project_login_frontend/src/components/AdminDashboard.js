import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleCreateTeacher = () => {
    navigate('/CreateTeacher');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>This is where the Admin can manage all school settings, users, and more.</p>
      
      <div className="dashboard-actions">
         <button onClick={handleCreateTeacher}>Create Teacher</button>
        <Link to="/admin-settings" className="dashboard-button">Settings</Link>
        <Link to="/admin-users" className="dashboard-button">Manage Users</Link>
        <Link to="/logout" className="dashboard-button">Logout</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;