import styles from './Extrato.module.css';

const transacoesMock = [
  { id: 1, descricao: 'Depósito recebido', valor: 500.0, data: '22/06/2025', tipo: 'entrada' as const },
  { id: 2, descricao: 'Pagamento de boleto', valor: -150.0, data: '20/06/2025', tipo: 'saida' as const },
  { id: 3, descricao: 'Transferência recebida', valor: 200.0, data: '18/06/2025', tipo: 'entrada' as const },
  { id: 4, descricao: 'Saque ATM', valor: -80.0, data: '15/06/2025', tipo: 'saida' as const },
  { id: 5, descricao: 'Rendimento da conta', valor: 12.5, data: '10/06/2025', tipo: 'entrada' as const },
];

export const Extrato = () => {
  const formatarMoeda = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Extrato</h2>
      <ul className={styles.lista}>
        {transacoesMock.map((t) => (
          <li key={t.id} className={styles.item}>
            <div className={styles.info}>
              <span className={styles.descricao}>{t.descricao}</span>
              <span className={styles.data}>{t.data}</span>
            </div>
            <span className={`${styles.valor} ${t.tipo === 'entrada' ? styles.entrada : styles.saida}`}>
              {formatarMoeda(t.valor)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};