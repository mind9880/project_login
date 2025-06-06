import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-logo">
          <h2>Wisdom School</h2>
          <p>
            Wisdom School is committed to high-quality holistic education by providing opportunities
            to develop creativity, social skills, and intellectual potential in a caring and healthy environment.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Programmes</a></li>
            <li><a href="#">Facilities</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Address: Wisdom School, Chikka Kunthur, Malur - 523789</p>
          <p><FontAwesomeIcon icon={faPhone} /> +91 88845-33333 (Malur)</p>
          <p><FontAwesomeIcon icon={faPhone} /> +91 88843-77777 (Kolar)</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> admission@wisdomschool.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Wisdom School. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
