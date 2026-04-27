// Компонент ошибки — показывает сообщение об ошибке и кнопку "Повторить"

import styles from './ErrorMessage.module.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.error}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.message}>{message || 'Произошла ошибка. Попробуйте ещё раз.'}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
