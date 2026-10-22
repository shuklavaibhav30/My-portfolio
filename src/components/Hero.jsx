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

export default function Hero({ isMobile }) {
  const [resumeTerminal, setResumeTerminal] = useState(false)
  const [resumeProgress, setResumeProgress] = useState(0)
  const [resumeLines, setResumeLines] = useState([])
  const [isHoveringPortrait, setIsHoveringPortrait] = useState(false)

  const mousePosition = useMousePosition();
  const isReduced = useReducedMotion();

  const txImg = isReduced || isMobile ? 0 : (mousePosition.x - window.innerWidth / 2) * 0.012;
  const tyImg = isReduced || isMobile ? 0 : (mousePosition.y - window.innerHeight / 2) * 0.012;

  const RESUME_STEPS = [
    { code: '01', text: 'Fetching Vaibhav_Shukla_Resume.pdf...', status: 'OK' },
    { code: '02', text: 'Verifying credentials & project milestones...', status: 'VERIFIED' },
    { code: '03', text: 'Preparing PDF viewer stream...', status: 'SUCCESS' },
    { code: '04', text: 'Launching document in new tab...', status: 'OPENING' },
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
        }, 400);
      }
    }, 200);
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="hero" className="hero-section">
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
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
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
                  <span>RESUME_DOWNLOAD.PDF</span>
                </div>
                <div className="progress-perc">{resumeProgress}%</div>
              </div>

              {/* Progress Bar Track */}
              <div className="resume-progress-track">
                <motion.div
                  className="resume-progress-bar"
                  animate={{ width: `${resumeProgress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
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
          
          {/* Crisp Neo-Brutalist Name Banner with Coral Neo-Brutalist Offset Shadow */}
          <motion.div variants={item} className="hero-yellow-banner">
            <h1 className="banner-text">
              VAIBHAV KUMAR SHUKLA<span className="banner-dot">.</span>
            </h1>
          </motion.div>

          {/* Role Badge - Clean without emojis */}
          <motion.div variants={item} className="hero-role-row">
            <span className="hero-role-badge">MERN STACK DEVELOPER</span>
          </motion.div>

          {/* Bio text */}
          <motion.p variants={item} className="hero-bio">
            Full-Stack Developer building robust web platforms, role-scoped architectures, and AI micro-services with <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>. Competitive programmer sharpening algorithms daily.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="cta-row">
            <button onClick={handleResumeInit} className="hero-btn primary">
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>DOWNLOAD RESUME</span>
            </button>

            <button onClick={scrollToProjects} className="hero-btn white">
              <span>EXPLORE PROJECTS ↓</span>
            </button>
          </motion.div>

          {/* Social Icons (White square boxes with 2px black border & shadow) */}
          <motion.div variants={item} className="hero-socials">
            {SOCIALS.map(s => (
              <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="hero-social-box" title={s.label}>
                <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN - REDESIGNED PHOTO SHOWCASE CARD (NO TEXT) */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`hero-photo-card ${isHoveringPortrait ? 'hovered' : ''}`}
            onMouseEnter={() => !isMobile && setIsHoveringPortrait(true)}
            onMouseLeave={() => !isMobile && setIsHoveringPortrait(false)}
          >
            <div className="photo-card-inner">
              <img
                src={profile}
                alt="Vaibhav Kumar Shukla"
                className="hero-portrait-img"
                style={{ transform: `translate(${txImg}px, ${tyImg}px)` }}
              />
            </div>
          </div>
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
          padding: 130px 48px 80px;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
        }

        @media (max-width: 900px) {
          .hero-section {
            min-height: auto;
            padding: 100px 16px 50px;
          }
        }

        @media (max-width: 380px) {
          .hero-section {
            padding: 85px 12px 40px;
          }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          box-sizing: border-box;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .hero-right {
            order: -1;
          }
          .hero-left {
            align-items: center;
            text-align: center;
          }
          .hero-yellow-banner {
            width: 100% !important;
            text-align: center;
            padding: 10px 16px !important;
          }
          .hero-role-row {
            justify-content: center;
          }
          .cta-row {
            justify-content: center;
          }
          .hero-socials {
            justify-content: center;
          }
          .hero-bio {
            text-align: center;
          }
        }

        .hero-grid.mobile {
          grid-template-columns: 1fr;
          gap: 32px;
        }

        /* LEFT COLUMN */
        .hero-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        .hero-grid.mobile .hero-left {
          align-items: center;
          text-align: center;
        }

        /* Clean Hacktoberfest Name Banner */
        .hero-yellow-banner {
          background: var(--bg-card, #ffffff);
          border: 2.5px solid var(--border, #1c1c1c);
          box-shadow: 5px 5px 0px var(--accent, #e86c60);
          border-radius: 14px;
          padding: 12px 28px;
          margin-bottom: 18px;
          width: fit-content;
          max-width: 100%;
          box-sizing: border-box;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-yellow-banner:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0px var(--accent, #e86c60);
        }
        .hero-grid.mobile .hero-yellow-banner {
          width: 100%;
          text-align: center;
          padding: 10px 16px;
        }
        .banner-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.4rem, 5.8vw, 3.4rem);
          font-weight: 800;
          color: var(--text-main, #1c1c1c);
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0;
          text-transform: uppercase;
          word-break: break-word;
        }
        .banner-dot {
          color: var(--accent, #e86c60);
          font-weight: 900;
          margin-left: 2px;
        }

        /* Role Badge */
        .hero-role-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .hero-grid.mobile .hero-role-row {
          justify-content: center;
        }
        .hero-role-badge {
          display: inline-flex;
          align-items: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-main);
          background: linear-gradient(180deg, #ffffff 0%, var(--bg-card) 60%, var(--bg-subtle) 100%);
          border: 2px solid var(--border);
          box-shadow: 
            inset 0 1.5px 0.5px rgba(255, 255, 255, 0.85),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.1),
            3px 3px 0px var(--border);
          padding: 7px 18px;
          border-radius: 9999px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        :root[data-theme="dark"] .hero-role-badge {
          background: linear-gradient(180deg, #24322c 0%, #19231e 60%, #121915 100%);
          box-shadow: 
            inset 0 1.5px 0.5px rgba(255, 255, 255, 0.25),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.35),
            3px 3px 0px var(--border);
        }
        .hero-role-badge:hover {
          transform: translate(-1.5px, -1.5px);
          box-shadow: 
            inset 0 2px 1px rgba(255, 255, 255, 0.9),
            4.5px 4.5px 0px var(--accent);
          border-color: var(--border);
        }

        /* Bio */
        .hero-bio {
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-body);
          max-width: 560px;
          margin-bottom: 24px;
        }
        .hero-bio strong {
          color: var(--text-main);
          font-weight: 800;
        }

        /* CTA Row */
        .cta-row {
          display: flex;
          gap: 14px;
          margin-bottom: 26px;
          flex-wrap: wrap;
        }
        .hero-grid.mobile .cta-row {
          justify-content: center;
        }

        /* GLOSSY CTA BUTTONS */
        .hero-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.03em;
          padding: 13px 26px;
          border-radius: 14px;
          border: 2.5px solid var(--border);
          cursor: pointer;
          overflow: hidden;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Glossy Top Curvature Highlight */
        .hero-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 48%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 100%);
          border-radius: 11px 11px 18px 18px;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        /* Glossy Light Sweep Beam on Hover */
        .hero-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          bottom: -50%;
          left: -70%;
          width: 50%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.42), transparent);
          transform: rotate(25deg);
          pointer-events: none;
          opacity: 0;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
        }
        .hero-btn:hover::after {
          opacity: 1;
          transform: rotate(25deg) translateX(360%);
        }

        /* PRIMARY GLOSSY CORAL BUTTON (Download Resume) */
        .hero-btn.primary {
          background: linear-gradient(180deg, #ff8b7e 0%, #e86c60 52%, #cf574b 100%);
          color: #ffffff;
          box-shadow: 
            inset 0 1.5px 0.5px rgba(255, 255, 255, 0.7),
            inset 0 -2.5px 3px rgba(0, 0, 0, 0.3),
            4px 4px 0px var(--border);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
        }
        .hero-btn.primary svg {
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25));
        }
        .hero-btn.primary:hover {
          background: linear-gradient(180deg, #ff9b8f 0%, #f0766a 52%, #db5e52 100%);
          transform: translate(-2px, -2px);
          box-shadow: 
            inset 0 2px 1px rgba(255, 255, 255, 0.85),
            inset 0 -2.5px 3px rgba(0, 0, 0, 0.3),
            6px 6px 0px var(--border),
            0 0 16px rgba(232, 108, 96, 0.4);
        }
        .hero-btn.primary:active {
          transform: translate(2px, 2px);
          box-shadow: 
            inset 0 1px 2px rgba(0, 0, 0, 0.4),
            2px 2px 0px var(--border);
        }

        /* SECONDARY GLOSSY BUTTON (Explore Projects) */
        .hero-btn.white {
          background: linear-gradient(180deg, #ffffff 0%, var(--bg-card) 55%, var(--bg-subtle) 100%);
          color: var(--text-main);
          box-shadow: 
            inset 0 1.5px 0.5px rgba(255, 255, 255, 0.85),
            inset 0 -2.5px 3px rgba(0, 0, 0, 0.15),
            4px 4px 0px var(--border);
        }
        :root[data-theme="dark"] .hero-btn.white {
          background: linear-gradient(180deg, #2a3731 0%, #1c2621 55%, #131b17 100%);
          color: #ffffff;
          box-shadow: 
            inset 0 1.5px 0.5px rgba(255, 255, 255, 0.32),
            inset 0 -2.5px 3px rgba(0, 0, 0, 0.4),
            4px 4px 0px var(--border);
        }
        .hero-btn.white:hover {
          transform: translate(-2px, -2px);
          box-shadow: 
            inset 0 2px 1px rgba(255, 255, 255, 0.9),
            inset 0 -2.5px 3px rgba(0, 0, 0, 0.15),
            6px 6px 0px var(--border);
        }
        :root[data-theme="dark"] .hero-btn.white:hover {
          box-shadow: 
            inset 0 2px 1px rgba(255, 255, 255, 0.45),
            inset 0 -2.5px 3px rgba(0, 0, 0, 0.4),
            6px 6px 0px var(--border),
            0 0 14px rgba(255, 255, 255, 0.15);
        }
        .hero-btn.white:active {
          transform: translate(2px, 2px);
          box-shadow: 
            inset 0 1px 2px rgba(0, 0, 0, 0.35),
            2px 2px 0px var(--border);
        }

        /* GLOSSY SOCIAL TILES */
        .hero-socials {
          display: flex;
          gap: 10px;
        }
        .hero-social-box {
          position: relative;
          width: 44px;
          height: 44px;
          background: linear-gradient(180deg, #ffffff 0%, var(--bg-card) 55%, var(--bg-subtle) 100%);
          border: 2px solid var(--border);
          box-shadow: 
            inset 0 1.5px 0.5px rgba(255, 255, 255, 0.8),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.15),
            3.5px 3.5px 0px var(--border);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          overflow: hidden;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        :root[data-theme="dark"] .hero-social-box {
          background: linear-gradient(180deg, #2a3731 0%, #1c2621 55%, #131b17 100%);
          box-shadow: 
            inset 0 1.5px 0.5px rgba(255, 255, 255, 0.3),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.4),
            3.5px 3.5px 0px var(--border);
        }
        .hero-social-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 48%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.05) 100%);
          border-radius: 9px 9px 12px 12px;
          pointer-events: none;
        }
        .hero-social-box:hover {
          transform: translate(-2px, -2px);
          box-shadow: 
            inset 0 2px 1px rgba(255, 255, 255, 0.9),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.15),
            5px 5px 0px var(--accent);
          color: var(--accent);
        }
        :root[data-theme="dark"] .hero-social-box:hover {
          box-shadow: 
            inset 0 2px 1px rgba(255, 255, 255, 0.45),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.4),
            5px 5px 0px var(--accent),
            0 0 12px rgba(255, 126, 114, 0.35);
          color: var(--accent);
        }

        /* RIGHT COLUMN: REDESIGNED PHOTO CARD (NO TEXT) */
        .hero-right {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-grid.mobile .hero-right {
          order: -1;
        }
        .hero-photo-card {
          position: relative;
          width: 100%;
          max-width: 400px;
          background: var(--bg-card);
          border: 2.5px solid var(--border);
          border-radius: 24px;
          box-shadow: 8px 8px 0px var(--border);
          padding: 14px;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
        }
        @media (max-width: 600px) {
          .cta-row {
            gap: 10px;
            width: 100%;
          }
          .hero-btn {
            flex: 1 1 140px;
            max-width: 100%;
            padding: 12px 16px;
            font-size: 12px;
            justify-content: center;
          }
          .hero-photo-card {
            max-width: min(340px, 100%);
            padding: 10px;
            border-radius: 20px;
          }
          .photo-card-inner {
            height: clamp(280px, 46vh, 380px) !important;
            border-radius: 14px;
          }
        }
        .hero-photo-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 12px 12px 0px var(--border);
        }
        :root[data-theme="dark"] .hero-photo-card:hover {
          box-shadow: 12px 12px 0px var(--border), 0 0 25px rgba(232, 108, 96, 0.15);
        }
        .photo-card-inner {
          position: relative;
          width: 100%;
          height: 440px;
          background: linear-gradient(180deg, var(--bg-subtle) 0%, var(--bg-card-alt) 100%);
          border: 2px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          box-shadow: inset 0 1.5px 1px rgba(255, 255, 255, 0.7), inset 0 0 24px rgba(0, 0, 0, 0.05);
        }
        :root[data-theme="dark"] .photo-card-inner {
          background: linear-gradient(180deg, #1d2a23 0%, #141c18 60%, #0d1310 100%);
          box-shadow: inset 0 1.5px 0.5px rgba(255, 255, 255, 0.2), inset 0 0 30px rgba(0, 0, 0, 0.4);
        }
        .hero-portrait-img {
          height: 100%;
          max-height: 440px;
          width: auto;
          object-fit: contain;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-photo-card:hover .hero-portrait-img {
          transform: scale(1.03);
        }

        /* Modal */
        .resume-overlay {
          position: fixed; inset: 0; z-index: 999999;
          background: rgba(8, 16, 12, 0.7);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .resume-modal-card {
          width: 100%;
          max-width: 480px;
          background: var(--bg-card);
          border: 2.5px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-xl);
          overflow: hidden;
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-main);
        }
        .resume-modal-header {
          background: var(--bg-subtle);
          border-bottom: 2px solid var(--border);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mac-buttons { display: flex; gap: 6px; }
        .mac-dot {
          width: 11px; height: 11px; border-radius: 50%; border: 1.5px solid var(--border);
        }
        .mac-dot.red { background: #ef4444; }
        .mac-dot.yellow { background: #facc15; }
        .mac-dot.green { background: #22c55e; }
        .resume-modal-title { font-size: 11px; font-weight: 800; color: var(--text-main); }
        .progress-perc { font-size: 12px; font-weight: 800; color: var(--text-main); }
        .resume-progress-track {
          height: 6px; width: 100%; background: var(--bg-subtle); border-bottom: 2px solid var(--border);
        }
        .resume-progress-bar {
          height: 100%; background: var(--accent, #e86c60);
        }
        .resume-modal-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: var(--bg-card);
        }
        .resume-log-line {
          display: flex; align-items: center; gap: 10px; font-size: 12px;
        }
        .line-prefix { color: var(--accent); font-weight: 800; }
        .line-text { color: var(--text-body); flex: 1; }
        .line-status {
          color: #1c1c1c; font-weight: 800; background: var(--accent, #e86c60);
          border: 1.5px solid var(--border); padding: 2px 8px; border-radius: 6px;
        }
      `}</style>
    </section>
  )
}