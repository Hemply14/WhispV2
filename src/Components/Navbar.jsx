import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaStar, FaCog, FaUserShield, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <NavLink to="/dashboard" className="navbar-logo" onClick={closeMenu}>Whisp</NavLink>
        
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item nav-stars">
            <FaStar color="#FFCE54" />
            <span>1,250 Whisp Stars</span>
          </li>
          <li className="nav-item">
            <NavLink to="/guardian" className="nav-link" onClick={closeMenu}>
              <FaUserShield /> Guardian
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings" className="nav-link" onClick={closeMenu}>
              <FaCog /> Settings
            </NavLink>
          </li>
          <li className="nav-item">
            <button onClick={() => { closeMenu(); onLogout(); }} className="nav-link-button">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;