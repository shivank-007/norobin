import styles from "./Footer.module.css";
import { Mail } from "lucide-react";

// Inline social icons since lucide-react brand icons might be missing
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerMain}>
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>N</span> NOROBIN
            </div>
            <p className={styles.tagline}>
              AI employees for modern<br/>businesses.
            </p>
            <div className={styles.socials}>
              <a href="https://linkedin.com/company/norobin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
              <a href="https://instagram.com/norobin" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://youtube.com/norobin" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YoutubeIcon /></a>
              <a href="mailto:hello@norobin.com" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.linkGroup}>
              <span className={styles.kicker}>AI WORKFORCE</span>
              <a href="#ai-employee-types">Employees</a>
              <a href="#how-ai-employees-work">How It Works</a>
              <a href="#demos">Demos</a>
              <a href="#industries">Industries</a>
              <a href="#pricing">Pricing</a>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.kicker}>COMPANY</span>
              <a href="#about">About Us</a>
              <a href="#careers">Careers</a>
              <a href="#blog">Blog</a>
              <a href="#resources">Resources</a>
              <a href="#contact">Contact</a>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.kicker}>LEGAL</span>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#security">Data Security</a>
            </div>
          </div>

          <div className={styles.ctaCol}>
            <p className={styles.ctaText}>Ready to build your workforce?</p>
            <p className={styles.ctaSubtext}>Let's build AI employees that<br/>work for your business.</p>
            <a href="#selector" className={styles.ctaBtn} style={{ textDecoration: 'none' }}>
              Build My AI Workforce <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 NOROBIN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}