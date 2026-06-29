import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './Styles/Name.module.css';

export interface NameRef {
  getValue: () => string;
  isValid: () => boolean;
}

const Name = forwardRef<NameRef, {}>((props, ref) => {
  const [name, setName] = useState('');

  useImperativeHandle(ref, () => ({
    getValue: () => name,
    isValid: () => name.trim().length >= 2,
  }));

  return (
    <div className={styles.wrapper}>
      <label htmlFor="name" className={styles.label}>Nome:</label>
      <input
        type="text"
        id="name"
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome"
      />
    </div>
  );
});

export { Name };