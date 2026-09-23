import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'Hostel Saathi',
    category: 'FULL-STACK',
    tagline: 'Role-based hostel grievance management platform.',
    description:
      'A full-stack hostel grievance management platform built for AKGEC with two independent portals (Student and Admin). Features OTP-verified registration, 4-role RBAC (Student, Warden, Chief Warden, Dean) with hostel-scoped authorization, complaint lifecycle tracking, photo evidence uploads, complete audit trails, hostel analytics, and email escalations.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Brevo', 'Cloudinary'],
    stats: ['4-Role RBAC', 'OTP Authentication', 'Complaint Lifecycle', 'Hostel Analytics', 'Email Escalation'],
    color: '#10b981',
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
    tagline: 'Full-stack video sharing platform.',
    description:
      'A YouTube-inspired MERN platform for uploading, watching, liking, commenting, subscribing, managing playlists, and tracking watch history. Built with MVC architecture, RESTful APIs, secure access/refresh token JWT authentication, MongoDB Atlas, and Cloudinary for media storage and delivery.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'Render'],
    stats: ['REST APIs', 'Video Uploads', 'JWT Authentication', 'Cloud Media Storage'],
    color: '#6366f1',
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
    tagline: 'AI-powered platform for street vendors and micro-entrepreneurs.',
    description:
      'An AI-powered backend platform for street vendors and micro-entrepreneurs to track daily sales and expenses, discover government schemes, and receive AI financial insights. Features role-aware REST APIs, LLM integration for demand prediction, an AI chatbot for scheme eligibility, Zod request validation, rate limiting, and optimized MongoDB indexing.',
    tags: ['Node.js', 'Express', 'MongoDB', 'AI API', 'JWT', 'Zod'],
    stats: ['AI-Powered Insights', 'Sales & Expense Tracking', 'Government Schemes', 'AI Chatbot', 'REST APIs'],
    color: '#f59e0b',
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
    tagline: 'Official website for the Blockchain Research Lab at AKGEC.',
    description:
      'A modern responsive website for the Blockchain Research Lab at AKGEC, showcasing research, events, projects, team members, and alumni through a futuristic blockchain-themed interface. Built with React, TypeScript, Vite, and Tailwind CSS with smooth animations and interactive alumni network visualizations.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    stats: ['Interactive UI', 'Alumni Visualization', 'Event Showcases', 'Smooth Animations', 'Blockchain Theme'],
    color: '#3b82f6',
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
    tagline: 'Personal developer portfolio.',
    description:
      'A personal developer portfolio designed to showcase my full-stack development work, technical skills, achievements, experience, and projects through a modern dark futuristic interface. Features responsive design, interactive micro-animations, and direct access to live project demos and source code repositories.',
    tags: ['React', 'JavaScript', 'CSS', 'Vercel'],
    stats: ['Responsive Design', 'Modern UI', 'Interactive Animations', 'Project Showcase'],
    color: '#8b5cf6',
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
  const cardRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [flipped, setFlipped] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!isMobile) setFlipped(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!isMobile) setFlipped(false)
  }

  const handleCardClick = () => {
    if (isMobile) {
      setFlipped(!flipped)
    }
  }

  const handleLinkClick = (e) => {
    e.stopPropagation()
  }

  const isFifthCard = index === 4

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
      className={`flip-card-container ${isFifthCard ? 'fifth-card-wrapper' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
    >
      <div className={`flip-card-inner ${flipped ? 'is-flipped' : ''}`}>
        {/* FRONT SIDE */}
        <div
          ref={cardRef}
          className="flip-card-front"
          style={{
            borderColor: flipped
              ? `${project.color}60`
              : isHovered
              ? `${project.color}45`
              : 'rgba(255,255,255,0.08)',
            boxShadow: isHovered
              ? `0 20px 50px -12px ${project.color}35, inset 0 0 30px ${project.color}15`
              : '0 8px 30px rgba(0,0,0,0.4)',
          }}
        >
          {/* Spotlight Follow Effect */}
          {isHovered && !isMobile && (
            <div
              className="card-spotlight"
              style={{
                background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${project.color}18, transparent 70%)`,
              }}
            />
          )}

          {/* Top Shimmer Accent Line */}
          <div
            className="top-accent-line"
            style={{
              background: `linear-gradient(90deg, ${project.color}, ${project.color}aa, transparent)`,
            }}
          />

          <div className="card-head">
            <div className="title-row">
              <h3 className="card-title" style={{ color: isHovered ? '#ffffff' : '#f8fafc' }}>
                {project.title}
              </h3>
              <div className="badge-group">
                <span
                  className="role-tag"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}50`,
                    background: `${project.color}15`,
                  }}
                >
                  {project.category}
                </span>
                <span className="flip-hint" style={{ color: project.color }}>
                  <span className="flip-icon">⟲</span>
                </span>
              </div>
            </div>
            <p className="tagline">{project.tagline}</p>
          </div>

          <p className="desc">{project.description}</p>

          <div className="stats-row">
            {project.stats.map((stat, i) => (
              <span key={stat} className="stat-item" style={{ color: project.color }}>
                <span
                  className="stat-dot"
                  style={{
                    background: project.color,
                    boxShadow: `0 0 10px ${project.color}`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
                {stat}
              </span>
            ))}
          </div>

          <div className="tags-row">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="links-row">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              className="proj-btn secondary"
            >
              SOURCE CODE ↗
            </a>
            {project.admin ? (
              <>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleLinkClick}
                  className="proj-btn primary"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}25 0%, ${project.color}15 100%)`,
                    borderColor: `${project.color}60`,
                    color: '#ffffff',
                  }}
                >
                  {project.liveLabel} ↗
                </a>
                <a
                  href={project.admin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleLinkClick}
                  className="proj-btn primary"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}35 0%, ${project.color}20 100%)`,
                    borderColor: `${project.color}70`,
                    color: '#ffffff',
                  }}
                >
                  ADMIN PANEL ↗
                </a>
              </>
            ) : (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                className="proj-btn primary"
                style={{
                  background: `linear-gradient(135deg, ${project.color}30 0%, ${project.color}15 100%)`,
                  borderColor: `${project.color}60`,
                  color: '#ffffff',
                }}
              >
                {project.liveLabel} ↗
              </a>
            )}
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="flip-card-back"
          style={{
            borderColor: `${project.color}60`,
            boxShadow: `0 20px 50px -12px ${project.color}40, inset 0 0 35px ${project.color}18`,
          }}
        >
          {/* Top Shimmer Accent Line */}
          <div
            className="top-accent-line"
            style={{
              background: `linear-gradient(90deg, ${project.color}, ${project.color}aa, transparent)`,
            }}
          />

          <div className="back-header">
            <div className="title-row">
              <h3 className="card-title" style={{ color: '#ffffff' }}>
                {project.title}
              </h3>
              <span
                className="status-badge"
                style={{
                  color: project.color,
                  borderColor: `${project.color}50`,
                  background: `${project.color}18`,
                }}
              >
                <span
                  className="status-dot-pulse"
                  style={{
                    background: project.color,
                    boxShadow: `0 0 10px ${project.color}`,
                  }}
                />
                {project.details.status}
              </span>
            </div>
            <p className="back-subtitle">// TECHNICAL ARCHITECTURE SPEC</p>
          </div>

          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">PROJECT TYPE</span>
              <span className="spec-value" style={{ color: project.color }}>
                {project.details.type}
              </span>
            </div>

            <div className="spec-item">
              <span className="spec-label">TECH STACK</span>
              <span className="spec-value">{project.details.stack}</span>
            </div>

            <div className="spec-item">
              <span className="spec-label">ARCHITECTURE</span>
              <span className="spec-value">{project.details.architecture}</span>
            </div>

            <div className="spec-item">
              <span className="spec-label">DEPLOYMENT & INFRA</span>
              <span className="spec-value">{project.details.deployment}</span>
            </div>
          </div>

          <div className="links-row back-links">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              className="proj-btn secondary"
            >
              REPOSITORY ↗
            </a>
            {project.admin ? (
              <>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleLinkClick}
                  className="proj-btn primary"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}35 0%, ${project.color}20 100%)`,
                    borderColor: `${project.color}70`,
                    color: '#ffffff',
                  }}
                >
                  STUDENT PORTAL ↗
                </a>
                <a
                  href={project.admin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleLinkClick}
                  className="proj-btn primary"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}45 0%, ${project.color}25 100%)`,
                    borderColor: `${project.color}80`,
                    color: '#ffffff',
                  }}
                >
                  ADMIN PANEL ↗
                </a>
              </>
            ) : (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                className="proj-btn primary"
                style={{
                  background: `linear-gradient(135deg, ${project.color}35 0%, ${project.color}20 100%)`,
                  borderColor: `${project.color}70`,
                  color: '#ffffff',
                }}
              >
                VISIT DEMO ↗
              </a>
            )}
          </div>
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
          <div className="section-label">// FEATURED_WORK</div>
          <h2 className="section-title">Featured <span className="highlight-gradient">Projects</span></h2>
          <p className="section-subtitle">Real projects, real problems, real code.</p>
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
          padding: 100px 24px;
          position: relative;
          background: transparent;
        }

        .projects-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          color: var(--accent, #6366f1);
          font-size: 11px;
          letter-spacing: 0.2em;
          margin-bottom: 12px;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .section-subtitle {
          color: #94a3b8;
          font-size: 14.5px;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* GRID LAYOUT: 2-column + 1 centered 5th card */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          align-items: stretch;
        }

        .fifth-card-wrapper {
          grid-column: 1 / -1;
          max-width: 640px;
          margin: 0 auto;
          width: 100%;
        }

        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .fifth-card-wrapper {
            max-width: 100%;
          }
        }

        /* 3D FLIP CONTAINER */
        .flip-card-container {
          perspective: 1200px;
          min-height: 480px;
          cursor: pointer;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
          transform-style: preserve-3d;
        }

        .flip-card-inner.is-flipped {
          transform: rotateY(180deg);
        }

        /* COMMON CARD STYLES */
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 18px;
          background: rgba(8, 8, 22, 0.85) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .flip-card-back {
          transform: rotateY(180deg);
          background: rgba(6, 6, 18, 0.95) !important;
        }

        /* SPOTLIGHT & ACCENT LINE */
        .card-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .top-accent-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 1;
        }

        /* FRONT CONTENT */
        .card-head {
          position: relative;
          z-index: 1;
        }

        .title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }

        .badge-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .role-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid;
          white-space: nowrap;
        }

        .flip-hint {
          font-size: 14px;
          opacity: 0.7;
          transition: opacity 0.25s ease;
        }

        .flip-card-container:hover .flip-hint {
          opacity: 1;
        }

        .tagline {
          font-size: 13px;
          color: #94a3b8;
          font-style: italic;
          margin-bottom: 16px;
        }

        .desc {
          color: #cbd5e1;
          font-size: 13.5px;
          line-height: 1.65;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        /* STATS */
        .stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .stat-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .stat-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          display: inline-block;
        }

        /* TAGS */
        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .tag-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
          padding: 4px 12px;
          border-radius: 12px;
        }

        /* LINKS */
        .links-row {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 2;
        }

        .proj-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 10px 16px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .proj-btn.secondary {
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .proj-btn.secondary:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }

        .proj-btn.primary {
          border: 1px solid;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .proj-btn.primary:hover {
          transform: translateY(-1px);
          filter: brightness(1.2);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
        }

        /* BACK SIDE DETAILS */
        .back-header {
          margin-bottom: 24px;
        }

        .status-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: pulse-glow 2s infinite;
        }

        .back-subtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #64748b;
          letter-spacing: 0.15em;
          margin-top: 6px;
        }

        .specs-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 28px;
        }

        .spec-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .spec-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #64748b;
          letter-spacing: 0.12em;
        }

        .spec-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #f8fafc;
          line-height: 1.4;
        }
      `}</style>
    </section>
  )
}