// Компонент шапки сайта — стиль BK Russia
// Верхнее меню + основная шапка с логотипом, поиском, корзиной

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './Header.module.css';

function Header() {
  // Состояние для мобильного меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Состояние для авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLogin, setUserLogin] = useState('');

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    const loggedIn = localStorage.getItem('bk-isLoggedIn');
    const login = localStorage.getItem('bk-userLogin');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      setUserLogin(login || '');
    }
  }, []);

  // Функция выхода
  function handleLogout() {
    localStorage.removeItem('bk-isLoggedIn');
    localStorage.removeItem('bk-userLogin');
    setIsLoggedIn(false);
    setUserLogin('');
  }

  // Получаем данные корзины из контекста
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('search') || '');
  }, [location.search]);

  // Обработчик поиска
  function handleSearch(e) {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/menu?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/menu');
    }
  }

  function handleClearSearch() {
    setSearchQuery('');
    navigate('/menu');
  }

  return (
    <header className={styles.header}>

      {/* Основная часть хедера */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          {/* Логотип */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>BURGER KING</span>
          </Link>

          {/* Инфо о точке заказа */}
          <div className={styles.orderPointInfo}>
            <div className={styles.orderPointTitle}>Доставка / В ресторане</div>
            <div className={styles.orderPointHint}>Для заказа выбери способ получения</div>
          </div>

          {/* Поиск */}
          <form className={styles.searchContainer} onSubmit={handleSearch}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fill="currentColor" fillRule="evenodd" d="M10.618 12.032a5.5 5.5 0 1 1 1.414-1.414l2.21 2.21a1 1 0 0 1-1.414 1.415zM11.5 7.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0" clipRule="evenodd"/>
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Поиск по меню"
              maxLength={256}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.searchClearBtn}
                onClick={handleClearSearch}
                aria-label="Очистить поиск"
              >
                ×
              </button>
            )}
          </form>

          {/* Действия */}
          <div className={styles.headerActions}>
            {/* Купоны */}
            <button className={styles.iconBtn} title="Купоны">
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path fill="currentColor" fillRule="evenodd" d="m9.65 1-8.4 8.4 1.4 1.4a1.98 1.98 0 0 0 2.8 2.8l1.4 1.4 8.4-8.4-1.4-1.4a1.98 1.98 0 0 0-2.8-2.8zM7.755 5.525h.99v4.95h-.99zM6.27 8a.99.99 0 1 0 0-1.98.99.99 0 0 0 0 1.98m3.96 1.98a.99.99 0 1 0 0-1.98.99.99 0 0 0 0 1.98" clipRule="evenodd"/>
              </svg>
              <span>Купоны</span>
            </button>

            {/* Войти / Выйти */}
            {isLoggedIn ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>{userLogin}</span>
                <button className={styles.iconBtn} onClick={handleLogout} title="Выйти">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span>Выйти</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className={styles.iconBtn}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fill="currentColor" d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M6 13a3 3 0 0 0-3 3v4l18 1v-5a3 3 0 0 0-3-3z"/>
                </svg>
                <span>Войти</span>
              </Link>
            )}

            {/* Корзина */}
            <Link to="/cart" className={styles.cartBtn}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20.01 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
            </Link>

            {/* Мобильное меню */}
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <nav className={styles.mobileNav}>
          <Link to="/" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Главная</Link>
          <Link to="/menu" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Меню</Link>
          <Link to="/cart" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Корзина</Link>
          <Link to="/login" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>{isLoggedIn ? 'Профиль' : 'Войти'}</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
