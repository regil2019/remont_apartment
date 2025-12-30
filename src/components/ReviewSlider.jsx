
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ReviewSlider.css";

const reviews = [
  {
    name: "Анна Иванова",
    review: "Отличная компания! Сделали ремонт быстро и качественно. Спасибо за профессионализм!",
    date: "10 января 2025",
  },
  {
    name: "Иван Петров",
    review: "Дизайн интерьера просто великолепен! Теперь мой дом выглядит современно и уютно.",
    date: "5 января 2025",
  },
  {
    name: "Мария Сидорова",
    review: "Большое спасибо за отличную работу! Рекомендую всем.",
    date: "15 декабря 2024",
  },
];

function ReviewSlider() {
  return (
    <div className="review-slider">
      <h2 className="slider-title">Отзывы наших клиентов</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="review-card">
              <p className="review-text">&ldquo;{review.review}&rdquo;</p>
              <h3 className="review-author">{review.name}</h3>
              <span className="review-date">{review.date}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ReviewSlider;
