import { FaHome } from 'react-icons/fa';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-icon">
        <FaHome />
      </div>

      <div className="logo-text">
        <span className="logo-main">Remont</span>
        <span className="logo-sub">Pro</span>
      </div>
    </div>
  );
};

export default Logo;
