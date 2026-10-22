import { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';
import useReducedMotion from '../hooks/useReducedMotion';

export default function CustomCursor({ isMobile }) {
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    }
    return false;
  });

  // Track theme changes dynamically
  useEffect(() => {
    const checkTheme = () => {
      const current = document.documentElement.getAttribute('data-theme');
      setIsDark(current === 'dark');
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    window.addEventListener('themechange', checkTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener('themechange', checkTheme);
    };
  }, []);

  // Smooth springs for outer ring with enhanced trailing physics (zero lag, 16px radius offset)
  const springConfig = { damping: 26, stiffness: 320, mass: 0.28 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    cursorX.set(mousePosition.x - 16);
    cursorY.set(mousePosition.y - 16);
  }, [mousePosition, cursorX, cursorY, prefersReducedMotion, isMobile]);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"]');
      if (target) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-2), newRipple]);
    };

    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [prefersReducedMotion, isMobile]);

  if (prefersReducedMotion || isMobile) return null;

  const accentColor = isDark ? '#ff7e72' : '#e86c60';

  return (
    <>
      {/* Click Ripples - clean expanding ring, zero blur */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0.75, scale: 0.3 }}
            animate={{ opacity: 0, scale: 2.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: r.x - 18,
              top: r.y - 18,
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: `2px solid ${accentColor}`,
              background: 'transparent',
              pointerEvents: 'none',
              zIndex: 999998,
            }}
            onAnimationComplete={() => setRipples((prev) => prev.filter((item) => item.id !== r.id))}
          />
        ))}
      </AnimatePresence>

      {/* Trailing Theme-Aware Neo-Brutalist Cursor Ring - COMPLETELY TRANSPARENT, ZERO BLUR */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          pointerEvents: 'none',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovering ? 1.35 : 1,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 360 }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'transparent', // 100% transparent - no cloudy or blurry lens
            backdropFilter: 'none',      // Removed blurry effect completely
            WebkitBackdropFilter: 'none',
            border: isDark
              ? isHovering
                ? `2px solid ${accentColor}`
                : '1.5px solid rgba(255, 255, 255, 0.45)'
              : isHovering
                ? `2px solid ${accentColor}`
                : '1.5px solid rgba(28, 28, 28, 0.55)',
            boxShadow: isDark
              ? isHovering
                ? '2px 2px 0px #020503, 0 0 10px rgba(255, 126, 114, 0.35)'
                : 'none'
              : isHovering
                ? '2.5px 2.5px 0px #1c1c1c'
                : 'none',
            transition: 'border 0.15s ease, box-shadow 0.15s ease',
          }}
        />
      </motion.div>

      {/* Center Precise Dot - crisp 5px pixel-perfect theme focal point */}
      <motion.div
        style={{
          position: 'fixed',
          left: mousePosition.x - 2.5,
          top: mousePosition.y - 2.5,
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: accentColor,
          border: isDark ? '1px solid #000000' : '1px solid #1c1c1c',
          boxShadow: isDark ? '0 0 5px rgba(255, 126, 114, 0.7)' : 'none',
          pointerEvents: 'none',
          zIndex: 1000000,
        }}
        animate={{
          scale: isClicking ? 1.4 : isHovering ? 0.6 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </>
  );
}
