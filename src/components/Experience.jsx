import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

const METADATA_TAGS = [
  'AKGEC',
  'BLOCKCHAIN RESEARCH LAB',
  'WEB DEVELOPMENT',
  'FRONTEND DEVELOPMENT'
]

export default function Experience({ isMobile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isReduced = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, y: isReduced ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
      }
    }
  }

  const tagVariants = {
    hidden: { opacity: 0, y: isReduced ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  return (
    <section id="experience" style={S.section}>
      <div style={S.inner}>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Eyebrow Label with entrance animation */}
          <motion.span
            style={S.eyebrow}
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={inView ? { opacity: 1, letterSpacing: '0.2em' } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            // CURRENTLY_BUILDING
          </motion.span>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '36px' }}>
            Current <span className="highlight-gradient">Role</span>
          </h2>

          {/* Interactive Professional Card */}
          <motion.div
            style={{
              ...S.card,
              padding: isMobile ? '28px 20px' : '38px 44px',
              transform: isHovered && !isMobile && !isReduced ? 'translateY(-4px)' : 'translateY(0px)',
              boxShadow: isHovered
                ? '0 20px 50px -15px rgba(99, 102, 241, 0.35), inset 0 0 30px rgba(99, 102, 241, 0.12)'
                : '0 10px 30px rgba(0, 0, 0, 0.5)',
              borderColor: isHovered ? 'rgba(99, 102, 241, 0.45)' : 'rgba(255, 255, 255, 0.08)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ambient Background Glow Effect inside Card */}
            <div style={{
              ...S.cardBgOrb,
              opacity: isHovered ? 0.12 : 0.05,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }} />

            {/* Top Gradient Border */}
            <div style={{
              ...S.accentLine,
              background: isHovered
                ? 'linear-gradient(90deg, #ec4899, #6366f1, #3b82f6, #10b981)'
                : 'linear-gradient(90deg, #6366f1, #8b5cf6, transparent)',
            }} />

            <div style={S.headerRow}>
              <div>
                <h3 style={S.orgName}>Blockchain Research Lab — AKGEC</h3>
                <div style={S.roleTitle}>WEB DEVELOPER</div>
              </div>
              <span style={S.statusBadge}>
                <span style={S.statusDot} /> ACTIVE ROLE
              </span>
            </div>

            <p style={S.quote}>
              Building modern web applications while collaborating on hackathons, team projects, and real-world development initiatives.
            </p>

            {/* Staggered Metadata Badges */}
            <div style={S.metaRow}>
              {METADATA_TAGS.map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagVariants}
                  style={{
                    ...S.metaTag,
                    borderColor: isHovered ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                    color: isHovered ? '#ffffff' : '#94a3b8',
                    background: isHovered ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const S = {
  section: {
    background: 'transparent',
    padding: '80px 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  inner: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'var(--accent, #6366f1)',
    letterSpacing: '0.2em',
    display: 'block',
    marginBottom: '12px',
    textAlign: 'center',
    fontWeight: '700',
  },
  card: {
    position: 'relative',
    background: 'rgba(8, 8, 22, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '18px',
    backdropFilter: 'blur(20px) saturate(180%)',
    overflow: 'hidden',
    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  cardBgOrb: {
    position: 'absolute',
    inset: '-30%',
    background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.5) 0%, transparent 60%)',
    pointerEvents: 'none',
    transition: 'transform 0.6s ease, opacity 0.6s ease',
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    transition: 'background 0.5s ease',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '14px',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1,
  },
  orgName: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 'clamp(1.3rem, 3vw, 1.65rem)',
    fontWeight: '800',
    color: '#f8fafc',
    letterSpacing: '-0.015em',
    marginBottom: '6px',
  },
  roleTitle: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11.5px',
    fontWeight: '700',
    color: 'var(--accent, #6366f1)',
    letterSpacing: '0.14em',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    fontWeight: '700',
    color: '#10b981',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    padding: '5px 12px',
    borderRadius: '20px',
    letterSpacing: '0.08em',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#10b981',
    boxShadow: '0 0 8px #10b981',
    animation: 'pulseGlowDot 2s ease-in-out infinite',
  },
  quote: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: '#cbd5e1',
    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
    lineHeight: '1.7',
    marginBottom: '26px',
    borderLeft: '3px solid #6366f1',
    paddingLeft: '18px',
    position: 'relative',
    zIndex: 1,
  },
  metaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    position: 'relative',
    zIndex: 1,
  },
  metaTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    border: '1px solid',
    padding: '5px 12px',
    borderRadius: '12px',
    letterSpacing: '0.05em',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
}
