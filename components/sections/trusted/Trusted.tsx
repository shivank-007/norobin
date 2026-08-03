import styles from "./Trusted.module.css";

export default function Trusted() {
  return (
    <section className={styles.trusted}>

      <div className={styles.container}>

        <div className={styles.stat}>
          <h2>48,200+</h2>
          <p>AI Conversations</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.stat}>
          <h2>3,280+</h2>
          <p>Meetings Booked</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.stat}>
          <h2>24/7</h2>
          <p>Automation Running</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.stat}>
          <h2>98%</h2>
          <p>Customer Satisfaction</p>
        </div>

      </div>

    </section>
  );
}