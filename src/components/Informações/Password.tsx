import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './Styles/Password.module.css';
import { validatePasswordStrength } from '../../utils/passwordValidators';

export interface PasswordRef {
  getPassword: () => string;
  isValid: () => boolean;
}

const Password = forwardRef<PasswordRef, {}>((props, ref) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmError, setConfirmError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value) {
      const { errors } = validatePasswordStrength(value);
      setPasswordErrors(errors);
    } else {
      setPasswordErrors([]);
    }
    if (confirmPassword) {
      setConfirmError(value !== confirmPassword ? 'As senhas não coincidem.' : '');
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value && value !== password) {
      setConfirmError('As senhas não coincidem.');
    } else {
      setConfirmError('');
    }
  };

  useImperativeHandle(ref, () => ({
    getPassword: () => password,
    isValid: () =>
      password.length > 0 && passwordErrors.length === 0 &&
      confirmPassword.length > 0 && confirmError === '',
  }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.fieldGroup}>
        <label htmlFor="password" className={styles.label}>Senha:</label>
        <input
          type="password"
          id="password"
          className={`${styles.input} ${password.length > 0 && passwordErrors.length > 0 ? styles.inputError : ''}`}
          value={password}
          onChange={handlePasswordChange}
          placeholder="Digite sua senha"
        />
        {password.length > 0 && passwordErrors.length > 0 && (
          <ul className={styles.errorList}>
            {passwordErrors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        )}
      </div>
      <div className={styles.fieldGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha:</label>
        <input
          type="password"
          id="confirmPassword"
          className={`${styles.input} ${confirmPassword.length > 0 && confirmError ? styles.inputError : ''}`}
          value={confirmPassword}
          onChange={handleConfirmChange}
          placeholder="Repita a senha"
        />
        {confirmPassword.length > 0 && confirmError && (
          <span className={styles.errorMessage}>{confirmError}</span>
        )}
      </div>
    </div>
  );
});

export { Password };