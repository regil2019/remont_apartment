import { useState } from 'react'
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPaperPlane,
} from 'react-icons/fa'
import styles from './Contacts.module.css'

const Contacts = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно'
    if (!formData.email.trim()) newErrors.email = 'Email обязателен'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email не корректен'
    if (!formData.message.trim()) newErrors.message = 'Сообщение обязательно'
    return newErrors
  }

  const handleSubmit = e => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsSubmitting(true)

    // Simular envio
    setTimeout(() => {
      setSuccessMessage(
        'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.'
      )
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section className={styles.contactsSection} aria-label='Контакты'>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>Мы очень ответственные</h2>
        <div className={styles.divider}></div>
      </div>

      <div className={styles.contactsContainer}>
        {/* Contact Information */}
        <div
          className={styles.contactInfo}
          role='region'
          aria-labelledby='contact-info-title'>
          <div className={styles.infoCard}>
            <h3 id='contact-info-title' className={styles.centeredTitle}>
              Контакты
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

            <div className={styles.socialSection}>
              <p className={styles.socialTitle}>Мы в соцсетях:</p>
              <div className={styles.socialLinks}>
                <a
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Facebook'
                  className={styles.socialLink}>
                  <FaFacebookF className={styles.socialIcon} />
                </a>
                <a
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Instagram'
                  className={styles.socialLink}>
                  <FaInstagram className={styles.socialIcon} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          className={styles.contactForm}
          role='region'
          aria-labelledby='contact-form-title'>
          <div className={styles.formCard}>
            <h3 id='contact-form-title'>Свяжись с нами</h3>

            {successMessage && (
              <div className={styles.successMessage}>
                <FaPaperPlane className={styles.successIcon} />
                <p>{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor='name' className={styles.inputLabel}>
                  Имя
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Введите ваше имя'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required='true'
                  className={styles.inputField}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='email' className={styles.inputLabel}>
                  Почта
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Введите вашу почту'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required='true'
                  className={styles.inputField}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='message' className={styles.inputLabel}>
                  Сообщение
                </label>
                <textarea
                  id='message'
                  name='message'
                  placeholder='сообщение...'
                  rows='5'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required='true'
                  className={`${styles.inputField} ${styles.textareaField}`}></textarea>
              </div>

              <button
                type='submit'
                className={styles.submitButton}
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className={styles.spinner}></span>
                ) : (
                  <>
                    Отправить
                    <FaPaperPlane className={styles.buttonIcon} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts
