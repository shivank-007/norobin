"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import styles from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className={styles.page}>
      <div className={styles.ambient} />
      <div className={styles.grid} />

      <section className={styles.card}>
        {/* BRAND */}

        <div className={styles.brand}>
          <div className={styles.logo}>N</div>

          <div className={styles.brandText}>
            <span>NOROBIN</span>
            <small>AI WORKFORCE</small>
          </div>
        </div>

        {/* HEADING */}

        <div className={styles.heading}>
          <span className={styles.eyebrow}>
            PRIVATE WORKSPACE
          </span>

          <h1>Welcome back.</h1>

          <p>
            Sign in to access the NOROBIN workforce dashboard.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className={styles.form}
        >
          <label>
            <span>Email</span>

            <input
              type="email"
              placeholder="admin@company.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="email"
            />
          </label>

          <label>
            <span>Password</span>

            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div
              className={styles.error}
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submit}
            disabled={loading}
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                <span>Sign in to dashboard</span>
                <span aria-hidden="true">↗</span>
              </>
            )}
          </button>
        </form>

        {/* FOOTER */}

        <div className={styles.footer}>
          <span>
            <i />
            Secure admin access
          </span>

          <span>NOROBIN © 2026</span>
        </div>
      </section>
    </main>
  );
}