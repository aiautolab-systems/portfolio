import { motion } from 'framer-motion'
import { FileDown, Mail, Phone, ExternalLink, ChevronRight, CheckCircle2, Link as Linkedin, Briefcase, GraduationCap, Award, TerminalSquare } from 'lucide-react'
import {
  personalInfo,
  summary,
  highlights,
  skills,
  experience,
  certifications,
  navLinks,
} from './content'
import { useAnalytics } from './hooks/useAnalytics'

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

function App() {
  const {
    trackEmailClick,
    trackPhoneClick,
    trackResumeDownload,
    trackLinkedInClick,
    trackClick,
  } = useAnalytics()
  const phoneHref = `tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`
  const currentRole = experience[0]

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-emerald-500/30 font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
      
      <header data-testid="site-header" role="banner" className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-950/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#about" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 font-bold text-white shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105">
              AO
            </div>
              <div className="hidden sm:block">
                <div data-testid="brand-name" className="font-semibold leading-none text-neutral-100">{personalInfo.name}</div>
                <div data-testid="brand-role" className="text-xs text-neutral-400 mt-1">{personalInfo.title}</div>
              </div>
          </a>

          <nav data-testid="primary-nav" aria-label="Primary" className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm font-medium text-neutral-400">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className="hover:text-neutral-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${personalInfo.email}`}
              data-testid="header-contact-link"
              onClick={() => trackEmailClick()}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-white/5"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Let's Talk</span>
            </a>
          </div>
        </div>
      </header>

      <main className="page relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 space-y-32">
        {/* Hero Section */}
        <section id="about" className="section hero pt-12">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for new opportunities
            </div>
            <h1 data-testid="hero-name" className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-2">
              {personalInfo.name}
            </h1>
            <p data-testid="hero-title" className="text-2xl text-emerald-400 font-semibold mb-6">
              {personalInfo.title}
            </p>
            <p className="max-w-2xl text-lg text-neutral-400 leading-relaxed mb-10">
              {personalInfo.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a 
                href={`mailto:${personalInfo.email}?subject=Hi%20Alper`}
                data-testid="hero-start-conversation-button"
                onClick={() => trackEmailClick()}
                className="group flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-500 active:scale-95"
              >
                Start a Conversation
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              {personalInfo.resumeUrl && (
                <a 
                  href={personalInfo.resumeUrl}
                  download
                  data-testid="hero-download-resume-button"
                  onClick={() => trackResumeDownload()}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-neutral-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/5"
                >
                  <FileDown className="h-4 w-4" />
                  Download Resume
                </a>
              )}
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                data-testid="hero-linkedin-link"
                onClick={() => trackLinkedInClick()}
                className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 px-6 text-neutral-300 font-medium backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/5"
              >
                Connect
              </a>
            </div>

            <div className="hero-meta mt-8 flex flex-col sm:flex-row gap-6 text-sm text-neutral-400">
              <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors" data-testid="hero-email-link">
                {personalInfo.email}
              </a>
              <a href={phoneHref} className="hover:text-white transition-colors" data-testid="hero-phone-link">
                {personalInfo.phone}
              </a>
              <span className="hidden sm:inline">|</span>
              <span>{personalInfo.location}</span>
            </div>

            <aside aria-label="Snapshot" className="hero-panel mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl max-w-md">
              <div className="panel-card">
                <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2 block">Currently</span>
                <h3 className="text-xl font-bold text-white mb-1">{currentRole.role}</h3>
                <p className="text-neutral-300 mb-1">{currentRole.company}</p>
                <span className="text-sm text-neutral-500">{currentRole.period}</span>
              </div>
              <div className="contact-card mt-6 pt-6 border-t border-white/10 hidden sm:block">
                <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2 block">Let's Connect</span>
                <div className="flex gap-4 text-sm text-neutral-300">
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">Email</a>
                  <a href={phoneHref} className="hover:text-white transition-colors">Call</a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="sr-only">View LinkedIn</a>
                </div>
              </div>
            </aside>
          </FadeIn>
        </section>

        {/* Profile Summary */}
        <section>
          <FadeIn>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 backdrop-blur-xl shadow-2xl shadow-black/50">
              <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
              <p className="profile-summary text-neutral-400 text-lg leading-relaxed">
                {summary}
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Impact / Highlights */}
        <section id="highlights" data-testid="highlights-section" className="section highlights">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Award className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Recent outcomes I'm proud to share</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {highlights.map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.1}>
                  <div data-testid="feature-card" className="feature-card group h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-all hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-emerald-500/10">
                    <div className="feature-stat text-3xl font-bold text-emerald-400 mb-2">{item.stat}</div>
                    <h3 className="text-lg font-semibold text-white mb-3">{item.label}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Skills */}
        <section id="skills" data-testid="skills-section" className="skills section">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10">
                <TerminalSquare className="h-5 w-5 text-teal-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Tools and platforms I orchestrate</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {skills.map((group, i) => (
                <FadeIn key={group.category} delay={i * 0.1}>
                  <div data-testid={`skill-category-${group.category.toLowerCase().replace(/[\s&]/g, '-')}`} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
                    <h3 className="text-lg font-semibold text-white mb-6">{group.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span 
                          key={item} 
                          className="inline-flex items-center rounded-lg border border-neutral-700/50 bg-neutral-800/50 px-3 py-1 text-sm text-neutral-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Experience */}
        <section id="experience" data-testid="experience-section" className="section experience">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Briefcase className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Experience shipping confident releases</h2>
            </div>
            <div className="space-y-8 border-l border-neutral-800 ml-5 pl-8 sm:ml-0 sm:pl-0 sm:border-none">
              {experience.map((role, i) => (
                <FadeIn key={`${role.company}-${role.period}`} delay={i * 0.1}>
                  <div data-testid="experience-card" className="experience-card relative flex flex-col sm:flex-row gap-6 sm:gap-12 group">
                    {/* Timeline dot */}
                    <div className="absolute -left-10 mt-1.5 hidden sm:flex h-4 w-4 items-center justify-center rounded-full border-2 border-neutral-950 bg-emerald-500 outline outline-1 outline-neutral-800 group-hover:bg-emerald-400 transition-colors" />
                    
                    <div className="sm:w-1/4 pt-1">
                      <div className="experience-period text-sm font-medium text-neutral-400 mb-1">{role.period}</div>
                      <div className="experience-company font-semibold text-white text-lg">{role.company}</div>
                    </div>
                    <div className="sm:w-3/4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-lg hover:bg-white/10 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
                      <h3 className="text-xl font-bold text-white mb-6">{role.role}</h3>
                      <ul className="space-y-4">
                        {role.bullets.map((point, j) => (
                          <li key={j} className="flex gap-3 text-neutral-300">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500/50 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Certifications */}
        <section className="credentials section">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <GraduationCap className="h-5 w-5 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Certifications & training</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {certifications.map((cert) => (
                cert.url ? (
                  <a
                    key={cert.name}
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackClick('certification', cert.name)}
                    className="badge-chip group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-neutral-300 backdrop-blur-lg transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-emerald-500/10"
                  >
                    {cert.name}
                    <ExternalLink className="h-4 w-4 text-neutral-500 group-hover:text-white transition-colors" />
                  </a>
                ) : (
                  <span 
                    key={cert.name} 
                    className="badge-chip flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-neutral-400 backdrop-blur-lg"
                  >
                    {cert.name}
                  </span>
                )
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Contact CTA */}
        <section id="contact" data-testid="contact-section" className="pb-12">
          <FadeIn>
            <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Let's build confident releases together</h2>
                <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
                  Ready to scale automation, observability, and AI-assisted quality programs. I&apos;m available for full-time or consulting engagements, remote or hybrid.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    data-testid="contact-email-button"
                    onClick={() => trackEmailClick()}
                    className="rounded-xl bg-white px-8 py-4 font-bold text-emerald-600 transition-transform hover:scale-105 active:scale-95"
                  >
                    Email Alper
                  </a>
                  <a 
                    href={phoneHref}
                    onClick={() => trackPhoneClick()}
                    className="flex items-center gap-2 rounded-xl bg-emerald-700/50 px-8 py-4 font-bold text-white transition-colors hover:bg-emerald-700 backdrop-blur-sm"
                  >
                    <Phone className="h-5 w-5" />
                    Call {personalInfo.phone}
                  </a>
                  {personalInfo.resumeUrl && (
                    <a 
                      href={personalInfo.resumeUrl}
                      download
                      data-testid="contact-download-resume-button"
                      onClick={() => trackResumeDownload()}
                      className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/20 backdrop-blur-sm"
                    >
                      <FileDown className="h-5 w-5" />
                      Download Resume
                    </a>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <footer role="contentinfo" className="site-footer border-t border-white/5 bg-neutral-950 py-12 text-center text-neutral-500">
        <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        <p className="mt-2 text-sm">Built with React, Tailwind CSS, and Framer Motion.</p>
      </footer>
    </div>
  )
}

export default App
