import { useState, useEffect } from "react";
import { FaCalculator, FaHome, FaPaintRoller, FaRulerCombined, FaCheckCircle, FaInfoCircle, FaStar, FaClock } from "react-icons/fa";
import "./Calculator.css";

const services = [
  {
    name: "Ремонт квартир",
    pricePerMeter: 1000,
    icon: <FaHome className="service-icon" />,
    description: "Комплексный ремонт под ключ",
    features: ["Демонтаж", "Электрика", "Сантехника", "Отделка", "Уборка"],
    duration: "2-4 недели",
    rating: 4.9,
    isPopular: true
  },
  {
    name: "Дизайн интерьера",
    pricePerMeter: 1500,
    icon: <FaPaintRoller className="service-icon" />,
    description: "Профессиональное проектирование",
    features: ["3D визуализация", "Подбор материалов", "Авторский надзор", "Меблировка"],
    duration: "1-3 недели",
    rating: 4.8,
    isPopular: true
  },
  {
    name: "Отделочные работы",
    pricePerMeter: 2000,
    icon: <FaPaintRoller className="service-icon" />,
    description: "Качественная отделка помещений",
    features: ["Стены и потолки", "Напольные покрытия", "Декоративные элементы", "Покраска"],
    duration: "1-2 недели",
    rating: 4.7,
    isPopular: false
  },
];

const Calculator = () => {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [area, setArea] = useState("");
  const [totalCost, setTotalCost] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    if (totalCost !== null) {
      setIsAnimated(true);
      const timer = setTimeout(() => setIsAnimated(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [totalCost]);

  const handleServiceChange = (service) => {
    setSelectedService(service);
    setTotalCost(null);
    setShowDetails(false);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
    setTotalCost(null);
  };

  const handleCalculateCost = () => {
    if (area && selectedService) {
      let cost = area * selectedService.pricePerMeter;

      // Apply discount for larger areas
      if (area > 50) {
        cost = cost * 0.95; // 5% discount
        setDiscountApplied(true);
      } else {
        setDiscountApplied(false);
      }

      setTotalCost(cost);
      setShowDetails(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculateCost();
    }
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <section id="calculator" className="calculatorSection">
      <div className="calculatorHeader">
        <FaCalculator className="titleIcon" />
        <h2 className="title">Калькулятор стоимости</h2>
        <p className="subtitle">Рассчитайте предварительную стоимость вашего проекта</p>
      </div>

      <div className="calculatorCard">
        {/* Service Selector */}
        <div className="serviceSelector">
          <h3>Выберите услугу:</h3>

          <div className="serviceCards">
            {services.map((service) => (
              <div
                key={service.name}
                className={`serviceCard ${selectedService.name === service.name ? 'selected' : ''} ${service.isPopular ? 'popular' : ''}`}
                onClick={() => handleServiceChange(service)}
              >
                {service.isPopular && (
                  <div className="popularBadge">
                    <FaStar className="badgeIcon" />
                    Популярное
                  </div>
                )}

                <div className="serviceIconContainer">
                  {service.icon}
                </div>

                <div className="serviceInfo">
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>

                  <div className="serviceMeta">
                    <div className="metaItem">
                      <FaClock className="metaIcon" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="metaItem">
                      <FaStar className="metaIcon" />
                      <span>{service.rating}</span>
                    </div>
                  </div>

                  <p className="priceInfo">
                    <span className="priceLabel">Цена за м²:</span>
                    <span className="priceValue">{service.pricePerMeter.toLocaleString()} руб</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="inputSection">
          <div className="inputGroup">
            <label className="inputLabel">
              <span>Площадь помещения (м²):</span>
              <div className="inputContainer">
                <input
                  type="number"
                  value={area}
                  onChange={handleAreaChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Например, 50"
                  className="inputField"
                  min="1"
                />
                <FaRulerCombined className="inputIcon" />
              </div>
            </label>

            {area > 0 && (
              <div className="areaInfo">
                <FaInfoCircle className="infoIcon" />
                <span>При площади более 50м² действует скидка 5%</span>
              </div>
            )}
          </div>

          <button
            onClick={handleCalculateCost}
            className="calculateButton"
            disabled={!area}
          >
            Рассчитать стоимость
          </button>
        </div>

        {/* Result Section */}
        {totalCost !== null && (
          <div className={`resultContainer ${isAnimated ? 'animated' : ''}`}>
            <div className="resultCard">
              <div className="resultHeader">
                <h3>Общая стоимость:</h3>
                <div className="discountBadge">
                  {discountApplied && <span>Скидка 5% применена!</span>}
                </div>
              </div>

              <div className="totalCost">
                <span className="costValue">{formatCurrency(totalCost)}</span>
              </div>

              <p className="costDetails">
                {area} м² × {selectedService.pricePerMeter.toLocaleString()} руб/м²
                {discountApplied && <span className="discountInfo"> (со скидкой 5%)</span>}
              </p>

              <div className="resultFeatures">
                <h4>В стоимость входит:</h4>
                <ul className="featuresList">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="featureItem">
                      <FaCheckCircle className="featureIcon" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="resultActions">
                <button
                  className="actionButton primary"
                  onClick={() => {
                    // In a real app, this would navigate to contact form with pre-filled data
                    alert('Для точного расчета наши специалисты свяжутся с вами в ближайшее время!');
                  }}
                >
                  Заказать звонок
                </button>
                <button
                  className="actionButton secondary"
                  onClick={() => {
                    setTotalCost(null);
                    setShowDetails(false);
                  }}
                >
                  Рассчитать другое
                </button>
              </div>

              <div className="disclaimer">
                <FaInfoCircle className="disclaimerIcon" />
                <span>*Цена является ориентировочной. Для точного расчёта свяжитесь с нами</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Information Section */}
      <div className="infoSection">
        <div className="infoCard">
          <h3>Как мы работаем</h3>
          <div className="stepsContainer">
            <div className="step">
              <div className="stepNumber">1</div>
              <div className="stepContent">
                <h4>Консультация</h4>
                <p>Бесплатный выезд специалиста для оценки объема работ</p>
              </div>
            </div>
            <div className="step">
              <div className="stepNumber">2</div>
              <div className="stepContent">
                <h4>Договор</h4>
                <p>Заключение договора с фиксированной стоимостью</p>
              </div>
            </div>
            <div className="step">
              <div className="stepNumber">3</div>
              <div className="stepContent">
                <h4>Выполнение</h4>
                <p>Качественное выполнение работ в оговоренные сроки</p>
              </div>
            </div>
            <div className="step">
              <div className="stepNumber">4</div>
              <div className="stepContent">
                <h4>Сдача</h4>
                <p>Приемка работы и гарантийное обслуживание</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calculator;
