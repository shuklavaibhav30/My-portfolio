import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS = [
  { id: 'hero', label: 'Go to Home', icon: '⌂', action: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'skills', label: 'View Tech Stack', icon: '⚡', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'stats', label: 'Computing Nodes (Stats)', icon: '⎈', action: () => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'projects', label: 'Explore Projects', icon: '⌥', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'timeline', label: 'System Timeline', icon: '⏱', action: () => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'certificates', label: 'Certificates & Badges', icon: '📜', action: () => document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'contact', label: 'Send Message (Contact)', icon: '✉', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'github', label: 'Open GitHub Profile', icon: '↗', action: () => window.open('https://github.com/shuklavaibhav30', '_blank') }
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredCommands = COMMANDS.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (!isOpen) return;
    const handleNavigation = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }
      if (e.key === 'Enter' && filteredCommands.length > 0) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, filteredCommands, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.5)',
              backdropFilter: 'blur(6px)',
              zIndex: 999998
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: -10, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '20%',
              left: '50%',
              width: '90%',
              maxWidth: '560px',
              background: '#ffffff',
              border: '2.5px solid #000000',
              borderRadius: '16px',
              boxShadow: '8px 8px 0px #000000',
              zIndex: 999999,
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '16px', borderBottom: '2px solid #000000', display: 'flex', alignItems: 'center', background: '#f8fafc' }}>
              <span style={{ color: 'var(--accent, #e86c60)', marginRight: '12px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 900 }}>&gt;</span>
              <input
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search command or jump to section..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#000000',
                  fontSize: '15px',
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto', background: '#ffffff' }}>
              {filteredCommands.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px', fontFamily: "'JetBrains Mono', monospace" }}>
                  No commands found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <div
                    key={cmd.id}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => { cmd.action(); setIsOpen(false); }}
                    style={{
                      padding: '12px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      background: idx === selectedIndex ? 'var(--accent, #e86c60)' : 'transparent',
                      borderLeft: `4px solid ${idx === selectedIndex ? '#000000' : 'transparent'}`,
                      color: '#000000',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: idx === selectedIndex ? 800 : 600,
                      fontSize: '13.5px',
                      transition: 'all 0.1s'
                    }}
                  >
                    <span style={{ width: '20px', textAlign: 'center' }}>{cmd.icon}</span>
                    {cmd.label}
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: '10px 16px', background: '#f8fafc', borderTop: '2px solid #000000', display: 'flex', justifyContent: 'flex-end', gap: '16px', color: '#64748b', fontSize: '10.5px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
              <span><kbd style={S.kbd}>↑</kbd> <kbd style={S.kbd}>↓</kbd> navigate</span>
              <span><kbd style={S.kbd}>Enter</kbd> select</span>
              <span><kbd style={S.kbd}>Esc</kbd> close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const S = {
  kbd: {
    background: '#ffffff',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1.5px solid #000000',
    color: '#000000',
    boxShadow: '1px 1px 0px #000',
    margin: '0 2px'
  }
}
