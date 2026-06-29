import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContaCriada.module.css';

export const ContaCriada = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // redireciona para o login após 3 segundos
    }, 3000);

    return () => clearTimeout(timer); // limpa o timer se o componente desmontar
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.icon}>✅</span>
        <h1 className={styles.title}>Conta criada com sucesso!</h1>
        <p className={styles.text}>Você será redirecionado para a página de login em instantes...</p>
      </div>
    </div>
  );
};