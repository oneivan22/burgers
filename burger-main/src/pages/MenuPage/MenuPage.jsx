// Страница каталога — один длинный список
// Клик на категорию или подкатегорию — прокручивает к нужной секции

import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { fetchProducts } from '../../services/api';
import { categories, subCategories } from '../../data/products';
import styles from './MenuPage.module.css';

const categoryIcons = {
  new: '🆕',
  burgers: '🍔',
  rolls: '🌯',
  fries: '🍟',
  drinks: '🥤',
  sauces: '🫙',
};

function MenuPage() {
  // Состояния для данных
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Состояние для текущей видимой категории
  const [visibleCategory, setVisibleCategory] = useState('');

  // Ref-ы для секций категорий и подкатегорий
  const categoryRefs = useRef({});
  const subRefs = useRef({});

  // Параметры запроса из URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    return items;
  }, [products, searchQuery]);

  function getProductsByCategory(categoryId) {
    return filteredProducts.filter(product => product.category === categoryId);
  }

  function getProductsBySub(subId) {
    return filteredProducts.filter(product => product.subcategory === subId);
  }

  const hasProducts = filteredProducts.length > 0;

  // Загружаем товары при монтировании
  useEffect(() => {
    loadProducts();
  }, []);

  // Отслеживаем какая категория сейчас видна на экране
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCategory(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-160px 0px -60% 0px', // Срабатывает когда секция вверху
        threshold: 0,
      }
    );

    // Наблюдаем за всеми секциями
    Object.values(categoryRefs.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [loading]);

  // Функция загрузки товаров
  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
      // Устанавливаем текущую категорию, если она задана в URL, иначе первую категорию с товарами
      const firstCat = categories.find(c =>
        data.filter(p => p.category === c.id).length > 0
      );
      if (queryCategory && categories.some(c => c.id === queryCategory)) {
        setVisibleCategory(queryCategory);
      } else if (firstCat) {
        setVisibleCategory(firstCat.id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Прокрутка к категории
  function scrollToCategory(categoryId) {
    const section = categoryRefs.current[categoryId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Прокрутка к подкатегории
  function scrollToSub(subId) {
    const section = subRefs.current[subId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  useEffect(() => {
    if (!loading && queryCategory && categories.some(c => c.id === queryCategory)) {
      const section = categoryRefs.current[queryCategory];
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [loading, queryCategory]);

  return (
    <main className={styles.menuPage}>
      <div className={styles.container}>
        {/* Основной layout: sidebar + content */}
        <div className={styles.layout}>
          {/* Sidebar с категориями — всегда видимый */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarWrapper}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`${styles.categoryBtn} ${visibleCategory === cat.id ? styles.active : ''}`}
                  onClick={() => scrollToCategory(cat.id)}
                >
                  <span className={styles.catIcon}>{categoryIcons[cat.id] || '🍽️'}</span>
                  <span className={styles.catName}>{cat.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Контент */}
          <div className={styles.content}>
            {/* Sticky-блок: текущая категория + её подкатегории */}
            {!loading && !error && visibleCategory && (
              <div className={styles.stickySubs}>
                {/* Подкатегории текущей категории */}
                <div className={styles.stickySubList}>
                  {(subCategories[visibleCategory] || []).length > 0 ? (
                    <>
                      {subCategories[visibleCategory]
                        .filter(sub => sub.id !== 'all')
                        .map(sub => (
                          <button
                            key={sub.id}
                            className={styles.stickySubBtn}
                            onClick={() => scrollToSub(sub.id)}
                          >
                            {sub.name}
                          </button>
                        ))}
                    </>
                  ) : (
                    // Если нет подкатегорий — показываем кнопки-навигацию к другим категориям
                    categories
                      .filter(cat => getProductsByCategory(cat.id).length > 0)
                      .map(cat => (
                        <button
                          key={cat.id}
                          className={`${styles.stickySubBtn} ${visibleCategory === cat.id ? styles.active : ''}`}
                          onClick={() => scrollToCategory(cat.id)}
                        >
                          {cat.name}
                        </button>
                      ))
                  )}
                </div>
              </div>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage message={error} onRetry={loadProducts} />
            ) : !hasProducts ? (
              <div className={styles.emptyState}>
                <h2>Товары не найдены</h2>
                {searchQuery ? (
                  <p>По запросу «{searchQuery}» не найдено подходящих товаров.</p>
                ) : (
                  <p>Товары не найдены. Попробуй выбрать другую категорию.</p>
                )}
              </div>
            ) : (
              <>
                {/* Секция для каждой категории */}
                {categories.map(category => {
                  const categoryProducts = getProductsByCategory(category.id);

                  // Если нет товаров — пропускаем
                  if (categoryProducts.length === 0 && category.id !== 'coupons') return null;

                  // Получаем подкатегории для этой категории
                  const subs = subCategories[category.id] || [];

                  return (
                    <section
                      key={category.id}
                      className={styles.categorySection}
                      ref={el => (categoryRefs.current[category.id] = el)}
                      id={category.id}
                    >
                      {/* Заголовок категории */}
                      <h2 className={styles.categoryHeading}>
                        {category.name}
                      </h2>

                      {/* Разделитель между категориями */}
                      <div className={styles.categorySeparator} />

                      {/* Товары — единым списком, сгруппированные по подкатегориям */}
                      {subs.length > 0 ? (
                        subs.map(sub => {
                          const subProducts = getProductsBySub(sub.id);
                          if (subProducts.length === 0) return null;

                          return (
                            <div
                              key={sub.id}
                              className={styles.subSection}
                              ref={el => (subRefs.current[sub.id] = el)}
                            >
                              {/* Подзаголовок подкатегории */}
                              <h3 className={styles.subHeading}>
                                {sub.name}
                              </h3>

                              {/* Разделитель */}
                              <div className={styles.separator} />

                              {/* Сетка товаров */}
                              <div className={styles.productsGrid}>
                                {subProducts.map(product => (
                                  <ProductCard key={product.id} product={product} />
                                ))}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        // Если нет подкатегорий — показываем все товары
                        <div className={styles.productsGrid}>
                          {categoryProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MenuPage;
