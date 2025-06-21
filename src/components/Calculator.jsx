import  { useState, useEffect } from "react";
import { FaCalculator, FaHome, FaPaintRoller, FaRulerCombined, FaRubleSign } from "react-icons/fa";
import "./Calculator.css";

const services = [
  { 
    name: "Ремонт квартир", 
    pricePerMeter: 1000,
    icon: <FaHome className="service-icon" />,
    description: "Комплексный ремонт под ключ"
  },
  { 
    name: "Дизайн интерьера", 
    pricePerMeter: 1500,
    icon: <FaPaintRoller className="service-icon" />,
    description: "Профессиональное проектирование"
  },
  { 
    name: "Отделочные работы", 
    pricePerMeter: 2000,
    icon: <FaPaintRoller className="service-icon" />,
    description: "Качественная отделка помещений"
  },
];

const Calculator = () => {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [area, setArea] = useState("");
  const [totalCost, setTotalCost] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);

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
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
    setTotalCost(null);
  };

  const handleCalculateCost = () => {
    if (area && selectedService) {
      const cost = area * selectedService.pricePerMeter;
      setTotalCost(cost);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculateCost();
    }
  };

  return (
    <section id="calculator" className="calculatorSection">
      <div className="calculatorHeader">
        <FaCalculator className="titleIcon" />
        <h2 className="title">Калькулятор стоимости</h2>
      </div>
      
      <div className="calculatorCard">
        <div className="serviceSelector">
          <h3>Выберите услугу:</h3>
          <div className="serviceCards">
            {services.map((service) => (
              <div 
                key={service.name}
                className={`serviceCard ${selectedService.name === service.name ? 'selected' : ''}`}
                onClick={() => handleServiceChange(service)}
              >
                <div className="serviceIconContainer">
                  {service.icon}
                </div>
                <div className="serviceInfo">
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                  <p className="priceInfo">
                    <span className="priceLabel">Цена за м²:</span> 
                    <span className="priceValue">{service.pricePerMeter} руб</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="inputSection">
          <label className="inputLabel">
            <span>Введите площадь помещения (м²):</span>
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
          
          <button 
            onClick={handleCalculateCost} 
            className="calculateButton"
            disabled={!area}
          >
            Рассчитать стоимость
          </button>
        </div>
        
        {totalCost !== null && (
          <div className={`resultContainer ${isAnimated ? 'animated' : ''}`}>
            <div className="resultCard">
              <h3>Общая стоимость:</h3>
              <div className="totalCost">
                <span className="costValue">{totalCost.toLocaleString()}</span>
                <span className="currency">руб</span>
              </div>
              <p className="costDetails">
                {area} м² × {selectedService.pricePerMeter} руб/м²
              </p>
              <div className="divider"></div>
              <p className="disclaimer">*Цена является ориентировочной. Для точного расчёта свяжитесь с нами</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Calculator;