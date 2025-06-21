import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaPaintBrush, FaImages, FaEnvelope, FaHome } from 'react-icons/fa';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/services?search=${encodeURIComponent(searchTerm)}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" aria-label="Página inicial">
          <FaHome className="home-icon" />
        </Link>
      </div>


      <form onSubmit={handleSearch} className="search-form" role="search" aria-label="Pesquisar serviço">
        <input
          type="text"
          className="search-input"
          placeholder="поиск услуги"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Pesquisar serviço"
        />
        <button type="submit" className="search-button" aria-label="Buscar">
          <FaSearch />
        </button>
      </form>

      <nav className={`nav ${isMenuOpen ? 'open' : ''}`} aria-label="Navegação principal">
        <Link to="/services">
          <FaPaintBrush className="nav-icon" />
          <span>услуги</span>
        </Link>
        <Link to="/gallery">
          <FaImages className="nav-icon" />
          <span>галерея</span>
        </Link>
        <Link to="/contacts">
          <FaEnvelope className="nav-icon" />
          <span>контакты</span>
        </Link>
      </nav>

      <button
        className="mobile-menu-button"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>
    </header>
  );
}
export default Header;
