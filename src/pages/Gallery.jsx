import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight, FaFilter, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Gallery.css";

// Enhanced gallery data with categories
const galleryImages = [
  {
    id: 1,
    src: "/images/gallery1.jpg",
    alt: "Современная кухня с островом",
    category: "кухня",
    title: "Современная кухня",
    description: "Дизайнерская кухня с островом и встроенной техникой",
    isFeatured: true,
    rating: 4.9
  },
  {
    id: 2,
    src: "/images/gallery2.jpg",
    alt: "Роскошная ванная комната",
    category: "ванная",
    title: "Роскошная ванная",
    description: "Ванная комната с джакузи и современной отделкой",
    isFeatured: true,
    rating: 4.8
  },
  {
    id: 3,
    src: "/images/gallery3.jpg",
    alt: "Спальня в современном стиле",
    category: "спальня",
    title: "Современная спальня",
    description: "Спальня с индивидуальным дизайном и встроенным шкафом",
    isFeatured: false,
    rating: 4.7
  },
  {
    id: 4,
    src: "/images/gallery4.jpg",
    alt: "Гостиная с камином",
    category: "гостиная",
    title: "Уютная гостиная",
    description: "Просторная гостиная с камином и современной мебелью",
    isFeatured: true,
    rating: 4.9
  },
  {
    id: 5,
    src: "/images/gallery5.jpg",
    alt: "Детская комната",
    category: "детская",
    title: "Детская комната",
    description: "Яркая и функциональная детская комната",
    isFeatured: false,
    rating: 4.6
  },
  {
    id: 6,
    src: "/images/gallery6.jpg",
    alt: "Рабочий кабинет",
    category: "кабинет",
    title: "Домашний офис",
    description: "Функциональный рабочий кабинет с эргономичной мебелью",
    isFeatured: true,
    rating: 4.8
  },
];

const Gallery = () => {
  const [modalImg, setModalImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];

  // Filter images based on category
  const filteredImages = filterCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === filterCategory);

  // Get featured images
  const featuredImages = galleryImages.filter(img => img.isFeatured);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setModalImg(filteredImages[index].src);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setModalImg(filteredImages[nextIndex].src);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setModalImg(filteredImages[prevIndex].src);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setModalImg(null);
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        {/* Gallery Header */}
        <div className="gallery-header">
          <h2>Наши работы</h2>
          <div className="gallery-divider"></div>
          <p>Оцените качество наших проектов по ремонту и дизайну интерьера</p>

          {/* Filter Button */}
          <button
            className="filter-toggle-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="filter-icon" />
            <span>{filterCategory === 'all' ? 'Все категории' : filterCategory}</span>
          </button>
        </div>

        {/* Filters - shown when toggle is active */}
        {showFilters && (
          <div className="gallery-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-button ${filterCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setFilterCategory(category);
                  setShowFilters(false);
                }}
              >
                {category === 'all' ? 'Все' : category}
              </button>
            ))}
          </div>
        )}

        {/* Featured Projects Section */}
        <div className="featured-section">
          <h3 className="featured-title">Лучшие проекты</h3>
          <div className="featured-grid">
            {featuredImages.map((image) => (
              <div key={image.id} className="featured-card">
                <div className="featured-image-container">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="featured-image"
                    onClick={() => {
                      const index = galleryImages.findIndex(img => img.id === image.id);
                      handleImageClick(index);
                    }}
                  />
                  <div className="featured-overlay">
                    <div className="featured-info">
                      <h4>{image.title}</h4>
                      <div className="featured-rating">
                        <FaStar className="star-icon" />
                        <span>{image.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Gallery */}
        <div className="gallery-main">
          <h3 className="gallery-subtitle">
            {filterCategory === 'all' ? 'Все проекты' : `Категория: ${filterCategory}`}
            <span className="image-count">({filteredImages.length})</span>
          </h3>

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
            {filteredImages.map((image, index) => (
              <SwiperSlide key={image.id}>
                <div className="gallery-item modern">
                  <div className="gallery-image-wrapper">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      onClick={() => handleImageClick(index)}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="gallery-info-overlay">
                      <h4>{image.title}</h4>
                      <p>{image.description}</p>
                    </div>
                  </div>
                  <button
                    className="expand-btn"
                    onClick={() => handleImageClick(index)}
                    aria-label="Увеличить изображение"
                  >
                    <FaExpand />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Image Modal */}
        {modalImg && (
          <div
            className="modal-overlay"
            onClick={() => setModalImg(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр изображения"
          >
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button
                className="close-modal"
                onClick={() => setModalImg(null)}
                aria-label="Закрыть модальное окно"
              >
                <FaTimes />
              </button>

              <button
                className="nav-button prev-button"
                onClick={handlePrev}
                aria-label="Предыдущее изображение"
              >
                <FaChevronLeft />
              </button>

              <div className="modal-image-container">
                <img
                  src={modalImg}
                  alt={filteredImages[currentIndex].alt}
                  className="modal-image"
                />
                <div className="modal-image-info">
                  <h3>{filteredImages[currentIndex].title}</h3>
                  <p>{filteredImages[currentIndex].description}</p>
                  <div className="modal-rating">
                    <FaStar className="star-icon" />
                    <span>{filteredImages[currentIndex].rating}</span>
                  </div>
                </div>
              </div>

              <button
                className="nav-button next-button"
                onClick={handleNext}
                aria-label="Следующее изображение"
              >
                <FaChevronRight />
              </button>

              <div className="image-counter">
                {currentIndex + 1} / {filteredImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
