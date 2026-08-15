import styles from "./Features.module.css";
import { Cpu, Maximize, Clock } from "lucide-react";

export default function Features() {
  return (
    <section className={styles.section} aria-labelledby="features-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="features-title">The Norobin Difference</h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Cpu size={24} />
            </div>
            <h3>Fully Autonomous</h3>
            <p>Our employees don&apos;t just generate text. They execute tasks, use software, and complete workflows without human intervention.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Maximize size={24} />
            </div>
            <h3>Seamless Integration</h3>
            <p>We connect directly to your existing tools. No complex migrations or new platforms to learn.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Clock size={24} />
            </div>
            <h3>24/7 Execution</h3>
            <p>Your workforce never sleeps, never takes a break, and always delivers consistent results around the clock.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
