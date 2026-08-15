import styles from "./Problem.module.css";

const problems = [
  {
    number: "01",
    title: "Customers don't wait.",
    description:
      "When nobody answers, customers move on. Missed calls, unanswered messages, and slow replies quietly become lost revenue.",
    metric: "MISSED OPPORTUNITY",
  },
  {
    number: "02",
    title: "Your team repeats the same work.",
    description:
      "Answering the same questions, qualifying the same leads, booking meetings, and updating systems shouldn't consume your best people's time.",
    metric: "REPETITIVE WORK",
  },
  {
    number: "03",
    title: "Business stops after hours.",
    description:
      "Your customers operate 24/7. Your team doesn't. Every hour without coverage creates another gap in your customer experience.",
    metric: "NO 24 / 7 COVERAGE",
  },
];

export default function Problem() {
  return (
    <section
      className={styles.problem}
      aria-labelledby="problem-title"
    >
      <div className={styles.container}>
        {/* HEADER */}

        <div className={styles.header}>
          <div className={styles.headingBlock}>
            <span className={styles.kicker}>
              THE PROBLEM
            </span>

            <h2 id="problem-title">
              Your business shouldn't
              <span>depend on human availability.</span>
            </h2>
          </div>

          <p className={styles.intro}>
            Most businesses don't have a people problem.
            They have a coverage problem.
          </p>
        </div>

        {/* PROBLEM GRID */}

        <div className={styles.grid}>
          {problems.map((problem) => (
            <article
              key={problem.number}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <span className={styles.number}>
                  {problem.number}
                </span>

                <span className={styles.metric}>
                  {problem.metric}
                </span>
              </div>

              <div className={styles.cardContent}>
                <h3>{problem.title}</h3>

                <p>{problem.description}</p>
              </div>

              <div className={styles.line}>
                <span />
              </div>
            </article>
          ))}
        </div>

        {/* BOTTOM STATEMENT */}

        <div className={styles.statement}>
          <div className={styles.statementMark}>
            <span />
          </div>

          <div>
            <span className={styles.statementKicker}>
              THE OLD WAY
            </span>

            <p>
              Hire more people.
              <span> Add more shifts.</span>
              <span> Pay more overhead.</span>
            </p>
          </div>

          <div className={styles.arrow}>
            ↓
          </div>
        </div>
      </div>
    </section>
  );
}