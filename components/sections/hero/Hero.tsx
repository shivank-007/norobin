"use client";

import styles from "./Hero.module.css";
import Image from "next/image";
import { useWorkforce } from "@/context/WorkforceContext";
import { employeesData } from "@/lib/ai/employees";

export default function Hero() {
  const { deployedEmployees, activeDemoEmployeeId, setActiveDemoEmployee, tasksCompleted } = useWorkforce();
  
  // Show deployed employees if any, otherwise default to all for the hero showcase
  const dashboardEmployees = deployedEmployees.length > 0 ? deployedEmployees : employeesData;
  const metricsTasks = tasksCompleted;

  const handleSelectEmployee = (id: string) => {
    setActiveDemoEmployee(id);
    document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.gridBackground} />
      <div className={styles.heroGlow} />

      <div className={styles.container}>
        {/* LEFT SIDE */}
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            AI WORKFORCE FOR MODERN BUSINESSES
          </div>

          <h1 id="hero-title" className={styles.title}>
            Build a workforce that <span className={styles.titleAccent}>never</span> clocks out.
          </h1>

          <p className={styles.description}>
            NOROBIN builds AI employees that answer customers, qualify leads, book appointments, handle calls and run repetitive operations — around the clock.
          </p>

          <div className={styles.buttons}>
            <a href="#selector" className={styles.primaryButton}>
              <span>Build My AI Workforce</span>
              <span className={styles.buttonIcon} aria-hidden="true">→</span>
            </a>

            <a href="#ai-employee-types" className={styles.secondaryButton}>
              <span>Meet the Employees</span>
            </a>
          </div>

          <div className={styles.socialProof}>
            <div className={styles.avatarPile}>
              {employeesData.map(emp => (
                <div key={emp.id} className={styles.pileAvatar}>
                  <Image src={emp.avatar} alt={emp.name} width={32} height={32} style={{borderRadius: '50%'}} />
                </div>
              ))}
            </div>
            <span>Early businesses building their workforce with NOROBIN</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.visual}>
          <div className={styles.workforceHeader}>
            <div className={styles.workforceTitle}>
              <span className={styles.checkIcon}>✓</span> NOROBIN WORKFORCE
            </div>
            <div className={styles.workforceStatus}>
              <span className={styles.statusDot} /> {deployedEmployees.length > 0 ? 'WORKFORCE ACTIVE' : 'AWAITING DEPLOYMENT'}
            </div>
          </div>

          <div className={styles.employeeGrid}>
            {dashboardEmployees.map(emp => (
              <div 
                key={emp.id} 
                className={`${styles.employeeCard} ${activeDemoEmployeeId === emp.id ? styles.activeCard : ''}`}
                onClick={() => handleSelectEmployee(emp.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.avatarPlaceholder}>
                    <Image src={emp.avatar} alt={emp.name} width={48} height={48} className={styles.avatarImage} />
                  </div>
                  <div className={styles.identity}>
                    <strong>{emp.name.toUpperCase()}</strong>
                    <span>{emp.role}</span>
                  </div>
                </div>
                <p className={styles.taskDescription}>{emp.description}</p>
                <div className={styles.metrics}>
                  <div className={styles.metric}>
                    <strong>{emp.id === 'maya' ? 42 : emp.id === 'alex' ? 18 : emp.id === 'aria' ? 7 : 14}</strong>
                    <span>{emp.id === 'maya' ? 'Conversations' : emp.id === 'alex' ? 'Leads Qualified' : emp.id === 'aria' ? 'Calls Handled' : 'Workflows'}</span>
                  </div>
                  <div className={styles.metric}>
                    <strong>{emp.id === 'maya' ? 31 : emp.id === 'alex' ? 6 : emp.id === 'aria' ? 5 : metricsTasks}</strong>
                    <span>{emp.id === 'maya' ? 'Resolved' : emp.id === 'alex' ? 'Meetings Booked' : emp.id === 'aria' ? 'Appointments' : 'Tasks Completed'}</span>
                  </div>
                </div>
                <div className={styles.statusBadge}><span className={styles.pulseDot} /> {emp.status.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}