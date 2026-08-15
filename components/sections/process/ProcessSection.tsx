"use client";

import { useState } from "react";
import styles from "./ProcessSection.module.css";

const steps = [
  { num: "1", title: "Discover", desc: "We map out your current workflows." },
  { num: "2", title: "Design", desc: "We structure the AI employee's logic." },
  { num: "3", title: "Connect", desc: "We integrate with your existing tools." },
  { num: "4", title: "Deploy", desc: "Your new employee goes live." },
  { num: "5", title: "Optimize", desc: "Continuous learning and improvement." }
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className={styles.section} aria-labelledby="process-title">
      <div className={styles.container}>
        <div className={styles.leftCol}>
          <div className={styles.eyebrow}>OUR PROCESS</div>
          <h2 id="process-title" className={styles.title}>From idea to intelligent workforce.</h2>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.stepsContainer}>
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div 
                  key={step.num} 
                  className={`${styles.step} ${isActive ? styles.activeStep : ""}`}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className={styles.stepHeader}>
                    <div className={`${styles.circle} ${isActive ? styles.activeCircle : ""}`}>{step.num}</div>
                    {index !== steps.length - 1 && <div className={`${styles.line} ${isActive ? styles.activeLine : ""}`} />}
                  </div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
