import { useState } from 'react';
import styles from './Login.module.css';

// Máscara de CPF
const cpfMask = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

// Algoritmo de validação do CPF (dígitos verificadores)
const isValidCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  // Verificar se todos os dígitos são iguais (ex.: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(digits)) return false;

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[9])) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[10])) return false;

  return true;
};

export const Login = () => {
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState(false);

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = cpfMask(e.target.value);
    setCpf(masked);
    // Só valida quando o campo estiver com 14 caracteres (máscara completa)
    if (masked.length === 14) {
      setCpfError(!isValidCPF(masked));
    } else {
      setCpfError(false); // limpa erro enquanto digita
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Faça seu Login</h2>

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
      <input id="passwordInput" type="password" className={styles.input} />

      <button className={styles.button}>Login</button>

      <h3 className={styles.registerText}>
        Ainda não tem conta conosco?{' '}
        <a href="/register" className={styles.registerLink}>
          Cadastre-se
        </a>
      </h3>
    </div>
  );
};