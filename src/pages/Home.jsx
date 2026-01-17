import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaArrowRight, FaStar, FaCheckCircle, FaPhone, FaTools, FaPaintBrush } from "react-icons/fa";
import "./Home.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Анна Иванова",
      text: "Самые лучшие специалисты! Работы выполнены на высшем уровне, точно в срок и с прекрасным качеством. Рекомендую всем!",
      rating: 5,
      project: "Ремонт 3-комнатной квартиры",
      date: "15 января 2025"
    },
    {
      id: 2,
      name: "Иван Петров",
      text: "Дизайн интерьера просто великолепен! Команда предложила современные решения, которые превзошли все ожидания.",
      rating: 5,
      project: "Дизайн-проект загородного дома",
      date: "12 января 2025"
    },
    {
      id: 3,
      name: "Мария Сидорова",
      text: "Большое спасибо за отличную работу! Особенно понравилось внимание к деталям и профессиональный подход.",
      rating: 5,
      project: "Косметический ремонт кухни",
      date: "10 января 2025"
    },
    {
      id: 4,
      name: "Дмитрий Соколов",
      text: "Ремонт выполнен точно в срок и с высочайшим качеством. Все материалы использовались премиум-класса.",
      rating: 4,
      project: "Капитальный ремонт офиса",
      date: "5 января 2025"
    },
  ];

  const serviceHighlights = [
    {
      icon: <FaTools className="highlight-icon" />,
      title: "Профессиональная команда",
      description: "Опытные мастера с более чем 10-летним опытом работы в сфере ремонта и дизайна."
    },
    {
      icon: <FaPaintBrush className="highlight-icon" />,
      title: "Индивидуальный подход",
      description: "Каждый проект разрабатывается с учетом ваших пожеланий и особенностей помещения."
    },
    {
      icon: <FaCheckCircle className="highlight-icon" />,
      title: "Гарантия качества",
      description: "Мы предоставляем гарантию на все виды работ и используем только сертифицированные материалы."
    },
    {
      icon: <FaStar className="highlight-icon" />,
      title: "Соблюдение сроков",
      description: "Четкое планирование и контроль выполнения работ для своевременной сдачи проекта."
    }
  ];

  const handleStartClick = () => {
    navigate("/calculator");
  };

  const handleViewReviews = () => {
    navigate("/reviews");
  };

  const handleViewServices = () => {
    navigate("/services");
  };

  const handleContactUs = () => {
    navigate("/contacts");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Главная - Ремонт и дизайн интерьера</title>
        <meta name="description" content="Преобразите ваш дом с профессиональными услугами ремонта и дизайна интерьера. Качественные работы, современные решения." />
      </Helmet>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className={`hero-text ${isScrolled ? "scrolled" : ""}`}>
            <h1 className="hero-title">Превратите ваш дом в мечту</h1>
            <p className="hero-subtitle">
              Профессиональные услуги по ремонту и дизайну интерьеров
            </p>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={handleStartClick}>
                Рассчитать стоимость
              </button>
              <button className="cta-button outline" onClick={handleViewServices}>
                Наши услуги
              </button>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse"></div>
          <span>Прокрутите вниз</span>
        </div>
      </section>

      {/* Service Highlights Section */}
      <section className="highlights-section">
        <div className="container">
          <h2 className="section-title">Почему выбирают нас?</h2>
          <div className="highlights-grid">
            {serviceHighlights.map((highlight, index) => (
              <div key={index} className="highlight-card">
                <div className="highlight-icon-container">{highlight.icon}</div>
                <h3 className="highlight-title">{highlight.title}</h3>
                <p className="highlight-description">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="reviews-section">
        <div className="reviews-container">
          <h2 className="section-title">Отзывы наших клиентов</h2>
          <p className="section-subtitle">
            Более 200+ успешных проектов и довольных клиентов
          </p>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="reviews-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="review-card">
                  <div className="review-header">
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.rating ? "star filled" : "star"}
                        />
                      ))}
                    </div>
                    <div className="review-meta">
                      <span className="review-author">{review.name}</span>
                      <span className="review-project">{review.project}</span>
                    </div>
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <div className="review-footer">
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="view-all-button" onClick={handleViewReviews}>
            Все отзывы <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Готовы начать свой проект?</h2>
            <p className="cta-subtitle">
              Свяжитесь с нами для бесплатной консультации и расчета стоимости
            </p>

            <div className="cta-actions">
              <button className="cta-button primary large" onClick={handleStartClick}>
                <FaPhone className="cta-icon" />
                Рассчитать стоимость
              </button>
              <button className="cta-button outline large" onClick={handleContactUs}>
                Связаться с нами
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
