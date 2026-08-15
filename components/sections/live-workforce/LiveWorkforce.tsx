"use client";

import styles from "./LiveWorkforce.module.css";
import Image from "next/image";
import { useWorkforce } from "@/context/WorkforceContext";

export default function LiveWorkforce() {
  const { deployedEmployees, tasksCompleted } = useWorkforce();
  
  // Use deployed employees, or fallback to default if none are deployed yet
  const displayEmployees = deployedEmployees.length > 0 ? deployedEmployees : [];

  return (
    <section
      id="workforce"
      className={styles.section}
      aria-labelledby="live-workforce-title"
    >
      <div className={styles.container}>
        {/* SECTION INTRO */}

        <div className={styles.intro}>
          <div className={styles.introCopy}>
            <span className={styles.kicker}>
              LIVE WORKFORCE
            </span>

            <h2 id="live-workforce-title">
              Your AI employees
              <span>are already working.</span>
            </h2>

            <p>
              See what your AI workforce is doing in real time.
              NOROBIN employees handle conversations, qualify
              opportunities, answer calls, and keep operations
              moving — without waiting for office hours.
            </p>
          </div>

          <div className={styles.liveBadge}>
            <span className={styles.liveDot} />
            LIVE SYSTEM
          </div>
        </div>

        {/* COMMAND CENTER */}

        <div className={styles.commandCenter}>
          <div className={styles.commandGlow} />

          {/* TOP BAR */}

          <div className={styles.commandTop}>
            <div>
              <span className={styles.commandEyebrow}>
                NOROBIN / COMMAND CENTER
              </span>

              <h3>Your AI Workforce</h3>
            </div>

            <div className={styles.workforceState}>
              <span />
              WORKFORCE ACTIVE
            </div>
          </div>

          {/* MAIN GRID */}

          <div className={styles.dashboardGrid}>
            {/* LEFT SUMMARY */}

            <div className={styles.summary}>
              <div className={styles.summaryHeader}>
                <span>OPERATIONS</span>
                <span className={styles.pulse}>● LIVE</span>
              </div>

              <div className={styles.bigNumber}>
                {displayEmployees.length.toString().padStart(2, '0')}
              </div>

              <div className={styles.bigLabel}>
                AI employees working
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryStats}>
                <div>
                  <strong>{tasksCompleted + 67}</strong>
                  <span>Interactions</span>
                </div>

                <div>
                  <strong>{Math.floor(tasksCompleted / 2) + 18}</strong>
                  <span>Leads qualified</span>
                </div>

                <div>
                  <strong>07</strong>
                  <span>Calls handled</span>
                </div>
              </div>

              <div className={styles.availability}>
                <div className={styles.availabilityTop}>
                  <span>WORKFORCE AVAILABILITY</span>
                  <strong>24 / 7</strong>
                </div>

                <div className={styles.availabilityBar}>
                  <span />
                </div>

                <p>
                  No shifts. No queues. No waiting.
                </p>
              </div>
            </div>

            {/* EMPLOYEES */}

            <div className={styles.employeePanel}>
              <div className={styles.panelHeader}>
                <span>ACTIVE EMPLOYEES</span>
                <span>{displayEmployees.length.toString().padStart(2, '0')} / {displayEmployees.length.toString().padStart(2, '0')}</span>
              </div>

              <div className={styles.employeeList}>
                {displayEmployees.length === 0 ? (
                  <div style={{ padding: '20px', color: 'var(--text-2)', fontSize: '0.9rem' }}>
                    No employees deployed yet. Use the builder below to deploy your first AI employee.
                  </div>
                ) : (
                  displayEmployees.map((employee) => (
                    <article
                      key={employee.name}
                      className={styles.employee}
                    >
                      <div className={styles.employeeMain}>
                        <div className={styles.avatar}>
                          <Image 
                            src={employee.avatar} 
                            alt={employee.name}
                            width={48}
                            height={48}
                            style={{ borderRadius: '50%' }}
                          />
                        </div>

                        <div className={styles.identity}>
                          <div className={styles.nameRow}>
                            <strong>{employee.name}</strong>

                            <span className={styles.status}>
                              <i />
                              ACTIVE
                            </span>
                          </div>

                          <span className={styles.role}>
                            {employee.role} Employee
                          </span>
                        </div>
                      </div>

                      <div className={styles.task}>
                        <span>CURRENTLY</span>
                        <strong>{employee.capabilities[0] || 'Processing tasks'}</strong>
                      </div>

                      <div className={styles.metric}>
                        Monitoring real-time activity
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ACTIVITY */}

          <div className={styles.activity}>
            <div className={styles.activityHeader}>
              <div>
                <span>LIVE ACTIVITY</span>
                <strong>What your workforce is doing now</strong>
              </div>

              <span className={styles.activityLive}>
                <i />
                STREAMING
              </span>
            </div>

            <div className={styles.activityList}>
              {displayEmployees.slice(0, 3).map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  className={styles.activityItem}
                >
                  <span className={styles.activityCheck}>
                    ✓
                  </span>

                  <div>
                    <strong>{item.name}</strong>{" "}
                    <span>executed {item.capabilities[0]?.toLowerCase() || 'a task'}</span>
                  </div>

                  <time>{12 + (idx * 16)} sec ago</time>
                </div>
              ))}
              {displayEmployees.length === 0 && (
                <div style={{ padding: '20px', color: 'var(--text-2)', fontSize: '0.9rem' }}>
                  Awaiting deployment...
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}

          <div className={styles.commandFooter}>
            <span>
              Autonomous operations running normally
            </span>

            <span className={styles.footerStatus}>
              <i />
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}