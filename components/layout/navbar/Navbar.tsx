"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import styles from "./Navbar.module.css";
import { User } from "@supabase/supabase-js";

const navItems = [
  { label: "AI Employees", href: "/#ai-employee-types" },
  { label: "Live Workforce", href: "/#workforce" },
  { label: "How It Works", href: "/#how-ai-employees-work" },
  { label: "Industries", href: "/#industries" },
  { label: "Demos", href: "/#demos" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check auth state on mount
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <header
      className={`${styles.header} ${
        scrolled ? styles.headerScrolled : ""
      }`}
    >
      <div className={styles.nav}>
        {/* Brand */}
        <Link
          href="/"
          className={styles.brand}
          onClick={closeMenu}
          aria-label="Norobin home"
        >
          <span className={styles.brandMark}>N</span>
          <span className={styles.brandText}>NOROBIN</span>
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className={styles.desktopActions}>
          {user ? (
            <>
              <button onClick={handleLogout} className={styles.secondaryBtn} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                Log out
              </button>
              <Link href="/dashboard" className={styles.primaryBtn}>
                Dashboard <span aria-hidden="true">→</span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/#ai-employee-types" className={styles.secondaryBtn}>
                Meet the Employees
              </Link>
              <Link href="/#selector" className={styles.primaryBtn}>
                Build My AI Workforce <span aria-hidden="true">→</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`${styles.menuButton} ${
            menuOpen ? styles.menuButtonOpen : ""
          }`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        className={`${styles.mobilePanel} ${
          menuOpen ? styles.mobilePanelOpen : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={closeMenu}
              style={{
                transitionDelay: menuOpen
                  ? `${index * 45}ms`
                  : "0ms",
              }}
            >
              <span>{item.label}</span>
              <span className={styles.mobileArrow}>↗</span>
            </a>
          ))}
        </nav>

        <div className={styles.mobileActions}>
          {user ? (
            <>
              <button onClick={() => { handleLogout(); closeMenu(); }} className={styles.mobileLogin} style={{ border: 'none', background: 'transparent', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                Log out
              </button>
              <Link href="/dashboard" className={styles.mobileCta} onClick={closeMenu}>
                Dashboard <span>↗</span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.mobileLogin} onClick={closeMenu}>
                Log in
              </Link>
              <Link href="/#selector" className={styles.mobileCta} onClick={closeMenu}>
                Build your workforce <span>↗</span>
              </Link>
            </>
          )}
        </div>

        <div className={styles.mobileFooter}>
          <span>AI workforce infrastructure</span>
          <span className={styles.mobileStatus}>
            <i />
            Available
          </span>
        </div>
      </div>
    </header>
  );
}