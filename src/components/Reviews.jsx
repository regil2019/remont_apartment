import React, { useState } from "react";
import { FaStar, FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Reviews.css';

function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      text: "Работа выполнена на высшем уровне! Всем советую.",
      rating: 5,
      author: "Алексей Петров",
      date: "15 января 2025"
    },
    { 
      id: 2, 
      text: "Отличная работа! Рекомендую.",
      rating: 5,
      author: "Елена Иванова",
      date: "12 января 2025"
    },
    { 
      id: 3, 
      text: "Дизайнеры просто волшебники, интерьеры получились потрясающими!",
      rating: 5,
      author: "Мария Сидорова",
      date: "10 января 2025"
    },
    { 
      id: 4, 
      text: "Очень профессиональный подход, всё сделано качественно.",
      rating: 4,
      author: "Дмитрий Соколов",
      date: "5 января 2025"
    },
  ]);
  
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");

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
      })
    };

    setReviews([newReviewObject, ...reviews]);
    setNewReview("");
    setAuthor("");
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

  return (
    <section className="reviews-page">
      <button className="back-button" onClick={() => navigate('/')}>
        <FaArrowLeft className="back-icon" />
        На главную
      </button>
      
      <div className="reviews-header">
        <h2 className="page-title">Отзывы наших клиентов</h2>
        <p className="page-subtitle">Ваше мнение очень важно для нас</p>
      </div>
      
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-meta">
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
              <span className="review-date">{review.date}</span>
            </div>
            <p className="review-content">{review.text}</p>
            <div className="review-author">{review.author}</div>
          </div>
        ))}
      </div>

      <div className="add-review">
        <h3 className="form-title">Оставьте свой отзыв</h3>
        <form onSubmit={handleSubmit} className="review-form">
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
          
          <button type="submit" className="submit-review">
            <FaPaperPlane className="submit-icon" />
            Отправить отзыв
          </button>
        </form>
      </div>
    </section>
  );
}

export default Reviews;