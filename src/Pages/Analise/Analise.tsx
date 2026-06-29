import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import styles from './Analise.module.css';

export const Analise = () => {
  const [resultado, setResultado] = useState<'aprovado' | 'recusado' | null>(null);
  const [sorteando, setSorteando] = useState(false);

  const handleSolicitar = () => {
    if (sorteando) return;
    setSorteando(true);
    setResultado(null);

    setTimeout(() => {
      const aprovado = Math.random() > 0.5;
      setResultado(aprovado ? 'aprovado' : 'recusado');
      setSorteando(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Análise de Crédito</h2>
      <p className={styles.description}>
        Nosso sistema de análise usará <strong>inteligência artificial</strong> para avaliar seu perfil.
        <br />
        <small>(Na verdade, é uma moeda mágica, mas ninguém precisa saber.)</small>
      </p>
      <Button onClick={handleSolicitar} disabled={sorteando} fullWidth>
        {sorteando ? 'Analisando...' : 'Solicitar Análise'}
      </Button>

      {sorteando && <p className={styles.loading}>Consultando os oráculos...</p>}

      {resultado && (
        <div
          className={`${styles.resultado} ${
            resultado === 'aprovado' ? styles.aprovado : styles.recusado
          }`}
        >
          {resultado === 'aprovado' ? '🎉 Crédito Aprovado!' : '😞 Crédito Recusado'}
        </div>
      )}
    </div>
  );
};