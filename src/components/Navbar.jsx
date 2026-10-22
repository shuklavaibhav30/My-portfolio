import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home',         href: '#hero' },
  { label: 'Domains',      href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)

      // Section scrollSpy
      const sections = NAV_LINKS.map(l => l.href.substring(1))
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar-container">
        {/* Logo */}
        <a href="#hero" onClick={e => handleNav(e, '#hero')} className="navbar-logo">
          <span className="logo-accent">&lt;</span>
          <span className="logo-text">vaibhav.dev</span>
          <span className="logo-accent"> /&gt;</span>
          <span className="online-dot" title="Available for work" />
        </a>

        {/* Desktop Links */}
        {!isMobile && (
          <div className="navbar-links">
            {NAV_LINKS.map(({ label, href }) => {
              const secId = href.substring(1)
              const isActive = activeSection === secId
              return (
                <a
                  key={label}
                  href={href}
                  onClick={e => handleNav(e, href)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-item-text">{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="#contact"
              onClick={e => handleNav(e, '#contact')}
              className="navbar-cta-btn"
            >
              CONTACT ME
            </a>
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="mobile-burger-btn"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle Navigation Menu"
            >
              <span className={`burger-line ${menuOpen ? 'open-top' : ''}`} />
              <span className={`burger-line ${menuOpen ? 'open-mid' : ''}`} />
              <span className={`burger-line ${menuOpen ? 'open-bot' : ''}`} />
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mobile-dropdown"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const secId = href.substring(1)
              const isActive = activeSection === secId
              return (
                <a
                  key={label}
                  href={href}
                  onClick={e => handleNav(e, href)}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="mobile-link-dot">•</span> {label}
                </a>
              )
            })}
            <a
              href="#contact"
              onClick={e => handleNav(e, '#contact')}
              className="mobile-cta-btn"
            >
              CONTACT ME
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 24px;
          display: flex;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .navbar-wrapper.scrolled {
          padding: 10px 24px;
        }

        .navbar-container {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 920px;
          height: 54px;
          padding: 0 20px;
          border-radius: 9999px;
          background: var(--nav-bg, #3e6356) !important;
          border: 2.5px solid var(--border, #1c1c1c) !important;
          box-shadow: 4px 4px 0px var(--border, #1c1c1c) !important;
          transition: all 0.25s ease;
        }

        .navbar-wrapper.scrolled .navbar-container {
          box-shadow: 5px 5px 0px var(--border, #1c1c1c) !important;
          transform: translateY(2px);
        }

        /* Logo */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          font-weight: 800;
          color: var(--nav-text, #f6f4ee);
          text-decoration: none;
          letter-spacing: 0.02em;
        }

        .logo-accent {
          color: #4ade80;
          font-weight: 900;
        }

        .logo-text {
          color: var(--nav-text, #f6f4ee);
        }

        .online-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          border: 1.5px solid #1c1c1c;
          margin-left: 6px;
          animation: pulse-glow 2s infinite;
        }

        /* Nav Links */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 6px;
          position: relative;
        }

        .nav-item {
          position: relative;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(246, 244, 238, 0.85);
          text-decoration: none;
          padding: 6px 18px;
          border-radius: 9999px;
          letter-spacing: 0.01em;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-item:hover {
          color: #ffffff;
        }

        .nav-item.active {
          color: #1c1c1c;
          font-weight: 700;
        }

        .nav-item-text {
          position: relative;
          z-index: 2;
        }

        .nav-active-pill {
          position: absolute;
          inset: 0;
          background: var(--accent, #e86c60);
          border: 2px solid var(--border, #1c1c1c);
          border-radius: 9999px;
          box-shadow: 2px 2px 0px var(--border, #1c1c1c);
          z-index: 1;
        }

        /* CTA */
        .navbar-cta-btn {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 800;
          color: #1c1c1c;
          background: var(--accent, #e86c60);
          padding: 8px 18px;
          border-radius: 9999px;
          text-decoration: none;
          letter-spacing: 0.05em;
          border: 2px solid var(--border, #1c1c1c);
          box-shadow: 3px 3px 0px var(--border, #1c1c1c);
          transition: all 0.15s ease;
        }

        .navbar-cta-btn:hover {
          background: var(--accent-hover, #d75a4e);
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px var(--border, #1c1c1c);
        }

        .navbar-cta-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0px var(--border, #1c1c1c);
        }

        /* Burger */
        .mobile-burger-btn {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }

        .burger-line {
          width: 20px;
          height: 2.5px;
          background: var(--nav-text, #f6f4ee);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .burger-line.open-top {
          transform: rotate(45deg) translate(4px, 4px);
        }

        .burger-line.open-mid {
          opacity: 0;
        }

        .burger-line.open-bot {
          transform: rotate(-45deg) translate(4px, -4px);
        }

        /* Mobile Dropdown */
        .mobile-dropdown {
          position: absolute;
          top: 75px;
          left: 20px;
          right: 20px;
          background: var(--bg-card, #ffffff);
          border: 2.5px solid var(--border, #1c1c1c);
          border-radius: 20px;
          box-shadow: 5px 5px 0px var(--border, #1c1c1c);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: auto;
        }

        .mobile-nav-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-main, #1c1c1c);
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 10px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          background: var(--accent, #e86c60);
          color: #1c1c1c;
          border: 1.5px solid var(--border, #1c1c1c);
        }
        .mobile-link-dot {
          color: var(--accent, #e86c60);
        }

        .mobile-cta-btn {
          background: var(--accent, #e86c60);
          color: #1c1c1c;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 13px;
          text-align: center;
          padding: 12px;
          border-radius: 12px;
          border: 2px solid var(--border, #1c1c1c);
          box-shadow: 3px 3px 0px var(--border, #1c1c1c);
          text-decoration: none;
          margin-top: 6px;
        }
      `}</style>
    </header>
  )
}