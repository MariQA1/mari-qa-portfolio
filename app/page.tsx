"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

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
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const { ref, shown } = useRevealOnScroll();

  return (
    <section id={id} className="scroll-mt-24">
      <div
        ref={ref}
        className={[
          "transition-all duration-700 ease-out",
          shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        ].join(" ")}
      >
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-sm md:text-base text-white/60 max-w-3xl">
              {subtitle}
            </p>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
      {children}
    </span>
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:bg-white/[0.05] transition-colors">
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-white">{title}</div>
        <div className="text-sm text-white/60">{meta}</div>
      </div>
      <ul className="mt-4 space-y-2 text-sm md:text-[15px] leading-relaxed text-white/75">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);

  // ✅ Update these links (very important)
  const LINKS = {
    linkedin: "https://www.linkedin.com/in/mari-zakaidze",
    email: "mariazakaidze@gmail.com",
    cv: "", // optional: add a Google Drive / Dropbox CV link later
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-white">
      {/* Subtle premium background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-56 right-[-160px] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-white/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07070A]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-sm font-semibold">M</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Mari Zakadze</div>
              <div className="text-xs text-white/60">
                Senior QA · Accessibility · Web & Mobile
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a className="hover:text-white transition-colors" href="#about">
              About
            </a>
            <a className="hover:text-white transition-colors" href="#skills">
              Skills
            </a>
            <a className="hover:text-white transition-colors" href="#experience">
              Experience
            </a>
            <a className="hover:text-white transition-colors" href="#contact">
              Contact
            </a>
          </nav>

          <a
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
            href={`mailto:${LINKS.email}`}
          >
            Email
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="relative mx-auto max-w-6xl px-5 pb-16 pt-12 md:pt-16 space-y-16">
        {/* HERO */}
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
              Open to opportunities · Remote/Hybrid
            </div>

            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
              QA Lead mindset.
              <span className="text-white/70"> Recruiter-friendly clarity.</span>
            </h1>

            <p className="text-sm md:text-lg text-white/65 max-w-2xl leading-relaxed">
              I ensure stable releases and premium user experiences through
              hands-on testing across web and mobile, accessibility (WCAG A/AA),
              and strong defect reporting & collaboration.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                View LinkedIn
              </a>

              <a
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                href={`mailto:${LINKS.email}`}
              >
                Contact me
              </a>

              {LINKS.cv ? (
                <a
                  className="rounded-xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  href={LINKS.cv}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download CV
                </a>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Chip>Manual Testing</Chip>
              <Chip>API Testing (Swagger)</Chip>
              <Chip>Accessibility (WCAG)</Chip>
              <Chip>Web & Mobile QA</Chip>
              <Chip>Jira / Confluence</Chip>
              <Chip>BrowserStack</Chip>
            </div>
          </div>

          {/* Photo card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
              {/* Put your uploaded image in /public/profile.jpg */}
              <Image
                src="/profile.jpg"
                alt="Profile photo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-4 space-y-1">
              <div className="text-sm font-semibold">Mari Zakadze</div>
              <div className="text-xs text-white/60">
                Software & Mobile QA · Accessibility
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-white/70">Focus</div>
                <div className="mt-1 font-semibold">Quality & UX</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-white/70">Strength</div>
                <div className="mt-1 font-semibold">Clarity & detail</div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <Section
          id="about"
          title="About"
          subtitle="A concise summary recruiters can scan in 10 seconds."
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
            <p className="text-sm md:text-[15px] leading-relaxed text-white/75 max-w-4xl">
              I’m a Senior QA Engineer / QA Lead with experience in web and
              mobile testing, API validation, and accessibility compliance.
              I focus on reliable delivery: clear test coverage, meaningful bug
              reports, and smooth collaboration with developers and product teams.
            </p>
          </div>
        </Section>

        {/* SKILLS */}
        <Section
          id="skills"
          title="Core skills"
          subtitle="Focused and relevant — no fluff."
        >
          <div className="flex flex-wrap gap-2">
            {[
              "Manual Testing (Web/Mobile)",
              "API Testing (Swagger)",
              "Accessibility (WCAG A/AA)",
              "UI/UX Validation (Figma)",
              "Cross-browser/device testing",
              "Regression & Smoke testing",
              "Bug reporting & triage",
              "Jira / Confluence",
              "BrowserStack",
              "DevTools (Console/Network)",
            ].map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section
          id="experience"
          title="Experience"
          subtitle="Clear, impact-focused bullets."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Card
              title="Senior Quality Assurance Engineer — Kanda Software"
              meta="Oct 2025 – Present"
              bullets={[
                "Driving quality initiatives and supporting stable releases across complex systems.",
                "Ensuring consistent product behavior across platforms and environments.",
              ]}
            />
            <Card
              title="Senior Quality Assurance Engineer — EPAM Systems"
              meta="Nov 2024 – Dec 2025"
              bullets={[
                "Cross-platform testing in distributed teams with strong documentation and reporting.",
                "Contributed to quality improvements and smoother release confidence.",
              ]}
            />
            <Card
              title="Senior QA Engineer — Moncero"
              meta="Apr 2024 – Sep 2024"
              bullets={[
                "API testing for functionality and performance; clear reporting of findings.",
                "Backend reliability validation through thorough test coverage.",
                "Frontend & UI testing to ensure a seamless user experience.",
              ]}
            />
            <Card
              title="QA Engineer — Patolomius Technologies"
              meta="Aug 2023 – Apr 2024"
              bullets={[
                "Validated gambling platform functionality and game correctness.",
                "Assessed stability/performance and shared improvement insights with teams.",
              ]}
            />
          </div>
        </Section>

        {/* CONTACT */}
        <Section
          id="contact"
          title="Contact"
          subtitle="One clean CTA — recruiter-friendly."
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Let’s connect</div>
              <div className="text-sm text-white/60 mt-1">
                Email is the fastest way. LinkedIn works too.
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                href={`mailto:${LINKS.email}`}
              >
                Email me
              </a>
              <a
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Section>

        <footer className="pt-6 border-t border-white/10 text-xs text-white/50 flex flex-col md:flex-row gap-2 justify-between">
          <div>© {year} Mari Zakadze</div>
          <div className="text-white/40">Built with Next.js · Deployed on Vercel</div>
        </footer>
      </main>
    </div>
  );
}
