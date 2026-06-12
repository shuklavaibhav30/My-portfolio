import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_GROUPS = [
  {
    category: 'Frontend',
    color: '#818cf8',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.28)',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Vite', 'Context API'],
  },
  {
    category: 'Backend',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.07)',
    border: 'rgba(52,211,153,0.25)',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Mongoose'],
  },
  {
    category: 'Database & Cloud',
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.07)',
    border: 'rgba(244,114,182,0.25)',
    skills: ['MongoDB', 'MongoDB Atlas', 'Cloudinary', 'Render'],
  },
  {
    category: 'CS Fundamentals',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.07)',
    border: 'rgba(251,146,60,0.25)',
    skills: ['C++', 'DSA', 'OOP', 'OS Concepts', 'DBMS'],
  },
  {
    category: 'Tools & Workflow',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.07)',
    border: 'rgba(56,189,248,0.25)',
    skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Linux'],
  },
]

function SkillGroup({ group, index, isMobile }) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const containerVariant = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: index * 0.08 } },
  }
  const chipVariant = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    show:   { opacity: 1, scale: 1,   y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }

  return (
    <motion.div
      ref={ref}
      style={{...S.group, padding: isMobile ? '16px 18px' : '22px 24px'}}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={S.catRow}>
        <span style={{ ...S.catDot, background: group.color }} aria-hidden="true" />
        <span style={{ ...S.catLabel, color: group.color }}>{group.category}</span>
      </div>

      <motion.div
        style={S.chipRow}
        variants={containerVariant}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {group.skills.map(skill => (
          <motion.span
            key={skill}
            style={{
              ...S.chip,
              color: group.color,
              background: group.bg,
              borderColor: group.border,
              fontSize: isMobile ? '11px' : '12px',
              padding: isMobile ? '3px 10px' : '4px 12px',
            }}
            variants={chipVariant}
            whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="skills" style={{...S.section, padding: isMobile ? '80px 16px' : '100px 24px'}}>
      <div style={S.inner}>

        {/* section header */}
        <motion.div
          ref={headRef}
          style={S.header}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={S.eyebrow}>// tech stack</span>
          <h2 style={S.heading}>Skills &amp; Technologies</h2>
          <p style={{...S.subheading, fontSize: isMobile ? '14px' : '15px'}}>
            Tools I use to build things from scratch — frontend to deployment.
          </p>
        </motion.div>

        {/* skill groups */}
        <div style={S.groups}>
          {SKILL_GROUPS.map((group, i) => (
            <SkillGroup key={group.category} group={group} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>

      {/* subtle section divider glow */}
      <div style={S.bottomGlow} aria-hidden="true" />
    </section>
  )
}

const S = {
  section: {
    position: 'relative',
    background: '#07070e',
    overflow: 'hidden',
  },
  inner: {
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative', zIndex: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  eyebrow: {
    fontFamily: "'Fira Code', monospace",
    fontSize: '12px', color: '#818cf8',
    letterSpacing: '0.1em', display: 'block',
    marginBottom: '10px',
  },
  heading: {
    fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
    fontWeight: '700', color: '#f1f5f9',
    letterSpacing: '-0.02em', marginBottom: '12px',
  },
  subheading: {
    color: '#64748b',
    lineHeight: '1.7', maxWidth: '440px',
    margin: '0 auto',
  },

  // group card
  group: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.055)',
    borderRadius: '14px',
  },
  groups: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px',
  },
  catRow: {
    display: 'flex', alignItems: 'center',
    gap: '8px', marginBottom: '14px',
  },
  catDot: {
    width: '6px', height: '6px',
    borderRadius: '50%', flexShrink: 0,
  },
  catLabel: {
    fontFamily: "'Fira Code', monospace",
    fontSize: '11px', fontWeight: '500',
    letterSpacing: '0.08em', textTransform: 'uppercase',
  },
  chipRow: {
    display: 'flex', flexWrap: 'wrap', gap: '7px',
  },
  chip: {
    borderRadius: '6px',
    border: '1px solid',
    fontWeight: '500',
    cursor: 'default',
    letterSpacing: '0.02em',
  },

  bottomGlow: {
    position: 'absolute', bottom: 0, left: '50%',
    transform: 'translateX(-50%)',
    width: '60%', height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)',
    zIndex: 0,
  },
}
