import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>⚔️ Clash of Clans</h1>
        </div>
        <nav className="nav">
          <Link 
            to="/hero-equipment" 
            className={location.pathname === '/hero-equipment' || location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Equipamentos
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
