import React from 'react';
import {  Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    
      
        <nav  className="navbar">
        <div className='navbar-options'>
          <ul className='navbar-options-list'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
          </ul>
          </div>
        </nav>
    
  );
};

export default Navbar;
