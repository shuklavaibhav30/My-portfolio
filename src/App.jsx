import { useState, useEffect } from 'react'
import './index.css'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import Skills          from './components/Skills'
import Stats           from './components/Stats'
import Projects        from './components/Projects'
import Timeline        from './components/Timeline'
import Experience      from './components/Experience'
import Contact         from './components/Contact'
import BootSequence    from './components/BootSequence'
import CustomCursor    from './components/CustomCursor'
import CommandPalette  from './components/CommandPalette'

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [konamiIdx, setKonamiIdx] = useState(0);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === KONAMI_CODE[konamiIdx]) {
        if (konamiIdx === KONAMI_CODE.length - 1) {
          setIsEasterEggActive(true);
          setTimeout(() => setIsEasterEggActive(false), 3000);
          setKonamiIdx(0);
        } else {
          setKonamiIdx(idx => idx + 1);
        }
      } else {
        setKonamiIdx(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIdx]);

  return (
    <>
      <BootSequence onComplete={() => {}} />
      <CustomCursor isMobile={isMobile} />
      <CommandPalette />
      
      {isEasterEggActive && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(16, 185, 129, 0.1)',
          zIndex: 9999999,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'glitchGlow 0.2s infinite'
        }}>
          <h1 style={{ color: '#10b981', fontFamily: "'JetBrains Mono', monospace", fontSize: '4vw' }}>
            &gt; SECRET_NODE_UNLOCKED
          </h1>
        </div>
      )}

      <main style={{ background: 'var(--bg, #030307)', transition: 'background 0.3s' }}>
        <Navbar />
        <Hero isMobile={isMobile} />
        <Stats isMobile={isMobile} />
        <Experience isMobile={isMobile} />
        <Skills isMobile={isMobile} />
        <Projects isMobile={isMobile} />
        <Timeline isMobile={isMobile} />
        <Contact isMobile={isMobile} />
      </main>
    </>
  )
}