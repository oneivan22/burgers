// Промо-слайдер — стиль BK Russia
// Баннеры с акциями и автопереключением

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { promotions } from '../../data/products';
import styles from './PromoSlider.module.css';

function PromoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Автопереключение каждые 5 секунд
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goToSlide(index) {
    setCurrentSlide(index);
  }

  function prevSlide() {
    setCurrentSlide(prev => (prev - 1 + promotions.length) % promotions.length);
  }

  function nextSlide() {
    setCurrentSlide(prev => (prev + 1) % promotions.length);
  }

  return (
    <section className={styles.slider}>
      <div className={styles.sliderContainer}>
        {/* Кнопка назад */}
        <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevSlide}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Слайды */}
        <div className={styles.slides}>
          {promotions.map((banner, index) => (
            <div
              key={banner.id}
              className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            >
              <div className={styles.slideContent}>
                <h2 className={styles.slideTitle}>{banner.title}</h2>
                <p className={styles.slideSubtitle}>{banner.subtitle}</p>
                <p className={styles.slideDescription}>{banner.description}</p>
                <Link to={banner.link} className={styles.slideBtn}>
                  Заказать
                </Link>
              </div>
              <div className={styles.slideImage}>
                {banner.image ? (
                  <img src={banner.image} alt={banner.title} className={styles.slideImg} />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span>{banner.title}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка вперёд */}
        <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextSlide}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* Точки */}
      <div className={styles.dots}>
        {promotions.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default PromoSlider;