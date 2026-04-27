// Страница детальной информации о товаре
// Загружаем товар по ID из URL, показываем подробности

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/ErrorMessage';
import ProductRecommendation from '../../components/ProductRecommendation/ProductRecommendation';
import { fetchProductById } from '../../services/api';
import styles from './ProductPage.module.css';

function ProductPage() {
  // Получаем ID из URL
  const { id } = useParams();

  // Состояния
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Получаем функции из контекста
  const { addToCart } = useContext(CartContext);

  // Загружаем товар при монтировании или при смене ID
  useEffect(() => {
    loadProduct();
  }, [id]);

  // Функция загрузки товара
  async function loadProduct() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Обработчик добавления в корзину
  function handleAddToCart() {
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

  // Показываем лоадер
  if (loading) {
    return <Loader />;
  }

  // Показываем ошибку
  if (error) {
    return <ErrorMessage message={error} onRetry={loadProduct} />;
  }

  // Если товар не найден
  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Товар не найден</h2>
        <Link to="/menu" className={styles.backLink}>Вернуться в меню</Link>
      </div>
    );
  }

  return (
    <main className={styles.productPage}>
      <div className={styles.container}>
        {/* Хлебные крошки */}
        <div className={styles.breadcrumbs}>
          <Link to="/">Главная</Link>
          <span> / </span>
          <Link to="/menu">Меню</Link>
          <span> / </span>
          <span>{product.name}</span>
        </div>

        {/* Информация о товаре */}
        <div className={styles.productInfo}>
          {/* Изображение */}
          <div className={styles.imageSection}>
            <div className={styles.image}>
              {product.image ? (
                <img src={product.image} alt={product.name} className={styles.productImg} />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span>Фото товара</span>
                </div>
              )}
            </div>
          </div>

          {/* Описание */}
          <div className={styles.details}>
            {product.isNew && (
              <span className={styles.badge}>Новинка</span>
            )}

            <h1 className={styles.productName}>{product.name}</h1>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.price}>{product.price} ₽</div>

            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              Добавить в корзину
            </button>
          </div>
        </div>

        {/* Пищевая ценность */}
        <section className={styles.nutrition}>
          <h2 className={styles.sectionTitle}>Пищевая ценность</h2>
          <div className={styles.nutritionGrid}>
            <div className={styles.nutritionItem}>
              <div className={styles.nutritionValue}>{product.nutrition.calories}</div>
              <div className={styles.nutritionLabel}>ккал</div>
            </div>
            <div className={styles.nutritionItem}>
              <div className={styles.nutritionValue}>{product.nutrition.proteins} г</div>
              <div className={styles.nutritionLabel}>белки</div>
            </div>
            <div className={styles.nutritionItem}>
              <div className={styles.nutritionValue}>{product.nutrition.fats} г</div>
              <div className={styles.nutritionLabel}>жиры</div>
            </div>
            <div className={styles.nutritionItem}>
              <div className={styles.nutritionValue}>{product.nutrition.carbs} г</div>
              <div className={styles.nutritionLabel}>углеводы</div>
            </div>
          </div>
        </section>

        {/* Кнопка назад */}
        <div className={styles.backSection}>
          <Link to="/menu" className={styles.backBtn}>
            ← Вернуться в меню
          </Link>
        </div>
      </div>

      {/* Модальное окно с рекомендациями */}
      {showRecommendation && (
        <ProductRecommendation
          product={product}
          onClose={handleCloseRecommendation}
          onAddToCart={handleAddRecommendedProduct}
        />
      )}
    </main>
  );
}

export default ProductPage;
