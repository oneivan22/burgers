// Компонент модального окна с рекомендациями товаров
// Показывается при добавлении товара в корзину

import { useState, useEffect } from 'react';
import styles from './ProductRecommendation.module.css';

function ProductRecommendation({ product, onClose, onAddToCart }) {
  // Рекомендуемые товары (можно сделать более умную логику позже)
  const recommendedProducts = [
    { id: 1, name: 'Кинг Фри', price: 114.99, image: '/images/king-fries.png' },
    { id: 10, name: 'Эвервесс Кола', price: 184.99, image: '/images/evervess-cola.png' },
    { id: 12, name: 'Соус Барбекю', price: 69.99, image: '/images/sauce-bbq.png' },
  ];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <h2 className={styles.title}>Добавить к заказу?</h2>
        <p className={styles.subtitle}>Мы рекомендуем эти товары к вашему {product.name}</p>

        <div className={styles.recommendations}>
          {recommendedProducts.map(recProduct => (
            <div key={recProduct.id} className={styles.recommendationItem}>
              <div className={styles.productImage}>
                {recProduct.image ? (
                  <img src={recProduct.image} alt={recProduct.name} className={styles.productImg} />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span>Фото</span>
                  </div>
                )}
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{recProduct.name}</h3>
                <p className={styles.productPrice}>{recProduct.price} ₽</p>
                <div className={styles.productActions}>
                  <button
                    className={styles.addBtn}
                    onClick={() => onAddToCart(recProduct)}
                  >
                    Добавить в корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.continueBtn} onClick={onClose}>
          Продолжить покупки
        </button>
      </div>
    </div>
  );
}

export default ProductRecommendation;