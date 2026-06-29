import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Name, NameRef } from '../../components/Informações/Name';
import { CadastroCPF, CadastroCPFRef } from '../../components/Informações/CadastroCPF';
import { DataNascimento, DataNascimentoRef } from '../../components/Informações/DataNascimento';
import { Password, PasswordRef } from '../../components/Informações/Password';
import { Button } from '../../components/Button/Button';
import { cadastrar } from '../../api';
import styles from './CriarLogin.module.css';

function CriarLogin() {
  const nameRef = useRef<NameRef>(null);
  const cpfRef = useRef<CadastroCPFRef>(null);
  const dataRef = useRef<DataNascimentoRef>(null);
  const passwordRef = useRef<PasswordRef>(null);

  const navigate = useNavigate();
  const [cadastroError, setCadastroError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = nameRef.current?.isValid() ?? false;
    const isCPFValid = cpfRef.current?.isValid() ?? false;
    const isBirthDateValid = dataRef.current?.isValid() ?? false;
    const isPasswordValid = passwordRef.current?.isValid() ?? false;

    if (!isNameValid || !isCPFValid || !isBirthDateValid || !isPasswordValid) {
      setCadastroError('Preencha todos os campos corretamente.');
      return;
    }

    setLoading(true);
    setCadastroError('');

    try {
      await cadastrar({
        nome: nameRef.current!.getValue(),
        cpf: cpfRef.current!.getValue(),
        dataNascimento: dataRef.current!.getValue(),
        email: 'email@exemplo.com', // ainda fixo; depois pode adicionar campo de email
        senha: passwordRef.current!.getPassword(),
      });
      navigate('/conta-criada');
    } catch (error: any) {
      setCadastroError(error.message || 'Erro ao cadastrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Criar Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Name ref={nameRef} />
        <CadastroCPF ref={cpfRef} />
        <DataNascimento ref={dataRef} />
        <Password ref={passwordRef} />
        {cadastroError && <p className={styles.errorMessage}>{cadastroError}</p>}
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Salvando...' : 'Criar Login'}
        </Button>
      </form>
    </div>
  );
}

export default CriarLogin;