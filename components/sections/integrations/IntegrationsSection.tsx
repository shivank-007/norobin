import styles from "./IntegrationsSection.module.css";
import { MessageSquare, Mail, Database, Cloud, CreditCard, Box } from "lucide-react";

const tools = [
  { name: "Slack", icon: MessageSquare },
  { name: "Gmail", icon: Mail },
  { name: "Hubspot", icon: Database },
  { name: "Salesforce", icon: Cloud },
  { name: "Zendesk", icon: Box },
  { name: "Stripe", icon: CreditCard },
];

export default function IntegrationsSection() {
  return (
    <section className={styles.section} aria-labelledby="integrations-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="integrations-title">AI employees don&apos;t work alone.</h2>
          <p>They connect to the tools you already use to get work done.</p>
        </div>

        <div className={styles.grid}>
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className={styles.toolCard}>
                <div className={styles.iconWrapper}>
                  <Icon size={24} />
                </div>
                <span>{tool.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
