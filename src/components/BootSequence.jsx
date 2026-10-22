import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   Shimmer keyframes injected once via a <style> tag
───────────────────────────────────────────── */
const SHIMMER_CSS = `
@keyframes boot-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes boot-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.55; }
}
`;

function SplitText({ text, delayStart = 0, charDelay = 0.045, color, style }) {
  return (
    <span style={{ display: 'inline-block', ...style }}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delayStart + i * charDelay,
            duration: 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            whiteSpace: ch === ' ' ? 'pre' : 'normal',
            color: color || 'inherit',
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function BootSequence({ onComplete }) {
  const [phase, setPhase]       = useState('enter');
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const rafRef   = useRef(null);
  const startRef = useRef(null);

  /* ── Timeline (seconds / ms) ── */
  const LINE1_STARTS  = 0.2;
  const LINE2_STARTS  = 1.55;
  const LINE3_STARTS  = 2.85;
  const BAR_DELAY_MS  = (LINE3_STARTS + 0.45) * 1000;   // bar starts ~3.3 s
  const BAR_DURATION  = 1300;                            // fills in 1.3 s
  const EXIT_DELAY_MS = BAR_DELAY_MS + BAR_DURATION + 320;

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('hasBooted');
    if (hasBooted) { setIsVisible(false); onComplete(); return; }

    /* rAF progress bar */
    const barTimer = setTimeout(() => {
      startRef.current = performance.now();
      const tick = (now) => {
        const pct = Math.min(100, Math.round(((now - startRef.current) / BAR_DURATION) * 100));
        setProgress(pct);
        if (pct < 100) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, BAR_DELAY_MS);

    /* cinematic exit */
    const exitTimer = setTimeout(() => {
      setPhase('exit');
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('hasBooted', 'true');
        setTimeout(onComplete, 80);
      }, 820);
    }, EXIT_DELAY_MS);

    return () => {
      clearTimeout(barTimer);
      clearTimeout(exitTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  const exitVariants = {
    visible: { opacity: 1, y: 0,   filter: 'blur(0px)' },
    hidden:  { opacity: 0, y: -18, filter: 'blur(6px)',
               transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="boot-overlay"
          variants={exitVariants}
          initial="visible"
          animate={phase === 'exit' ? 'hidden' : 'visible'}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'var(--bg, #f6f4ee)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {/* inject shimmer keyframes */}
          <style>{SHIMMER_CSS}</style>

          {/* dot-grid pattern (mirrors site's #root::before) */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage:
              'radial-gradient(var(--dot-color, rgba(28,28,28,0.15)) 1px, transparent 1px),' +
              'linear-gradient(to right, var(--grid-line, rgba(28,28,28,0.06)) 1px, transparent 1px),' +
              'linear-gradient(to bottom, var(--grid-line, rgba(28,28,28,0.06)) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.55,
          }} />

          {/* subtle radial glow in site accent color */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(232,108,96,0.06) 0%, transparent 70%)',
          }} />

          {/* Corner accent brackets — forest green */}
          {[
            { top: 20, left: 20, borderTop: '2.5px solid var(--accent-secondary, #3e6356)', borderLeft: '2.5px solid var(--accent-secondary, #3e6356)' },
            { top: 20, right: 20, borderTop: '2.5px solid var(--accent-secondary, #3e6356)', borderRight: '2.5px solid var(--accent-secondary, #3e6356)' },
            { bottom: 20, left: 20, borderBottom: '2.5px solid var(--accent-secondary, #3e6356)', borderLeft: '2.5px solid var(--accent-secondary, #3e6356)' },
            { bottom: 20, right: 20, borderBottom: '2.5px solid var(--accent-secondary, #3e6356)', borderRight: '2.5px solid var(--accent-secondary, #3e6356)' },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
              style={{ position: 'absolute', width: 28, height: 28, pointerEvents: 'none', ...s }}
            />
          ))}

          {/* ── Main text block ── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', gap: '0.75rem',
            padding: '0 clamp(24px, 8vw, 80px)',
            maxWidth: 860, width: '100%',
          }}>

            {/* Line 1 — "Hey, I'm Vaibhav." */}
            <div style={{
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.06,
              color: 'var(--text-main, #1c1c1c)',
            }}>
              <SplitText text="Hey, I'm " delayStart={LINE1_STARTS} charDelay={0.042} />
              <SplitText
                text="Vaibhav."
                delayStart={LINE1_STARTS + 9 * 0.042}
                charDelay={0.052}
                color="var(--accent, #e86c60)"
              />
            </div>

            {/* Line 2 — "Welcome to my portfolio." */}
            <div style={{
              fontWeight: 500,
              fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
              letterSpacing: '-0.015em',
              lineHeight: 1.25,
              color: 'var(--text-body, #2d3b36)',
            }}>
              <SplitText text="Welcome to my portfolio." delayStart={LINE2_STARTS} charDelay={0.036} />
            </div>

            {/* Separator — coral */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: LINE3_STARTS - 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: 'clamp(160px, 35%, 280px)',
                height: '2.5px',
                background: 'var(--accent, #e86c60)',
                margin: '0.2rem 0',
                originX: 0,
                boxShadow: '2px 2px 0px var(--border, #1c1c1c)',
              }}
            />

            {/* Line 3 — "CRAFTING DIGITAL EXPERIENCES" */}
            <div style={{
              fontWeight: 700,
              fontSize: 'clamp(0.75rem, 2vw, 1rem)',
              letterSpacing: '0.28em',
              color: 'var(--accent-secondary, #3e6356)',
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <SplitText text="CRAFTING DIGITAL EXPERIENCES" delayStart={LINE3_STARTS} charDelay={0.025} />
            </div>
          </div>

          {/* ── Progress bar wrapper — pinned to bottom, full-width so centering is reliable ── */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 36,
          }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: BAR_DELAY_MS / 1000 - 0.12, duration: 0.45, ease: 'easeOut' }}
              style={{
                width: 'clamp(240px, 40vw, 440px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {/* label row — centered */}
              <div style={{
                width: '100%', display: 'flex',
                justifyContent: 'center', alignItems: 'center', gap: 10,
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem', fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: 'var(--text-muted, #5b6e66)',
                  textTransform: 'uppercase',
                }}>
                  Loading
                </span>
                <motion.span
                  key={progress}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6rem', fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: 'var(--accent, #e86c60)',
                  }}
                >
                  {progress}%
                </motion.span>
              </div>

              {/* Track */}
              <div style={{
                width: '100%', height: 5,
                background: 'var(--bg-subtle, #ede9dc)',
                border: '1.5px solid var(--border, #1c1c1c)',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
              }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'linear', duration: 0.05 }}
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    height: '100%',
                    background: 'var(--accent, #e86c60)',
                    borderRadius: 2,
                  }}
                />
                {progress > 0 && progress < 100 && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'boot-shimmer 1.1s linear infinite',
                    pointerEvents: 'none',
                  }} />
                )}
              </div>

              {/* pulsing dots */}
              <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginTop: 2 }}>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.75, 1.2, 0.75] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
                    style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: 'var(--accent-secondary, #3e6356)',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
