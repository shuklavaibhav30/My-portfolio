import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import useMousePosition from '../hooks/useMousePosition'
import useReducedMotion from '../hooks/useReducedMotion'
import profile from '../assets/profile.jpg'
import resume from '../assets/resume.pdf'
const SOCIALS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/shuklavaibhav30', path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/vaibhav-kumar-shukla-445b3a300/', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { id: 'insta', label: 'Instagram', href: 'https://www.instagram.com/vaiibhavvshukla/', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { id: 'x', label: 'X', href: 'https://x.com/shuklagvk', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' }
]

function MagneticButton({ children, href, style, isPrimary, onClick }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const isReduced = useReducedMotion();

  const handleMouseMove = (e) => {
    if (isReduced) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.15,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.15
    });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });
  const Tag = onClick ? 'button' : 'a';

  return (
    <Tag
      href={onClick ? undefined : href}
      onClick={onClick}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`,
        textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}
      className={isPrimary ? "hero-btn primary" : "hero-btn ghost"}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      <div className="hero-btn-bg"></div>
    </Tag>
  );
}

export default function Hero({ isMobile }) {
  const [resumeTerminal, setResumeTerminal] = useState(false)
  const [resumeLines, setResumeLines] = useState([])
  const [isHoveringPortrait, setIsHoveringPortrait] = useState(false)

  const mousePosition = useMousePosition();
  const isReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const txImg = isReduced || isMobile ? 0 : (mousePosition.x - window.innerWidth / 2) * 0.012;
  const tyImg = isReduced || isMobile ? 0 : (mousePosition.y - window.innerHeight / 2) * 0.012;
  const txHud = isReduced || isMobile ? 0 : (mousePosition.x - window.innerWidth / 2) * -0.008;
  const tyHud = isReduced || isMobile ? 0 : (mousePosition.y - window.innerHeight / 2) * -0.008;

  const handleResumeInit = (e) => {
    e.preventDefault();
    setResumeTerminal(true);
    setResumeLines([]);
    const lines = ['> locating resume.pdf...', '> verifying document...', '> initializing viewer...', '> READY'];
    let step = 0;
    const interval = setInterval(() => {
      setResumeLines(prev => [...prev, lines[step]]);
      step++;
      if (step === lines.length) {
        clearInterval(interval);
        setTimeout(() => { window.open(resume, '_blank'); setResumeTerminal(false); }, 600);
      }
    }, 200);
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
  const item = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="hero" className="hero-section">
      <AnimatePresence>
        {resumeTerminal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="resume-overlay">
            <div className="resume-box">
              {resumeLines.map((l, i) => <div key={i} className="resume-line">{l}</div>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`hero-grid ${isMobile ? 'mobile' : ''}`}>
        {/* LEFT COLUMN */}
        <motion.div className="hero-left" variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="section-label">
            // FULL-STACK DEVELOPER
          </motion.div>

          <motion.h1 variants={item} className="hero-name">
            <span className="name-white">VAIBHAV KUMAR</span>
            <br />
            <span className="name-gradient">SHUKLA</span>
          </motion.h1>

          <motion.div variants={item} className="hero-socials">
            {SOCIALS.map(s => (
              <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="hero-social-icon">
                <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor"><path d={s.path} /></svg>
              </a>
            ))}
          </motion.div>

          <motion.div variants={item} className="cta-row">
            <MagneticButton onClick={handleResumeInit} isPrimary={true}>
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              DOWNLOAD RESUME
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN - PORTRAIT */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={`portrait-container ${isHoveringPortrait ? 'hovered' : ''}`}
            style={{ x: txImg, y: tyImg }}
            onMouseEnter={() => !isMobile && setIsHoveringPortrait(true)}
            onMouseLeave={() => !isMobile && setIsHoveringPortrait(false)}
          >
            <div className="portrait-glow" />

            <div className="circular-frame">
              {/* Orbiting ring 1 (clockwise 14s) */}
              <div className="orbit-ring orbit-ring-1">
                <div className="accent-dot orbit-dot-1" />
              </div>
              {/* Orbiting ring 2 (counter-clockwise 20s) */}
              <div className="orbit-ring orbit-ring-2">
                <div className="accent-dot orbit-dot-2" />
              </div>

              <img src={profile} alt="Vaibhav Shukla" className="circular-photo" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          background: transparent;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 100px 60px 60px;
        }
        @media (max-width: 900px) {
          .hero-section { padding: 100px 20px 40px; }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 42%;
          gap: 40px;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .hero-grid.mobile {
          grid-template-columns: 1fr;
        }

        /* LEFT */
        .hero-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-grid.mobile .hero-left {
          align-items: center;
          text-align: center;
          width: 100%;
        }

        .boot-line {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 16px;
        }

        .status-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .status-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #64748b;
          letter-spacing: 0.05em;
        }
        .status-ok {
          color: #10b981;
          font-weight: 700;
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          color: var(--accent);
          font-size: 11px;
          letter-spacing: 0.2em;
          margin-bottom: 10px;
        }

        .hero-name {
          font-size: clamp(2.8rem, 6vw, 4.2rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .hero-grid.mobile .hero-name {
          text-align: center;
        }
        .name-white { color: #f8fafc; }
        .name-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 40%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-family: 'JetBrains Mono', monospace;
          color: #cbd5e1;
          font-size: 13px;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .hero-socials {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        .hero-grid.mobile .hero-socials {
          justify-content: center;
          width: 100%;
        }
        .hero-social-icon {
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-social-icon:hover {
          color: var(--accent);
          transform: translateY(-2px);
        }

        .cta-row { display: flex; gap: 14px; margin-bottom: 36px; flex-wrap: wrap; }
        .hero-grid.mobile .cta-row {
          justify-content: center;
          width: 100%;
        }

        .hero-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          padding: 13px 26px;
          letter-spacing: 0.05em;
          border-radius: 2px;
          background: transparent;
          border: none;
          cursor: none;
          transition: all 0.3s ease;
        }
        .hero-btn.primary {
          color: #fff;
          background: linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(147,51,234,0.2) 100%);
          border: 1px solid rgba(99,102,241,0.5);
        }
        .hero-btn.primary:hover {
          box-shadow: 0 0 25px rgba(99,102,241,0.35);
          background: linear-gradient(135deg, rgba(99,102,241,0.45) 0%, rgba(147,51,234,0.35) 100%);
        }
        .hero-btn.primary .hero-btn-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(147,51,234,0.3) 100%);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }
        .hero-btn.primary:hover .hero-btn-bg { transform: scaleX(1); }

        .hero-btn.ghost {
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .hero-btn.ghost .hero-btn-bg {
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.04);
          transform: scaleX(0); transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }
        .hero-btn.ghost:hover {
          color: #f8fafc;
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 0 12px rgba(255,255,255,0.05);
        }
        .hero-btn.ghost:hover .hero-btn-bg { transform: scaleX(1); }

        /* Social */
        .social-area { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
        .social-icons { display: flex; gap: 10px; }
        .social-icon {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          color: #94a3b8;
          border-radius: 2px;
          transition: all 0.3s ease;
          cursor: none;
        }
        .social-icon:hover {
          transform: translateY(-3px);
          color: var(--accent-col);
          border-color: rgba(255,255,255,0.12);
          box-shadow: 0 6px 15px rgba(0,0,0,0.5);
        }

        .online-status {
          display: flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #10b981;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .pulse-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-glow 2s infinite;
        }

        /* RIGHT - PORTRAIT & ORBIT ANIMATIONS */
        .hero-right {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .hero-grid.mobile .hero-right {
          order: -1;
          margin-bottom: 20px;
        }

        .portrait-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .portrait-glow {
          position: absolute;
          inset: -20%;
          background: radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 60%);
          filter: blur(40px);
          pointer-events: none;
          animation: glowBreathe 5s ease-in-out infinite;
          transition: all 0.5s ease;
        }
        .portrait-container.hovered .portrait-glow {
          background: radial-gradient(circle at center, rgba(99,102,241,0.3) 0%, transparent 60%);
        }

        @keyframes glowBreathe {
          0%, 100% { opacity: 0.7; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1.03); }
        }

        .circular-frame {
          position: relative;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 2px solid var(--accent, #6366f1);
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 40px rgba(99,102,241,0.15);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .portrait-container.hovered .circular-frame {
          transform: scale(1.01);
          box-shadow: 0 0 60px rgba(99,102,241,0.35);
          border-color: #818cf8;
        }

        .circular-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          filter: brightness(0.95) contrast(1.05);
          transition: filter 0.4s ease;
        }
        .portrait-container.hovered .circular-photo {
          filter: brightness(1.05) contrast(1.1);
        }

        /* Orbit Rings */
        .orbit-ring {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          pointer-events: none;
        }
        .orbit-ring-1 {
          animation: orbitClockwise 14s linear infinite;
        }
        .orbit-ring-2 {
          animation: orbitCounterClockwise 20s linear infinite;
        }
        .portrait-container.hovered .orbit-ring-1 {
          animation-play-state: paused;
        }
        .portrait-container.hovered .orbit-ring-2 {
          animation-play-state: paused;
        }

        @keyframes orbitClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes orbitCounterClockwise {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        .accent-dot {
          position: absolute;
          border-radius: 50%;
          background: var(--accent, #6366f1);
          box-shadow: 0 0 12px var(--accent, #6366f1);
          animation: dotPulse 3s ease-in-out infinite alternate;
        }
        .orbit-dot-1 {
          width: 14px;
          height: 14px;
          top: 10px;
          right: 30px;
          border: 2px solid #030307;
        }
        .orbit-dot-2 {
          width: 10px;
          height: 10px;
          bottom: 20px;
          left: 40px;
          border: 2px solid #030307;
          animation-delay: 1.5s;
        }

        .portrait-container.hovered .accent-dot {
          box-shadow: 0 0 20px #818cf8;
          background: #818cf8;
        }

        @keyframes dotPulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.15); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring-1, .orbit-ring-2, .portrait-glow, .accent-dot {
            animation: none !important;
          }
        }

        @media (max-width: 900px) {
          .circular-frame { width: 280px; height: 280px; }
          .portrait-container { max-width: 340px; }
        }

        /* Resume overlay */
        .resume-overlay {
          position: fixed; inset: 0; z-index: 999999;
          background: rgba(3,3,7,0.92);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
        }
        .resume-box {
          background: #080814;
          border: 1px solid rgba(99,102,241,0.25);
          padding: 28px;
          border-radius: 2px;
          min-width: 340px;
          box-shadow: 0 0 60px rgba(99,102,241,0.08);
        }
        .resume-line {
          color: #10b981;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          margin-bottom: 10px;
        }
      `}</style>
    </section>
  )
}