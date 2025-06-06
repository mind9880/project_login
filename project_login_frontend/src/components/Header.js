// src/components/Header.js
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './Header.css'; // Import custom CSS for styling

const Header = () => {
  return (
    <div className="header">
      {/* Contact Info Tab */}
      <div className="header-tab">
        <div className="contact-info">
          <p>Phone: +123 456 7890</p>
          <p>Email: contact@wisdomschool.com</p>
        </div>
      </div>

      {/* Social Media Tab */}
      <div className="header-tab social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} />
        </a>
      </div>
    </div>
  );
};

export default Header;
