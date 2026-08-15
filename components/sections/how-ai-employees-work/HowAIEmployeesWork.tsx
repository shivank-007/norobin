"use client";

import { useState } from "react";
import styles from "./HowAIEmployeesWork.module.css";

const steps = [
  {
    number: "01",
    title: "Configure",
    description:
      "Give your AI employee a role, instructions, knowledge, and the tools it needs to operate.",
    label: "ROLE + KNOWLEDGE",
  },
  {
    number: "02",
    title: "Learn",
    description:
      "NOROBIN gives the employee the context required to understand your business and workflows.",
    label: "CONTEXT + TRAINING",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "Your AI employee starts handling real conversations, tasks, leads, calls, and operations.",
    label: "24 / 7 EXECUTION",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Performance data reveals what is working so your workforce continuously gets better.",
    label: "DATA + OPTIMIZATION",
  },
];

export default function HowAIEmployeesWork() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id="how-ai-employees-work"
      className={styles.section}
      aria-labelledby="how-ai-title"
    >
      <div className={styles.glow} />

      <div className={styles.container}>
        {/* HEADER */}

        <div className={styles.header}>
          <div>
            <span className={styles.kicker}>
              HOW IT WORKS
            </span>

            <h2 id="how-ai-title">
              From instructions
              <span>to execution.</span>
            </h2>
          </div>

          <p>
            NOROBIN turns your business requirements into
            AI employees that can understand context,
            make decisions, and execute work continuously.
          </p>
        </div>

        {/* WORKFLOW */}

        <div className={styles.workflow}>
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <div
                key={step.number}
                className={`${styles.step} ${isActive ? styles.activeStep : ""}`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className={styles.stepTop}>
                  <span className={styles.number}>
                    {step.number}
                  </span>

                  <span className={styles.label}>
                    {step.label}
                  </span>
                </div>

                <div className={styles.iconBox}>
                  <span>
                    {index === 0 && "⌘"}
                    {index === 1 && "◉"}
                    {index === 2 && "↗"}
                    {index === 3 && "↻"}
                  </span>
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                {index < steps.length - 1 && (
                  <div
                    className={`${styles.connector} ${isActive ? styles.activeConnector : ""}`}
                    aria-hidden="true"
                  >
                    <span />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM SYSTEM PANEL */}

        <div className={styles.systemPanel}>
          <div className={styles.systemLeft}>
            <div className={styles.liveIndicator}>
              <span />
              NOROBIN WORKFORCE ENGINE
            </div>

            <strong>
              One system.
              <span>Multiple AI employees.</span>
            </strong>
          </div>

          <div className={styles.systemRight}>
            <div>
              <span>AVAILABILITY</span>
              <strong>24 / 7</strong>
            </div>

            <div>
              <span>RESPONSE</span>
              <strong>INSTANT</strong>
            </div>

            <div>
              <span>SCALABILITY</span>
              <strong>ON DEMAND</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}