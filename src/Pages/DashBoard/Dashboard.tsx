import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/Button/Button';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo(a), {user?.nome}!</h1>
      <p className={styles.text}>Seu CPF: {user?.cpf}</p>
      <p className={styles.text}>Email: {user?.email}</p>
      <Button variant="secondary" onClick={logout} fullWidth>
        Sair
      </Button>
    </div>
  );
};