import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './Styles/CadastroCPF.module.css';
import { cpfMask, isValidCPF } from '../../utils/Validators';

export interface CadastroCPFRef {
  getValue: () => string;
  isValid: () => boolean;
}

const CadastroCPF = forwardRef<CadastroCPFRef, {}>((props, ref) => {
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = cpfMask(e.target.value);
    setCpf(masked);
    if (masked.length === 14) {
      setError(!isValidCPF(masked));
    } else {
      setError(false);
    }
  };

  useImperativeHandle(ref, () => ({
    getValue: () => cpf.replace(/\D/g, ''),
    isValid: () => cpf.length === 14 && !error,
  }));

  return (
    <div className={styles.wrapper}>
      <label htmlFor="cpf" className={styles.label}>CPF:</label>
      <input
        type="text"
        id="cpf"
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        value={cpf}
        onChange={handleChange}
        placeholder="000.000.000-00"
        maxLength={14}
      />
      {error && <span className={styles.errorMessage}>CPF inválido</span>}
    </div>
  );
});

export { CadastroCPF };