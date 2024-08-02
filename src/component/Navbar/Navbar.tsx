import React from 'react'
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    
      
        <nav  className="navbar">
        <div className='navbar-options'>
          <ul className='navbar-options-list'>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/analytics">Analytics</a>
            </li>
          </ul>
          </div>
        </nav>
    
  );
};

export default Navbar;
