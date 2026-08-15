import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className={styles.glow} />

      <div className={styles.grid} />

      <div className={styles.container}>
        <span className={styles.kicker}>
          START BUILDING
        </span>

        <h2 id="cta-title">
          Who should be your first <span className={styles.accent}>AI employee?</span>
        </h2>

        <p className={styles.description}>
          Get started with NOROBIN today and build a workforce that never sleeps, never complains, and always delivers.
        </p>

        <div className={styles.actions}>
          <a
            href="#builder"
            className={styles.primaryButton}
          >
            Build My AI Workforce
            <span aria-hidden="true">→</span>
          </a>

          <a
            href="#employees"
            className={styles.secondaryButton}
          >
            Meet the Employees
          </a>
        </div>

        <div className={styles.meta}>
          <span>
            <i />
            24 / 7 operations
          </span>

          <span>
            <i />
            AI employees
          </span>

          <span>
            <i />
            Built for your business
          </span>
        </div>
      </div>
    </section>
  );
}