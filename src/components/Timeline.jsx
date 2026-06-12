import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const TIMELINE_ITEMS = [
  {
    year: '2024 — Present',
    title: 'Bachelor of Technology (B.Tech) – Computer Science & Engineering',
    subtitle: 'AJAY KUMAR GARG ENGINEERING COLLEGE, Ghaziabad(UP)',
    description:
      'Currently pursuing a Bachelor of Technology (B.Tech) in Computer Science & Engineering with a CGPA of 8.8. Focused on Data Structures & Algorithms, Web Development, Object-Oriented Programming, and Software Engineering. Actively developing real-world projects and enhancing problem-solving skills through coding challenges and continuous learning.',
    tags: ['B.Tech', 'Computer Science & Engineering', 'Object-Oriented Programming', 'Data Structures & Algorithms','Web Development','Software Engineering','Operating Systems'],
    color: '#34d399',
    dot: '#34d399',
    type: 'education',
  },
  {
    year: '2021-22',
    title: 'Senior Secondary Education (Class XII-CBSE)',
    subtitle: 'LUCKNOW PUBLIC SCHOOL, Lucknow(UP)',
    description:
      'Completed Senior Secondary Education (CBSE) with 92% marks in the Physics, Chemistry, and Mathematics (PCM) stream. Developed strong analytical thinking, quantitative aptitude, and problem-solving skills through rigorous coursework, building a solid foundation for engineering and technology studies.',
    tags: ['CBSE', 'PHYSICS', 'CHEMISTRY', 'MATHEMATICS','PROBLEM SOLVING','ANALYTICAL THINKING'],
    color: '#818cf8',
    dot: '#818cf8',
    type: 'education',
  },
  {
    year: '2020-2021',
    title: 'Matriculation (Grade X)',
    subtitle: 'LUCKNOW PUBLIC SCHOOL, LUCKNOW(UP)',
    description:
      'Completed Matriculation with 95% marks, demonstrating academic excellence, strong analytical skills, and consistent performance across core subjects.',
    tags: ['CBSE','Academic Excellence','CONSISTENCY','MATHEMATICS','SCIENCE','PROBLEM SOLVING','DISCIPLINE'],
    color: '#f472b6',
    dot: '#f472b6',
    type: 'education',
  },
  {
    year: '2008-2020',
    title: 'Completed schooling up to Grade 9',
    subtitle: 'LUCKNOW PUBLIC SCHOOL, LUCKNOW(UP)',
    description:
      'Built a strong foundation in academics, critical thinking, and extracurricular activities during the early years of education.',
    tags: ['CBSE','ENGLISH','MATHEMATICS','DISCIPLINE','LEARNING'],
    color: '#fb923c',
    dot: '#fb923c',
    type: 'education',
  },
]

function TimelineItem({ item, index, isMobile }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      style={S.item}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* dot */}
      <div style={S.dotCol}>
        <motion.div
          style={{ ...S.dot, background: item.dot, boxShadow: `0 0 10px ${item.dot}60` }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.35, delay: index * 0.1 + 0.15, type: 'spring', stiffness: 200 }}
        />
      </div>

      {/* content */}
      <div style={{...S.content, padding: isMobile ? '16px 18px' : '20px 22px'}}>
        <div style={S.metaRow}>
          <span style={{ ...S.yearTag, color: item.color, borderColor: `${item.color}40`, background: `${item.color}0d`, fontSize: isMobile ? '10px' : '11px' }}>
            {item.year}
          </span>
          <span style={{ ...S.typeTag, color: item.type === 'education' ? '#fb923c' : item.type === 'work' ? '#34d399' : '#f472b6', fontSize: isMobile ? '12px' : '14px' }}>
            {item.type === 'education' ? '🎓' : item.type === 'work' ? '💻' : '🚀'}
          </span>
        </div>

        <h3 style={{...S.title, fontSize: isMobile ? '14px' : '16px'}}>{item.title}</h3>
        <p style={{...S.subtitle, fontSize: isMobile ? '11px' : '12px'}}>{item.subtitle}</p>
        <p style={{...S.desc, fontSize: isMobile ? '13px' : '13.5px'}}>{item.description}</p>

        <div style={S.tagsRow}>
          {item.tags.map(tag => (
            <span key={tag} style={{ ...S.tag, color: item.color, borderColor: `${item.color}30`, background: `${item.color}0a`, fontSize: isMobile ? '10px' : '11px', padding: isMobile ? '2px 8px' : '3px 10px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
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
    <section id="timeline" style={{...S.section, padding: isMobile ? '80px 16px 100px' : '100px 24px 120px'}}>
      <div style={S.inner}>

        <motion.div
          ref={headRef}
          style={S.header}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={S.eyebrow}>// my journey</span>
          <h2 style={S.heading}>Academic Journey</h2>
          <p style={{...S.subheading, fontSize: isMobile ? '14px' : '15px'}}>
            From foundational schooling to pursuing Computer Science & Engineering, each step has strengthened my analytical thinking, technical skills, and passion for learning.
          </p>
        </motion.div>

        {/* timeline list */}
        <div style={S.list}>
          {/* vertical line */}
          <div style={S.line} aria-hidden="true" />

          {TIMELINE_ITEMS.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} isMobile={isMobile} />
          ))}
        </div>

        {/* footer note */}
        <motion.p
          style={{...S.footNote, fontSize: isMobile ? '12px' : '14px'}}
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span style={{ fontFamily: "'Fira Code', monospace", color: '#818cf8' }}>const</span>
          {' '}<span style={{ color: '#34d399' }}>story</span>
          {' = '}<span style={{ color: '#f472b6' }}>"still being written..."</span>
        </motion.p>
      </div>
    </section>
  )
}

const S = {
  section: {
    background: '#07070e',
    position: 'relative',
    overflow: 'hidden',
  },
  inner: { maxWidth: '780px', margin: '0 auto' },

  header: { textAlign: 'center', marginBottom: '64px' },
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
    lineHeight: '1.7', maxWidth: '400px', margin: '0 auto',
  },

  list: {
    position: 'relative',
    paddingLeft: '36px',
  },
  line: {
    position: 'absolute', left: '8px',
    top: '8px', bottom: '8px', width: '1px',
    background: 'linear-gradient(to bottom, #818cf8, rgba(129,140,248,0.15))',
  },

  item: {
    display: 'flex', gap: '0',
    marginBottom: '44px', position: 'relative',
  },
  dotCol: {
    position: 'absolute', left: '-32px',
    top: '4px', width: '16px',
    display: 'flex', justifyContent: 'center',
  },
  dot: {
    width: '12px', height: '12px',
    borderRadius: '50%',
    border: '2.5px solid #07070e',
    flexShrink: 0,
  },

  content: {
    flex: 1,
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.055)',
    borderRadius: '12px',
  },
  metaRow: {
    display: 'flex', alignItems: 'center',
    gap: '10px', marginBottom: '8px',
  },
  yearTag: {
    fontFamily: "'Fira Code', monospace",
    fontWeight: '500',
    padding: '2px 10px', borderRadius: '4px',
    border: '1px solid',
    letterSpacing: '0.04em',
  },
  typeTag: { },

  title: {
    fontWeight: '700',
    color: '#f1f5f9', marginBottom: '3px',
    letterSpacing: '-0.01em',
  },
  subtitle: {
    color: '#64748b',
    marginBottom: '10px',
    fontFamily: "'Fira Code', monospace",
  },
  desc: {
    color: '#94a3b8',
    lineHeight: '1.75', marginBottom: '14px',
  },
  tagsRow: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  tag: {
    borderRadius: '5px', border: '1px solid',
    fontWeight: '500',
  },

  footNote: {
    textAlign: 'center',
    color: '#475569',
    marginTop: '16px',
    fontFamily: "'Fira Code', monospace",
  },
}
