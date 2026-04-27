// Главная страница — точная копия BK Russia
// Stories (тёмный фон) + sidebar (категории с иконками) + товары

import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories, promotions as promoBanners } from '../../data/products';
import styles from './HomePage.module.css';

// Эмодзи-иконки для категорий (пока заглушки)
const categoryIcons = {
  burgers: '🍔',
  chicken: '🍗',
  fish: '🐟',
  snacks: '🍟',
  drinks: '🥤',
  combo: '🎁',
  desserts: '🍰',
  sauces: '🫙',
};

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Фильтруем товары
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const popularProducts = filteredProducts.filter(p => p.isPopular);

  // Подкатегории (для выбранной категории)
  const subCategories = selectedCategory !== 'all'
    ? categories.filter(c => c.id === selectedCategory)
    : categories;

  return (
    <main className={styles.homePage}>
      {/* Stories — тёмный фон, кружки */}
      <section className={styles.stories}>
        <div className={styles.container}>
          <div className={styles.storiesContainer}>
            {promoBanners.map(banner => (
              <Link to={banner.link} key={banner.id} className={styles.storySlide}>
                <div className={styles.storyImage}>
                  <div className={styles.storyImagePlaceholder}></div>
                </div>
                <h3 className={styles.storyTitle}>{banner.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Основной layout: sidebar + content */}
      <div className={styles.appLayout}>
        {/* Sidebar — категории меню */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Меню</h2>
          <div className={styles.sidebarWrapper}>
            <Link
              to="/menu"
              className={`${styles.sidebarLink} ${selectedCategory === 'all' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              <div className={styles.sidebarIcon}>📋</div>
              <span>Меню</span>
            </Link>
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/menu?category=${category.id}`}
                className={`${styles.sidebarLink} ${selectedCategory === category.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={styles.sidebarIcon}>
                  {categoryIcons[category.id] || '🍽️'}
                </div>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </aside>

        {/* Контент */}
        <div className={styles.content}>
          {/* Подкатегории (pill-кнопки) */}
          <div className={styles.subCategories}>
            {subCategories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.subCategoryPill} ${selectedCategory === cat.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Заголовок */}
          <h2 className={styles.sectionTitle}>
            {selectedCategory === 'all'
              ? 'Популярное'
              : categories.find(c => c.id === selectedCategory)?.name || 'Меню'}
          </h2>

          {/* Сетка товаров */}
          <div className={styles.productsGrid}>
            {popularProducts.length > 0 ? popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            )) : (
              <p style={{ color: 'var(--brown700)', gridColumn: '1/-1', textAlign: 'center' }}>
                В этой категории пока нет товаров
              </p>
            )}
          </div>

          {/* Кнопка "Смотреть всё" */}
          <div className={styles.viewAll}>
            <Link to="/menu" className={styles.viewAllBtn}>
              Смотреть всё меню
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
