// Страница корзины
// Показывает товары, можно менять количество, удалять, оформлять заказ

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './CartPage.module.css';

function CartPage() {
  // Получаем данные корзины из контекста
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useContext(CartContext);

  // Состояние для модального окна
  const [showModal, setShowModal] = useState(false);

  // Обработчик оформления заказа
  function handleCheckout() {
    setShowModal(true);
    clearCart(); // Очищаем корзину
  }

  // Обработчик закрытия модалки
  function handleCloseModal() {
    setShowModal(false);
  }

  // Если корзина пуста
  if (cartItems.length === 0) {
    return (
      <main className={styles.cartPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>Корзина</h1>
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🛒</div>
            <p>Ваша корзина пуста</p>
            <Link to="/menu" className={styles.shopBtn}>
              Перейти в меню
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.cartPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Корзина</h1>

        <div className={styles.layout}>
          {/* Список товаров */}
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                {/* Изображение */}
                <Link to={`/product/${item.id}`} className={styles.itemImage}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className={styles.itemImg} />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>Фото</span>
                    </div>
                  )}
                </Link>

                {/* Информация */}
                <div className={styles.itemInfo}>
                  <Link to={`/product/${item.id}`} className={styles.itemName}>
                    {item.name}
                  </Link>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <div className={styles.itemPrice}>{item.price} ₽</div>

                  {/* Мобильные элементы управления */}
                  <div className={styles.mobileControls}>
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.quantityBtn}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className={styles.quantityValue}>{item.quantity}</span>
                      <button
                        className={styles.quantityBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.itemTotal}>
                      {item.price * item.quantity} ₽
                    </div>
                  </div>
                </div>

                {/* Десктопные элементы управления */}
                <div className={styles.desktopQuantityControl}>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Итого за позицию для десктопа */}
                <div className={styles.desktopItemTotal}>
                  {item.price * item.quantity} ₽
                </div>

                {/* Кнопка удалить */}
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                  title="Удалить"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Итого */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Итого</h2>
            <div className={styles.summaryRow}>
              <span>Товаров:</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>К оплате:</span>
              <span>{totalPrice} ₽</span>
            </div>

            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Оформить заказ
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно подтверждения */}
      {showModal && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalIcon}>✅</div>
            <h2>Заказ оформлен!</h2>
            <p>Спасибо за покупку! Ваш заказ уже в обработке.</p>
            <button className={styles.modalBtn} onClick={handleCloseModal}>
              Отлично!
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default CartPage;