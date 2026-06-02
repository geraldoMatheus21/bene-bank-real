import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img
        src="/bene_bank_log.png"   /* caminho a partir da pasta public */
        alt="Bené Bank Logo"
        className={styles.logo}
      />
    </header>
  );
};