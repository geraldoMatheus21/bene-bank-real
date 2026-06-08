export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Valida a força da senha:
 * - Mínimo 8 caracteres
 * - Pelo menos 1 letra maiúscula
 * - Pelo menos 1 letra minúscula
 * - Pelo menos 1 número
 * - Pelo menos 1 caractere especial (!@#$%^&*(),.?":{}|<> etc.)
 */
export const validatePasswordStrength = (password: string): PasswordValidationResult => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Mínimo de 8 caracteres.');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Pelo menos 1 letra maiúscula.');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Pelo menos 1 letra minúscula.');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Pelo menos 1 número.');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Pelo menos 1 caractere especial.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};