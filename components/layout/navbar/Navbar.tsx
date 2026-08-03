import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          NOROBIN
        </div>

        <nav className={styles.navigation}>
          <a href="#">Solutions</a>
          <a href="#">Case Studies</a>
          <a href="#">Pricing</a>
          <a href="#">Resources</a>
          <a href="#">Contact</a>
        </nav>

        <button className={styles.button}>
          Book Demo
        </button>
      </div>
    </header>
  );
}