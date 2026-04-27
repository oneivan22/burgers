// Страница авторизации
// Простая форма с логином и паролем
// Без реальной аутентификации — просто сохраняем в localStorage

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

function LoginPage() {
  // Состояния для полей формы
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Навигация для редиректа после входа
  const navigate = useNavigate();

  // При монтировании проверяем, может уже залогинен
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('bk-isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/'); // Если уже залогинен — на главную
    }
  }, [navigate]);

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault(); // Чтобы страница не перезагружалась

    // Простая валидация
    if (!login.trim()) {
      setError('Введите логин');
      return;
    }
    if (!password.trim()) {
      setError('Введите пароль');
      return;
    }

    // Имитируем запрос к серверу
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Просто сохраняем в localStorage — без проверки пароля
      localStorage.setItem('bk-isLoggedIn', 'true');
      localStorage.setItem('bk-userLogin', login);

      setIsLoading(false);

      // Показываем сообщение и переходим на главную
      alert(`Добро пожаловать, ${login}!`);
      navigate('/');
    }, 1000); // Задержка 1 секунду
  }

  return (
    <main className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.loginCard}>
          {/* Заголовок */}
          <h1 className={styles.title}>Вход в аккаунт</h1>
          <p className={styles.subtitle}>Введите свои данные для входа</p>

          {/* Форма */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Поле логина */}
            <div className={styles.field}>
              <label htmlFor="login" className={styles.label}>
                Логин
              </label>
              <input
                id="login"
                type="text"
                className={styles.input}
                placeholder="Введите логин"
                value={login}
                onChange={e => setLogin(e.target.value)}
              />
            </div>

            {/* Поле пароля */}
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Пароль
              </label>
              <input
                id="password"
                type="password"
                className={styles.input}
                placeholder="Введите пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {/* Сообщение об ошибке */}
            {error && (
              <div className={styles.errorMsg}>{error}</div>
            )}

            {/* Кнопка входа */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          {/* Ссылка назад */}
          <div className={styles.backSection}>
            <a href="/" className={styles.backLink}>
              ← Вернуться на главную
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
