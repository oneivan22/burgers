// Компонент подвала сайта — стиль BK Russia

import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Колонки */}
        <div className={styles.footerGrid}>
          {/* О компании */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>О компании</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/about" className={styles.link}>О нас</a></li>
              <li><a href="/history" className={styles.link}>История бренда</a></li>
              <li><a href="/locations" className={styles.link}>Рестораны</a></li>
              <li><a href="/franchise" className={styles.link}>Франшиза</a></li>
            </ul>
          </div>

          {/* Помощь */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Помощь</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/faq" className={styles.link}>Вопросы и ответы</a></li>
              <li><a href="/contacts" className={styles.link}>Контакты</a></li>
              <li><a href="/feedback" className={styles.link}>Обратная связь</a></li>
              <li><a href="/delivery" className={styles.link}>Доставка</a></li>
            </ul>
          </div>

          {/* Правовая информация */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Правовая информация</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/terms" className={styles.link}>Пользовательское соглашение</a></li>
              <li><a href="/privacy" className={styles.link}>Политика конфиденциальности</a></li>
              <li><a href="/cookies" className={styles.link}>Политика cookies</a></li>
              <li><a href="/offer" className={styles.link}>Публичная оферта</a></li>
            </ul>
          </div>

          {/* Соцсети и контакты */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Мы в соцсетях</h3>
            <div className={styles.socialLinks}>
              <a href="https://vk.com/burgerkingrus" className={styles.socialLink} target="_blank" rel="noopener noreferrer" title="ВКонтакте">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.39 12.51c.5.49.98 1.02 1.53 1.47.27.22.52.44.72.72.27.36.24.75-.03 1.08-.26.32-.6.38-.96.38h-1.96c-.52 0-.94-.18-1.3-.54-.42-.42-.82-.87-1.24-1.3-.16-.16-.34-.3-.54-.38-.26-.1-.46-.02-.58.22-.12.26-.14.54-.16.82-.04.54-.22.72-.76.76-.86.06-1.68-.06-2.44-.5-1.14-.66-1.96-1.6-2.66-2.64-1.1-1.64-1.76-3.44-2.24-5.34-.1-.4.02-.64.44-.66h1.96c.34 0 .56.2.66.54.38 1.26.92 2.44 1.68 3.5.16.22.34.44.56.54.18.08.34.02.42-.16.08-.2.1-.42.1-.64V8.58c0-.52-.16-.68-.68-.74-.26-.02-.22-.14-.1-.28.2-.24.62-.46 1.36-.48.62-.02.92.22 1.04.72.04.16.06.34.06.52v3.06c0 .26.12.42.32.46.26.06.46-.08.64-.26.6-.62 1.04-1.36 1.44-2.14.16-.32.3-.66.44-1 .08-.2.24-.32.46-.32h1.96c.52 0 .68.26.56.76-.24.96-.7 1.82-1.26 2.64-.36.52-.76 1-1.16 1.48-.24.28-.24.44 0 .72z"/>
                </svg>
              </a>
              <a href="https://t.me/burgerkingrus" className={styles.socialLink} target="_blank" rel="noopener noreferrer" title="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.28-.02-.12.02-2.02 1.28-5.69 3.77-.54.37-1.03.55-1.47.54-.48-.01-1.41-.27-2.1-.5-.85-.28-1.52-.43-1.46-.9.03-.25.38-.5 1.04-.76 4.09-1.78 6.82-2.96 8.19-3.53 3.9-1.62 4.71-1.9 5.24-1.91.12 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/user/BurgerKingRus" className={styles.socialLink} target="_blank" rel="noopener noreferrer" title="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.54 7.2s-.16-1.14-.66-1.64c-.62-.66-1.32-.66-1.64-.7C16.86 4.6 12 4.6 12 4.6s-4.86 0-7.24.26c-.32.04-1.02.04-1.64.7-.5.5-.66 1.64-.66 1.64S2.2 8.56 2.2 9.92v1.28c0 1.36.26 2.72.26 2.72s.16 1.14.66 1.64c.62.66 1.44.64 1.82.7 1.32.14 7.06.26 7.06.26s4.88-.02 7.26-.28c.32-.04 1.02-.04 1.64-.7.5-.5.66-1.64.66-1.64s.26-1.36.26-2.72V9.92c0-1.36-.26-2.72-.26-2.72zM10.4 13.2V8.8l4.8 2.2-4.8 2.2z"/>
                </svg>
              </a>
            </div>

            <div className={styles.contactInfo}>
              <p className={styles.phone}>8-800-300-70-70</p>
              <p className={styles.phoneNote}>Бесплатно по России</p>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© 2025 Burger King Russia. Все права защищены.</p>
          <p className={styles.legal}>Это учебный проект, не является официальным сайтом.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
