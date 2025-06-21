import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaExpand } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Gallery.css";

const images = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg",
];

const  Gallery = () => {
  const [modalImg, setModalImg] = React.useState(null);

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2>Наши работы</h2>
          <div className="gallery-divider"></div>
          <p>Оцените качество наших проектов по ремонту и дизайну интерьера</p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="gallery-swiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="gallery-item modern">
                <img
                  src={src}
                  alt={`Проект ${index + 1}`}
                  loading="lazy"
                  onClick={() => setModalImg(src)}
                  style={{ cursor: "pointer" }}
                />
                <button
                  className="expand-btn"
                  onClick={() => setModalImg(src)}
                  aria-label="Expandir imagem"
                >
                  <FaExpand />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {modalImg && (
          <div className="modal-overlay" onClick={() => setModalImg(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <img src={modalImg} alt="Projeto ampliado" />
              <button className="close-modal" onClick={() => setModalImg(null)}>
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;