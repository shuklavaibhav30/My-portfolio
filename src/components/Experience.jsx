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
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <span style={S.eyebrow}>
              // CURRENTLY_BUILDING
            </span>
          </div>

          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '36px', color: 'var(--text-main)' }}>
            Current <span className="neo-highlight">Role</span>
          </h2>

          {/* Interactive Professional Card */}
          <motion.div
            style={{
              ...S.card,
              padding: isMobile ? '24px 20px' : '36px 40px',
              transform: isHovered && !isMobile && !isReduced ? 'translate(-3px, -3px)' : 'translate(0px, 0px)',
              boxShadow: isHovered ? '9px 9px 0px var(--border)' : 'var(--shadow-lg)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Top Yellow Accent Bar */}
            <div style={S.accentLine} />

            <div style={S.headerRow}>
              <div>
                <h3 style={S.orgName}>Blockchain Research Lab — AKGEC</h3>
                <div style={S.roleBadge}>WEB DEVELOPER</div>
              </div>
              <span style={S.statusBadge}>
                <span style={S.statusDot} /> ACTIVE ROLE
              </span>
            </div>

            <p style={S.quote}>
              Building modern web applications while collaborating on hackathons, team projects, and real-world development initiatives at the <strong>Centre of Excellence, AKGEC</strong>.
            </p>

            {/* Staggered Metadata Badges */}
            <div style={S.metaRow}>
              {METADATA_TAGS.map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagVariants}
                  style={S.metaTag}
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
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
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
  card: {
    position: 'relative',
    background: 'var(--bg-card)',
    border: 'var(--border-width) solid var(--border)',
    borderRadius: '20px',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    background: 'var(--accent, #e86c60)',
    borderBottom: '2px solid var(--border)',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '14px',
    marginBottom: '20px',
    marginTop: '6px',
    position: 'relative',
    zIndex: 1,
  },
  orgName: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
    fontWeight: '800',
    color: 'var(--text-main)',
    letterSpacing: '-0.02em',
    marginBottom: '8px',
  },
  roleBadge: {
    display: 'inline-block',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    fontWeight: '800',
    color: '#1c1c1c',
    background: 'var(--accent, #e86c60)',
    border: '2px solid var(--border)',
    boxShadow: '2px 2px 0px var(--border)',
    padding: '3px 10px',
    borderRadius: '6px',
    letterSpacing: '0.08em',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    fontWeight: '800',
    color: '#15803d',
    background: '#dcfce7',
    border: '2px solid var(--border)',
    boxShadow: '2px 2px 0px var(--border)',
    padding: '5px 12px',
    borderRadius: '9999px',
    letterSpacing: '0.05em',
  },
  statusDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#4ade80',
    border: '1px solid #000',
  },
  quote: {
    fontFamily: "'Space Grotesk', sans-serif",
    color: 'var(--text-body)',
    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
    lineHeight: '1.7',
    marginBottom: '26px',
    borderLeft: '4px solid var(--accent, #e86c60)',
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
    background: 'var(--bg-subtle)',
    color: 'var(--text-main)',
    border: '1.5px solid var(--border)',
    boxShadow: '2px 2px 0px var(--border)',
    padding: '5px 12px',
    borderRadius: '8px',
    letterSpacing: '0.04em',
    fontWeight: '700',
  },
}

