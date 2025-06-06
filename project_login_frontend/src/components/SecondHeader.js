import React from 'react';
import './SecondHeader.css'; // Ensure your CSS supports dropdown styling

const SecondHeader = () => {
  return (
    <header className="second-header">
      {/* Logo Section */}
      <div className="second-logo">
        <img src="/path/to/logo.png" alt="Wisdom School Logo" className="second-logo-img" />
      </div>

      {/* Navigation Section */}
      <nav className="second-nav-links">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/programs">Programs</a></li>
          <li><a href="/events">Events</a></li>

          {/* Login with dropdown */}
          <li className="dropdown">
            <a href="#">Login ▾</a>
            <ul className="dropdown-menu">
              <li><a href="/AdminLogin">Admin Login</a></li>
              <li><a href="/TeacherLogin">Teacher Login</a></li>
              <li><a href="/StudentLogin">Student Login</a></li>
            </ul>
          </li>

          <li><a href="/contact-us">Contact Us</a></li>
        </ul>
      </nav>

      {/* Apply Now Button */}
      <div className="second-apply-btn">
        <button>Apply Now</button>
      </div>
    </header>
  );
};

export default SecondHeader;
