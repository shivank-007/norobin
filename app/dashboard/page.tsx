"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Dashboard.module.css";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type WorkforceStatus = "NEW" | "IN_PROGRESS" | "COMPLETED";

type WorkforceBrief = {
  id: string;
  businessName: string;
  industry: string;
  website: string | null;
  details: string | null;
  selectedEmployee: string;
  selectedNeeds: string[];
  selectedChannels: string[];
  status: WorkforceStatus;
  createdAt: string;
};

export default function DashboardPage() {
  const [briefs, setBriefs] = useState<WorkforceBrief[]>([]);
  const [selectedBrief, setSelectedBrief] =
    useState<WorkforceBrief | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("Admin");

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setUserName(user.email.split("@")[0]);
      }
    });
  }, [supabase]);

  const loadBriefs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/workforce", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to load workforce briefs."
        );
      }

      setBriefs(result.data ?? []);
    } catch (err) {
      console.error("DASHBOARD LOAD ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load workforce briefs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadBriefs();
  }, []);

  const updateStatus = async (
    id: string,
    status: WorkforceStatus
  ) => {
    try {
      const response = await fetch("/api/workforce", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to update status."
        );
      }

      setBriefs((current) =>
        current.map((brief) =>
          brief.id === id
            ? {
                ...brief,
                status,
              }
            : brief
        )
      );

      setSelectedBrief((current) =>
        current?.id === id
          ? {
              ...current,
              status,
            }
          : current
      );
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);

      window.alert(
        err instanceof Error
          ? err.message
          : "Failed to update status."
      );
    }
  };

  const deleteBrief = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this workforce brief?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch("/api/workforce", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to delete workforce brief."
        );
      }

      setBriefs((current) =>
        current.filter((brief) => brief.id !== id)
      );

      if (selectedBrief?.id === id) {
        setSelectedBrief(null);
      }
    } catch (err) {
      console.error("DELETE ERROR:", err);

      window.alert(
        err instanceof Error
          ? err.message
          : "Failed to delete workforce brief."
      );
    }
  };

  const totalBriefs = briefs.length;

  const totalWorkflows = briefs.reduce(
    (total, brief) =>
      total + brief.selectedNeeds.length,
    0
  );

  const totalChannels = new Set(
    briefs.flatMap(
      (brief) => brief.selectedChannels
    )
  ).size;

  const completedBriefs = briefs.filter(
    (brief) => brief.status === "COMPLETED"
  ).length;

  return (
    <main className={styles.page}>
      <div className={styles.glow} />

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>
              NOROBIN WORKFORCE
            </span>

            <h1>Welcome back, {userName}</h1>

            <p>
              Manage submitted AI workforce briefs and
              review business requirements.
            </p>
          </div>

          <Link
            href="/#builder"
            className={styles.newButton}
          >
            + New Workforce
          </Link>
        </header>

        <section className={styles.stats}>
          <div className={styles.statCard}>
            <span>Total Briefs</span>
            <strong>{totalBriefs}</strong>
          </div>

          <div className={styles.statCard}>
            <span>Workflows Selected</span>
            <strong>{totalWorkflows}</strong>
          </div>

          <div className={styles.statCard}>
            <span>Channels Used</span>
            <strong>{totalChannels}</strong>
          </div>

          <div className={styles.statCard}>
            <span>Completed</span>
            <strong>{completedBriefs}</strong>
          </div>
        </section>

        <section>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionKicker}>
                SUBMISSIONS
              </span>

              <h2>Workforce Briefs</h2>
            </div>

            <span className={styles.count}>
              {totalBriefs}{" "}
              {totalBriefs === 1
                ? "record"
                : "records"}
            </span>
          </div>

          {loading ? (
            <div className={styles.empty}>
              <span>◌</span>

              <h3>
                Loading workforce briefs...
              </h3>

              <p>
                Please wait while we fetch your
                latest records.
              </p>
            </div>
          ) : error ? (
            <div className={styles.error}>
              {error}
            </div>
          ) : briefs.length === 0 ? (
            <div className={styles.empty}>
              <span>✦</span>

              <h3>
                No workforce briefs yet
              </h3>

              <p>
                Submit your first workforce brief
                to see it here.
              </p>
            </div>
          ) : (
            <div className={styles.grid}>
              {briefs.map((brief) => (
                <article
                  key={brief.id}
                  className={styles.card}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.avatar}>
                      {brief.businessName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <select
                      className={styles.statusSelect}
                      value={brief.status}
                      onChange={(event) =>
                        updateStatus(
                          brief.id,
                          event.target
                            .value as WorkforceStatus
                        )
                      }
                    >
                      <option value="NEW">
                        NEW
                      </option>

                      <option value="IN_PROGRESS">
                        IN PROGRESS
                      </option>

                      <option value="COMPLETED">
                        COMPLETED
                      </option>
                    </select>
                  </div>

                  <div className={styles.cardMeta}>
                    <span className={styles.status}>
                      <i />
                      {brief.status ===
                      "IN_PROGRESS"
                        ? "IN PROGRESS"
                        : brief.status}
                    </span>

                    <span>
                      {new Date(
                        brief.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <div className={styles.identity}>
                    <h3>
                      {brief.businessName}
                    </h3>

                    <span>
                      {brief.industry}
                    </span>
                  </div>

                  <div className={styles.employee}>
                    <span>AI EMPLOYEE</span>

                    <strong>
                      {brief.selectedEmployee.toUpperCase()}
                    </strong>
                  </div>

                  <div className={styles.tags}>
                    {brief.selectedNeeds.map(
                      (need) => (
                        <span key={need}>
                          {need}
                        </span>
                      )
                    )}
                  </div>

                  <div className={styles.channels}>
                    <span>
                      CONTACT CHANNELS
                    </span>

                    <strong>
                      {brief.selectedChannels
                        .length > 0
                        ? brief.selectedChannels.join(
                            " · "
                          )
                        : "None selected"}
                    </strong>
                  </div>

                  {brief.details && (
                    <p className={styles.details}>
                      {brief.details}
                    </p>
                  )}

                  {brief.website && (
                    <a
                      href={brief.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.website}
                    >
                      Visit website ↗
                    </a>
                  )}

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.viewButton}
                      onClick={() =>
                        setSelectedBrief(brief)
                      }
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() =>
                        deleteBrief(brief.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedBrief && (
        <div
          className={styles.modalOverlay}
          onClick={() =>
            setSelectedBrief(null)
          }
        >
          <div
            className={styles.modal}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className={styles.modalHeader}>
              <div>
                <span
                  className={styles.sectionKicker}
                >
                  WORKFORCE BRIEF
                </span>

                <h2>
                  {selectedBrief.businessName}
                </h2>
              </div>

              <button
                type="button"
                className={styles.closeButton}
                onClick={() =>
                  setSelectedBrief(null)
                }
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className={styles.modalGrid}>
              <div>
                <span>Industry</span>

                <strong>
                  {selectedBrief.industry}
                </strong>
              </div>

              <div>
                <span>Status</span>

                <select
                  className={styles.statusSelect}
                  value={selectedBrief.status}
                  onChange={(event) =>
                    updateStatus(
                      selectedBrief.id,
                      event.target
                        .value as WorkforceStatus
                    )
                  }
                >
                  <option value="NEW">
                    NEW
                  </option>

                  <option value="IN_PROGRESS">
                    IN PROGRESS
                  </option>

                  <option value="COMPLETED">
                    COMPLETED
                  </option>
                </select>
              </div>

              <div>
                <span>AI Employee</span>

                <strong>
                  {selectedBrief.selectedEmployee.toUpperCase()}
                </strong>
              </div>

              <div>
                <span>Workflows</span>

                <strong>
                  {selectedBrief.selectedNeeds.join(
                    ", "
                  )}
                </strong>
              </div>

              <div>
                <span>Channels</span>

                <strong>
                  {selectedBrief.selectedChannels
                    .length
                    ? selectedBrief.selectedChannels.join(
                        ", "
                      )
                    : "None"}
                </strong>
              </div>

              <div>
                <span>Website</span>

                <strong>
                  {selectedBrief.website ||
                    "Not provided"}
                </strong>
              </div>

              <div>
                <span>Submitted</span>

                <strong>
                  {new Date(
                    selectedBrief.createdAt
                  ).toLocaleString()}
                </strong>
              </div>
            </div>

            <div className={styles.modalDetails}>
              <span>Employee Brief</span>

              <p>
                {selectedBrief.details ||
                  "No additional details provided."}
              </p>
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() =>
                  deleteBrief(
                    selectedBrief.id
                  )
                }
              >
                Delete Brief
              </button>

              <button
                type="button"
                className={styles.viewButton}
                onClick={() =>
                  setSelectedBrief(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}