"use client";

import { useState } from "react";
import styles from "./InteractiveSelector.module.css";
import { Check, Loader2, CheckCircle2, Circle } from "lucide-react";
import { useWorkforce } from "@/context/WorkforceContext";
import { employeesData } from "@/lib/ai/employees";
import Image from "next/image";

const initialTags = [
  { name: "Customer Support", active: false },
  { name: "Lead Qualification", active: false },
  { name: "Sales", active: false },
  { name: "Voice Calls", active: false },
  { name: "Appointments", active: false },
  { name: "WhatsApp", active: false },
  { name: "Follow-ups", active: false },
  { name: "Operations", active: false },
  { name: "CRM Updates", active: false },
  { name: "Other", active: false }
];

export default function InteractiveSelector() {
  const { setDeployedEmployees, setActiveDemoEmployee } = useWorkforce();
  const [tags, setTags] = useState(initialTags);
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "active">("idle");
  const [deployStep, setDeployStep] = useState(0);

  const activeTags = tags.filter(t => t.active).map(t => t.name);
  const hasSelection = activeTags.length > 0;

  // Determine recommendation
  let recEmployeesList = [employeesData[0]]; // fallback maya
  if (hasSelection) {
    const recommendedIds = new Set<string>();
    
    activeTags.forEach(tag => {
      if (tag === "Customer Support" || tag === "WhatsApp" || tag === "Voice Calls") recommendedIds.add("maya");
      else if (tag === "Lead Qualification" || tag === "Sales" || tag === "Follow-ups") recommendedIds.add("alex");
      else if (tag === "Appointments" || tag === "Operations" || tag === "CRM Updates") recommendedIds.add("aria");
      else if (tag === "Marketing-related work") recommendedIds.add("nova");
      else recommendedIds.add("maya"); // fallback
    });

    recEmployeesList = Array.from(recommendedIds).map(id => employeesData.find(e => e.id === id)).filter(Boolean) as typeof employeesData;
  }

  const handleDeploy = async () => {
    if (!hasSelection || deploymentStatus !== "idle") return;
    setDeploymentStatus("deploying");
    setDeployStep(1);

    const supabase = (await import("@/lib/supabase/browser")).createSupabaseBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Simulate deployment steps before routing
    setTimeout(() => setDeployStep(2), 800);
    setTimeout(async () => {
      setDeployStep(3);
      if (user) {
        // Authenticated: submit workforce brief to API
        try {
          await fetch("/api/workforce", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              businessName: user.email?.split("@")[0] || "My Company",
              industry: "General",
              selectedEmployee: recEmployeesList[0].id,
              selectedNeeds: activeTags,
              selectedChannels: ["Web"]
            })
          });
        } catch (e) {
          console.error(e);
        }
        window.location.href = "/dashboard";
      } else {
        // Unauthenticated: redirect to login
        window.location.href = "/login";
      }
    }, 1600);
  };

  const handleTalk = (empId: string) => {
    setActiveDemoEmployee(empId);
    window.location.hash = "#demos";
  };

  const handleViewWorkforce = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="selector" className={styles.section} aria-labelledby="selector-title">
      <div className={styles.container}>
        <div className={styles.leftCol}>
          <div className={styles.eyebrow}>BUILD YOUR WORKFORCE</div>
          <h2 id="selector-title" className={styles.title}>Who should be your<br/>first AI employee?</h2>
          <p className={styles.desc}>Tell us what you need help with and we&apos;ll recommend the right workforce for you.</p>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.selectorCard}>
            <div className={styles.cardHeaderRow}>
              <h3>What would you like to automate?</h3>
              {deploymentStatus === "idle" && <span className={styles.recLabel}>Recommended for you</span>}
            </div>

            {deploymentStatus === "idle" && (
              <div className={styles.cardBody}>
                <div className={styles.tagsGrid}>
                  {tags.map(tag => (
                    <button 
                      key={tag.name} 
                      className={`${styles.tag} ${tag.active ? styles.tagActive : ''}`}
                      onClick={() => {
                        setTags(tags.map(t => t.name === tag.name ? { ...t, active: !t.active } : t));
                      }}
                    >
                      {tag.name}
                      {tag.active && <Check size={14} className={styles.tagCheck} />}
                    </button>
                  ))}
                </div>

                <div className={styles.recommendationBox}>
                  <div className={styles.recAvatarsRow}>
                    <div className={styles.recAvatarPile}>
                      {recEmployeesList.map(emp => (
                        <div key={emp.id} className={styles.pileImg} style={{ backgroundImage: `url('${emp.avatar}')` }} />
                      ))}
                    </div>
                    <span className={styles.arrowIcon}>→</span>
                    <div className={styles.employeeCount}>{recEmployeesList.length} Employee{recEmployeesList.length > 1 ? 's' : ''}</div>
                  </div>
                  <p className={styles.recSubtext}>Recommended starting workforce</p>
                  <button className={styles.primaryBtn} onClick={handleDeploy} disabled={!hasSelection}>
                    Deploy My AI Workforce <span aria-hidden="true">→</span>
                  </button>
                  {!hasSelection && <p className={styles.recSubtext} style={{color: 'var(--primary)'}}>Select at least one automation to deploy</p>}
                </div>
              </div>
            )}

            {deploymentStatus === "deploying" && (
              <div className={styles.deployContainer}>
                <h3 className={styles.deployHeader}>Preparing your workforce...</h3>
                <div className={styles.stepList}>
                  <div className={`${styles.stepItem} ${deployStep >= 1 ? styles.completed : ''}`}>
                    <div className={styles.stepIcon}>{deployStep > 1 ? <CheckCircle2 size={20} /> : <Loader2 size={20} className={styles.spin} />}</div>
                    <span>Automation requirements analyzed</span>
                  </div>
                  <div className={`${styles.stepItem} ${deployStep >= 2 ? (deployStep > 2 ? styles.completed : styles.active) : ''}`}>
                    <div className={styles.stepIcon}>{deployStep > 2 ? <CheckCircle2 size={20} /> : (deployStep === 2 ? <Loader2 size={20} className={styles.spin} /> : <Circle size={20} />)}</div>
                    <span>AI employee selected</span>
                  </div>
                  <div className={`${styles.stepItem} ${deployStep >= 3 ? styles.active : ''}`}>
                    <div className={styles.stepIcon}>{deployStep >= 3 ? <Loader2 size={20} className={styles.spin} /> : <Circle size={20} />}</div>
                    <span>Connecting workflow</span>
                  </div>
                </div>
              </div>
            )}

            {deploymentStatus === "active" && (
              <div className={styles.activeContainer}>
                <div className={styles.activeHeader}>
                  <h4>WORKFORCE ACTIVE</h4>
                  <h2>Your AI workforce is ready.</h2>
                </div>
                
                <div className={styles.activeProfile}>
                  {recEmployeesList.map((emp, i) => (
                    <div key={emp.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: i < recEmployeesList.length - 1 ? '16px' : 0 }}>
                      <Image src={emp.avatar} alt={emp.name} width={80} height={80} className={styles.activeAvatar} />
                      <strong style={{ fontSize: '18px' }}>{emp.name}</strong>
                      <span style={{ color: 'var(--text-3)', fontSize: '14px' }}>{emp.role} AI Employee</span>
                    </div>
                  ))}
                  
                  <div className={styles.activeAutomations}>
                    {activeTags.map(t => (
                      <span key={t} className={styles.tag} style={{ padding: '6px 12px', fontSize: '12px', cursor: 'default' }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.activeActions}>
                  <button className={styles.primaryBtn} onClick={() => handleTalk(recEmployeesList[0].id)}>
                    Talk to {recEmployeesList[0].name}
                  </button>
                  <button className={styles.secondaryBtn} onClick={handleViewWorkforce}>
                    View Workforce
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
