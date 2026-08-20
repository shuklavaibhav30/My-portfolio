import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

const TERMINAL_LINES = [
  { prompt: 'whoami', output: 'Vaibhav Kumar Shukla' },
  { prompt: 'role', output: 'MERN Stack Developer & Problem Solver' },
  { prompt: 'stack', output: 'MongoDB • Express • React • Node.js • C++' },
  { prompt: 'currently_learning', output: 'TypeScript • DSA • Backend Development' },
  { prompt: 'mindset', output: 'BUILD • SOLVE • LEARN' },
  { prompt: 'status', output: 'OPEN_TO_OPPORTUNITIES', isStatus: true }
]

function TerminalLine({ line, index, startTyping, onComplete }) {
  const [typedPrompt, setTypedPrompt] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const isReduced = useReducedMotion()

  useEffect(() => {
    if (!startTyping) return

    if (isReduced) {
      setTypedPrompt(line.prompt)
      setShowOutput(true)
      onComplete()
      return
    }

    let i = 0
    const interval = setInterval(() => {
      setTypedPrompt(line.prompt.slice(0, i + 1))
      i++
      if (i === line.prompt.length) {
        clearInterval(interval)
        setTimeout(() => {
          setShowOutput(true)
          setTimeout(onComplete, 200)
        }, 150)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [startTyping, line.prompt, onComplete, isReduced])

  if (!startTyping && !isReduced) return null

  return (
    <div style={S.terminalLineWrap}>
      <div style={S.promptRow}>
        <span style={S.ps1}>vaibhav@dev:~$</span>
        <span style={S.command}>{typedPrompt}</span>
      </div>
      {showOutput && (
        <div style={line.isStatus ? { ...S.outputRow, color: '#10b981' } : S.outputRow}>
          {line.output}
        </div>
      )}
    </div>
  )
}

export default function Skills({ isMobile }) {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const termRef = useRef(null)
  const termInView = useInView(termRef, { once: true, margin: '-100px' })
  const isReduced = useReducedMotion()

  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [typingComplete, setTypingComplete] = useState(false)

  const handleLineComplete = () => {
    if (currentLineIndex < TERMINAL_LINES.length - 1) {
      setCurrentLineIndex(prev => prev + 1)
    } else {
      setTypingComplete(true)
    }
  }

  useEffect(() => {
    if (isReduced && termInView) {
      setCurrentLineIndex(TERMINAL_LINES.length)
      setTypingComplete(true)
    }
  }, [isReduced, termInView])

  return (
    <section id="skills" style={S.section}>
      <div style={S.inner}>
        <motion.div
          ref={headRef}
          style={S.header}
          initial={{ opacity: 0, y: 15 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span style={S.eyebrow}>// CURRENT_STACK</span>
          <h2 style={S.heading}>What I Build With</h2>
          <p style={S.subheading}>
            A quick look at the technologies I use, what I'm learning, and how I approach building things.
          </p>
        </motion.div>

        <motion.div
          ref={termRef}
          style={S.terminalWindow}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={termInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div style={S.terminalHeader}>
            <div style={S.macBtns}>
              <div style={{ ...S.macBtn, background: '#ef4444' }} />
              <div style={{ ...S.macBtn, background: '#f59e0b' }} />
              <div style={{ ...S.macBtn, background: '#10b981' }} />
            </div>
            <div style={S.terminalTitle}>bash - vaibhav@dev</div>
            <div style={{ width: '42px' }}></div>
          </div>

          <div style={{ ...S.terminalBody, padding: isMobile ? '16px' : '24px' }}>
            <div style={{ ...S.outputRow, color: '#64748b', marginBottom: '16px' }}>
              Last login: {new Date().toDateString()} on ttys000<br />
              Welcome to vaibhav.dev
              <br /><br />
              * Press <kbd style={S.kbd}>Ctrl + K</kbd> to open command palette.
              <br /><br />
            </div>

            {TERMINAL_LINES.map((line, idx) => (
              <TerminalLine
                key={idx}
                line={line}
                index={idx}
                startTyping={termInView && (isReduced || currentLineIndex >= idx)}
                onComplete={handleLineComplete}
              />
            ))}

            {(typingComplete || isReduced) && (
              <div style={S.promptRow}>
                <span style={S.ps1}>vaibhav@dev:~$</span>
                <span style={S.cursor} />
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

const S = {
  section: { position: 'relative', background: 'transparent', padding: '120px 24px', overflow: 'hidden' },
  inner: { maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 },
  header: { textAlign: 'center', marginBottom: '60px' },
  eyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.2em', display: 'block', marginBottom: '10px' },
  heading: { fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)', fontWeight: '800', color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '12px' },
  subheading: { color: '#64748b', lineHeight: '1.7', maxWidth: '460px', margin: '0 auto', fontSize: '13.5px' },

  terminalWindow: { background: 'rgba(6, 6, 12, 0.7)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', backdropFilter: 'blur(12px)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' },
  terminalHeader: { background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  macBtns: { display: 'flex', gap: '8px' },
  macBtn: { width: '12px', height: '12px', borderRadius: '50%' },
  terminalTitle: { fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#94a3b8' },
  terminalBody: { fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(13px, 2vw, 15px)', minHeight: '300px' },

  terminalLineWrap: { marginBottom: '16px' },
  promptRow: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', color: '#f8fafc' },
  ps1: { color: 'var(--accent)', fontWeight: '600' },
  command: { color: '#f8fafc' },
  outputRow: { color: '#cbd5e1', marginTop: '6px', lineHeight: '1.5' },
  cursor: { display: 'inline-block', width: '8px', height: '16px', background: 'var(--accent)', animation: 'blink 1s step-end infinite', verticalAlign: 'middle' },
  kbd: { background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '12px' }
}