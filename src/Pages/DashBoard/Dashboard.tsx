import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const agora = new Date();
  const ultimoAcesso = agora.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Saldo mockado (depois virá da API)
  const saldo = 2500.75;

  return (
    <div className={styles.container}>
      {/* Cabeçalho de boas-vindas */}
      <div className={styles.welcome}>
        <h1 className={styles.greeting}>Olá, {user?.nome?.split(' ')[0]}!</h1>
        <p className={styles.lastAccess}>Último acesso: {ultimoAcesso}</p>
      </div>

      {/* Card de Saldo */}
      <div className={styles.saldoCard}>
        <span className={styles.saldoLabel}>Saldo disponível</span>
        <span className={styles.saldoValue}>
          {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>

      {/* Ações rápidas */}
      <div className={styles.actions}>
        <Link to="/simulador" className={styles.actionLink}>
          <Button fullWidth>Simular Empréstimo</Button>
        </Link>
        <Link to="/extrato" className={styles.actionLink}>
          <Button variant="secondary" fullWidth>Extrato</Button>
        </Link>
        <Link to="/meus-dados" className={styles.actionLink}>
          <Button variant="secondary" fullWidth>Meus Dados</Button>
        </Link>
      </div>

      {/* Botão Sair */}
      <div className={styles.logoutArea}>
        <Button variant="secondary" onClick={logout} fullWidth>
          Sair da conta
        </Button>
      </div>
    </div>
  );
};