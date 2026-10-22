import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

const TIMELINE_ITEMS = [
  {
    year: '2024 — PRESENT',
    title: 'Bachelor of Technology – Computer Science & Engineering',
    subtitle: 'AJAY KUMAR GARG ENGINEERING COLLEGE, Ghaziabad(UP)',
    description: 'Developing high-level problem solving skills inside algorithmic environments. Mastering core software engineering principles, MERN stack development, and distributed concepts with an 8.8 CGPA standard.',
    tags: ['DSA', 'OOP', 'Software Engineering', 'Operating Systems'],
    color: '#e86c60',
  },
  {
    year: '2021 — 2022',
    title: 'Senior Secondary Education (Class XII)',
    subtitle: 'LUCKNOW PUBLIC SCHOOL, Lucknow(UP)',
    description: 'Specialized in Computer Science, Mathematics, and Physics with a 92% evaluation output.',
    tags: ['CBSE', 'Mathematics', 'Computer Science'],
    color: '#38bdf8',
  },
  {
    year: '2020 — 2021',
    title: 'Matriculation (Grade X)',
    subtitle: 'LUCKNOW PUBLIC SCHOOL, LUCKNOW(UP)',
    description: 'Assembled core logic and mathematics foundations achieving a 95% total compilation score.',
    tags: ['CBSE', 'Mathematics', 'Sciences'],
    color: '#4ade80',
  }
]

function TimelineItem({ item, index, isMobile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hovered, setHovered] = useState(false)
  const isReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      style={S.item}
      initial={{ opacity: 0, x: isReduced ? 0 : -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: isReduced ? 0 : index * 0.1, type: 'spring', damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={S.dotCol}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: isReduced ? 0 : index * 0.1 + 0.2 }}
          style={{
            ...S.dot,
            background: item.color,
            transform: hovered ? 'scale(1.2)' : 'scale(1)',
          }}
        />
      </div>

      <motion.div
        style={{
          ...S.content,
          padding: isMobile ? '18px' : '26px',
          boxShadow: hovered ? '7px 7px 0px var(--border)' : 'var(--shadow)',
          transform: hovered && !isMobile ? 'translate(-2px, -2px)' : 'none',
        }}
      >
        <div style={S.metaRow}>
          <span style={{ ...S.yearTag, background: item.color }}>
            {item.year}
          </span>
        </div>
        <h3 style={S.title}>{item.title}</h3>
        <p style={S.subtitle}>{item.subtitle}</p>
        <p style={S.desc}>{item.description}</p>
        <div style={S.tagsRow}>
          {item.tags.map(t =>
            <span key={t} style={S.tag}>
              {t}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Timeline({ isMobile }) {
  const containerRef = useRef(null)
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const isReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" style={S.section} ref={containerRef}>
      <div style={S.inner}>
        <motion.div ref={headRef} style={S.header} initial={{ opacity: 0, y: 15 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
            <span style={S.eyebrow}>// LEARNING_LOG</span>
          </div>
          <h2 className="section-title">
            Learning <span className="neo-highlight">Trajectory</span>
          </h2>
          <p style={S.subheading}>A timeline of the milestones, academic foundations, and engineering track shaping my development journey.</p>
        </motion.div>

        <div style={S.list}>
          {/* Base solid line */}
          <div style={S.lineBg} />

          {/* Animated active line */}
          {!isReduced && (
            <motion.div style={{ ...S.lineActive, height: lineHeight }} />
          )}

          {TIMELINE_ITEMS.map((item, i) => <TimelineItem key={i} item={item} index={i} isMobile={isMobile} />)}
        </div>
      </div>
    </section>
  )
}

const S = {
  section: { background: 'transparent', padding: '90px 24px', position: 'relative', overflow: 'hidden' },
  inner: { maxWidth: '820px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '60px' },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'var(--bg-card)',
    border: '2px solid var(--border)',
    boxShadow: 'var(--shadow-sm)',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    fontWeight: '800',
    color: 'var(--text-main)',
    letterSpacing: '0.15em',
  },
  subheading: { color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto', fontSize: '15px' },

  list: { position: 'relative', paddingLeft: '32px' },
  lineBg: { position: 'absolute', left: '7px', top: '10px', bottom: '0', width: '2.5px', background: 'var(--border)' },
  lineActive: { position: 'absolute', left: '7px', top: '10px', width: '2.5px', background: 'var(--accent)', transformOrigin: 'top' },

  item: { display: 'flex', marginBottom: '32px', position: 'relative' },
  dotCol: { position: 'absolute', left: '-30px', top: '16px', width: '12px', display: 'flex', justifyContent: 'center' },
  dot: { width: '14px', height: '14px', borderRadius: '50%', border: '2.5px solid var(--border)', transition: 'all 0.2s ease', zIndex: 2 },

  content: {
    flex: 1,
    background: 'var(--bg-card)',
    border: 'var(--border-width) solid var(--border)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow)',
    color: 'var(--text-main)',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  metaRow: { display: 'flex', alignItems: 'center', marginBottom: '10px' },
  yearTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    fontWeight: '800',
    color: '#1c1c1c',
    padding: '3px 10px',
    border: '1.5px solid var(--border)',
    borderRadius: '9999px',
    boxShadow: 'var(--shadow-sm)',
  },
  title: { fontWeight: '800', color: 'var(--text-main)', fontSize: '18px', marginBottom: '4px', fontFamily: "'Space Grotesk', sans-serif" },
  subtitle: { color: 'var(--text-muted)', marginBottom: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' },
  desc: { color: 'var(--text-body)', lineHeight: '1.65', marginBottom: '16px', fontSize: '13.5px' },
  tagsRow: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  tag: {
    border: '1.5px solid var(--border)',
    background: 'var(--bg-card-alt)',
    color: 'var(--text-main)',
    fontSize: '10.5px',
    fontWeight: '700',
    padding: '3px 8px',
    fontFamily: "'JetBrains Mono', monospace",
    borderRadius: '6px',
    boxShadow: '1.5px 1.5px 0px var(--border)',
  },
}