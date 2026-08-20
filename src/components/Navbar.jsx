import { useState, useEffect } from 'react'
import resume from '../assets/resume.pdf'

const NAV_LINKS = [
  { label: 'Home',       href: '#hero' },
  { label: 'Domains',    href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      ...S.nav,
      background: scrolled ? 'rgba(3, 3, 7, 0.85)' : 'rgba(3, 3, 7, 0.4)',
      borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.15)' : '1px solid rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(16px)',
      padding: isMobile ? '0 24px' : '0 60px',
    }}>
      <div style={S.leftCol}>
        <a href="#hero" onClick={e => handleNav(e, '#hero')} style={S.logo}>
          <span style={{ color: '#6366f1' }}>//</span> vaibhav.dev
        </a>
      </div>

      {/* desktop links */}
      {!isMobile && (
        <div style={S.centerCol}>
          {NAV_LINKS.map(({ label, href }) => (
            <a 
              key={label} 
              href={href} 
              onClick={e => handleNav(e, href)} 
              style={S.link}
              onMouseEnter={e => { e.target.style.color = '#f8fafc'; e.target.style.textShadow = '0 0 12px rgba(99,102,241,0.3)' }}
              onMouseLeave={e => { e.target.style.color = '#94a3b8'; e.target.style.textShadow = 'none' }}
            >
              <span style={S.navDot}>•</span> {label}
            </a>
          ))}
        </div>
      )}

      {/* desktop right col */}
      {!isMobile && (
        <div style={S.rightCol}></div>
      )}

      {/* mobile hamburger */}
      {isMobile && (
        <button
          style={S.burger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span style={{ ...S.burgerLine, transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none', background: menuOpen ? '#6366f1' : '#94a3b8' }} />
          <span style={{ ...S.burgerLine, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ ...S.burgerLine, transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none', background: menuOpen ? '#6366f1' : '#94a3b8' }} />
        </button>
      )}

      {/* mobile menu */}
      {isMobile && menuOpen && (
        <div style={S.mobileMenu}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={e => handleNav(e, href)} style={S.mobileLink}>
              <span style={{ color: '#6366f1', marginRight: '8px' }}>•</span> {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

const S = {
  nav: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  logo: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    color: '#f8fafc',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textDecoration: 'none',
  },
  leftCol: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  centerCol: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
  },
  rightCol: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navDot: {
    color: '#6366f1',
    marginRight: '4px',
    fontSize: '14px',
  },
  link: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11.5px',
    color: '#94a3b8',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    transition: 'color 0.2s ease, text-shadow 0.2s ease',
    cursor: 'none',
  },
  burger: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
  },
  burgerLine: {
    display: 'block',
    width: '20px',
    height: '1px',
    background: '#94a3b8',
    transition: 'all 0.25s ease',
  },
  mobileMenu: {
    position: 'absolute',
    top: '60px', left: 0, right: 0,
    background: 'rgba(3, 3, 7, 0.98)',
    borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column',
    backdropFilter: 'blur(20px)',
  },
  mobileLink: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    color: '#94a3b8',
    padding: '14px 40px',
    textDecoration: 'none',
    transition: 'color 0.2s',
  }
}