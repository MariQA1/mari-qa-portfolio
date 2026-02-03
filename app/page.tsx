export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", padding: "48px 20px", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <h1 style={{ fontSize: 44, margin: 0 }}>Mari Zakadze</h1>
        <p style={{ fontSize: 18, opacity: 0.85, marginTop: 10 }}>
          QA Lead & Senior QA Engineer · Software & Mobile QA · Accessibility (WCAG A/AA)
        </p>

        <p style={{ marginTop: 18, maxWidth: 720, lineHeight: 1.6, opacity: 0.75 }}>
          I help teams ship stable, user-friendly products by combining strong QA processes,
          accessibility-first thinking, and hands-on testing across web, mobile, frontend, backend, and APIs.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
          <a
            href="https://www.linkedin.com/in/mari-zakaidze"
            target="_blank"
            style={{ background: "#fff", color: "#000", padding: "10px 14px", borderRadius: 10, textDecoration: "none", fontWeight: 600 }}
          >
            LinkedIn
          </a>
          <a
            href="mailto:mariazakaidze@gmail.com"
            style={{ border: "1px solid #333", color: "#fff", padding: "10px 14px", borderRadius: 10, textDecoration: "none" }}
          >
            Email me
          </a>
        </div>

        <h2 style={{ marginTop: 48, fontSize: 24 }}>Core Skills</h2>
        <ul style={{ lineHeight: 1.9, opacity: 0.85 }}>
          <li>Manual Testing (Web & Mobile)</li>
          <li>API Testing (Swagger)</li>
          <li>Accessibility Testing (WCAG A/AA)</li>
          <li>Frontend, Backend & UI Testing</li>
          <li>Test Strategy, Reporting, Bug Management</li>
          <li>Jira / Confluence / BrowserStack</li>
        </ul>

        <h2 style={{ marginTop: 36, fontSize: 24 }}>Experience</h2>

        <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
          {[
            { title: "Senior Quality Assurance Engineer — Kanda Software", date: "Oct 2025 – Present", bullets: ["Leading quality initiatives and supporting stable releases across complex systems."] },
            { title: "Senior Quality Assurance Engineer — EPAM Systems", date: "Nov 2024 – Dec 2025", bullets: ["Worked in distributed teams, focusing on cross-platform testing and quality improvements."] },
            { title: "Senior QA Engineer — Moncero", date: "Apr 2024 – Sep 2024", bullets: ["API testing for functionality & performance", "Backend robustness validation", "Frontend & UI quality assurance"] },
            { title: "QA Engineer — Patolomius Technologies", date: "Aug 2023 – Apr 2024", bullets: ["Tested gambling platforms and validated game correctness", "Assessed stability/performance and shared improvement insights"] },
          ].map((job) => (
            <div key={job.title} style={{ border: "1px solid #222", borderRadius: 14, padding: 16 }}>
              <div style={{ fontWeight: 700 }}>{job.title}</div>
              <div style={{ opacity: 0.7, fontSize: 14, marginTop: 4 }}>{job.date}</div>
              <ul style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.7 }}>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 50, opacity: 0.55, fontSize: 13 }}>
          © {new Date().getFullYear()} Mari Zakadze · QA Portfolio
        </div>
      </div>
    </div>
  );
}
