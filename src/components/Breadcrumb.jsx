import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map route paths to breadcrumb names
  const getBreadcrumbName = (path) => {
    const breadcrumbMap = {
      'services': 'Услуги',
      'gallery': 'Галерея',
      'reviews': 'Отзывы',
      'contacts': 'Контакты',
      'calculator': 'Калькулятор'
    };
    return breadcrumbMap[path] || path;
  };

  return (
    <nav className="breadcrumb" aria-label="Хлебные крошки">
      <div className="breadcrumb-container">
        <Link to="/" className="breadcrumb-item home">
          <FaHome className="breadcrumb-icon" />
          <span>Главная</span>
        </Link>

        {pathnames.length > 0 && (
          <FaChevronRight className="breadcrumb-separator" />
        )}

        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <div key={path} className="breadcrumb-path">
              {isLast ? (
                <span className="breadcrumb-item current" aria-current="page">
                  {getBreadcrumbName(path)}
                </span>
              ) : (
                <>
                  <Link to={routeTo} className="breadcrumb-item">
                    {getBreadcrumbName(path)}
                  </Link>
                  <FaChevronRight className="breadcrumb-separator" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
