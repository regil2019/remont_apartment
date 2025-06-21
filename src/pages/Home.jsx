import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // ✅ CORRETO para Swiper v11+
import { FaArrowRight } from "react-icons/fa";
import "./Home.css";

// Importação da imagem removida, pois o CSS já define a imagem de fundo

// Estilos do Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Dados dos depoimentos
  const reviews = [
    {
      id: 1,
      name: "Анна Иванова",
      text: "Самые лучшие специалисты! Работы выполнены на высшем уровне!",
    },
    {
      id: 2,
      name: "Иван Петров",
      text: "Дизайн интерьера просто великолепен! Теперь мой дом выглядит современно и уютно.",
    },
    {
      id: 3,
      name: "Мария Сидорова",
      text: "Большое спасибо за отличную работу! Рекомендую всем знакомым.",
    },
    {
      id: 4,
      name: "Дмитрий Соколов",
      text: "Ремонт выполнен точно в срок и с высочайшим качеством. Очень доволен результатом!",
    },
  ];

  const handleStartClick = () => {
    navigate('/calculator');
  };

  const handleViewReviews = () => {
    navigate('/reviews');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Seção Hero */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className={`hero-text ${isScrolled ? 'scrolled' : ''}`}>
            <h1 className="hero-title">Превратите ваш дом в мечту</h1>
            <p className="hero-subtitle">Профессиональные услуги по ремонту и дизайну интерьеров</p>
            <button className="cta-button" onClick={handleStartClick}>
              Рассчитать услуги
            </button>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="reviews-section">
        <div className="reviews-container">
          <h2 className="section-title">Что говорят наши клиенты?</h2>
          
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
                  <div className="quote-icon">“</div>
                  <p className="review-text">{review.text}</p>
                  <div className="review-footer">
                    <h3 className="review-author">{review.name}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <button className="view-all-button" onClick={handleViewReviews}>
            Смотреть все отзывы <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
