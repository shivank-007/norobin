"use client";

import { useState } from "react";
import styles from "./IndustryStrip.module.css";
import { Stethoscope, Home, Briefcase, ShoppingCart, GraduationCap, Building2 } from "lucide-react";
import { getEmployeeById } from "@/lib/ai/employees";
import Image from "next/image";

const industries = [
  { id: "clinics", name: "Clinics", icon: Stethoscope, desc: "Patient Support / Scheduling AI Employee", empId: "aria" },
  { id: "real-estate", name: "Real Estate", icon: Home, desc: "Lead Qualification / Appointment AI Employee", empId: "alex" },
  { id: "agencies", name: "Agencies", icon: Briefcase, desc: "Client Communication / Operations AI Employee", empId: "maya" },
  { id: "e-commerce", name: "E-commerce", icon: ShoppingCart, desc: "Customer Support / Sales AI Employee", empId: "maya" },
  { id: "education", name: "Education", icon: GraduationCap, desc: "Student Support / Scheduling AI Employee", empId: "aria" },
  { id: "professional-services", name: "Professional Services", icon: Building2, desc: "Lead Qualification / Admin AI Employee", empId: "nova" },
];

export default function IndustryStrip() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  const selectedData = industries.find(i => i.id === activeIndustry);
  const recommendedEmp = selectedData ? getEmployeeById(selectedData.empId) : null;

  return (
    <section id="industries" className={styles.section} aria-label="Industries we serve">
      <div className={styles.container}>
        <div className={styles.label}>
          <span>BUILT FOR BUSINESSES</span>
          <strong>THAT RUN ON CONVERSATIONS.</strong>
        </div>

        <div className={styles.divider} />

        <div className={styles.grid}>
          {industries.map((industry) => {
            const Icon = industry.icon;
            const isActive = activeIndustry === industry.id;
            return (
              <button 
                key={industry.id} 
                className={`${styles.item} ${isActive ? styles.activeItem : ''}`}
                onClick={() => setActiveIndustry(isActive ? null : industry.id)}
              >
                <div className={styles.iconWrapper}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span>{industry.name}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.divider} />

        <div className={styles.moreLabel}>
          And many<br />more...
        </div>
      </div>
      
      {selectedData && recommendedEmp && (
        <div className={styles.industryDetails}>
          <div className={styles.detailsContent}>
            <h4>{selectedData.name} Automation</h4>
            <p>{selectedData.desc}</p>
            <div className={styles.empRec}>
              <Image src={recommendedEmp.avatar} alt={recommendedEmp.name} width={32} height={32} style={{ borderRadius: "50%" }} />
              <div>
                <strong>Recommended: {recommendedEmp.name}</strong>
                <span>{recommendedEmp.role}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
