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
                  src="/profile.jpg"
                  alt="Mari profile photo"
                  fill
                  className="photo"
                  priority
                />
              </div>
              <div className="photoMeta">
                <div className="photoName">Mari Zakadze</div>
                <div className="photoSub">Software & Mobile QA · Accessibility</div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <Section
          id="about"
          eyebrow="Summary"
          title="About"
          subtitle="Short, professional, and focused."
        >
          <div className="panel">
            <p className="p">
              I work across web and mobile QA with an emphasis on product
              stability, consistent UI behavior, and accessibility (WCAG A/AA).
              My style is practical: I validate requirements, execute focused
              test runs, report bugs with strong evidence, and support teams
              through retest and release readiness.
            </p>
          </div>
        </Section>

        {/* SKILLS */}
        <Section
          id="skills"
          eyebrow="Toolkit"
          title="Skills"
          subtitle="Filter by category to explore."
        >
          <div className="filters">
            <Pill active={filter === "All"} onClick={() => setFilter("All")}>All</Pill>
            <Pill active={filter === "QA"} onClick={() => setFilter("QA")}>QA</Pill>
            <Pill active={filter === "A11Y"} onClick={() => setFilter("A11Y")}>A11Y</Pill>
            <Pill active={filter === "API"} onClick={() => setFilter("API")}>API</Pill>
            <Pill active={filter === "Tools"} onClick={() => setFilter("Tools")}>Tools</Pill>
            <Pill active={filter === "Process"} onClick={() => setFilter("Process")}>Process</Pill>
          </div>

          <div className="chips">
            {visibleSkills.map((s) => (
              <span key={s.label} className="chip">
                <span className="chipDot" />
                {s.label}
              </span>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section
          id="experience"
          eyebrow="Career"
          title="Experience"
          subtitle="Impact-oriented bullets."
        >
          <div className="grid2">
            <Card
              title="Senior Quality Assurance Engineer — Kanda Software"
              meta="Oct 2025 – Present"
              bullets={[
                "Supporting stable releases and quality initiatives across complex systems.",
                "Driving consistency across platforms and environments through clear validation.",
              ]}
            />
            <Card
              title="Senior Quality Assurance Engineer — EPAM Systems"
              meta="Nov 2024 – Dec 2025"
              bullets={[
                "Worked in distributed teams with a focus on cross-platform quality.",
                "Improved confidence in releases through clear documentation and reporting.",
              ]}
            />
            <Card
              title="Senior QA Engineer — Moncero"
              meta="Apr 2024 – Sep 2024"
              bullets={[
                "API testing for functionality & performance with clear reporting of findings.",
                "Validated backend robustness and supported reliable delivery.",
                "Frontend & UI testing to ensure a smooth user experience.",
              ]}
            />
            <Card
              title="QA Engineer — Patolomius Technologies"
              meta="Aug 2023 – Apr 2024"
              bullets={[
                "Validated platform functionality and correctness.",
                "Assessed stability/performance and shared improvement insights.",
              ]}
            />
          </div>
        </Section>

        {/* PROJECTS */}
        <Section
          id="projects"
          eyebrow="Selected work"
          title="Projects"
          subtitle="You can keep it NDA-safe — just describe scope and what you validated."
        >
          <div className="grid3">
            <div className="miniCard">
              <div className="miniTop">
                <div className="miniTitle">Accessibility Test Runs</div>
                <div className="miniTag">WCAG A/AA</div>
              </div>
              <p className="miniText">
                Keyboard navigation, focus order, ARIA semantics, color contrast, and clear defect evidence.
              </p>
            </div>

            <div className="miniCard">
              <div className="miniTop">
                <div className="miniTitle">Web & Mobile Release Testing</div>
                <div className="miniTag">Regression</div>
              </div>
              <p className="miniText">
                Cross-device validation, UI consistency, and bug triage with strong reproduction steps.
              </p>
            </div>

            <div className="miniCard">
              <div className="miniTop">
                <div className="miniTitle">API Validation</div>
                <div className="miniTag">Swagger</div>
              </div>
              <p className="miniText">
                Verified request/response behavior, edge cases, and error handling aligned with requirements.
              </p>
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section
          id="contact"
          eyebrow="Let’s connect"
          title="Contact"
          subtitle="Fast ways to reach me."
        >
          <div className="contact">
            <div className="contactLeft">
              <div className="contactTitle">Email</div>
              <div className="contactValue">{LINKS.email}</div>
              <div className="contactHint">
                Click “Copy email” or email directly.
              </div>
            </div>
            <div className="contactRight">
              <button className="btn btnGhost" onClick={copyEmail}>Copy email</button>
              <a className="btn btnPrimary" href={`mailto:${LINKS.email}`}>Email</a>
              <a className="btn btnSoft" href={LINKS.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </Section>

        <footer className="footer">
          <div>© {year} Mari Zakadze</div>
          <div className="muted">Next.js · Vercel</div>
        </footer>
      </main>

      <style jsx global>{`
        :root {
          /* Pastel premium palette */
          --ink: #111216;
          --text: rgba(17, 18, 22, 0.92);
          --muted: rgba(17, 18, 22, 0.62);

          --glass: rgba(255, 255, 255, 0.55);
          --glass-strong: rgba(255, 255, 255, 0.72);
          --stroke: rgba(30, 35, 45, 0.10);

          --blue: #b9d7ff;
          --pink: #ffd2e3;
          --sand: #f3e4d4;
          --lav: #e5ddff;

          --shadow: 0 22px 70px rgba(18, 22, 32, 0.10);
          --shadow2: 0 10px 30px rgba(18, 22, 32, 0.08);
          --radius: 22px;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
          color: var(--text);
          background: #fbfbfd;
        }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }

        .page { position: relative; min-height: 100vh; }

        .bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .bgGradient {
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle at 20% 20%, var(--blue), transparent 45%),
                      radial-gradient(circle at 80% 30%, var(--pink), transparent 45%),
                      radial-gradient(circle at 40% 90%, var(--sand), transparent 45%),
                      radial-gradient(circle at 75% 85%, var(--lav), transparent 45%);
          filter: blur(45px);
          opacity: 0.55;
          animation: drift 18s ease-in-out infinite;
        }
        @keyframes drift {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(1.5%, -1.2%, 0) scale(1.03); }
        }
        .blob {
          position: absolute;
          border-radius: 999px;
          filter: blur(22px);
          opacity: 0.55;
          animation: floaty 10s ease-in-out infinite;
        }
        .blobA {
          width: 340px; height: 340px;
          left: -120px; top: 110px;
          background: radial-gradient(circle at 30% 30%, var(--pink), transparent 55%);
        }
        .blobB {
          width: 420px; height: 420px;
          right: -160px; bottom: -80px;
          background: radial-gradient(circle at 30% 30%, var(--blue), transparent 55%);
          animation-delay: 1.2s;
        }
        @keyframes floaty {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .gridNoise {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(20,25,35,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20,25,35,0.04) 1px, transparent 1px);
          background-size: 42px 42px;
          opacity: 0.30;
          mask-image: radial-gradient(circle at 30% 20%, black, transparent 55%);
        }

        .container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(251, 251, 253, 0.68);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--stroke);
        }
        .topbarInner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
        }
        .brand {
          display: flex; align-items: center; gap: 12px;
          min-width: 220px;
        }
        .logoMark {
          height: 40px; width: 40px;
          border-radius: 14px;
          background: rgba(255,255,255,0.7);
          border: 1px solid var(--stroke);
          box-shadow: var(--shadow2);
          display: grid; place-items: center;
          font-weight: 700;
          color: rgba(17,18,22,0.88);
        }
        .brandName { font-size: 14px; font-weight: 700; }
        .brandRole { font-size: 12px; color: var(--muted); margin-top: 2px; }

        .nav { display: none; gap: 18px; color: var(--muted); font-size: 13px; }
        .navLink:hover { color: rgba(17,18,22,0.9); }

        .navCtas { display: flex; gap: 10px; align-items: center; }

        .btn {
          border: 1px solid var(--stroke);
          border-radius: 14px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
          box-shadow: 0 10px 26px rgba(18,22,32,0.06);
          background: rgba(255,255,255,0.68);
        }
        .btn:hover { transform: translateY(-1px); box-shadow: 0 16px 40px rgba(18,22,32,0.10); }
        .btn:active { transform: translateY(0); }

        .btnPrimary {
          background: linear-gradient(135deg, rgba(185,215,255,0.95), rgba(255,210,227,0.85));
        }
        .btnSoft {
          background: rgba(255,255,255,0.72);
        }
        .btnGhost {
          background: rgba(255,255,255,0.42);
        }

        .toast {
          position: fixed;
          right: 18px;
          top: 76px;
          z-index: 60;
          background: rgba(255,255,255,0.78);
          border: 1px solid var(--stroke);
          padding: 10px 12px;
          border-radius: 14px;
          box-shadow: var(--shadow2);
          font-size: 13px;
          color: rgba(17,18,22,0.82);
          animation: pop 220ms ease-out;
        }
        @keyframes pop {
          from { transform: translateY(-6px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .main { padding: 34px 0 60px; display: flex; flex-direction: column; gap: 64px; }

        .hero {
          display: grid;
          gap: 22px;
          grid-template-columns: 1fr;
          align-items: start;
        }
        .heroLeft { padding: 6px 0; }
        .tag {
          display: inline-flex;
          gap: 10px;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.58);
          border: 1px solid var(--stroke);
          color: rgba(17,18,22,0.72);
          font-size: 12px;
          font-weight: 600;
          box-shadow: var(--shadow2);
        }
        .pulse {
          width: 8px; height: 8px; border-radius: 999px;
          background: rgba(79, 190, 140, 0.9);
          box-shadow: 0 0 0 6px rgba(79,190,140,0.18);
          animation: ping 1.8s ease-in-out infinite;
        }
        @keyframes ping {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.85; }
        }

        .h1 {
          margin: 16px 0 0;
          font-size: 34px;
          line-height: 1.08;
          letter-spacing: -0.02em;
          font-weight: 750;
          color: rgba(17,18,22,0.92);
        }
        .lead {
          margin: 12px 0 0;
          font-size: 15px;
          line-height: 1.7;
          color: var(--muted);
          max-width: 56ch;
        }

        .heroCtas { margin-top: 18px; display: flex; flex-wrap: wrap; gap: 10px; }

        .kpis {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          max-width: 640px;
        }
        .kpi {
          border: 1px solid var(--stroke);
          background: rgba(255,255,255,0.58);
          border-radius: var(--radius);
          padding: 14px 14px;
          box-shadow: var(--shadow2);
        }
        .kpiTop { font-size: 12px; color: var(--muted); font-weight: 650; }
        .kpiVal { margin-top: 6px; font-size: 13px; font-weight: 720; color: rgba(17,18,22,0.90); }

        .heroRight { display: flex; justify-content: flex-start; }
        .photoCard {
          width: min(430px, 100%);
          border: 1px solid var(--stroke);
          background: rgba(255,255,255,0.55);
          border-radius: 28px;
          padding: 14px;
          box-shadow: var(--shadow);
          transition: transform 220ms ease, box-shadow 220ms ease;
        }
        .photoCard:hover { transform: translateY(-2px); box-shadow: 0 30px 90px rgba(18,22,32,0.14); }
        .photoFrame {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(30,35,45,0.10);
          background: rgba(255,255,255,0.7);
        }
        .photo { object-fit: cover; }
        .photoMeta { padding: 12px 6px 4px; }
        .photoName { font-weight: 760; color: rgba(17,18,22,0.92); }
        .photoSub { margin-top: 3px; font-size: 12px; color: var(--muted); }

        .section { }
        .sectionHead { margin-bottom: 14px; }
        .eyebrow {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(17,18,22,0.55);
        }
        .h2 {
          margin: 8px 0 0;
          font-size: 20px;
          font-weight: 760;
          letter-spacing: -0.01em;
          color: rgba(17,18,22,0.90);
        }
        .sub {
          margin: 8px 0 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
          max-width: 70ch;
        }

        .reveal {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 700ms ease, transform 700ms ease;
        }
        .reveal--in {
          opacity: 1;
          transform: translateY(0);
        }

        .panel {
          border: 1px solid var(--stroke);
          border-radius: var(--radius);
          background: rgba(255,255,255,0.58);
          padding: 16px;
          box-shadow: var(--shadow2);
        }
        .p { margin: 0; font-size: 14px; line-height: 1.8; color: var(--muted); }

        .filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .pill {
          border: 1px solid var(--stroke);
          background: rgba(255,255,255,0.45);
          color: rgba(17,18,22,0.70);
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 160ms ease, transform 160ms ease;
        }
        .pill:hover { transform: translateY(-1px); background: rgba(255,255,255,0.65); }
        .pill--active {
          background: linear-gradient(135deg, rgba(185,215,255,0.85), rgba(255,210,227,0.72));
          color: rgba(17,18,22,0.82);
        }

        .chips { display: flex; flex-wrap: wrap; gap: 10px; }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid var(--stroke);
          background: rgba(255,255,255,0.55);
          box-shadow: 0 10px 24px rgba(18,22,32,0.05);
          color: rgba(17,18,22,0.78);
          font-size: 13px;
          font-weight: 650;
          transition: transform 160ms ease, background 160ms ease;
        }
        .chip:hover { transform: translateY(-1px); background: rgba(255,255,255,0.72); }
        .chipDot {
          width: 8px; height: 8px; border-radius: 99px;
          background: rgba(17,18,22,0.35);
        }

        .grid2 { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .card {
          border: 1px solid var(--stroke);
          border-radius: var(--radius);
          background: rgba(255,255,255,0.58);
          padding: 16px;
          box-shadow: var(--shadow2);
          transition: transform 180ms ease, background 180ms ease;
        }
        .card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.70); }
        .cardTop { display: flex; flex-direction: column; gap: 6px; }
        .cardTitle { font-weight: 780; color: rgba(17,18,22,0.90); }
        .cardMeta { font-size: 12px; color: var(--muted); }

        .list { margin: 12px 0 0; padding: 0; list-style: none; display: grid; gap: 8px; }
        .li { display: grid; grid-template-columns: 10px 1fr; gap: 10px; align-items: start; color: rgba(17,18,22,0.72); font-size: 13px; line-height: 1.6; }
        .dot { width: 6px; height: 6px; border-radius: 99px; background: rgba(17,18,22,0.32); margin-top: 7px; }

        .grid3 { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .miniCard {
          border: 1px solid var(--stroke);
          border-radius: var(--radius);
          background: rgba(255,255,255,0.58);
          padding: 16px;
          box-shadow: var(--shadow2);
          transition: transform 180ms ease, background 180ms ease;
        }
        .miniCard:hover { transform: translateY(-2px); background: rgba(255,255,255,0.70); }
        .miniTop { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .miniTitle { font-weight: 780; color: rgba(17,18,22,0.90); }
        .miniTag {
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid var(--stroke);
          background: rgba(255,255,255,0.52);
          color: rgba(17,18,22,0.66);
          font-weight: 750;
        }
        .miniText { margin: 10px 0 0; color: rgba(17,18,22,0.70); font-size: 13px; line-height: 1.7; }

        .contact {
          border: 1px solid var(--stroke);
          border-radius: var(--radius);
          background: rgba(255,255,255,0.58);
          padding: 16px;
          box-shadow: var(--shadow2);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .contactTitle { font-weight: 780; color: rgba(17,18,22,0.90); }
        .contactValue { margin-top: 6px; font-size: 13px; color: rgba(17,18,22,0.75); }
        .contactHint { margin-top: 6px; font-size: 12px; color: var(--muted); }
        .contactRight { display: flex; flex-wrap: wrap; gap: 10px; }

        .footer {
          margin-top: 12px;
          padding-top: 18px;
          border-top: 1px solid var(--stroke);
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          color: var(--muted);
        }
        .muted { opacity: 0.85; }

        @media (min-width: 900px) {
          .nav { display: flex; }
          .hero { grid-template-columns: 1.15fr 0.85fr; gap: 32px; }
          .kpis { grid-template-columns: repeat(3, 1fr); }
          .grid2 { grid-template-columns: repeat(2, 1fr); }
          .grid3 { grid-template-columns: repeat(3, 1fr); }
          .contact { flex-direction: row; align-items: center; justify-content: space-between; }
        }
      `}</style>
    </div>
  );
}
