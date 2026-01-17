import { memo, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaArrowRight,
  FaCalculator,
  FaSearch,
  FaFilter,
  FaStar,
  FaClock,
  FaTools,
  FaCheckCircle
} from "react-icons/fa";
import { serviceData } from "../data/serviceData";
import styles from "./Services.module.css";

// Enhanced service data with more details
const enhancedServiceData = serviceData.map(service => ({
  ...service,
  priceRange: service.id === 1 ? "1000-2500" : service.id === 2 ? "1500-3500" : "2000-4000",
  duration: service.id === 1 ? "2-4 недели" : service.id === 2 ? "1-3 недели" : "1-2 недели",
  rating: 4.8 + (service.id * 0.1),
  reviewsCount: 15 + (service.id * 5),
  isPopular: service.id === 1 || service.id === 2
}));

function Services() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filteredServices = useMemo(() => {
    let result = [...enhancedServiceData];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.features.some(feature =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      result = result.filter(service =>
        service.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => parseInt(a.priceRange.split('-')[0]) - parseInt(b.priceRange.split('-')[0]));
        break;
      case 'price-desc':
        result.sort((a, b) => parseInt(b.priceRange.split('-')[0]) - parseInt(a.priceRange.split('-')[0]));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.isPopular - a.isPopular);
        break;
      default:
        break;
    }

    return result;
  }, [searchTerm, filterCategory, sortBy]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(enhancedServiceData.map(service => service.category))];
    return ['all', ...uniqueCategories];
  }, []);

  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <section className={styles.servicesSection} aria-label="Наши услуги">
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>Наши услуги</h2>
        <p className={styles.subtitle}>
          Профессиональные решения для вашего дома
        </p>
        <div className={styles.divider}></div>
      </div>

      {/* Filter and Search Controls */}
      <div className={styles.controlsContainer}>
        <div className={styles.filterTabs}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterTab} ${filterCategory === category ? styles.activeFilter : ''}`}
              onClick={() => handleFilterChange(category)}
            >
              {category === 'all' ? 'Все услуги' :
               category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.searchSortContainer}>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Поиск услуг..."
              value={searchTerm}
              onChange={(e) => {
                const params = new URLSearchParams();
                if (e.target.value) {
                  params.set('search', e.target.value);
                }
                window.history.pushState({}, '', `?${params.toString()}`);
              }}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.sortContainer}>
            <FaFilter className={styles.filterIcon} />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className={styles.sortSelect}
            >
              <option value="default">По умолчанию</option>
              <option value="popular">Популярные</option>
              <option value="rating">По рейтингу</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className={styles.servicesContainer}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className={`${styles.card} ${service.isPopular ? styles.popularCard : ''}`}
              role="region"
              aria-labelledby={`service-title-${service.id}`}
            >
              {service.isPopular && (
                <div className={styles.popularBadge}>
                  <FaStar className={styles.badgeIcon} />
                  Популярное
                </div>
              )}

              <div className={styles.imageContainer}>
                <img
                  src={service.image}
                  alt={service.title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.iconContainer}>
                  <service.icon className={styles.serviceIcon} />
                </div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3
                    id={`service-title-${service.id}`}
                    className={styles.cardTitle}
                  >
                    {service.title}
                  </h3>
                  <div className={styles.serviceMeta}>
                    <div className={styles.rating}>
                      <FaStar className={styles.starIcon} />
                      <span>{service.rating.toFixed(1)}</span>
                      <span className={styles.reviewsCount}>({service.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                <p className={styles.description}>{service.description}</p>

                <div className={styles.serviceDetails}>
                  <div className={styles.detailItem}>
                    <FaTools className={styles.detailIcon} />
                    <span>Сроки: {service.duration}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <FaCalculator className={styles.detailIcon} />
                    <span>Цена: от {service.priceRange.split('-')[0]} руб/м²</span>
                  </div>
                </div>

                <ul className={styles.featuresList}>
                  {service.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <span className={styles.featureIcon}>
                        <FaCheckCircle />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <Link to="/calculator" className={styles.detailsButton}>
                    Подробнее
                    <FaArrowRight className={styles.arrowIcon} />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <FaSearch className={styles.noResultsIcon} />
            <h3>Услуги не найдены</h3>
            <p>Попробуйте изменить параметры поиска или фильтрации</p>
            <button
              className={styles.resetButton}
              onClick={() => {
                setFilterCategory('all');
                setSortBy('default');
                window.history.pushState({}, '', '/services');
              }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h3 className={styles.ctaTitle}>Не нашли подходящую услугу?</h3>
          <p className={styles.ctaSubtitle}>
            Свяжитесь с нами, и мы разработаем индивидуальное решение для вашего проекта
          </p>
          <Link to="/contacts" className={styles.ctaButton}>
            Связаться с нами
            <FaArrowRight className={styles.ctaArrow} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(Services);
