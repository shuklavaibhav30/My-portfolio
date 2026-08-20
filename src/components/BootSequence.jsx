import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  'INITIALIZING VAIBHAV.DEV...',
  'LOADING CORE_MODULES...',
  'LOADING FRONTEND...',
  'LOADING BACKEND...',
  'CONNECTING DATABASE...',
  'ESTABLISHING NETWORK...',
  'SYSTEM ONLINE'
];

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('hasBooted');
    if (hasBooted) {
      setIsVisible(false);
      onComplete();
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, BOOT_LINES[currentIndex]]);
      currentIndex++;

      if (currentIndex === BOOT_LINES.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('hasBooted', 'true');
          setTimeout(onComplete, 500); // Wait for fade out
        }, 800);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#030307',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#10b981'
          }}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  marginBottom: '0.75rem',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  textShadow: '0 0 8px rgba(16, 185, 129, 0.4)'
                }}
              >
                &gt; {line}
              </motion.div>
            ))}
            {lines.length < BOOT_LINES.length && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
                style={{
                  width: '10px',
                  height: '16px',
                  background: '#10b981',
                  marginTop: '0.75rem'
                }}
              />
            )}
          </div>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 2px, 3px 100%',
            pointerEvents: 'none',
            opacity: 0.2
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
