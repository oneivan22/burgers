// Компонент загрузки — показывает спиннер когда данные грузятся

import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Загрузка...</p>
    </div>
  );
}

export default Loader;
