import { useState, useEffect } from 'react'
import resume from '../assets/resume.pdf'

const NAV_LINKS = [
  { label: 'About',    href: '#hero' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey',  href: '#timeline' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
      background: scrolled ? 'rgba(7,7,14,0.85)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
    }}>
      <a href="#hero" onClick={e => handleNav(e, '#hero')} style={S.logo}>
        &lt;vaibhav.dev /&gt;
      </a>

      {/* desktop links */}
      <div style={S.links}>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} onClick={e => handleNav(e, href)} style={S.link}>
            {label}
          </a>
        ))}
        <a href={resume} target="_blank" rel="noreferrer" style={S.resumeBtn}>
          Resume ↗
        </a>
      </div>

      {/* mobile hamburger */}
      <button
        style={S.burger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span style={{ ...S.burgerLine, transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
        <span style={{ ...S.burgerLine, opacity: menuOpen ? 0 : 1 }} />
        <span style={{ ...S.burgerLine, transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
      </button>

      {/* mobile menu */}
      {menuOpen && (
        <div style={S.mobileMenu}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={e => handleNav(e, href)} style={S.mobileLink}>
              {label}
            </a>
          ))}
          <a href={resume} target="_blank" rel="noreferrer" style={{ ...S.mobileLink, color: '#818cf8' }}>
            Resume ↗
          </a>
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
    padding: '0 48px',
    height: '64px',
    transition: 'background 0.3s, border-color 0.3s',
  },
  logo: {
    fontFamily: "'Fira Code', monospace",
    fontSize: '14px',
    color: '#818cf8',
    fontWeight: 500,
    letterSpacing: '0.02em',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  link: {
    fontSize: '13px',
    color: '#94a3b8',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  resumeBtn: {
    fontSize: '12px',
    color: '#818cf8',
    border: '1px solid rgba(129,140,248,0.4)',
    padding: '6px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontFamily: "'Fira Code', monospace",
    transition: 'background 0.2s',
  },
  burger: {
    display: 'none',
    flexDirection: 'column',
    gap: '5px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  burgerLine: {
    display: 'block',
    width: '22px',
    height: '2px',
    background: '#94a3b8',
    borderRadius: '2px',
    transition: 'transform 0.25s, opacity 0.25s',
  },
  mobileMenu: {
    position: 'absolute',
    top: '64px',
    left: 0,
    right: 0,
    background: 'rgba(7,7,14,0.97)',
    borderBottom: '1px solid rgba(99,102,241,0.15)',
    padding: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    backdropFilter: 'blur(14px)',
  },
  mobileLink: {
    fontSize: '14px',
    color: '#94a3b8',
    padding: '12px 32px',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
}