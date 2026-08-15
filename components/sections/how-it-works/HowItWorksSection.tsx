import styles from "./HowItWorksSection.module.css";
import { User, Bot, Server, Users } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className={styles.section} aria-labelledby="howitworks-title">
      <div className={styles.container}>
        <div className={styles.leftCol}>
          <div className={styles.eyebrow}>HOW AI EMPLOYEES WORK</div>
          <h2 id="howitworks-title" className={styles.title}>AI employees don't work alone.</h2>
          <p className={styles.desc}>Our autonomous agents seamlessly integrate with your existing workflows, bridging the gap between your customers, systems, and human team.</p>
          <button className={styles.ctaButton}>See How It Works</button>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.diagram}>
            <div className={styles.node}>
              <User size={24} />
              <span>Customer</span>
            </div>
            
            <div className={styles.arrow}>→</div>

            <div className={styles.nodeMain}>
              <Bot size={32} />
              <span>AI Employee</span>
            </div>
            
            <div className={styles.arrow}>→</div>

            <div className={styles.systemsStack}>
              <div className={styles.nodeSmall}>
                <Server size={16} />
                <span>CRM</span>
              </div>
              <div className={styles.nodeSmall}>
                <Server size={16} />
                <span>Email</span>
              </div>
            </div>

            <div className={styles.arrow}>→</div>

            <div className={styles.node}>
              <Users size={24} />
              <span>Human Team</span>
            </div>
            
            {/* Feedback loop */}
            <div className={styles.feedbackLoop}>
              <svg width="100%" height="100%" preserveAspectRatio="none">
                <path d="M 0,20 C 50,-20 150,-20 200,20" stroke="var(--primary)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              </svg>
              <div className={styles.feedbackText}>Learns & improves continuously</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
