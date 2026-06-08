import { useState, useEffect } from 'react';
import styles from '../Informações/Styles/DataNascimento.module.css';
import { validateBirthDate } from '../../utils/dateValidators'; // ajuste o caminho se necessário

interface DataNascimentoProps {
  onValidityChange?: (isValid: boolean) => void;
}

export const DataNascimento = ({ onValidityChange }: DataNascimentoProps) => {
  const [dataNascimento, setDataNascimento] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDataNascimento(value);
    if (value) {
      const result = validateBirthDate(value);
      setError(result.valid ? '' : result.error || '');
    } else {
      setError('');
    }
  };

  // A validade é verdadeira se a data foi preenchida e não há erro
  const isValid = dataNascimento !== '' && error === '';

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="dataNascimento" className={styles.label}>
        Data de Nascimento:
      </label>
      <input
        type="date"
        id="dataNascimento"
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        value={dataNascimento}
        onChange={handleChange}
        min="1900-01-01"
        max={new Date().toISOString().split('T')[0]}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};