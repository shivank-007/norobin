import styles from "./Hero.module.css";
import Dashboard from "@/components/shared/dashboard/Dashboard";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>

        {/* Left Content */}

        <div className={styles.content}>

          <div className={styles.badge}>
            AI Automation Agency
          </div>

          <h1 className={styles.title}>
            Automate your
            business with
            intelligent AI.
          </h1>

          <p className={styles.description}>
            We design AI systems that answer customers, qualify leads,
            book appointments and automate operations—so your team can
            focus on growth instead of repetitive work.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryButton}>
              Book Demo
            </button>

            <button className={styles.secondaryButton}>
              View Live Demos
            </button>
          </div>

          <div className={styles.features}>
            <span>✓ AI Chatbots</span>
            <span>✓ WhatsApp AI</span>
            <span>✓ Voice Agents</span>
            <span>✓ Workflow Automation</span>
          </div>

        </div>

        {/* Right Side */}

        <div className={styles.visual}>

          <Dashboard />

        </div>

      </div>
    </section>
  );
}