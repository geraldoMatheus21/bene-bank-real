import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { cpfMask, isValidCPF } from '../../utils/Validators';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../contexts/AuthContext';

export const Login = () => {
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = cpfMask(e.target.value);
    setCpf(masked);
    if (masked.length === 14) {
      setCpfError(!isValidCPF(masked));
    } else {
      setCpfError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    try {
      setLoginError('');
      // Passa o CPF sem máscara e a senha
      await login(cpf.replace(/\D/g, ''), password);
      // O redirecionamento é feito dentro do login (AuthContext)
    } catch (error: any) {
      setLoginError(error.message || 'Erro ao fazer login.');
    }
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

        {loginError && <p className={styles.errorMessage}>{loginError}</p>}

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