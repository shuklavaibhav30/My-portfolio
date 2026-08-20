import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

const TIMELINE_ITEMS = [
  {
    year: '2024 — PRESENT',
    title: 'Bachelor of Technology – Computer Science & Engineering',
    subtitle: 'AJAY KUMAR GARG ENGINEERING COLLEGE, Ghaziabad(UP)',
    description: 'Developing high-level problem solving nodes inside algorithmic environments. Accumulating theoretical data principles alongside application paradigms with an 8.8 CGPA standard.',
    tags: ['DSA', 'OOP', 'Software Engineering', 'Operating Systems'],
    color: '#10b981',
  },
  {
    year: '2021 — 2022',
    title: 'Senior Secondary Education (Class XII)',
    subtitle: 'LUCKNOW PUBLIC SCHOOL, Lucknow(UP)',
    description: 'Configured mathematical vector tracks scoring a 92% absolute evaluation profile output.',
    tags: ['CBSE', 'Mathematics', 'Logic Frameworks'],
    color: '#6366f1',
  },
  {
    year: '2020 — 2021',
    title: 'Matriculation (Grade X)',
    subtitle: 'LUCKNOW PUBLIC SCHOOL, LUCKNOW(UP)',
    description: 'Assembled core primary logic systems achieving a 95% total compilation score.',
    tags: ['CBSE', 'Core Analytics'],
    color: '#ec4899',
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
      initial={{ opacity: 0, x: isReduced ? 0 : -20, filter: isReduced ? 'blur(0px)' : 'blur(4px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay: isReduced ? 0 : index * 0.1, type: 'spring', damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={S.dotCol}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: isReduced ? 0 : index * 0.1 + 0.2 }}
          style={{ ...S.dot, background: hovered ? '#fff' : item.color, boxShadow: hovered ? `0 0 15px ${item.color}` : `0 0 0px ${item.color}` }}
        />
      </div>

      <motion.div
        style={{ ...S.content, padding: isMobile ? '16px' : '24px', borderColor: hovered ? item.color : 'rgba(255,255,255,0.04)' }}
        animate={{
          boxShadow: hovered ? `0 10px 30px -10px ${item.color}20` : '0 0 0 transparent',
          x: hovered && !isMobile && !isReduced ? 5 : 0
        }}
      >
        <div style={S.metaRow}>
          <span style={{ ...S.yearTag, color: hovered ? '#fff' : item.color, borderColor: `${item.color}30`, background: hovered ? item.color : `${item.color}05` }}>
            {item.year}
          </span>
        </div>
        <h3 style={S.title}>{item.title}</h3>
        <p style={S.subtitle}>{item.subtitle}</p>
        <p style={S.desc}>{item.description}</p>
        <div style={S.tagsRow}>
          {item.tags.map(t =>
            <span key={t} style={{ ...S.tag, color: hovered ? '#fff' : item.color, borderColor: hovered ? `${item.color}40` : `${item.color}15`, background: hovered ? `${item.color}10` : 'transparent' }}>
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
          <span style={S.eyebrow}>// LEARNING_LOG</span>
          <h2 style={S.heading}>Learning Trajectory</h2>
          <p style={S.subheading}>A timeline of the systems, milestones, and foundations shaping my development journey.</p>
        </motion.div>

        <div style={S.list}>
          {/* Base dim line */}
          <div style={S.lineBg} />

          {/* Animated active line */}
          {!isReduced && (
            <motion.div style={{ ...S.lineActive, height: lineHeight, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Glowing tip */}
              <div style={S.lineGlow} />
            </motion.div>
          )}

          {TIMELINE_ITEMS.map((item, i) => <TimelineItem key={i} item={item} index={i} isMobile={isMobile} />)}
        </div>
      </div>
    </section>
  )
}

const S = {
  section: { background: 'transparent', padding: '120px 24px', position: 'relative', overflow: 'hidden' },
  inner: { maxWidth: '800px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '80px' },
  eyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.2em', display: 'block', marginBottom: '10px' },
  heading: { fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '800', color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '12px' },
  subheading: { color: '#64748b', lineHeight: '1.7', maxWidth: '440px', margin: '0 auto', fontSize: '13.5px' },

  list: { position: 'relative', paddingLeft: '32px' },
  lineBg: { position: 'absolute', left: '6px', top: '10px', bottom: '0', width: '2px', background: 'rgba(255,255,255,0.04)' },
  lineActive: { position: 'absolute', left: '6px', top: '10px', width: '2px', background: 'linear-gradient(to bottom, var(--accent), #ec4899)', transformOrigin: 'top', overflow: 'visible' },
  lineGlow: { position: 'absolute', bottom: '-4px', left: '-2px', width: '6px', height: '12px', background: '#ec4899', borderRadius: '4px', filter: 'blur(3px)' },

  item: { display: 'flex', marginBottom: '40px', position: 'relative' },
  dotCol: { position: 'absolute', left: '-31px', top: '10px', width: '10px', display: 'flex', justifyContent: 'center' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', background: '#fff', border: '2px solid #030307', transition: 'all 0.3s' },

  content: { flex: 1, background: 'rgba(6, 6, 12, 0.4)', border: '1px solid', borderRadius: '4px', backdropFilter: 'blur(8px)', transition: 'border-color 0.3s, background 0.3s' },
  metaRow: { display: 'flex', alignItems: 'center', marginBottom: '14px' },
  yearTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: '700', padding: '4px 10px', border: '1px solid', borderRadius: '30px', transition: 'all 0.3s' },
  title: { fontWeight: '700', color: '#f8fafc', fontSize: '17px', marginBottom: '4px' },
  subtitle: { color: '#94a3b8', marginBottom: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  desc: { color: '#cbd5e1', lineHeight: '1.7', marginBottom: '18px', fontSize: '13.5px' },
  tagsRow: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  tag: { border: '1px solid', background: 'transparent', fontSize: '10.5px', padding: '3px 8px', fontFamily: "'JetBrains Mono', monospace", borderRadius: '2px', transition: 'all 0.3s' }
}