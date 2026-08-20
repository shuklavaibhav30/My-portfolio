import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'Canteeno',
    tagline: 'Smart campus food ordering platform.',
    description:
      'A web application designed to make campus food ordering faster and easier, with authentication, order management, and REST APIs.',
    tags: ['React', 'JavaScript', 'JWT Auth', 'REST API', 'Context API'],
    stats: ['REAL-TIME ORDERING', 'ORDER TRACKING', 'JWT AUTH'],
    color: '#10b981',
    github: 'https://github.com/Smart-Canteen-System/FRONT-END',
    live: 'https://canteeno-peach.vercel.app/',
    details: {
      status: 'DEPLOYED',
      type: 'FULL-STACK',
      stack: 'React.js / Node.js / Express / MongoDB',
      architecture: 'RESTful API / JWT Auth',
      deployment: 'Vercel / Render'
    }
  },
  {
    id: 2,
    title: 'VibeTube',
    tagline: 'Full-stack video platform.',
    description:
      'A YouTube-like platform for uploading, watching, liking, commenting, and managing videos with a production-deployed backend.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'Render'],
    stats: ['REST APIs', 'VIDEO UPLOADS', 'LIVE ON RENDER'],
    color: '#6366f1',
    github: 'https://github.com/shuklavaibhav30/Vibe-Tube-Frontend',
    live: 'https://vibe-tube-frontend-ashen.vercel.app/',
    details: {
      status: 'DEPLOYED',
      type: 'MERN STACK',
      stack: 'React.js / Express.js / MongoDB / Cloudinary',
      architecture: 'RESTful API / JWT Auth / Media Pipeline',
      deployment: 'Vercel / Render'
    }
  },
]

function ProjectCard({ project, index, isMobile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [flipped, setFlipped] = useState(false)

  const handleCardClick = (e) => {
    if (isMobile) {
      setFlipped(!flipped)
    }
  }

  const handleLinkClick = (e) => {
    e.stopPropagation()
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flip-card-container"
      onMouseEnter={() => !isMobile && setFlipped(true)}
      onMouseLeave={() => !isMobile && setFlipped(false)}
      onClick={handleCardClick}
    >
      <div className={`flip-card-inner ${flipped ? 'is-flipped' : ''}`}>
        {/* FRONT SIDE */}
        <div
          className="flip-card-front"
          style={{
            borderColor: flipped ? project.color : 'rgba(255,255,255,0.06)',
            boxShadow: flipped ? `0 0 30px ${project.color}15` : 'none',
          }}
        >
          <div
            className="top-accent-line"
            style={{
              background: flipped
                ? project.color
                : `linear-gradient(90deg, ${project.color}, transparent)`,
            }}
          />

          <div className="card-head">
            <div className="title-row">
              <h3 className="card-title">{project.title}</h3>
              <span
                className="role-tag"
                style={{
                  color: project.color,
                  borderColor: `${project.color}40`,
                  background: `${project.color}0d`,
                }}
              >
                FULL-STACK
              </span>
            </div>
            <p className="tagline">{project.tagline}</p>
          </div>

          <p className="desc">{project.description}</p>

          <div className="stats-row">
            {project.stats.map((stat) => (
              <span key={stat} className="stat-item" style={{ color: project.color }}>
                <span className="stat-dot" style={{ background: project.color }} />
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
              rel="noopener noreferrer"
              className="link-btn"
              onClick={handleLinkClick}
            >
              SOURCE CODE ↗
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn link-btn-live"
              style={{ color: project.color, borderColor: `${project.color}40` }}
              onClick={handleLinkClick}
            >
              LIVE DEMO ↗
            </a>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="flip-card-back"
          style={{
            borderColor: project.color,
            boxShadow: `0 0 30px ${project.color}20`,
          }}
        >
          <div
            className="top-accent-line"
            style={{ background: project.color }}
          />

          <div className="back-header">
            <span className="back-eyebrow" style={{ color: project.color }}>
              PROJECT // {project.title.toUpperCase()}
            </span>
            <span className="back-badge">SPECIFICATIONS</span>
          </div>

          <div className="spec-list">
            <div className="spec-row">
              <span className="spec-label">STATUS</span>
              <span className="spec-val status-val" style={{ color: project.color }}>
                ● {project.details.status}
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">TYPE</span>
              <span className="spec-val">{project.details.type}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">STACK</span>
              <span className="spec-val">{project.details.stack}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">ARCH</span>
              <span className="spec-val">{project.details.architecture}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">DEPLOY</span>
              <span className="spec-val">{project.details.deployment}</span>
            </div>
          </div>

          <div className="links-row back-links">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn"
              onClick={handleLinkClick}
            >
              SOURCE CODE ↗
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn link-btn-live"
              style={{ color: project.color, borderColor: `${project.color}50` }}
              onClick={handleLinkClick}
            >
              LIVE DEMO ↗
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .flip-card-container {
          perspective: 1200px;
          height: 100%;
          min-height: 380px;
          cursor: pointer;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }

        .flip-card-inner.is-flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          background: linear-gradient(145deg, rgba(10,10,20,0.85), rgba(6,6,14,0.7));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          backdrop-filter: blur(12px);
          overflow: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
          background: linear-gradient(145deg, rgba(8,8,18,0.95), rgba(4,4,10,0.9));
        }

        .top-accent-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          z-index: 5;
        }

        /* Front Styles */
        .title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }
        .card-title {
          font-weight: 800;
          color: #f8fafc;
          font-size: 20px;
          letter-spacing: -0.01em;
        }
        .role-tag {
          font-size: 9px;
          padding: 2px 8px;
          border: 1px solid;
          font-family: 'JetBrains Mono', monospace;
          border-radius: 4px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .tagline {
          font-size: 12px;
          color: #64748b;
          font-style: italic;
        }
        .desc {
          color: #94a3b8;
          line-height: 1.6;
          font-size: 13.5px;
          margin: 14px 0;
        }

        .stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 14px;
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .stat-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }
        .tag-pill {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          color: #94a3b8;
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
        }

        .links-row {
          display: flex;
          gap: 10px;
          margin-top: auto;
          position: relative;
          z-index: 10;
        }

        .link-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          font-size: 11px;
          color: #cbd5e1;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          border-radius: 6px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          text-decoration: none;
          transition: all 0.25s ease;
          pointer-events: auto;
        }

        .link-btn:hover {
          background: rgba(255,255,255,0.08);
          color: #ffffff;
          border-color: rgba(255,255,255,0.25);
          transform: translateY(-1px);
        }

        .link-btn-live {
          background: rgba(255,255,255,0.03);
        }

        /* Back Specs Styles */
        .back-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 10px;
        }
        .back-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }
        .back-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: #64748b;
          letter-spacing: 0.1em;
        }

        .spec-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .spec-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          background: rgba(255,255,255,0.02);
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.03);
        }
        .spec-label {
          color: #64748b;
          font-size: 10px;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          min-width: 60px;
          padding-top: 1px;
        }
        .spec-val {
          color: #e2e8f0;
          font-weight: 600;
          font-size: 10.5px;
          text-align: right;
          word-break: normal;
          overflow-wrap: anywhere;
          white-space: normal;
          flex: 1;
        }
        .status-val {
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        @media (max-width: 480px) {
          .flip-card-front,
          .flip-card-back {
            padding: 16px;
          }
          .spec-row {
            padding: 6px 10px;
            gap: 8px;
          }
          .spec-label {
            min-width: 50px;
          }
          .links-row {
            flex-direction: column;
            gap: 8px;
          }
          .link-btn {
            width: 100%;
            height: 38px;
          }
        }
      `}</style>
    </motion.article>
  )
}

export default function Projects({ isMobile }) {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="projects" style={S.section}>
      <div style={S.inner}>
        <motion.div
          ref={headRef}
          style={S.header}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={headInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={S.eyebrow}>// PROJECTS</span>
          <h2 style={S.heading}>Things I've Built</h2>
          <p style={S.subheading}>Real projects, real problems, real code.</p>
        </motion.div>

        <div className="project-grid-responsive" style={S.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  )
}

const S = {
  section: { background: 'transparent', padding: '120px 24px', position: 'relative' },
  inner: { maxWidth: '1100px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '60px' },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'var(--accent)',
    letterSpacing: '0.2em',
    display: 'block',
    marginBottom: '10px',
  },
  heading: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: '800',
    color: '#f8fafc',
    letterSpacing: '-0.02em',
    marginBottom: '12px',
  },
  subheading: {
    color: '#64748b',
    lineHeight: '1.7',
    maxWidth: '440px',
    margin: '0 auto',
    fontSize: '13.5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '28px',
  },
}