import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>

      <div className={styles.topRow}>

        <div className={styles.metricCard}>
          <span className={styles.label}>Revenue Today</span>
          <h2>$12,480</h2>
          <p className={styles.success}>+34% today</p>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.label}>AI Agents</span>
          <h2>08</h2>
          <p className={styles.online}>Running</p>
        </div>

      </div>

      <div className={styles.middleCard}>

        <div className={styles.chatHeader}>
          <span>Website Chatbot</span>
          <span className={styles.onlineDot}></span>
        </div>

        <div className={styles.messages}>

          <div className={styles.user}>
            I need pricing.
          </div>

          <div className={styles.bot}>
            Sure. Let me prepare a proposal.
          </div>

          <div className={styles.user}>
            Book me tomorrow.
          </div>

          <div className={styles.bot}>
            Meeting booked successfully.
          </div>

        </div>

      </div>

      <div className={styles.bottomRow}>

        <div className={styles.smallCard}>
          <span>WhatsApp</span>
          <strong>128 Leads</strong>
        </div>

        <div className={styles.smallCard}>
          <span>Voice Agent</span>
          <strong>Online</strong>
        </div>

        <div className={styles.smallCard}>
          <span>Automation</span>
          <strong>Running</strong>
        </div>

      </div>

    </div>
  );
}

