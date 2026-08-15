import styles from "./EmployeeCard.module.css";
import { Check, ArrowRight } from "lucide-react";
import { WorkforceMember } from "@/types/workforce";

interface EmployeeCardProps {
  employee: WorkforceMember;
}

export default function EmployeeCard({
  employee,
}: EmployeeCardProps) {
  const Icon = employee.icon;

  return (
    <article
      className={`${styles.card} ${
        employee.featured ? styles.featured : ""
      }`}
    >
      <div className={styles.status}>
        <span className={styles.dot}></span>
        <span>{employee.status}</span>
      </div>

      <div className={styles.icon}>
        <Icon size={28} />
      </div>

      <h3>{employee.title}</h3>

      <p>{employee.description}</p>

      <div className={styles.skills}>
        {employee.skills.map((skill) => (
          <div key={skill} className={styles.skill}>
            <Check size={16} />
            <span>{skill}</span>
          </div>
        ))}
      </div>

      <button className={styles.button}>
        {employee.cta}
        <ArrowRight size={18} />
      </button>
    </article>
  );
}

