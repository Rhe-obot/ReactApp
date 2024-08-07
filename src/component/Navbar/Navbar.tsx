import React from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className='navbar-options'>
        <ul className='navbar-options-list'>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/Analytics" ? "active" : ""}>
            <Link to="/Analytics">Analytics</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
