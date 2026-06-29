import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Bené Bank</h1>
      <p className={styles.subtitle}>
        Empréstimos justos, taxas transparentes, 100% digital.
      </p>
      <div className={styles.actions}>
        <Link to="/login" className={styles.btnPrimary}>
          Fazer Login
        </Link>
        <Link to="/criar-login" className={styles.btnSecondary}>
          Criar Conta
        </Link>
      </div>
    </div>
  );
};