import styles from './Footer.module.css'; // <-- Importação correta

export const Footer = () => {
  return (
    <footer className={styles.footer}> 
      <p>&copy; 2026 Bené Bank. All rights reserved.</p>
    </footer>
  )
}