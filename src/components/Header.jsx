import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaSearch,
  FaPaintBrush,
  FaImages,
  FaEnvelope,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Logo from './Logo';
import './Header.css';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/services?search=${encodeURIComponent(searchTerm)}`);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">

        {/* LEFT - LOGO */}
        <div className="header-left">
          <Link to="/" className="logo" aria-label="Главная страница">
            <Logo />
          </Link>
        </div>

        {/* CENTER - SEARCH */}
        <div className="header-center">
          <form className="search-form" onSubmit={handleSearch} role="search">
            <FaSearch className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Поиск услуги..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        {/* RIGHT - NAV */}
        <div className="header-right">
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <Link
              to="/services"
              className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
            >
              <FaPaintBrush className="nav-icon" />
              <span>Услуги</span>
            </Link>

            <Link
              to="/gallery"
              className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
            >
              <FaImages className="nav-icon" />
              <span>Галерея</span>
            </Link>

            <Link
              to="/contacts"
              className={`nav-link ${location.pathname === '/contacts' ? 'active' : ''}`}
            >
              <FaEnvelope className="nav-icon" />
              <span>Контакты</span>
            </Link>
          </nav>

          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;
