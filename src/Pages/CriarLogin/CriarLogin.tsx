import { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { CadastroCPF } from '../../components/Informações/CadastroCPF';
import { Name } from '../../components/Informações/Name';
import { DataNascimento } from '../../components/Informações/DataNascimento';
import { Password } from '../../components/Informações/Password';
import { Button } from '../../components/Button/Button';
import styles from './CriarLogin.module.css';

function CriarLogin() {
  // Estados de validade de cada campo
  const [isNameValid, setIsNameValid] = useState(false);
  const [isCPFValid, setIsCPFValid] = useState(false);
  const [isBirthDateValid, setIsBirthDateValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Validade geral do formulário
  const allValid = isNameValid && isCPFValid && isBirthDateValid && isPasswordValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    console.log('Formulário válido. Enviar dados...');
    // Aqui você pode coletar os dados posteriormente
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h2>Criar Login</h2>
        {<form className={styles.form} onSubmit={handleSubmit}>
          <Name onValidityChange={setIsNameValid} />
          <CadastroCPF onValidityChange={setIsCPFValid} />
          <DataNascimento onValidityChange={setIsBirthDateValid} />
          <Password onValidityChange={setIsPasswordValid} />
          <Button type="submit" fullWidth disabled={!allValid}>
            Criar Login
          </Button>
        </form>}
      </div>
    </Layout>
  );
}

export default CriarLogin;