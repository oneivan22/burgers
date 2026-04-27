// Сервис для работы с API
// Имитируем запросы к серверу с помощью setTimeout и наших моковых данных

import { products, categories, promotions } from '../data/products';

// Функция для имитации задержки сети
function delay(ms = 500) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Функция для имитации случайной ошибки (10% шанс)
function maybeFail() {
  if (Math.random() < 0.1) {
    throw new Error('Ошибка сети. Попробуйте ещё раз.');
  }
}

// Получить все товары (как будто с сервера)
export async function fetchProducts() {
  await delay(800); // Имитируем задержку 800мс
  // maybeFail(); // Раскомментируйте, чтобы проверить обработку ошибок
  return [...products];
}

// Получить один товар по ID
export async function fetchProductById(id) {
  await delay(600);
  const product = products.find(p => p.id === Number(id));
  if (!product) {
    throw new Error('Товар не найден');
  }
  return { ...product };
}

// Получить категории
export async function fetchCategories() {
  await delay(400);
  return [...categories];
}

// Получить промо-баннеры
export async function fetchPromoBanners() {
  await delay(300);
  return [...promotions];
}
