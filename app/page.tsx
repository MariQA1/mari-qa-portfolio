"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Skill = {
  label: string;
  group: "QA" | "A11Y" | "API" | "Tools" | "Process";
};

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const { ref, shown } = useRevealOnScroll();
  return (
    <section id={id} className="section">
      <div
        ref={ref}
        className={`reveal ${shown ? "reveal--in" : ""}`}
        aria-label={title}
      >
        <header className="sectionHead">
          {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
          <h2 className="h2">{title}</h2>
          {subtitle ? <p className="sub">{subtitle}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pill ${active ? "pill--active" : ""}`}
    >
      {children}
    </button>
  );
}

function Card({
  title,
  meta,
  bullets,
}: {
  title: string;
  meta: string;
  bullets: string[];
}) {
  return (
    <div className="card">
      <div className="cardTop">
        <div className="cardTitle">{title}</div>
        <div className="cardMeta">{meta}</div>
      </div>
      <ul className="list">
        {bullets.map((b) => (
          <li key={b} className="li">
            <span className="dot" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  // ✅ Update these 2 values:
  const LINKS = {
    linkedin: "https://www.linkedin.com/in/mari-zakaidze",
    email: "mariazakaidze@gmail.com",
  };

  const year = useMemo(() => new Date().getFullYear(), []);

  const skills: Skill[] = [
    { label: "Manual Testing (Web/Mobile)", group: "QA" },
    { label: "Cross-browser & responsive QA", group: "QA" },
    { label: "UI validation (Figma)", group: "QA" },
    { label: "Accessibility (WCAG A/AA)", group: "A11Y" },
    { label: "ARIA / keyboard / focus order", group: "A11Y" },
    { label: "API Testing (Swagger)", group: "API" },
    { label: "DevTools (Network/Console)", group: "Tools" },
    { label: "Jira / Confluence", group: "Tools" },
    { label: "BrowserStack", group: "Tools" },
    { label: "Smoke / Regression / Exploratory", group: "Process" },
    { label: "Bug reporting & triage", group: "Process" },
    { label: "Test planning & coverage", group: "Process" },
  ];

  const [filter, setFilter] = useState<
    "All" | Skill["group"]
  >("All");

  const visibleSkills = useMemo(() => {
    if (filter === "All") return skills;
    return skills.filter((s) => s.group === filter);
  }, [filter, skills]);

  const [toast, setToast] = useState<string | null>(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setToast("Email copied");
    } catch {
      setToast("Couldn’t copy — use the button to email instead");
    } finally {
      window.setTimeout(() => setToast(null), 1800);
    }
  }

  return (
    <div className="page">
      {/* Floating background */}
      <div className="bg" aria-hidden="true">
        <div className="bgGradient" />
        <div className="blob blobA" />
        <div className="blob blobB" />
        <div className="gridNoise" />
      </div>

      {/* Top nav */}
      <header className="topbar">
        <div className="container topbarInner">
          <div className="brand">
            <div className="logoMark">M</div>
            <div className="brandText">
              <div className="brandName">Mari Zakadze</div>
              <div className="brandRole">Senior QA · Web & Mobile · A11Y</div>
            </div>
          </div>

          <nav className="nav">
            <a href="#about" className="navLink">About</a>
            <a href="#skills" className="navLink">Skills</a>
            <a href="#experience" className="navLink">Experience</a>
            <a href="#projects" className="navLink">Projects</a>
            <a href="#contact" className="navLink">Contact</a>
          </nav>

          <div className="navCtas">
            <button className="btn btnGhost" onClick={copyEmail}>
              Copy email
            </button>
            <a className="btn btnPrimary" href={`mailto:${LINKS.email}`}>
              Email
            </a>
          </div>
        </div>
      </header>

      {/* Toast */}
      {toast ? <div className="toast">{toast}</div> : null}

      {/* Main */}
      <main className="container main">
        {/* HERO */}
        <section className="hero" aria-label="Hero">
          <div className="heroLeft">
            <div className="tag">
              <span className="pulse" />
              Available for strong QA ownership & quality improvements
            </div>

            <h1 className="h1">
              Premium quality for products people actually enjoy using.
            </h1>

            <p className="lead">
              Senior QA Engineer with a strong focus on web & mobile stability,
              accessibility compliance, and clean collaboration through clear
              test coverage and precise defect reporting.
            </p>

            <div className="heroCtas">
              <a className="btn btnPrimary" href={LINKS.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="btn btnSoft" href="#projects">
                View work
              </a>
              <button className="btn btnGhost" onClick={copyEmail}>
                Copy email
              </button>
            </div>

            <div className="kpis">
              <div className="kpi">
                <div className="kpiTop">Strength</div>
                <div className="kpiVal">Detail & clarity</div>
              </div>
              <div className="kpi">
                <div className="kpiTop">Focus</div>
                <div className="kpiVal">UX, stability, A11Y</div>
              </div>
              <div className="kpi">
                <div className="kpiTop">Tools</div>
                <div className="kpiVal">Jira, Swagger, DevTools</div>
              </div>
            </div>
          </div>

          <div className="heroRight">
            <div className="photoCard">
              <div className="photoFrame">
                <Image
                  src="/pro
