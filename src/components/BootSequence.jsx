import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_STEPS = [
  { label: 'CORE_ENGINE', detail: 'Initializing React 18 & Vite Runtime...', status: 'OK' },
  { label: 'UI_COMPONENTS', detail: 'Loading Neo-Brutalist Light Theme...', status: 'OK' },
  { label: 'PORTFOLIO_DATA', detail: 'Fetching Projects & Interactive Terminal...', status: 'OK' },
  { label: 'NETWORKING', detail: 'Establishing Secure Telemetry Pipeline...', status: 'ONLINE' },
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
        const step = BOOT_STEPS[currentIndex];
        if (step) {
          setLines(prev => [...prev, step]);
        }
        setProgress(Math.round(((currentIndex + 1) / BOOT_STEPS.length) * 100));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('hasBooted', 'true');
          setTimeout(onComplete, 400);
        }, 500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(244, 245, 248, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {/* Central Neo-Brutalist Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: '520px',
              background: '#ffffff',
              border: '2.5px solid #000000',
              borderRadius: '20px',
              boxShadow: '8px 8px 0px #000000',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Header */}
            <div style={{
              background: '#f8fafc',
              borderBottom: '2px solid #000000',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#4ade80', fontWeight: 900, fontSize: '14px' }}>&lt;</span>
                <span style={{ color: '#000000', fontWeight: 900, fontSize: '14px' }}>vaibhav.dev</span>
                <span style={{ color: '#4ade80', fontWeight: 900, fontSize: '14px' }}>/&gt;</span>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  border: '1.5px solid #000',
                  marginLeft: '4px',
                }} />
              </div>
              <span style={{
                color: '#1c1c1c',
                background: 'var(--accent, #e86c60)',
                border: '1.5px solid #000',
                boxShadow: '2px 2px 0px #000',
                borderRadius: '6px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: '900'
              }}>
                {progress}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderBottom: '2px solid #000000', position: 'relative' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
                style={{
                  height: '100%',
                  background: 'var(--accent, #e86c60)',
                }}
              />
            </div>

            {/* Body Lines */}
            <div style={{
              padding: '26px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              minHeight: '180px',
              background: '#ffffff',
            }}>
              {lines.map((step, i) => step && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', fontSize: '12.5px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#4ade80', fontWeight: 900 }}>&gt;</span>
                    <span style={{ color: '#1e293b', fontWeight: 600 }}>{step.detail}</span>
                  </div>
                  <span style={{
                    color: '#15803d',
                    fontSize: '10.5px',
                    fontWeight: 800,
                    background: '#dcfce7',
                    border: '1.5px solid #000000',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    boxShadow: '1.5px 1.5px 0px #000',
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
