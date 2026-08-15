"use client";

import styles from "./AIEmployeeTypes.module.css";
import Image from "next/image";
import { MessageCircle, BarChart3, Phone, Zap } from "lucide-react";
import { employeesData } from "@/lib/ai/employees";
import { useWorkforce } from "@/context/WorkforceContext";

const getIconForEmp = (id: string) => {
  switch (id) {
    case "maya": return MessageCircle;
    case "alex": return BarChart3;
    case "aria": return Phone;
    case "nova": return Zap;
    default: return MessageCircle;
  }
};

const getActionText = (id: string) => {
  switch (id) {
    case "maya": return "Talk to Maya";
    case "alex": return "Meet Alex";
    case "aria": return "Call Aria";
    case "nova": return "Run Nova";
    default: return "Interact";
  }
};

export default function AIEmployeeTypes() {
  const { setActiveDemoEmployee } = useWorkforce();

  const handleAction = (id: string) => {
    setActiveDemoEmployee(id);
    document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="ai-employee-types" className={styles.section} aria-labelledby="employee-types-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="employee-types-title">
            Meet your <span className={styles.accent}>AI employees.</span>
          </h2>
          <p>Don't watch another AI demo. Talk to the employees.</p>
        </div>

        <div className={styles.grid}>
          {employeesData.map((employee) => {
            const ActionIcon = getIconForEmp(employee.id);
            return (
              <article key={employee.name} className={styles.card}>
                <div className={styles.statusBadge}>
                  <span className={styles.pulseDot} /> {employee.status.toUpperCase()}
                </div>

                <div className={styles.avatarPlaceholder}>
                  <Image 
                    src={employee.avatar} 
                    alt={employee.name}
                    width={80}
                    height={80}
                    style={{ borderRadius: '50%' }}
                  />
                </div>

                <div className={styles.content}>
                  <h3>{employee.name.toUpperCase()}</h3>
                  <span className={styles.role}>{employee.role}</span>
                  <p className={styles.description}>{employee.description}</p>
                </div>

                <button className={styles.actionButton} onClick={() => handleAction(employee.id)}>
                  <ActionIcon size={16} />
                  <span>{getActionText(employee.id)} &rarr;</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}