interface DateValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Valida se a data de nascimento é aceitável:
 * - Ano não pode ser antes de 1900
 * - Usuário deve ter 18 anos ou mais
 */
export const validateBirthDate = (dateString: string): DateValidationResult => {
  if (!dateString) {
    return { valid: false, error: 'Informe uma data.' };
  }

  const birthDate = new Date(dateString + 'T00:00:00'); // evita fuso
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Verifica se a data é válida
  if (isNaN(birthDate.getTime())) {
    return { valid: false, error: 'Data inválida.' };
  }

  // Ano mínimo (ajuste se quiser)
  const minYear = 1900;
  if (birthDate.getFullYear() < minYear) {
    return { valid: false, error: `Ano deve ser a partir de ${minYear}.` };
  }

  // Data não pode ser no futuro
  if (birthDate > today) {
    return { valid: false, error: 'Data não pode ser no futuro.' };
  }

  // Calcula idade
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age < 18) {
    return { valid: false, error: 'Você deve ter pelo menos 18 anos.' };
  }

  return { valid: true };
};