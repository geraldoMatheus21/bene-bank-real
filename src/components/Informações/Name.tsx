import { useState, useEffect } from 'react';
import styles from '../Informações/Styles/Name.module.css';

interface NameProps {
  onValidityChange?: (isValid: boolean) => void;
}

export const Name = ({ onValidityChange }: NameProps) => {
  const [name, setName] = useState('');
  const isValid = name.trim().length >= 2; // pelo menos 2 caracteres

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="name" className={styles.label}>Nome:</label>
      <input
        type="text"
        id="name"
        className={styles.input}
        value={name}
        onChange={handleChange}
        placeholder="Digite seu nome"
      />
    </div>
  );
};