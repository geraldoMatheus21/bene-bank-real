import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './Styles/DataNascimento.module.css';
import { validateBirthDate } from '../../utils/dateValidators';

export interface DataNascimentoRef {
  getValue: () => string;
  isValid: () => boolean;
}

const DataNascimento = forwardRef<DataNascimentoRef, {}>((props, ref) => {
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

  useImperativeHandle(ref, () => ({
    getValue: () => dataNascimento,
    isValid: () => dataNascimento !== '' && error === '',
  }));

  return (
    <div className={styles.wrapper}>
      <label htmlFor="dataNascimento" className={styles.label}>Data de Nascimento:</label>
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
});

export { DataNascimento };