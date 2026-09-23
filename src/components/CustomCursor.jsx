import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';
import useReducedMotion from '../hooks/useReducedMotion';

export default function CustomCursor({ isMobile }) {
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Smooth springs for outer ring with enhanced trailing physics
  const springConfig = { damping: 22, stiffness: 250, mass: 0.4 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    cursorX.set(mousePosition.x - 20);
    cursorY.set(mousePosition.y - 20);
  }, [mousePosition, cursorX, cursorY, prefersReducedMotion, isMobile]);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, [data-cursor]');
      if (target) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor');
        if (text) {
          setHoverText(text);
        } else if (target.tagName.toLowerCase() === 'a' && target.href.includes('github')) {
          setHoverText('GITHUB ↗');
        } else if (target.tagName.toLowerCase() === 'a' && target.closest('.project-card, .flip-card-container')) {
          setHoverText('VIEW ↗');
        } else if (target.tagName.toLowerCase() === 'button') {
          setHoverText('SELECT');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
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

  return (
    <>
      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0.8, scale: 0.3 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: r.x - 20,
              top: r.y - 20,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1.5px solid #6366f1',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.6)',
              pointerEvents: 'none',
              zIndex: 99999,
            }}
            onAnimationComplete={() => setRipples((prev) => prev.filter((item) => item.id !== r.id))}
          />
        ))}
      </AnimatePresence>

      {/* Core Precision Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          position: 'fixed',
          width: '8px',
          height: '8px',
          backgroundColor: isHovering ? '#ec4899' : '#6366f1',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          boxShadow: isHovering ? '0 0 14px #ec4899' : '0 0 12px #6366f1',
        }}
        animate={{
          scale: isClicking ? 0.4 : isHovering ? 0.5 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Animated Cyber Target Outer Ring */}
      <motion.div
        className="cursor-ring"
        style={{
          x: cursorX,
          y: cursorY,
          position: 'fixed',
          width: '40px',
          height: '40px',
          border: '1px solid rgba(99, 102, 241, 0.45)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isHovering ? '0 0 20px rgba(99, 102, 241, 0.3)' : 'none',
        }}
        animate={{
          scale: isHovering && hoverText ? 2.5 : isHovering ? 1.6 : isClicking ? 0.75 : 1,
          backgroundColor: isHovering ? 'rgba(10, 10, 24, 0.85)' : 'rgba(99, 102, 241, 0.03)',
          borderColor: isHovering ? 'rgba(236, 72, 153, 0.7)' : 'rgba(99, 102, 241, 0.45)',
          rotate: isHovering ? 90 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Reticle corner ticks */}
        <div className="cursor-crosshair top-tick" />
        <div className="cursor-crosshair bottom-tick" />
        <div className="cursor-crosshair left-tick" />
        <div className="cursor-crosshair right-tick" />

        <span
          style={{
            fontSize: '5px',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: '700',
            color: '#f8fafc',
            letterSpacing: '0.08em',
            opacity: isHovering && hoverText ? 1 : 0,
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap',
            textShadow: '0 0 6px rgba(0,0,0,0.8)',
          }}
        >
          {hoverText}
        </span>
      </motion.div>

      <style>{`
        .cursor-crosshair {
          position: absolute;
          background: rgba(99, 102, 241, 0.6);
          pointer-events: none;
          transition: background 0.2s ease;
        }
        .top-tick { top: -4px; width: 1px; height: 5px; }
        .bottom-tick { bottom: -4px; width: 1px; height: 5px; }
        .left-tick { left: -4px; width: 5px; height: 1px; }
        .right-tick { right: -4px; width: 5px; height: 1px; }
      `}</style>
    </>
  );
}
