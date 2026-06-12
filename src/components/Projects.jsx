import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'Canteeno',
    tagline: 'Smart canteen system — no more queue chaos.',
    description:
      'College canteens lose 18+ minutes per student to queues. Canteeno fixes that. I led the entire frontend architecture — built the student ordering flow, real-time order tracker (Pending → Preparing → Ready), cart & checkout, and JWT-based auth screens. Also integrated the AI chatbot UI for best-seller recommendations.',
    tags: ['React', 'JavaScript', 'JWT Auth', 'REST API', 'Context API'],
    stats: ['70% less queue time', '40% more orders', '85% digital payments'],
    color: '#34d399',
    accentBg: 'rgba(52,211,153,0.06)',
    accentBorder: 'rgba(52,211,153,0.22)',
    github: 'https://github.com/Smart-Canteen-System/FRONT-END',      
    live: 'https://canteeno-peach.vercel.app/',
    role: 'Frontend Engineer',
    emoji: '🍽️',
  },
  {
    id: 2,
    title: 'VibeTube',
    tagline: 'YouTube-like backend, production-deployed.',
    description:
      'A full-featured REST API backend mimicking YouTube\'s core — user auth, video upload & streaming via Cloudinary, playlists, comments, likes, subscriptions, and tweet-style posts. Built with clean MVC architecture, custom ApiError/ApiResponse wrappers, and async error handling middleware. Deployed live on Render.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Cloudinary', 'Render'],
    stats: ['10+ REST endpoints', 'MVC architecture', 'Live on Render'],
    color: '#818cf8',
    accentBg: 'rgba(99,102,241,0.06)',
    accentBorder: 'rgba(99,102,241,0.22)',
    github: 'https://github.com/shuklavaibhav30/Vibe-Tube-Frontend',      
    live: 'https://vibe-tube-frontend-ashen.vercel.app/',
    role: 'Full-Stack (Solo)',
    emoji: '🎬',
  },
]

function ProjectCard({ project, index, isMobile }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      style={{...S.card, padding: isMobile ? '20px' : '26px'}}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
    >
      {/* top accent line */}
      <div style={{ ...S.topLine, background: `linear-gradient(90deg, ${project.color}, transparent)` }} aria-hidden="true" />

      {/* header */}
      <div style={S.cardHead}>
        <div style={S.cardTitleRow}>
          <span style={{...S.emoji, fontSize: isMobile ? '24px' : '28px'}} aria-hidden="true">{project.emoji}</span>
          <div>
            <h3 style={{...S.cardTitle, fontSize: isMobile ? '16px' : '18px'}}>{project.title}</h3>
            <span style={{ ...S.roleTag, color: project.color, background: project.accentBg, borderColor: project.accentBorder }}>
              {project.role}
            </span>
          </div>
        </div>
        <p style={S.tagline}>{project.tagline}</p>
      </div>

      {/* description */}
      <p style={{...S.desc, fontSize: isMobile ? '13px' : '13.5px'}}>{project.description}</p>

      {/* stats */}
      <div style={S.statsRow}>
        {project.stats.map(stat => (
          <span key={stat} style={{ ...S.stat, color: project.color, fontSize: isMobile ? '10px' : '11px' }}>
            <span style={{ ...S.statDot, background: project.color }} aria-hidden="true" />
            {stat}
          </span>
        ))}
      </div>

      {/* tags */}
      <div style={S.tagsRow}>
        {project.tags.map(tag => (
          <span key={tag} style={{...S.tag, fontSize: isMobile ? '10px' : '11px', padding: isMobile ? '2px 8px' : '3px 10px'}}>{tag}</span>
        ))}
      </div>

      {/* links */}
      <div style={{...S.linksRow, flexWrap: 'wrap'}}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" style={{...S.linkBtn, flex: isMobile ? 1 : 'auto'}}>
            <svg width={isMobile ? 13 : 14} height={isMobile ? 13 : 14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" style={{ ...S.linkBtn, ...S.linkBtnLive, flex: isMobile ? 1 : 'auto' }}>
            <svg width={isMobile ? 12 : 13} height={isMobile ? 12 : 13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
            Live Demo
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const headRef    = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="projects" style={{...S.section, padding: isMobile ? '80px 16px' : '100px 24px'}}>
      <div style={S.inner}>

        <motion.div
          ref={headRef}
          style={S.header}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={S.eyebrow}>// what i've built</span>
          <h2 style={S.heading}>Featured Projects</h2>
          <p style={{...S.subheading, fontSize: isMobile ? '14px' : '15px'}}>
            Real things, shipped. Each one taught me something the tutorials didn&rsquo;t.
          </p>
        </motion.div>

        <div style={S.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} isMobile={isMobile} />
          ))}
        </div>

        <motion.div
          style={S.githubRow}
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a href="https://github.com/shuklavaibhav30" target="_blank" rel="noreferrer" style={{...S.githubLink, fontSize: isMobile ? '12px' : '13px', padding: isMobile ? '8px 24px' : '10px 28px'}}>
            More on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}

const S = {
  section: {
    background: 'linear-gradient(180deg, #07070e 0%, #0c0c18 50%, #07070e 100%)',
    position: 'relative',
  },
  inner: { maxWidth: '1000px', margin: '0 auto' },

  header: { textAlign: 'center', marginBottom: '56px' },
  eyebrow: {
    fontFamily: "'Fira Code', monospace",
    fontSize: '12px', color: '#818cf8',
    letterSpacing: '0.1em', display: 'block', marginBottom: '10px',
  },
  heading: {
    fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
    fontWeight: '700', color: '#f1f5f9',
    letterSpacing: '-0.02em', marginBottom: '12px',
  },
  subheading: {
    color: '#64748b',
    lineHeight: '1.7', maxWidth: '420px', margin: '0 auto',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },

  // card
  card: {
    position: 'relative',
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'default',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  },
  topLine: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: '2px',
  },

  cardHead: { marginBottom: '14px' },
  cardTitleRow: {
    display: 'flex', alignItems: 'flex-start',
    gap: '12px', marginBottom: '8px',
  },
  emoji: { lineHeight: '1', flexShrink: 0, marginTop: '2px' },
  cardTitle: {
    fontWeight: '700',
    color: '#f1f5f9', letterSpacing: '-0.015em',
    marginBottom: '5px',
  },
  roleTag: {
    fontSize: '10px', fontWeight: '600',
    padding: '2px 9px', borderRadius: '4px',
    border: '1px solid', letterSpacing: '0.04em',
    textTransform: 'uppercase',
    fontFamily: "'Fira Code', monospace",
  },
  tagline: {
    fontSize: '13px', color: '#94a3b8',
    fontStyle: 'italic', lineHeight: '1.5',
  },

  desc: {
    color: '#64748b',
    lineHeight: '1.75', marginBottom: '18px',
  },

  statsRow: {
    display: 'flex', flexWrap: 'wrap', gap: '10px',
    marginBottom: '16px',
  },
  stat: {
    display: 'flex', alignItems: 'center',
    gap: '5px', fontWeight: '600',
    fontFamily: "'Fira Code', monospace",
  },
  statDot: {
    width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
  },

  tagsRow: {
    display: 'flex', flexWrap: 'wrap',
    gap: '6px', marginBottom: '20px',
  },
  tag: {
    borderRadius: '5px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#94a3b8',
  },

  linksRow: { display: 'flex', gap: '10px' },
  linkBtn: {
    display: 'flex', alignItems: 'center', gap: '6px',
    fontSize: '12px', color: '#94a3b8',
    padding: '6px 14px', borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.03)',
    transition: 'all 0.2s', fontWeight: '500',
    justifyContent: 'center',
  },
  linkBtnLive: {
    color: '#34d399',
    borderColor: 'rgba(52,211,153,0.25)',
    background: 'rgba(52,211,153,0.05)',
  },

  githubRow: { textAlign: 'center', marginTop: '44px' },
  githubLink: {
    fontFamily: "'Fira Code', monospace",
    color: '#818cf8',
    border: '1px solid rgba(129,140,248,0.3)',
    borderRadius: '8px',
    display: 'inline-block',
    transition: 'background 0.2s',
  },
}
