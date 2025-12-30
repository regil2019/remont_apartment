import { memo, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaArrowRight,
  FaCalculator,
} from "react-icons/fa";
import { serviceData } from "../data/serviceData";
import styles from "./Services.module.css";

// Componente principal
function Services() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const filteredServices = useMemo(() => {
    if (!searchTerm) return serviceData;
    return serviceData.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);



  return (
    <section
      id="services"
      className={styles.servicesSection}
      aria-label="Наши услуги"
    >
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>Наши услуги</h2>
        <p className={styles.subtitle}>
          Профессиональные решения для вашего дома
        </p>
        <div className={styles.divider}></div>
      </div>

      <div className={styles.servicesContainer}>
        {serviceData.map((service) => (
          <div
            key={service.id}
            className={styles.card}
            role="region"
            aria-labelledby={`service-title-${service.id}`}
          >
            <div className={styles.imageContainer}>
              <img
                src={service.image}
                alt={service.title}
                className={styles.image}
              />
              <div className={styles.iconContainer}><service.icon className={styles.serviceIcon} /></div>
            </div>

            <div className={styles.cardContent}>
              <h3
                id={`service-title-${service.id}`}
                className={styles.cardTitle}
              >
                {service.title}
              </h3>
              <p className={styles.description}>{service.description}</p>

              <ul className={styles.featuresList}>
                {service.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
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
        ))}
      </div>


    </section>
  );
}

export default memo(Services);
