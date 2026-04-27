// Компонент карточки товара
// Отображает товар с картинкой, названием, ценой и кнопкой "В корзину"

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import ProductRecommendation from '../ProductRecommendation/ProductRecommendation';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  // Получаем функции из контекста
  const { addToCart } = useContext(CartContext);
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Обработчик клика по кнопке "В корзину"
  function handleAddToCart(e) {
    e.preventDefault(); // Чтобы не переходить на страницу товара
    addToCart(product);
    setShowRecommendation(true); // Показываем модальное окно с рекомендациями
  }

  // Обработчик закрытия модального окна
  function handleCloseRecommendation() {
    setShowRecommendation(false);
  }

  // Обработчик добавления рекомендуемого товара
  function handleAddRecommendedProduct(recommendedProduct) {
    addToCart(recommendedProduct);
    setShowRecommendation(false);
  }

  return (
    <>
      <article className={styles.card}>
        {/* Бейдж "Новинка" */}
        {product.isNew && (
          <span className={styles.badge}>Новинка</span>
        )}
        
        {/* Ссылка на страницу товара */}
          <Link to={`/product/${product.id}`} className={styles.imageLink}>
            <div className={styles.image}>
              {product.image ? (
                <img src={product.image} alt={product.name} className={styles.productImg} />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span>Фото</span>
                </div>
              )}
            </div>
          </Link>

        {/* Информация о товаре */}
        <div className={styles.info}>
          <Link to={`/product/${product.id}`} className={styles.nameLink}>
            <h3 className={styles.name}>{product.name}</h3>
          </Link>
          
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.footer}>
            <span className={styles.price}>{product.price} ₽</span>
            
            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              В корзину
            </button>
          </div>
        </div>
      </article>

      {/* Модальное окно с рекомендациями */}
      {showRecommendation && (
        <ProductRecommendation
          product={product}
          onClose={handleCloseRecommendation}
          onAddToCart={handleAddRecommendedProduct}
        />
      )}
    </>
  );
}

export default ProductCard;
