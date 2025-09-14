import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <p>&copy; 2025 Whisp. All Rights Reserved.</p>
        <div className="social-links">
          <a href="#facebook" aria-label="Facebook">FB</a>
          <a href="#twitter" aria-label="Twitter">TW</a>
          <a href="#instagram" aria-label="Instagram">IG</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;