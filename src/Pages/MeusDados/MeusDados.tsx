import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import styles from './MeusDados.module.css';

export const MeusDados = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Meus Dados</h2>

      <div className={styles.card}>
        <div className={styles.item}>
          <span className={styles.label}>Nome completo</span>
          <span className={styles.value}>{user.nome}</span>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>CPF</span>
          <span className={styles.value}>{user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</span>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>Data de nascimento</span>
          <span className={styles.value}>{user.dataNascimento}</span>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>E-mail</span>
          <span className={styles.value}>{user.email}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Link to="/dashboard" className={styles.link}>
          <Button variant="secondary" fullWidth>Voltar ao Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};