import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import styles from './EsqueciSenha.module.css';

export const EsqueciSenha = () => {
  const [cpf, setCpf] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf.trim() === '') return;
    // Aqui você chamaria a API de recuperação
    console.log('Recuperação solicitada para o CPF:', cpf);
    setEnviado(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Esqueci minha senha</h2>

      {!enviado ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <p className={styles.description}>
            Digite seu CPF para receber as instruções de recuperação.
          </p>
          <label htmlFor="cpf" className={styles.label}>CPF</label>
          <input
            id="cpf"
            type="text"
            className={styles.input}
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            maxLength={14}
          />
          <Button type="submit" fullWidth>
            Enviar
          </Button>
        </form>
      ) : (
        <div className={styles.success}>
          <span className={styles.icon}>📧</span>
          <p>Se o CPF estiver cadastrado, você receberá um e-mail com as instruções.</p>
          <Link to="/login" className={styles.link}>
            Voltar ao Login
          </Link>
        </div>
      )}

      {!enviado && (
        <p className={styles.back}>
          <Link to="/login" className={styles.link}>
            ← Voltar ao Login
          </Link>
        </p>
      )}
    </div>
  );
};