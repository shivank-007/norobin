import styles from "./Trusted.module.css";

const logos = [
  "Acme Corp",
  "Quantum",
  "Echo",
  "Celestia",
  "Pulse",
  "Nexus"
];

export default function Trusted() {
  return (
    <section className={styles.section} aria-label="Trusted by innovative teams">
      <div className={styles.container}>
        <p className={styles.heading}>Trusted by innovative teams</p>
        <div className={styles.logoGrid}>
          {logos.map((logo) => (
            <div key={logo} className={styles.logoWrapper}>
              <span className={styles.logoText}>{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
