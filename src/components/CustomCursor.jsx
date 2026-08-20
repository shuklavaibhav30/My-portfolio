import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';
import useReducedMotion from '../hooks/useReducedMotion';

export default function CustomCursor({ isMobile }) {
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef(null);

  // Smooth springs for the outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
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
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor');
        if (text) {
          setHoverText(text);
        } else if (target.tagName.toLowerCase() === 'a' && target.href.includes('github') && target.closest('.project-card')) {
           setHoverText('GITHUB →');
        } else if (target.tagName.toLowerCase() === 'a' && target.closest('.project-card')) {
           setHoverText('VIEW LIVE →');
        } else if (target.closest('.social-link')) {
           setHoverText('OPEN ↗');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
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
      <motion.div
        className="cursor-dot"
        style={{
          left: mousePosition.x - 3,
          top: mousePosition.y - 3,
          position: 'fixed',
          width: '6px',
          height: '6px',
          backgroundColor: '#6366f1',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 10px #6366f1'
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          x: cursorX,
          y: cursorY,
          position: 'fixed',
          width: '32px',
          height: '32px',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        animate={{
          scale: isHovering && hoverText ? 3 : isHovering ? 1.5 : isClicking ? 0.8 : 1,
          backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
          borderColor: isHovering ? 'transparent' : 'rgba(99, 102, 241, 0.4)'
        }}
      >
        <span style={{ 
          fontSize: '4px', 
          fontFamily: "'JetBrains Mono', monospace",
          color: '#fff',
          letterSpacing: '0.5px',
          opacity: (isHovering && hoverText) ? 1 : 0,
          transition: 'opacity 0.2s',
          whiteSpace: 'nowrap',
          textShadow: '0 0 4px rgba(0,0,0,0.5)'
        }}>
          {hoverText}
        </span>
      </motion.div>
    </>
  );
}
