import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

import profile from '../assets/profile.jpg'
import resume from '../assets/resume.pdf'

const PHRASES = ['MERN Stack Developer', 'DSA Enthusiast']
const SHOW_INITIALS = false

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/shuklavaibhav30',
    path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vaibhav-kumar-shukla-445b3a300/',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/vaiibhavvshukla/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'X',
    href: 'https://x.com/shuklagvk',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
]

export default function Hero() {
  const [displayText, setDisplayText]   = useState('')
  const [phraseIdx,   setPhraseIdx]     = useState(0)
  const [charIdx,     setCharIdx]       = useState(0)
  const [isDeleting,  setIsDeleting]    = useState(false)

  // particles engine init
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  // typing loop
  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    let t

    if (!isDeleting && charIdx <= phrase.length) {
      setDisplayText(phrase.slice(0, charIdx))
      t = setTimeout(() => setCharIdx(c => c + 1), 85)
    } else if (!isDeleting && charIdx > phrase.length) {
      t = setTimeout(() => setIsDeleting(true), 1900)
    } else if (isDeleting && charIdx >= 0) {
      setDisplayText(phrase.slice(0, charIdx))
      t = setTimeout(() => setCharIdx(c => c - 1), 45)
    } else {
      setIsDeleting(false)
      setPhraseIdx(p => (p + 1) % PHRASES.length)
      setCharIdx(0)
    }

    return () => clearTimeout(t)
  }, [charIdx, isDeleting, phraseIdx])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  }
  const item = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="hero" style={S.section}>

      {/* particles bg */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            number: { value: 55, density: { enable: true, area: 850 } },
            color: { value: ['#818cf8', '#a78bfa', '#ec4899', '#38bdf8'] },
            shape: { type: 'circle' },
            opacity: {
              value: { min: 0.08, max: 0.4 },
              animation: { enable: true, speed: 0.7, minimumValue: 0.05, sync: false },
            },
            size: { value: { min: 1, max: 2.2 } },
            links: {
              enable: true, distance: 125,
              color: '#818cf8', opacity: 0.1, width: 0.7,
            },
            move: {
              enable: true, speed: 0.55, direction: 'none',
              outModes: { default: 'bounce' },
            },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'grab' }, resize: true },
            modes: { grab: { distance: 140, links: { opacity: 0.28 } } },
          },
          detectRetina: true,
        }}
        style={S.particles}
      />

      {/* grid lines */}
      <div style={S.grid} aria-hidden="true" />

      {/* gradient orbs */}
      <div style={{ ...S.orb, ...S.orb1 }} aria-hidden="true" />
      <div style={{ ...S.orb, ...S.orb2 }} aria-hidden="true" />

      {/* main content */}
      <motion.div
        style={S.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* ── avatar ── */}
        <motion.div variants={item} style={S.avatarWrap}>
          <div style={S.avatarGlow} aria-hidden="true" />
          <div style={S.avatarRingOuter} aria-hidden="true" />
          <div style={S.avatarRingInner} aria-hidden="true" />

          {SHOW_INITIALS ? (
            <div style={S.avatarInitials} role="img" aria-label="Vaibhav Kumar Shukla">
              VK
            </div>
          ) : (
            <img
              src={profile}
              alt="Vaibhav Kumar Shukla"
              style={S.avatarImg}
            />
          )}
          <span style={S.statusDot} title="Open to work" aria-label="Open to work" />
        </motion.div>

        {/* greeting */}
        <motion.p variants={item} style={S.greeting}>
          &lt; Hello, World! /&gt;
        </motion.p>

        {/* name */}
        <motion.h1 variants={item} style={S.name}>
          I&rsquo;m <span style={S.nameGrad}>Vaibhav</span>
        </motion.h1>

        {/* typing */}
        <motion.div variants={item} style={S.typingRow} aria-live="polite">
          <span style={S.typingText}>{displayText}</span>
          <span style={S.cursor} aria-hidden="true" />
        </motion.div>

        {/* bio */}
        <motion.p variants={item} style={S.bio}>
          3rd-year CSE student building backends that scale and frontends that feel alive.
          <br />Shipping real projects with Node.js, React &amp; MongoDB — powered by curiosity.
        </motion.p>

        {/* tech pills */}
        <motion.div variants={item} style={S.pillRow}>
          {['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'C++ / DSA','Github','Git'].map(t => (
            <span key={t} style={S.pill}>{t}</span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} style={S.ctaRow}>
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ ...S.btn, ...S.btnPrimary }}
          >
            View Projects
          </a>
          <a href="mailto:imvksofficial@gmail.com" style={{ ...S.btn, ...S.btnGhost }}>
            Get in Touch
          </a>
        </motion.div>

        {/* socials */}
        <motion.div variants={item} style={S.socialRow}>
          {SOCIALS.map(({ label, href, path }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} style={S.socialBtn}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d={path} />
              </svg>
            </a>
          ))}
          <span style={S.divider} aria-hidden="true" />
          <a href={resume} target="_blank" rel="noreferrer" style={S.resumeLink}>
            Resume ↗
          </a>
        </motion.div>
      </motion.div>

      {/* scroll nudge */}
      <motion.div
        style={S.scrollHint}
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span style={S.scrollLabel}>scroll</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}

const S = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    background: '#07070e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '80px 24px 60px',
  },
  particles: { position: 'absolute', inset: 0, zIndex: 0 },
  grid: {
    position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
    backgroundImage:
      'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),' +
      'linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)',
    backgroundSize: '44px 44px',
  },
  orb: {
    position: 'absolute', borderRadius: '50%',
    pointerEvents: 'none', zIndex: 0,
  },
  orb1: {
    width: '420px', height: '420px',
    background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)',
    top: '-80px', right: '-60px',
  },
  orb2: {
    width: '320px', height: '320px',
    background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
    bottom: '40px', left: '-80px',
  },

  content: {
    position: 'relative', zIndex: 1,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', textAlign: 'center',
    maxWidth: '680px', width: '100%',
  },

  // avatar
  avatarWrap: { position: 'relative', marginBottom: '32px' },
  avatarGlow: {
    position: 'absolute', inset: '-24px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 68%)',
    zIndex: 0, pointerEvents: 'none',
  },
  avatarRingOuter: {
    position: 'absolute', inset: '-10px', borderRadius: '50%',
    border: '1.5px dashed rgba(129,140,248,0.35)',
    animation: 'spin 12s linear infinite',
    zIndex: 1,
  },
  avatarRingInner: {
    position: 'absolute', inset: '-4px', borderRadius: '50%',
    border: '1px solid rgba(236,72,153,0.2)',
    animation: 'spin 7s linear infinite reverse',
    zIndex: 1,
  },
  avatarInitials: {
    width: '172px', height: '172px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
    border: '3px solid rgba(99,102,241,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '48px', fontWeight: '700', color: '#a5b4fc',
    position: 'relative', zIndex: 2,
    letterSpacing: '-0.02em',
  },
  avatarImg: {
    width: '172px', height: '172px', borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid rgba(99,102,241,0.55)',
    position: 'relative', zIndex: 2, display: 'block',
  },
  statusDot: {
    position: 'absolute', bottom: '10px', right: '10px',
    width: '15px', height: '15px', borderRadius: '50%',
    background: '#10b981',
    border: '2.5px solid #07070e',
    zIndex: 3,
    animation: 'pulse-glow 2.5s ease-in-out infinite',
  },

  // text
  greeting: {
    fontFamily: "'Fira Code', monospace",
    fontSize: '13px', color: '#818cf8',
    marginBottom: '10px', letterSpacing: '0.06em',
  },
  name: {
    fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
    fontWeight: '700', color: '#f1f5f9',
    marginBottom: '16px', lineHeight: '1.12',
    letterSpacing: '-0.025em',
  },
  nameGrad: {
    background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  typingRow: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: '3px',
    marginBottom: '22px', minHeight: '34px',
  },
  typingText: {
    fontFamily: "'Fira Code', monospace",
    fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
    color: '#a5b4fc', fontWeight: '500',
  },
  cursor: {
    display: 'inline-block', width: '2px', height: '20px',
    background: '#818cf8', borderRadius: '1px',
    animation: 'blink 1s step-end infinite', flexShrink: 0,
  },
  bio: {
    fontSize: '15px', color: '#94a3b8',
    lineHeight: '1.8', marginBottom: '26px',
    maxWidth: '500px',
  },

  // pills
  pillRow: {
    display: 'flex', flexWrap: 'wrap',
    gap: '8px', justifyContent: 'center',
    marginBottom: '30px',
  },
  pill: {
    fontSize: '11px', padding: '4px 13px',
    borderRadius: '20px',
    border: '1px solid rgba(129,140,248,0.28)',
    background: 'rgba(99,102,241,0.07)',
    color: '#a5b4fc', letterSpacing: '0.04em',
    fontFamily: "'Fira Code', monospace",
  },

  // cta
  ctaRow: {
    display: 'flex', gap: '12px',
    flexWrap: 'wrap', justifyContent: 'center',
    marginBottom: '26px',
  },
  btn: {
    fontSize: '13px', fontWeight: '600',
    padding: '10px 26px', borderRadius: '8px',
    letterSpacing: '0.02em',
    transition: 'all 0.22s ease',
    cursor: 'pointer',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    boxShadow: '0 4px 24px rgba(99,102,241,0.38)',
  },
  btnGhost: {
    background: 'transparent',
    color: '#a5b4fc',
    border: '1px solid rgba(129,140,248,0.38)',
  },

  // social
  socialRow: {
    display: 'flex', alignItems: 'center', gap: '10px',
  },
  socialBtn: {
    width: '36px', height: '36px', borderRadius: '8px',
    border: '1px solid rgba(129,140,248,0.22)',
    background: 'rgba(99,102,241,0.06)',
    color: '#94a3b8',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  },
  divider: {
    width: '1px', height: '20px',
    background: 'rgba(129,140,248,0.18)', margin: '0 4px',
  },
  resumeLink: {
    fontSize: '12px', color: '#818cf8',
    fontFamily: "'Fira Code', monospace",
    letterSpacing: '0.04em',
  },

  // scroll hint
  scrollHint: {
    position: 'absolute', bottom: '28px', left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '5px',
    color: '#3f4e63', zIndex: 1,
  },
  scrollLabel: {
    fontFamily: "'Fira Code', monospace",
    fontSize: '9px', letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
}