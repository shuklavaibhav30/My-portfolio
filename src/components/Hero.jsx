import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useMousePosition from '../hooks/useMousePosition'
import useReducedMotion from '../hooks/useReducedMotion'
import profile from '../assets/vaibhavshukla.png'
import resume from '../assets/resume.pdf'

const SOCIALS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/shuklavaibhav30', path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/vaibhav-kumar-shukla-445b3a300/', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { id: 'insta', label: 'Instagram', href: 'https://www.instagram.com/vaiibhavvshukla/', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { id: 'x', label: 'X', href: 'https://x.com/shuklagvk', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' }
]

const QUICK_TAGS = ['React.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'C++']

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
  const [resumeProgress, setResumeProgress] = useState(0)
  const [resumeLines, setResumeLines] = useState([])
  const [isHoveringPortrait, setIsHoveringPortrait] = useState(false)

  const mousePosition = useMousePosition();
  const isReduced = useReducedMotion();

  const txImg = isReduced || isMobile ? 0 : (mousePosition.x - window.innerWidth / 2) * 0.015;
  const tyImg = isReduced || isMobile ? 0 : (mousePosition.y - window.innerHeight / 2) * 0.015;

  const RESUME_STEPS = [
    { code: '01', text: 'Locating resume.pdf payload...', status: 'FOUND' },
    { code: '02', text: 'Verifying SHA-256 integrity signature...', status: 'VERIFIED' },
    { code: '03', text: 'Decrypting document stream...', status: 'OK' },
    { code: '04', text: 'Launching viewer in new window...', status: 'READY' },
  ];

  const handleResumeInit = (e) => {
    e.preventDefault();
    setResumeTerminal(true);
    setResumeLines([]);
    setResumeProgress(0);

    let step = 0;
    const interval = setInterval(() => {
      if (step < RESUME_STEPS.length) {
        setResumeLines(prev => [...prev, RESUME_STEPS[step]]);
        setResumeProgress(Math.round(((step + 1) / RESUME_STEPS.length) * 100));
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          window.open(resume, '_blank');
          setResumeTerminal(false);
        }, 500);
      }
    }, 220);
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
  const item = {
    hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="hero" className="hero-section">
      {/* Dynamic Background Glowing Orbs */}
      <div className="hero-ambient-glow glow-1" />
      <div className="hero-ambient-glow glow-2" />
      <div className="hero-ambient-glow glow-3" />

      <AnimatePresence>
        {resumeTerminal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="resume-overlay"
            onClick={() => setResumeTerminal(false)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="resume-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="resume-modal-header">
                <div className="mac-buttons">
                  <span className="mac-dot red" />
                  <span className="mac-dot yellow" />
                  <span className="mac-dot green" />
                </div>
                <div className="resume-modal-title">
                  <span className="lock-icon">🔒</span> RESUME_TRANSFER.PDF
                </div>
                <div className="progress-perc">{resumeProgress}%</div>
              </div>

              {/* Progress Bar Track */}
              <div className="resume-progress-track">
                <motion.div
                  className="resume-progress-bar"
                  animate={{ width: `${resumeProgress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.25 }}
                />
              </div>

              {/* Terminal Lines */}
              <div className="resume-modal-body">
                {resumeLines.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="resume-log-line"
                  >
                    <span className="line-prefix">[{l.code}]</span>
                    <span className="line-text">{l.text}</span>
                    <span className="line-status">{l.status}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`hero-grid ${isMobile ? 'mobile' : ''}`}>
        {/* LEFT COLUMN */}
        <motion.div className="hero-left" variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="label-row">
            <span className="section-label">// MERN STACK DEVELOPER</span>
          </motion.div>

          <motion.h1 variants={item} className="hero-name">
            <span className="name-white">VAIBHAV KUMAR</span>
            <br />
            <span className="name-gradient">SHUKLA</span>
          </motion.h1>

          <motion.p variants={item} className="hero-bio">
            Architecting scalable MERN applications, AI-powered systems, and high-performance full-stack web platforms with modern developer experiences.
          </motion.p>

          <motion.div variants={item} className="quick-tags-container">
            {QUICK_TAGS.map((tag) => (
              <span key={tag} className="hero-quick-tag">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="cta-row">
            <MagneticButton onClick={handleResumeInit} isPrimary={true}>
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              DOWNLOAD RESUME
            </MagneticButton>

            <MagneticButton onClick={scrollToProjects} isPrimary={false}>
              EXPLORE PROJECTS ↓
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="hero-socials">
            {SOCIALS.map(s => (
              <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="hero-social-icon" title={s.label}>
                <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor"><path d={s.path} /></svg>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN - CLEAN EMBEDDED TRANSPARENT PORTRAIT */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={`portrait-wrapper ${isHoveringPortrait ? 'hovered' : ''}`}
            style={{ x: txImg, y: tyImg }}
            onMouseEnter={() => !isMobile && setIsHoveringPortrait(true)}
            onMouseLeave={() => !isMobile && setIsHoveringPortrait(false)}
          >
            {/* Soft Ambient Radial Aura Light behind portrait cut-out */}
            <div className="hero-portrait-aura" />

            {/* Clean Embedded Portrait Cut-out Image */}
            <img
              src={profile}
              alt="Vaibhav Kumar Shukla"
              className="transparent-hero-cutout"
            />
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
          padding: 120px 60px 80px;
        }

        /* Ambient Glow Background Orbs */
        .hero-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .glow-1 {
          width: 450px;
          height: 450px;
          top: 10%;
          left: -5%;
          background: rgba(99, 102, 241, 0.12);
          animation: glowFloat1 10s ease-in-out infinite alternate;
        }
        .glow-2 {
          width: 400px;
          height: 400px;
          bottom: 15%;
          right: 5%;
          background: rgba(139, 92, 246, 0.12);
          animation: glowFloat2 12s ease-in-out infinite alternate;
        }
        .glow-3 {
          width: 350px;
          height: 350px;
          top: 40%;
          left: 45%;
          background: rgba(236, 72, 153, 0.07);
          animation: glowFloat3 9s ease-in-out infinite alternate;
        }

        @keyframes glowFloat1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.1); }
        }
        @keyframes glowFloat2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-30px, -40px) scale(1.15); }
        }
        @keyframes glowFloat3 {
          0% { transform: translate(0, 0) scale(0.9); }
          100% { transform: translate(25px, -25px) scale(1.1); }
        }

        @media (max-width: 900px) {
          .hero-section { padding: 110px 20px 50px; }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 44%;
          gap: 48px;
          align-items: center;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .hero-grid.mobile {
          grid-template-columns: 1fr;
        }

        /* LEFT COLUMN */
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

        .label-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          color: var(--accent);
          font-size: 11.5px;
          letter-spacing: 0.18em;
          font-weight: 700;
        }

        .hero-name {
          font-size: clamp(2.8rem, 5.5vw, 4.2rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 18px;
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
          text-shadow: 0 0 35px rgba(139, 92, 246, 0.25);
        }

        .hero-bio {
          color: #94a3b8;
          font-size: 14.5px;
          line-height: 1.65;
          max-width: 520px;
          margin-bottom: 20px;
        }
        .hero-grid.mobile .hero-bio {
          text-align: center;
        }

        .quick-tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 28px;
        }
        .hero-grid.mobile .quick-tags-container {
          justify-content: center;
        }

        .hero-quick-tag {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          color: #cbd5e1;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 4px 11px;
          border-radius: 5px;
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }
        .hero-quick-tag:hover {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.35);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .cta-row { display: flex; gap: 14px; margin-bottom: 28px; flex-wrap: wrap; }
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
          border-radius: 6px;
          background: transparent;
          border: none;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .hero-btn.primary {
          color: #fff;
          background: linear-gradient(135deg, rgba(99,102,241,0.35) 0%, rgba(147,51,234,0.3) 100%);
          border: 1px solid rgba(99,102,241,0.55);
          box-shadow: 0 4px 20px rgba(99,102,241,0.18);
        }
        .hero-btn.primary:hover {
          box-shadow: 0 0 30px rgba(99,102,241,0.45);
          border-color: rgba(99,102,241,0.8);
          transform: translateY(-2px);
        }
        .hero-btn.primary .hero-btn-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(99,102,241,0.45) 0%, rgba(147,51,234,0.35) 100%);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }
        .hero-btn.primary:hover .hero-btn-bg { transform: scaleX(1); }

        .hero-btn.ghost {
          color: #cbd5e1;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.025);
        }
        .hero-btn.ghost .hero-btn-bg {
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.06);
          transform: scaleX(0); transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }
        .hero-btn.ghost:hover {
          color: #f8fafc;
          border-color: rgba(255,255,255,0.25);
          box-shadow: 0 4px 15px rgba(255,255,255,0.06);
          transform: translateY(-2px);
        }
        .hero-btn.ghost:hover .hero-btn-bg { transform: scaleX(1); }

        /* Social Icons */
        .hero-socials {
          display: flex;
          gap: 12px;
        }
        .hero-grid.mobile .hero-socials {
          justify-content: center;
          width: 100%;
        }
        .hero-social-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          color: #94a3b8;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-social-icon:hover {
          color: #ffffff;
          background: rgba(99,102,241,0.18);
          border-color: rgba(99,102,241,0.45);
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(99,102,241,0.25);
        }

        /* RIGHT COLUMN - CLEAN EMBEDDED TRANSPARENT PORTRAIT */
        .hero-right {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .hero-grid.mobile .hero-right {
          order: -1;
          margin-bottom: 24px;
        }

        .portrait-wrapper {
          position: relative;
          width: 100%;
          max-width: 420px;
          height: 440px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .hero-portrait-aura {
          position: absolute;
          top: 15%;
          left: 15%;
          right: 15%;
          bottom: 15%;
          background: radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.08) 50%, transparent 75%);
          filter: blur(50px);
          pointer-events: none;
          z-index: 1;
          transition: all 0.5s ease;
        }

        .portrait-wrapper.hovered .hero-portrait-aura {
          background: radial-gradient(circle, rgba(99,102,241,0.38) 0%, rgba(236,72,153,0.18) 55%, transparent 75%);
          filter: blur(60px);
        }

        .transparent-hero-cutout {
          position: relative;
          z-index: 2;
          height: 440px;
          max-height: 100%;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          object-position: bottom center;
          image-rendering: -webkit-optimize-contrast;
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%);
          filter: brightness(1.05) contrast(1.08) saturate(1.06) drop-shadow(0 0 16px rgba(99,102,241,0.4));
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
        }

        .portrait-wrapper.hovered .transparent-hero-cutout {
          transform: scale(1.03) translateY(-4px);
          filter: brightness(1.07) contrast(1.1) saturate(1.08) drop-shadow(0 0 25px rgba(139,92,246,0.6));
        }

        @media (max-width: 900px) {
          .portrait-wrapper { height: 350px; max-width: 320px; }
          .transparent-hero-cutout { height: 350px; }
        }

        /* Resume overlay */
        .resume-overlay {
          position: fixed; inset: 0; z-index: 999999;
          background: rgba(3, 3, 7, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }

        .resume-modal-card {
          width: 100%;
          max-width: 480px;
          background: rgba(8, 8, 22, 0.92);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 18px;
          box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 40px rgba(99, 102, 241, 0.2);
          overflow: hidden;
          font-family: 'JetBrains Mono', monospace;
        }

        .resume-modal-header {
          background: rgba(6, 6, 14, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .resume-modal-title {
          font-size: 11.5px;
          color: #94a3b8;
          font-weight: 700;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .lock-icon {
          font-size: 12px;
        }

        .progress-perc {
          font-size: 11px;
          color: #6366f1;
          font-weight: 700;
        }

        .resume-progress-track {
          height: 3px;
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          position: relative;
        }

        .resume-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          box-shadow: 0 0 10px #6366f1;
        }

        .resume-modal-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 160px;
          background: #030307;
        }

        .resume-log-line {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12.5px;
        }

        .line-prefix {
          color: #6366f1;
          font-weight: 700;
        }

        .line-text {
          color: #cbd5e1;
          flex: 1;
        }

        .line-status {
          color: #10b981;
          font-size: 10.5px;
          font-weight: 700;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 2px 8px;
          border-radius: 10px;
        }
      `}</style>
    </section>
  )
}