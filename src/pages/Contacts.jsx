import { useState, useRef } from 'react'
import {
  FaPhone, FaEnvelope, FaVk, FaInstagram, FaPaperPlane,
  FaMapMarkerAlt, FaClock, FaTelegramPlane, FaChevronRight
} from 'react-icons/fa'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import styles from './Contacts.module.css'

const Contacts = () => {
  const formRef = useRef()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [openFaq, setOpenFaq] = useState(null) // ✅ FAQ nativo

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно'
    if (!formData.email.trim()) newErrors.email = 'Email обязателен'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Некорректный email'
    if (!formData.message.trim()) newErrors.message = 'Сообщение обязательно'
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Некорректный номер телефона'
    }
    return newErrors
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    setSuccessMessage('')

    // ✅ Simulação realista (substitui por fetch API real depois)
    setTimeout(() => {
      setSuccessMessage('✅ Спасибо! Мы свяжемся с вами в течение 1 часа.')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  const socialLinks = [
    { icon: <FaVk />, href: 'https://vk.com', label: 'VK', color: '#4c75a3' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram', color: '#e4405f' },
    { icon: <FaTelegramPlane />, href: 'https://t.me/yourusername', label: 'Telegram', color: '#0088cc' }
  ]

  const faqData = [
    { q: 'Сколько времени занимает ремонт?', a: 'Косметический: 2-4 недели. Капитальный: 1-3 месяца.' },
    { q: 'Какие материалы вы используете?', a: 'Только сертифицированные от проверенных производителей.' },
    { q: 'Предоставляете ли вы гарантию?', a: 'Да, 1-3 года на все работы.' },
    { q: 'Можно ли оплатить в рассрочку?', a: 'Да, есть программы рассрочки и кредитования.' }
  ]

  return (
    <section className={styles.contactsSection} aria-label='Контакты'>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>Свяжитесь с нами</h2>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>
          Мы всегда готовы ответить на ваши вопросы и помочь с выбором услуг
        </p>
      </div>

      <div className={styles.contactsContainer}>
        {/* Contact Information */}
        <div className={styles.contactInfo} role='region' aria-labelledby='contact-info-title'>
          <div className={styles.infoCard}>
            <h3 id='contact-info-title' className={styles.centeredTitle}>
              Контактная информация
            </h3>

            <div className={styles.contactItem}>
              <div className={styles.iconCircle}>
                <FaPhone className={styles.contactIcon} />
              </div>
              <div>
                <p className={styles.contactLabel}>Телефон</p>
                <p className={styles.contactValue}>+7 919 725 0946</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.iconCircle}>
                <FaEnvelope className={styles.contactIcon} />
              </div>
              <div>
                <p className={styles.contactLabel}>Почта</p>
                <p className={styles.contactValue}>danielnunda@gmail.com</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.iconCircle}>
                <FaMapMarkerAlt className={styles.contactIcon} />
              </div>
              <div>
                <p className={styles.contactLabel}>Адрес</p>
                <p className={styles.contactValue}>г. Москва, ул. Ленина, д. 10</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.iconCircle}>
                <FaClock className={styles.contactIcon} />
              </div>
              <div>
                <p className={styles.contactLabel}>Режим работы</p>
                <p className={styles.contactValue}>Пн-Пт: 9:00 - 18:00</p>
                <p className={styles.contactValue}>Сб-Вс: 10:00 - 16:00</p>
              </div>
            </div>

            <div className={styles.socialSection}>
              <p className={styles.socialTitle}>Мы в соцсетях:</p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={social.label}
                    className={styles.socialLink}
                    style={{ backgroundColor: social.color }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Yandex Map */}
            <div className={styles.mapContainer}>
              <YMaps query={{ apikey: '25c1f7f4-38db-4efc-8c66-a0138229a60b' }}>
                <Map
                  defaultState={{ center: [55.7558, 37.6173], zoom: 10 }}
                  width="100%"
                  height="100%"
                >
                  <Placemark geometry={[55.7558, 37.6173]} />
                </Map>
              </YMaps>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.contactForm} role='region' aria-labelledby='contact-form-title'>
          <div className={styles.formCard}>
            <h3 id='contact-form-title'>Напишите нам</h3>
            <p className={styles.formSubtitle}>Заполните форму, и мы свяжемся с вами</p>

            {successMessage && (
              <div className={styles.successMessage}>
                <FaPaperPlane className={styles.successIcon} />
                <p>{successMessage}</p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor='name' className={styles.inputLabel}>Имя</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Введите ваше имя'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.name}
                  className={`${styles.inputField} ${errors.name ? styles.inputFieldError : ''}`}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='email' className={styles.inputLabel}>Почта</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Введите вашу почту'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.email}
                  className={`${styles.inputField} ${errors.email ? styles.inputFieldError : ''}`}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='phone' className={styles.inputLabel}>Телефон (необязательно)</label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  placeholder='+7 ...'
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${styles.inputField} ${errors.phone ? styles.inputFieldError : ''}`}
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='message' className={styles.inputLabel}>Сообщение</label>
                <textarea
                  id='message'
                  name='message'
                  placeholder='Ваше сообщение...'
                  rows='5'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`${styles.inputField} ${styles.textareaField} ${errors.message ? styles.inputFieldError : ''}`}
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <button type='submit' className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className={styles.spinner}></span>
                ) : (
                  <>
                    Отправить сообщение
                    <FaPaperPlane className={styles.buttonIcon} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ✅ FAQ INTERATIVO NATIVE */}
      <div className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h3 className={styles.faqTitle}>Часто задаваемые вопросы</h3>
          <div className={styles.faqGrid}>
            {faqData.map((item, index) => (
              <div key={index} className={styles.faqItem}>
                <button 
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h4>{item.q}</h4>
                  <FaChevronRight 
                    className={`${styles.faqIcon} ${openFaq === index ? styles.faqIconOpen : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className={`${styles.faqAnswer} ${styles.faqAnswerOpen}`}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts
