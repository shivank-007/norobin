import styles from "./Solution.module.css";

const solutions = [
  {
    number: "01",
    title: "One employee.",
    highlight: "One job.",
    description:
      "Give every repetitive responsibility its own AI employee with a clear role, instructions, knowledge, and workflow.",
    label: "ROLE-BASED AI",
  },
  {
    number: "02",
    title: "Always",
    highlight: "working.",
    description:
      "Your AI employees keep working when your team is offline — responding, qualifying, booking, updating, and following up.",
    label: "24 / 7 OPERATIONS",
  },
  {
    number: "03",
    title: "Connected to",
    highlight: "your business.",
    description:
      "AI employees fit into the systems and channels your business already uses instead of forcing your team into another workflow.",
    label: "CONNECTED WORKFLOWS",
  },
];

export default function Solution() {
  return (
    <section
      id="solution"
      className={styles.solution}
      aria-labelledby="solution-title"
    >
      <div className={styles.glow} />

      <div className={styles.container}>
        {/* HEADER */}

        <div className={styles.header}>
          <div className={styles.headingBlock}>
            <span className={styles.kicker}>
              THE NOROBIN SOLUTION
            </span>

            <h2 id="solution-title">
              Turn repetitive work
              <span>into an AI workforce.</span>
            </h2>
          </div>

          <p className={styles.intro}>
            Instead of adding more tools or asking your team
            to work faster, NOROBIN gives repetitive work to
            AI employees built specifically for the job.
          </p>
        </div>

        {/* MAIN VISUAL */}

        <div className={styles.solutionVisual}>
          <div className={styles.visualTop}>
            <div className={styles.systemIdentity}>
              <span className={styles.systemDot} />

              <div>
                <span className={styles.systemLabel}>
                  NOROBIN SYSTEM
                </span>

                <strong>
                  AI Workforce Layer
                </strong>
              </div>
            </div>

            <div className={styles.liveBadge}>
              <span />
              SYSTEM ONLINE
            </div>
          </div>

          <div className={styles.flow}>
            <div className={styles.flowNode}>
              <span className={styles.nodeLabel}>
                YOUR BUSINESS
              </span>

              <strong>
                Repetitive work
              </strong>

              <small>
                Messages · Leads · Calls · Operations
              </small>
            </div>

            <div className={styles.connector}>
              <span />
            </div>

            <div className={styles.coreNode}>
              <div className={styles.coreRing}>
                <div className={styles.coreInner}>
                  N
                </div>
              </div>

              <span>NOROBIN</span>

              <strong>
                AI Workforce
              </strong>
            </div>

            <div className={styles.connector}>
              <span />
            </div>

            <div className={styles.flowNode}>
              <span className={styles.nodeLabel}>
                YOUR TEAM
              </span>

              <strong>
                Higher-value work
              </strong>

              <small>
                Decisions · Relationships · Growth
              </small>
            </div>
          </div>

          <div className={styles.visualFooter}>
            <span>
              <i />
              AI employees handle the repetitive layer
            </span>

            <span>
              24 / 7
            </span>
          </div>
        </div>

        {/* SOLUTION CARDS */}

        <div className={styles.cards}>
          {solutions.map((solution) => (
            <article
              key={solution.number}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <span className={styles.number}>
                  {solution.number}
                </span>

                <span className={styles.cardLabel}>
                  {solution.label}
                </span>
              </div>

              <div className={styles.cardBody}>
                <h3>
                  {solution.title}
                  <span>{solution.highlight}</span>
                </h3>

                <p>
                  {solution.description}
                </p>
              </div>

              <div className={styles.cardLine} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}