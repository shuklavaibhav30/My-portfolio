import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'Domains',  href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
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
      <nav className="navbar-container glass-panel">
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
          <a
            href="#contact"
            onClick={e => handleNav(e, '#contact')}
            className="navbar-cta-btn"
          >
            CONTACT ME
          </a>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            className="mobile-burger-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle Navigation Menu"
          >
            <span className={`burger-line ${menuOpen ? 'open-top' : ''}`} />
            <span className={`burger-line ${menuOpen ? 'open-mid' : ''}`} />
            <span className={`burger-line ${menuOpen ? 'open-bot' : ''}`} />
          </button>
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
            className="mobile-dropdown glass-panel"
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
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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
          height: 50px;
          padding: 0 20px;
          border-radius: 28px;
          background: rgba(8, 8, 22, 0.85) !important;
          backdrop-filter: blur(24px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
          border: 1px solid rgba(99, 102, 241, 0.25) !important;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 20px rgba(99, 102, 241, 0.12) !important;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar-wrapper.scrolled .navbar-container {
          border-color: rgba(99, 102, 241, 0.45) !important;
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.9), 0 0 25px rgba(99, 102, 241, 0.22) !important;
        }

        /* Logo */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          color: #f8fafc;
          text-decoration: none;
          letter-spacing: 0.04em;
        }

        .logo-accent {
          color: #6366f1;
        }

        .logo-text {
          color: #ffffff;
        }

        .online-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          margin-left: 6px;
          animation: pulse-glow 2s infinite;
        }

        /* Nav Links */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
          position: relative;
        }

        .nav-item {
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          text-decoration: none;
          padding: 6px 18px;
          border-radius: 20px;
          letter-spacing: 0.01em;
          transition: color 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-item:hover {
          color: #ffffff;
        }

        .nav-item.active {
          color: #ffffff;
          font-weight: 600;
        }

        .nav-item-text {
          position: relative;
          z-index: 2;
        }

        .nav-active-pill {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(139, 92, 246, 0.18) 100%);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 20px;
          z-index: 1;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.15);
        }

        /* CTA */
        .navbar-cta-btn {
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          padding: 7px 18px;
          border-radius: 20px;
          text-decoration: none;
          letter-spacing: 0.04em;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.25s ease;
        }

        .navbar-cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
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
          width: 18px;
          height: 2px;
          background: #cbd5e1;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .burger-line.open-top {
          transform: rotate(45deg) translate(4px, 4px);
          background: #6366f1;
        }

        .burger-line.open-mid {
          opacity: 0;
        }

        .burger-line.open-bot {
          transform: rotate(-45deg) translate(4px, -4px);
          background: #6366f1;
        }

        /* Mobile Dropdown */
        .mobile-dropdown {
          pointer-events: auto;
          position: absolute;
          top: 68px;
          left: 20px;
          right: 20px;
          background: rgba(8, 8, 22, 0.94) !important;
          border: 1px solid rgba(99, 102, 241, 0.3) !important;
          border-radius: 20px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.85);
          backdrop-filter: blur(24px) !important;
        }

        .mobile-nav-link {
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #94a3b8;
          text-decoration: none;
          padding: 10px 16px;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .mobile-nav-link.active,
        .mobile-nav-link:hover {
          color: #ffffff;
          background: rgba(99, 102, 241, 0.15);
        }

        .mobile-link-dot {
          color: #6366f1;
          margin-right: 6px;
        }

        .mobile-cta-btn {
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          padding: 12px;
          border-radius: 14px;
          text-align: center;
          text-decoration: none;
          letter-spacing: 0.04em;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .navbar-wrapper { padding: 12px 16px; }
          .navbar-container {
            height: 48px;
            padding: 0 16px;
            position: relative;
            justify-content: flex-end;
          }
          .navbar-logo {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </header>
  )
}