import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { cpfMask, isValidCPF } from '../../utils/Validators'; // ajuste o caminho se necessário
import { Button } from '../../components/Button/Button';

export const Login = () => {
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState(false);
  const [password, setPassword] = useState('');

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = cpfMask(e.target.value);
    setCpf(masked);
    if (masked.length === 14) {
      setCpfError(!isValidCPF(masked));
    } else {
      setCpfError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    console.log('Login com CPF:', cpf.replace(/\D/g, ''));
    // lógica de autenticação aqui
  };

  const isButtonDisabled = cpf.length !== 14 || cpfError || password.trim() === '';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Faça seu Login</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="cpfInput" className={styles.label}>
          Digite seu CPF
        </label>
        <input
          id="cpfInput"
          type="text"
          className={`${styles.input} ${cpfError ? styles.inputError : ''}`}
          value={cpf}
          onChange={handleCPFChange}
          placeholder="000.000.000-00"
          maxLength={14}
        />
        {cpfError && <p className={styles.errorMessage}>CPF inválido</p>}

        <label htmlFor="passwordInput" className={styles.label}>
          Digite sua Senha
        </label>
        <input
          id="passwordInput"
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <Button type="submit" fullWidth disabled={isButtonDisabled}>
          Entrar
        </Button>
      </form>

      <h3 className={styles.registerText}>
        Ainda não tem conta conosco?{' '}
        <Link to="/criar-login" className={styles.registerLink}>
          Cadastre-se
        </Link>
      </h3>

      <p className={styles.forgotPassword}>
        <Link to="/esqueci-senha" className={styles.forgotLink}>
          Esqueci minha senha
        </Link>
      </p>
    </div>
  );
};