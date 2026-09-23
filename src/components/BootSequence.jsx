import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_STEPS = [
  { label: 'CORE_ENGINE', detail: 'Initializing React 18 & Vite Runtime...', status: 'OK' },
  { label: 'UI_COMPONENTS', detail: 'Loading Cyber-Glass Design System...', status: 'OK' },
  { label: 'PORTFOLIO_DATA', detail: 'Fetching Projects & Interactive Terminal...', status: 'OK' },
  { label: 'NETWORKING', detail: 'Establishing Secure Socket Pipeline...', status: 'ONLINE' },
];

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
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
      if (currentIndex < BOOT_STEPS.length) {
        setLines(prev => [...prev, BOOT_STEPS[currentIndex]]);
        setProgress(Math.round(((currentIndex + 1) / BOOT_STEPS.length) * 100));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('hasBooted', 'true');
          setTimeout(onComplete, 500);
        }, 600);
      }
    }, 220);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#030307',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {/* Ambient Background Glow Orb */}
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(236,72,153,0.08) 50%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }} />

          {/* Central Cyber Glass Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: '520px',
              background: 'rgba(8, 8, 22, 0.9)',
              border: '1px solid rgba(99, 102, 241, 0.35)',
              borderRadius: '20px',
              boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.95), 0 0 40px rgba(99, 102, 241, 0.2)',
              backdropFilter: 'blur(24px)',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Header */}
            <div style={{
              background: 'rgba(6, 6, 14, 0.95)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#6366f1', fontWeight: 700, fontSize: '13px' }}>&lt;</span>
                <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '13px' }}>vaibhav.dev</span>
                <span style={{ color: '#6366f1', fontWeight: 700, fontSize: '13px' }}>/&gt;</span>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px #10b981',
                  marginLeft: '4px',
                  animation: 'pulse-glow 2s infinite'
                }} />
              </div>
              <span style={{ color: '#6366f1', fontSize: '12px', fontWeight: '700' }}>
                {progress}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div style={{ height: '3px', width: '100%', background: 'rgba(255, 255, 255, 0.06)', position: 'relative' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.25 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                  boxShadow: '0 0 12px #6366f1'
                }}
              />
            </div>

            {/* Body Lines */}
            <div style={{
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              minHeight: '190px',
              background: '#030307',
            }}>
              {lines.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', fontSize: '12.5px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#6366f1', fontWeight: 700 }}>&gt;</span>
                    <span style={{ color: '#cbd5e1' }}>{step.detail}</span>
                  </div>
                  <span style={{
                    color: '#10b981',
                    fontSize: '10px',
                    fontWeight: 700,
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    letterSpacing: '0.05em'
                  }}>
                    {step.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
