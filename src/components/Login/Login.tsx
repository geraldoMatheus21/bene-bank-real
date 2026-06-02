import { useState } from 'react';
import styles from './Login.module.css';

// Máscara de CPF (mantida a sua)
const cpfMask = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

// Validação de CPF (mantida a sua)
const isValidCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[9])) return false;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Se chegou aqui, o CPF é válido (pois o botão só fica ativo se válido)
    console.log('Login com CPF:', cpf);
    // Adicione sua lógica de autenticação aqui
  };

  // Botão só habilita se CPF tiver 14 dígitos E for válido
  const isButtonDisabled = cpf.length < 14 || cpfError;

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
          placeholder="••••••••"
        />

        <button 
          className={styles.button} 
          type="submit"
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? 'Login' : 'Login'}
        </button>
      </form>

      <h3 className={styles.registerText}>
        Ainda não tem conta conosco?{' '}
        <a href="/register" className={styles.registerLink}>
          Cadastre-se
        </a>
      </h3>
    </div>
  );
};