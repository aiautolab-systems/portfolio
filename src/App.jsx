import './App.css'
import {
  personalInfo,
  summary,
  highlights,
  skills,
  experience,
  certifications,
  navLinks,
} from './content'

function App() {
  const phoneHref = `tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`

  return (
    <div className="app-shell">
      <div className="background-glow" aria-hidden="true" />
      <div className="background-grid" aria-hidden="true" />

      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">AO</span>
          <span className="brand-text">{personalInfo.name}</span>
        </div>

        <nav className="site-nav" aria-label="main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="outline-button" href={`mailto:${personalInfo.email}`}>
            Let&apos;s Talk
          </a>
        </div>
      </header>

      <main className="content">
        <section id="about" className="section hero">
          <div className="hero-pill">SDET / QA Leadership Roles</div>
          <h1 className="hero-name">{personalInfo.name}</h1>
          <h2 className="hero-title">{personalInfo.title}</h2>
          <p className="hero-tagline">{personalInfo.tagline}</p>

          <div className="hero-meta">
            <div>
              <span className="meta-label">Location</span>
              <span>{personalInfo.location}</span>
            </div>
            <div>
              <span className="meta-label">Email</span>
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </div>
            <div>
              <span className="meta-label">Phone</span>
              <a href={phoneHref}>{personalInfo.phone}</a>
            </div>
            <div>
              <span className="meta-label">LinkedIn</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                Connect
              </a>
            </div>
          </div>

          <div className="hero-actions">
            <a
              className="cta-button"
              href={`mailto:${personalInfo.email}?subject=Hi%20Alper`}
            >
              Start a Conversation
            </a>
            {personalInfo.resumeUrl ? (
              <a
                className="cta-button cta-secondary"
                href={personalInfo.resumeUrl}
                download
              >
                Download Resume
              </a>
            ) : null}
            <a
              className="cta-button cta-secondary"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              View LinkedIn
            </a>
          </div>
        </section>

        <section className="section summary" aria-labelledby="summary-heading">
          <h3 id="summary-heading" className="section-title">
            Profile
          </h3>
          <p className="summary-copy">{summary}</p>
        </section>

        <section
          id="highlights"
          className="section highlights"
          aria-labelledby="highlights-heading"
        >
          <h3 id="highlights-heading" className="section-title">
            Impact Highlights
          </h3>
          <div className="cards-grid">
            {highlights.map((item) => (
              <article key={item.label} className="card glass">
                <span className="card-stat">{item.stat}</span>
                <h4>{item.label}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="skills"
          className="section skills"
          aria-labelledby="skills-heading"
        >
          <h3 id="skills-heading" className="section-title">
            Core Skills
          </h3>
          <div className="cards-grid">
            {skills.map((group) => (
              <article key={group.category} className="card glass">
                <h4>{group.category}</h4>
                <div className="chip-row">
                  {group.items.map((item) => (
                    <span key={item} className="skill-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="section experience"
          aria-labelledby="experience-heading"
        >
          <h3 id="experience-heading" className="section-title">
            Experience Timeline
          </h3>
          <div className="timeline">
            {experience.map((role) => (
              <article key={role.company} className="timeline-card glass">
                <div className="timeline-meta">
                  <span className="timeline-company">{role.company}</span>
                  <span className="timeline-period">{role.period}</span>
                </div>
                <h4>{role.role}</h4>
                <ul>
                  {role.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section certifications"
          aria-labelledby="certifications-heading"
        >
          <h3 id="certifications-heading" className="section-title">
            Certifications & Training
          </h3>
          <div className="chip-row">
            {certifications.map((cert) => (
              <span key={cert.name} className="skill-chip">
                {cert.name}
              </span>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="section contact glass"
          aria-labelledby="contact-heading"
        >
          <h3 id="contact-heading" className="section-title">
            Let&apos;s Build Reliable Releases
          </h3>
          <p>
            Ready to scale automation, observability, and AI-assisted quality
            programs. I&apos;m available for full-time or consulting engagements,
            remote or hybrid.
          </p>
          <div className="contact-actions">
            <a className="cta-button" href={`mailto:${personalInfo.email}`}>
              Email Alper
            </a>
            <a className="cta-button cta-secondary" href={phoneHref}>
              Call {personalInfo.phone}
            </a>
            {personalInfo.resumeUrl ? (
              <a
                className="cta-button cta-secondary"
                href={personalInfo.resumeUrl}
                download
              >
                Download Resume
              </a>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </span>
      </footer>
    </div>
  )
}

export default App
