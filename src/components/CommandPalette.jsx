import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS = [
  { id: 'hero', label: 'Go to Home', icon: '⌂', action: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'skills', label: 'View Tech Stack', icon: '⚡', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'stats', label: 'Computing Nodes (Stats)', icon: '⎈', action: () => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'projects', label: 'Explore Projects', icon: '⌥', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'timeline', label: 'System Timeline', icon: '⏱', action: () => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'theme-purple', label: 'Set Accent: Purple (Default)', icon: '❖', action: () => document.documentElement.style.setProperty('--accent', '#6366f1') },
  { id: 'theme-green', label: 'Set Accent: Matrix Green', icon: '❖', action: () => document.documentElement.style.setProperty('--accent', '#10b981') },
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
              background: 'rgba(3, 3, 7, 0.8)',
              backdropFilter: 'blur(8px)',
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
              maxWidth: '600px',
              background: '#0a0a14',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '8px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.1)',
              zIndex: 999999,
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#6366f1', marginRight: '12px', fontFamily: "'JetBrains Mono', monospace" }}>&gt;</span>
              <input
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#f8fafc',
                  fontSize: '16px',
                  fontFamily: "'JetBrains Mono', monospace",
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {filteredCommands.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace" }}>
                  No commands found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <div
                    key={cmd.id}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => { cmd.action(); setIsOpen(false); }}
                    style={{
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      background: idx === selectedIndex ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                      borderLeft: `2px solid ${idx === selectedIndex ? '#6366f1' : 'transparent'}`,
                      color: idx === selectedIndex ? '#fff' : '#94a3b8',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '13px',
                      transition: 'all 0.1s'
                    }}
                  >
                    <span style={{ width: '20px', textAlign: 'center' }}>{cmd.icon}</span>
                    {cmd.label}
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: '8px 16px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'flex-end', gap: '16px', color: '#64748b', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace" }}>
              <span><kbd style={S.kbd}>↑</kbd> <kbd style={S.kbd}>↓</kbd> to navigate</span>
              <span><kbd style={S.kbd}>Enter</kbd> to select</span>
              <span><kbd style={S.kbd}>Esc</kbd> to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const S = {
  kbd: {
    background: 'rgba(255,255,255,0.1)',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.05)',
    margin: '0 2px'
  }
}
