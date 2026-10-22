import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { BrandLogo } from './TechLogos'

const PROJECTS = [
  {
    id: 1,
    title: 'Hostel Saathi',
    category: 'FULL-STACK',
    tagline: 'Role-based hostel grievance management platform.',
    description:
      'A full-stack hostel grievance management platform built for AKGEC with two independent portals (Student and Admin). Features OTP-verified registration, 4-role RBAC (Student, Warden, Chief Warden, Dean) with hostel-scoped authorization, complaint lifecycle tracking, photo evidence uploads, complete audit trails, hostel analytics, and email escalations.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Brevo', 'Cloudinary'],
    stats: ['4-Role RBAC', 'OTP Auth', 'Complaint Lifecycle', 'Hostel Analytics', 'Email Escalation'],
    accent: '#e86c60',
    github: 'https://github.com/shuklavaibhav30/Hostel-Greviance-Backend',
    live: 'https://hostelsaathi-v1.vercel.app/',
    liveLabel: 'STUDENT PORTAL',
    admin: 'https://hostelsaathi-admin.vercel.app/',
    details: {
      status: 'DEPLOYED',
      type: 'FULL-STACK',
      stack: 'React.js / Node.js / Express / MongoDB',
      architecture: '4-Role RBAC / OTP Auth / Audit Trails',
      deployment: 'Vercel / Render / Brevo API'
    }
  },
  {
    id: 2,
    title: 'VibeTube',
    category: 'FULL-STACK',
    tagline: 'Full-stack video sharing and streaming platform.',
    description:
      'A YouTube-inspired MERN platform for uploading, watching, liking, commenting, subscribing, managing playlists, and tracking watch history. Built with MVC architecture, RESTful APIs, secure access/refresh token JWT authentication, MongoDB Atlas, and Cloudinary for media storage and delivery.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'Render'],
    stats: ['REST APIs', 'Video Uploads', 'JWT Authentication', 'Cloud Media Storage'],
    accent: '#38bdf8',
    github: 'https://github.com/shuklavaibhav30/Vibe-Tube-Frontend',
    live: 'https://vibe-tube-frontend-ashen.vercel.app/',
    liveLabel: 'LIVE DEMO',
    details: {
      status: 'DEPLOYED',
      type: 'FULL-STACK',
      stack: 'React.js / Node.js / Express / MongoDB',
      architecture: 'MVC / RESTful APIs / JWT Auth',
      deployment: 'Render / Cloudinary / MongoDB Atlas'
    }
  },
  {
    id: 3,
    title: 'VendorSaathi',
    category: 'AI / BACKEND',
    tagline: 'AI-powered platform for street vendors & micro-entrepreneurs.',
    description:
      'An AI-powered backend platform for street vendors and micro-entrepreneurs to track daily sales and expenses, discover government schemes, and receive AI financial insights. Features role-aware REST APIs, LLM integration for demand prediction, an AI chatbot for scheme eligibility, Zod request validation, rate limiting, and optimized MongoDB indexing.',
    tags: ['Node.js', 'Express', 'MongoDB', 'AI API', 'JWT', 'Zod'],
    stats: ['AI Insights', 'Sales & Expense Tracking', 'Govt Schemes', 'AI Chatbot', 'REST APIs'],
    accent: '#f97316',
    github: 'https://github.com/shuklavaibhav30/VendorSaathi',
    live: 'https://vendor-saathi-opal.vercel.app/',
    liveLabel: 'LIVE DEMO',
    details: {
      status: 'DEPLOYED',
      type: 'AI / BACKEND',
      stack: 'Node.js / Express / MongoDB / AI API',
      architecture: 'RESTful API / LLM Engine / Zod Validation',
      deployment: 'Vercel / Render'
    }
  },
  {
    id: 4,
    title: 'BRL Society Website',
    category: 'FRONTEND',
    tagline: 'Official portal for Blockchain Research Lab at AKGEC.',
    description:
      'A modern responsive website for the Blockchain Research Lab at AKGEC, showcasing research, events, projects, team members, and alumni through a futuristic blockchain-themed interface. Built with React, TypeScript, Vite, and Tailwind CSS with smooth animations and interactive alumni network visualizations.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    stats: ['Interactive UI', 'Alumni Visualization', 'Event Showcases', 'Smooth Animations', 'Blockchain Theme'],
    accent: '#22c55e',
    github: 'https://github.com/shuklavaibhav30/BRL-AKGEC',
    live: 'https://brl.akgec.ac.in/',
    liveLabel: 'LIVE DEMO',
    details: {
      status: 'LIVE',
      type: 'FRONTEND',
      stack: 'React / TypeScript / Tailwind CSS / Vite',
      architecture: 'Component-Based UI / SPA / Animated',
      deployment: 'Custom Domain / Vercel'
    }
  },
  {
    id: 5,
    title: 'My Portfolio',
    category: 'FRONTEND',
    tagline: 'Personal developer portfolio & interactive terminal.',
    description:
      'A personal developer portfolio designed to showcase my full-stack development work, technical skills, achievements, experience, and projects through a modern neo-brutalist interface. Features responsive design, interactive micro-animations, and direct access to live project demos and source code repositories.',
    tags: ['React', 'JavaScript', 'CSS', 'Framer Motion', 'Vercel'],
    stats: ['Neo-Brutalism', 'Interactive Terminal', 'Live Telemetry', 'Bento Architecture'],
    accent: '#a855f7',
    github: 'https://github.com/shuklavaibhav30/My-portfolio',
    live: 'https://vaibhav-shukla.vercel.app/',
    liveLabel: 'LIVE DEMO',
    details: {
      status: 'LIVE',
      type: 'FRONTEND',
      stack: 'React.js / JavaScript / Vanilla CSS',
      architecture: 'Single Page App / Framer Motion',
      deployment: 'Vercel'
    }
  }
]

function ProjectCard({ project, index, isMobile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [showSpec, setShowSpec] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
      className="project-card"
    >
      {/* Top Banner Accent */}
      <div className="card-top-accent" style={{ background: project.accent }} />

      <div className="card-content">
        {/* Header Row */}
        <div className="card-header-row">
          <div className="category-and-status">
            <span
              className="category-badge"
              style={{
                background: project.category.includes('FULL-STACK') ? '#fef08a' : project.category.includes('AI') ? '#ffedd5' : '#e0f2fe'
              }}
            >
              {project.category}
            </span>
            <span className="live-status-pill">
              <span className="pulse-dot" />
              {project.details.status}
            </span>
          </div>

          <button
            onClick={() => setShowSpec(!showSpec)}
            className="spec-toggle-btn"
            title="Toggle Technical Architecture Spec"
          >
            {showSpec ? '← OVERVIEW' : 'ARCH SPEC ⚙'}
          </button>
        </div>

        {/* Title & Tagline */}
        <h3 className="project-title">{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>

        {/* Dynamic Body: Overview vs Architecture Spec */}
        {!showSpec ? (
          <>
            <p className="project-desc">{project.description}</p>

            {/* Highlights Stats */}
            <div className="stats-pills-row">
              {project.stats.map((s) => (
                <span key={s} className="stat-pill">
                  <span className="pill-dot" style={{ background: project.accent }} />
                  {s}
                </span>
              ))}
            </div>

            {/* Tags with Real Brand Logos */}
            <div className="tags-row">
              {project.tags.map((t) => (
                <span key={t} className="tech-tag">
                  <BrandLogo id={t} size={13} />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="arch-specs-box">
            <div className="spec-heading">// TECHNICAL ARCHITECTURE SPEC</div>
            <div className="spec-field">
              <span className="spec-key">STACK:</span>
              <span className="spec-val">{project.details.stack}</span>
            </div>
            <div className="spec-field">
              <span className="spec-key">ARCHITECTURE:</span>
              <span className="spec-val">{project.details.architecture}</span>
            </div>
            <div className="spec-field">
              <span className="spec-key">INFRA & DEPLOY:</span>
              <span className="spec-val">{project.details.deployment}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="project-actions">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="proj-btn code-btn"
          >
            CODE ↗
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="proj-btn live-btn"
          >
            {project.liveLabel} ↗
          </a>
          {project.admin && (
            <a
              href={project.admin}
              target="_blank"
              rel="noreferrer"
              className="proj-btn admin-btn"
            >
              ADMIN PANEL ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects({ isMobile }) {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {/* SECTION HEADER */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="section-header"
        >
          <div className="eyebrow-pill">
            // FEATURED_WORK • PRODUCTION READY
          </div>
          <h2 className="section-title">
            Featured <span className="title-highlight">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real projects, real problems, real production code.
          </p>
        </motion.div>

        {/* PROJECTS GRID */}
        <div className={`projects-grid ${isMobile ? 'mobile' : ''}`}>
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      <style>{`
        .projects-section {
          padding: 90px 24px;
          background: transparent;
          position: relative;
        }

        .projects-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .eyebrow-pill {
          display: inline-flex;
          align-items: center;
          background: #ffffff;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0px #000000;
          padding: 4px 14px;
          border-radius: 9999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: 0.12em;
          margin-bottom: 14px;
        }

        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .title-highlight {
          background: var(--bg-card, #ffffff);
          color: var(--text-main, #1c1c1c);
          padding: 2px 14px;
          border-radius: 10px;
          border: 2.5px solid var(--border, #1c1c1c);
          box-shadow: 4px 4px 0px var(--accent, #e86c60);
          display: inline-block;
          transition: all 0.15s ease;
        }
        .title-highlight:hover {
          transform: translate(-1px, -1px);
          box-shadow: 5px 5px 0px var(--accent, #e86c60);
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 15px;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 32px;
        }

        .projects-grid.mobile {
          grid-template-columns: 1fr;
          gap: 24px;
        }

        /* PROJECT CARD */
        .project-card {
          background: var(--bg-card);
          border: var(--border-width) solid var(--border);
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: var(--shadow-xl);
        }

        .card-top-accent {
          height: 6px;
          width: 100%;
          border-bottom: 2px solid var(--border);
        }

        .card-content {
          padding: 26px 26px 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 10px;
        }

        .category-and-status {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .category-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 900;
          color: var(--text-main);
          background: var(--bg-card-alt);
          padding: 3px 10px;
          border-radius: 9999px;
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          letter-spacing: 0.05em;
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          color: #1b5e3b;
          background: #e6f6ee;
          border: 1.5px solid var(--border);
          padding: 3px 8px;
          border-radius: 9999px;
          box-shadow: 1.5px 1.5px 0px var(--border);
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          border: 1px solid #000;
        }

        .spec-toggle-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 800;
          color: var(--text-main);
          background: var(--bg-subtle);
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .spec-toggle-btn:hover {
          background: var(--accent-peach, #ffd6ce);
          color: var(--hf-peach-text, #8c2d24);
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px var(--border);
        }

        .project-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 4px;
        }

        .project-tagline {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 14px;
        }

        .project-desc {
          font-size: 13.5px;
          color: var(--text-body);
          line-height: 1.65;
          margin-bottom: 18px;
          flex: 1;
        }

        .stats-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-body);
          background: var(--bg-card-alt);
          border: 1.5px solid var(--border);
          padding: 2px 8px;
          border-radius: 6px;
          box-shadow: 1.5px 1.5px 0px var(--border);
        }

        .pill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          border: 1px solid #000;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 22px;
        }

        .tech-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-main);
          background: var(--bg-subtle);
          border: 1.5px solid var(--border);
          box-shadow: 1.5px 1.5px 0px var(--border);
          padding: 3px 8px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }
        .tech-tag:hover {
          background: var(--accent-peach, #ffd6ce);
          color: var(--hf-peach-text, #8c2d24);
          transform: translateY(-1px);
        }

        /* Specs Box */
        .arch-specs-box {
          background: var(--bg-subtle);
          border: 2px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .spec-heading {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 900;
          color: #d97706;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }

        .spec-field {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .spec-key {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px;
          font-weight: 800;
          color: var(--text-faint);
        }

        .spec-val {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-body);
        }

        /* Actions */
        .project-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: auto;
          padding-top: 14px;
          border-top: 2px dashed #cbd5e1;
        }

        .proj-btn {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 9px 16px;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .code-btn {
          background: #ffffff;
          color: #000000;
          border: 2px solid #000000;
          box-shadow: 3px 3px 0px #000000;
        }

        .code-btn:hover {
          background: var(--accent-peach, #ffd6ce);
          color: var(--hf-peach-text, #8c2d24);
          transform: translate(-1.5px, -1.5px);
          box-shadow: 4.5px 4.5px 0px #000000;
        }

        .live-btn {
          background: var(--accent, #e86c60);
          color: #1c1c1c;
          border: 2px solid #000000;
          box-shadow: 3px 3px 0px #000000;
        }

        .live-btn:hover {
          background: var(--accent-hover, #d75a4e);
          transform: translate(-1.5px, -1.5px);
          box-shadow: 4.5px 4.5px 0px #000000;
        }

        .admin-btn {
          background: #e0f2fe;
          color: #0369a1;
          border: 2px solid #000000;
          box-shadow: 3px 3px 0px #000000;
        }

        .admin-btn:hover {
          background: #bae6fd;
          transform: translate(-1.5px, -1.5px);
          box-shadow: 4.5px 4.5px 0px #000000;
        }
      `}</style>
    </section>
  )
}
