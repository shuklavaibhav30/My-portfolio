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

          {/* Interactive Professional Card */}
          <motion.div
            style={{
              ...S.card,
              padding: isMobile ? '24px 20px' : '36px 40px',
              transform: isHovered && !isMobile && !isReduced ? 'translateY(-4px)' : 'translateY(0px)',
              boxShadow: isHovered
                ? '0 12px 35px -10px rgba(99, 102, 241, 0.25), 0 0 15px rgba(99, 102, 241, 0.15)'
                : '0 0 30px rgba(99, 102, 241, 0.08)',
              borderColor: isHovered ? 'rgba(99, 102, 241, 0.45)' : 'rgba(99, 102, 241, 0.2)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ambient Background Glow Effect inside Card */}
            <div style={{
              ...S.cardBgOrb,
              opacity: isHovered ? 0.08 : 0.04,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }} />

            {/* Top Gradient Border */}
            <div style={{
              ...S.accentLine,
              background: isHovered
                ? 'linear-gradient(90deg, #ec4899, #6366f1, #3b82f6, #10b981)'
                : 'linear-gradient(90deg, #6366f1, #3b82f6, #ec4899)',
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
              "Building modern web applications while collaborating on hackathons, team projects, and real-world development initiatives."
            </p>

            {/* Staggered Metadata Badges */}
            <div style={S.metaRow}>
              {METADATA_TAGS.map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagVariants}
                  style={{
                    ...S.metaTag,
                    borderColor: isHovered ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.06)',
                    color: isHovered ? '#e2e8f0' : '#94a3b8',
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
    padding: '60px 24px',
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
    marginBottom: '16px',
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    position: 'relative',
    background: 'rgba(6, 6, 18, 0.75)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '12px',
    backdropFilter: 'blur(12px)',
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
    height: '2px',
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
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
    fontWeight: '800',
    color: '#f8fafc',
    letterSpacing: '-0.015em',
    marginBottom: '6px',
  },
  roleTitle: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--accent, #6366f1)',
    letterSpacing: '0.12em',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    fontWeight: '700',
    color: '#10b981',
    background: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    padding: '5px 12px',
    borderRadius: '20px',
    letterSpacing: '0.06em',
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
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontStyle: 'italic',
    color: '#cbd5e1',
    fontSize: 'clamp(0.95rem, 2vw, 1.12rem)',
    lineHeight: '1.65',
    marginBottom: '26px',
    borderLeft: '2px solid rgba(99, 102, 241, 0.4)',
    paddingLeft: '16px',
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
    fontSize: '10.5px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid',
    padding: '5px 12px',
    borderRadius: '4px',
    letterSpacing: '0.05em',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
}
