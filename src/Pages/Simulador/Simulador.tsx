import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import styles from './Simulador.module.css';

export const Simulador = () => {
  const [valor, setValor] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [resultado, setResultado] = useState<{
    valorParcela: number;
    total: number;
    juros: number;
  } | null>(null);
  const [aprovado, setAprovado] = useState<boolean | null>(null);
  const [analisando, setAnalisando] = useState(false);
  const [erro, setErro] = useState('');

  const taxaJuros = 0.035;

  const handleSimular = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setAprovado(null);

    const valorNum = parseFloat(valor);
    const parcelasNum = parseInt(parcelas, 10);

    if (isNaN(valorNum) || valorNum <= 0) {
      setErro('Informe um valor válido.');
      return;
    }
    if (isNaN(parcelasNum) || parcelasNum <= 0) {
      setErro('Informe o número de parcelas.');
      return;
    }

    const i = taxaJuros;
    const n = parcelasNum;
    const valorParcela = (valorNum * i) / (1 - Math.pow(1 + i, -n));
    const total = valorParcela * n;
    const juros = total - valorNum;

    setResultado({ valorParcela, total, juros });
    setAnalisando(true);

    setTimeout(() => {
      setAprovado(Math.random() > 0.5);
      setAnalisando(false);
    }, 2000);
  };

  const formatarMoeda = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Simular Empréstimo</h2>

      <form onSubmit={handleSimular} className={styles.form}>
        <label htmlFor="valor" className={styles.label}>Valor desejado</label>
        <input id="valor" type="number" className={styles.input} value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Ex: 5000" min="0" step="0.01" />

        <label htmlFor="parcelas" className={styles.label}>Número de parcelas</label>
        <input id="parcelas" type="number" className={styles.input} value={parcelas} onChange={(e) => setParcelas(e.target.value)} placeholder="Ex: 12" min="1" max="72" />

        {erro && <p className={styles.erro}>{erro}</p>}

        <Button type="submit" fullWidth disabled={analisando}>
          {analisando ? 'Consultando oráculos...' : 'Simular'}
        </Button>
      </form>

      {resultado && (
        <div className={styles.resultado}>
          <h3>Resultado da Simulação</h3>
          <div className={styles.linha}><span>Valor da parcela:</span><strong>{formatarMoeda(resultado.valorParcela)}</strong></div>
          <div className={styles.linha}><span>Total a pagar:</span><strong>{formatarMoeda(resultado.total)}</strong></div>
          <div className={styles.linha}><span>Total de juros:</span><strong>{formatarMoeda(resultado.juros)}</strong></div>

          {analisando && <p className={styles.analisando}>Consultando oráculos...</p>}

          {aprovado !== null && !analisando && (
            <div className={`${styles.status} ${aprovado ? styles.aprovado : styles.recusado}`}>
              {aprovado ? '✅ Empréstimo Aprovado!' : '❌ Empréstimo Recusado. Tente outro valor.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};