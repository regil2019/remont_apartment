import { useState } from "react";
import { FaStar, FaPaperPlane, FaArrowLeft, FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Reviews.css';

function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      text: "Работа выполнена на высшем уровне! Всем советую. Команда настоящих профессионалов, которые знают свое дело.",
      rating: 5,
      author: "Алексей Петров",
      date: "15 января 2025",
      project: "Ремонт 3-комнатной квартиры",
      avatar: <FaUserCircle className="user-avatar" />
    },
    {
      id: 2,
      text: "Отличная работа! Рекомендую. Дизайнеры предложили современные решения, которые превзошли все ожидания.",
      rating: 5,
      author: "Елена Иванова",
      date: "12 января 2025",
      project: "Дизайн-проект загородного дома",
      avatar: <FaUserCircle className="user-avatar" />
    },
    {
      id: 3,
      text: "Дизайнеры просто волшебники, интерьеры получились потрясающими! Очень довольна результатом.",
      rating: 5,
      author: "Мария Сидорова",
      date: "10 января 2025",
      project: "Косметический ремонт кухни",
      avatar: <FaUserCircle className="user-avatar" />
    },
    {
      id: 4,
      text: "Очень профессиональный подход, всё сделано качественно. Ремонт выполнен точно в срок.",
      rating: 4,
      author: "Дмитрий Соколов",
      date: "5 января 2025",
      project: "Капитальный ремонт офиса",
      avatar: <FaUserCircle className="user-avatar" />
    },
  ]);

  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [project, setProject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() === "" || author.trim() === "") return;

    const newReviewObject = {
      id: reviews.length + 1,
      text: newReview,
      rating: rating,
      author: author,
      date: new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      project: project || "Не указано",
      avatar: <FaUserCircle className="user-avatar" />
    };

    setReviews([newReviewObject, ...reviews]);
    setNewReview("");
    setAuthor("");
    setProject("");
    setRating(5);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? "star filled" : "star"}
      />
    ));
  };

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className="reviews-page">
      <button className="back-button" onClick={() => navigate('/')}>
        <FaArrowLeft className="back-icon" />
        На главную
      </button>

      <div className="reviews-header">
        <h2 className="page-title">Отзывы наших клиентов</h2>
        <div className="rating-summary">
          <div className="average-rating">
            <span className="rating-value">{averageRating}</span>
            <div className="stars">
              {renderStars(Math.round(averageRating))}
            </div>
          </div>
          <span className="review-count">{reviews.length} отзывов</span>
        </div>
        <p className="page-subtitle">Ваше мнение очень важно для нас</p>
      </div>

      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="user-info">
                {review.avatar}
                <div className="user-details">
                  <span className="review-author">{review.author}</span>
                  <div className="review-meta">
                    <span className="review-project">{review.project}</span>
                    <span className="review-date">
                      <FaCalendarAlt className="date-icon" />
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="review-content">"{review.text}"</p>
          </div>
        ))}
      </div>

      <div className="add-review">
        <h3 className="form-title">Оставьте свой отзыв</h3>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="author">Ваше имя</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Введите ваше имя"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="project">Проект (необязательно)</label>
              <input
                type="text"
                id="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Например, Ремонт кухни"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Оценка</label>
            <div className="rating-container">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index} className="star-label">
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      checked={ratingValue === rating}
                      className="star-radio"
                    />
                    <FaStar
                      className={`star ${ratingValue <= rating ? "filled" : ""}`}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="review-text">Ваш отзыв</label>
            <textarea
              id="review-text"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Напишите ваш отзыв здесь..."
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-review" disabled={!author || !newReview}>
            <FaPaperPlane className="submit-icon" />
            Отправить отзыв
          </button>
        </form>
      </div>
    </section>
  );
}

export default Reviews;
