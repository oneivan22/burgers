// Контекст для корзины
// Здесь храним состояние корзины и функции для работы с ней

import { createContext, useState, useEffect } from 'react';

// Создаём контекст
export const CartContext = createContext();

// Провайдер корзины — оборачиваем всё приложение
export function CartProvider({ children }) {
  // Загружаем корзину из localStorage при первом рендере
  const [cartItems, setCartItems] = useState(() => {
    // Пытаемся получить корзину из localStorage
    const savedCart = localStorage.getItem('bk-cart');
    // Если есть сохранённая корзина — возвращаем её, иначе пустой массив
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Сохраняем корзину в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('bk-cart', JSON.stringify(cartItems));
  }, [cartItems]);

// Функция добавления товара в корзину
  function addToCart(product, quantity = 1) {
    setCartItems(prevItems => {
      // Ищем товар в корзине
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Если товар уже есть — увеличиваем количество
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Если товара нет — добавляем новый
        return [...prevItems, { ...product, quantity }];
      }
    });
  }


  // Функция удаления товара из корзины
  function removeFromCart(productId) {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }

  // Функция изменения количества товара
  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      // Если количество 0 или меньше — удаляем товар
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  // Функция очистки корзины
  function clearCart() {
    setCartItems([]);
  }

  // Считаем общее количество товаров в корзине
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Считаем общую сумму заказа
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Передаём все значения и функции в контекст
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}
