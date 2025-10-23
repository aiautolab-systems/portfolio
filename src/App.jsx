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
  const currentRole = experience[0]

  return (
    <div className="app-shell">
      <div className="background-gradient" aria-hidden="true" />
      <div className="background-noise" aria-hidden="true" />

      <header className="site-header">
        <a href="#about" className="brand" aria-label="Back to profile overview">
          <span className="brand-mark" aria-hidden="true">
            AO
          </span>
          <span className="brand-text">
            <span className="brand-name">{personalInfo.name}</span>
            <span className="brand-role">{personalInfo.title}</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="capsule-link" href={`mailto:${personalInfo.email}`}>
            Let&apos;s Talk
          </a>
        </div>
      </header>

      <main className="page">
        <section id="about" className="section hero" aria-labelledby="hero-heading">
          <div className="hero-grid">
            <div className="hero-content">
              <p className="hero-eyebrow">Quality Engineering Leadership</p>
              <h1 id="hero-heading">{personalInfo.name}</h1>
              <p className="hero-title">{personalInfo.title}</p>
              <p className="hero-lede">{personalInfo.tagline}</p>

              <div className="hero-actions">
                <a
                  className="action-button primary"
                  href={`mailto:${personalInfo.email}?subject=Hi%20Alper`}
                >
                  Start a Conversation
                </a>
                {personalInfo.resumeUrl ? (
                  <a className="action-button" href={personalInfo.resumeUrl} download>
                    Download Resume
                  </a>
                ) : null}
                <a
                  className="action-button subtle"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  View LinkedIn
                </a>
              </div>

              <dl className="hero-meta">
                <div>
                  <dt>Location</dt>
                  <dd>{personalInfo.location}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={phoneHref}>{personalInfo.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>LinkedIn</dt>
                  <dd>
                    <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                      Connect
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <aside className="hero-panel" aria-label="Snapshot">
              <div className="panel-card">
                <span className="panel-label">Currently</span>
                <h3>{currentRole.role}</h3>
                <p>{currentRole.company}</p>
                <span className="panel-meta">{currentRole.period}</span>
              </div>
              <div className="panel-card contact-card">
                <span className="panel-label">Let&apos;s Connect</span>
                <a href={`mailto:${personalInfo.email}`}>Email</a>
                <a href={phoneHref}>Call</a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="section profile" aria-labelledby="profile-heading">
          <div className="section-heading">
            <span className="section-eyebrow">Profile</span>
            <h2 id="profile-heading">How I elevate quality for product teams</h2>
          </div>
          <p className="profile-summary">{summary}</p>
        </section>

        <section id="highlights" className="section feature-section" aria-labelledby="highlights-heading">
          <div className="section-heading">
            <span className="section-eyebrow">Impact</span>
            <h2 id="highlights-heading">Recent outcomes I&apos;m proud to share</h2>
          </div>
          <div className="feature-grid">
            {highlights.map((item) => (
              <article key={item.label} className="feature-card">
                <span className="feature-stat">{item.stat}</span>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section skills" aria-labelledby="skills-heading">
          <div className="section-heading">
            <span className="section-eyebrow">Toolkit</span>
            <h2 id="skills-heading">Tools and platforms I orchestrate</h2>
          </div>
          <div className="skill-groups">
            {skills.map((group) => (
              <article key={group.category} className="skill-card">
                <h3>{group.category}</h3>
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

        <section id="experience" className="section experience" aria-labelledby="experience-heading">
          <div className="section-heading">
            <span className="section-eyebrow">Journey</span>
            <h2 id="experience-heading">Experience shipping confident releases</h2>
          </div>
          <div className="experience-stack">
            {experience.map((role) => (
              <article key={`${role.company}-${role.period}`} className="experience-card">
                <header>
                  <div>
                    <span className="experience-company">{role.company}</span>
                    <h3>{role.role}</h3>
                  </div>
                  <span className="experience-period">{role.period}</span>
                </header>
                <ul>
                  {role.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section credentials" aria-labelledby="credentials-heading">
          <div className="section-heading">
            <span className="section-eyebrow">Credentials</span>
            <h2 id="credentials-heading">Certifications &amp; training</h2>
          </div>
          <div className="chip-row">
            {certifications.map((cert) =>
              cert.url ? (
                <a
                  key={cert.name}
                  className="badge-chip"
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cert.name}
                </a>
              ) : (
                <span key={cert.name} className="badge-chip">
                  {cert.name}
                </span>
              ),
            )}
          </div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-heading">
          <div className="section-heading">
            <span className="section-eyebrow">Next step</span>
            <h2 id="contact-heading">Let&apos;s build confident releases together</h2>
          </div>
          <p>
            Ready to scale automation, observability, and AI-assisted quality programs. I&apos;m available for
            full-time or consulting engagements, remote or hybrid.
          </p>
          <div className="contact-actions">
            <a className="action-button primary" href={`mailto:${personalInfo.email}`}>
              Email Alper
            </a>
            <a className="action-button" href={phoneHref}>
              Call {personalInfo.phone}
            </a>
            {personalInfo.resumeUrl ? (
              <a className="action-button subtle" href={personalInfo.resumeUrl} download>
                Download Resume
              </a>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
      </footer>
    </div>
  )
}

export default App
