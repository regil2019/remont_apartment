import React from "react";
import {
  FaHome,
  FaPaintRoller,
  FaPencilRuler,
  FaArrowRight,
  FaCalculator,
} from "react-icons/fa";
import styles from "./Services.module.css";

// Dados dos serviços
const serviceData = [
  {
    id: 1,
    title: "Ремонты квартиры",
    description:
      "Мы поможем вам отремонтировать ваш дом, чтобы воплотить в жизнь ваше видение.",
    features: ["Полный цикл работ", "Качественные материалы", "Соблюдение сроков"],
    icon: <FaHome className={styles.serviceIcon} />,
    image: "/images/service1.jpg",
  },
  {
    id: 2,
    title: "Дизайн интерьера",
    description:
      "Создайте красивое и функциональное пространство с помощью наших экспертов-дизайнеров.",
    features: ["3D визуализация", "Подбор материалов", "Авторский надзор"],
    icon: <FaPencilRuler className={styles.serviceIcon} />,
    image: "/images/service2.jpg",
  },
  {
    id: 3,
    title: "Отделочные работы",
    description:
      "Высококачественная отделка придаст вашему дому элегантность.",
    features: ["Стены и потолки", "Напольные покрытия", "Декоративные элементы"],
    icon: <FaPaintRoller className={styles.serviceIcon} />,
    image: "/images/service3.jpg",
  },
];

// Componente principal
function Services() {
  const scrollToCalculator = (e) => {
    e.preventDefault();
    const calculatorSection = document.getElementById("calculator");
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              <div className={styles.iconContainer}>{service.icon}</div>
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
                <button className={styles.detailsButton}>
                  Подробнее
                  <FaArrowRight className={styles.arrowIcon} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.calculateButton}
          onClick={scrollToCalculator}
          aria-label="Рассчитать стоимость"
        >
          <FaCalculator className={styles.buttonIcon} />
          Рассчитать стоимость
        </button>
      </div>
    </section>
  );
}

export default React.memo(Services);
