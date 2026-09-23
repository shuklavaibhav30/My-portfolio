import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

const INITIAL_COMMANDS = [
  { prompt: 'whoami', output: 'Vaibhav Kumar Shukla' },
  { prompt: 'role', output: 'MERN Stack Developer & Problem Solver' },
  { prompt: 'stack', output: 'MongoDB • Express.js • React.js • Node.js • C++ • TypeScript' },
  { prompt: 'currently_learning', output: 'System Architecture • Distributed Systems • Cloud Services' },
  { prompt: 'mindset', output: 'BUILD • SOLVE • OPTIMIZE • REPEAT' },
  { prompt: 'status', output: 'AVAILABLE FOR FULL-STACK & AI OPPORTUNITIES', isStatus: true }
]

const QUICK_COMMANDS = [
  { label: 'whoami', cmd: 'whoami' },
  { label: 'cat skills.json', cmd: 'cat skills.json' },
  { label: 'status', cmd: 'status' },
  { label: 'sudo hire_me', cmd: 'sudo hire_me' },
  { label: 'clear', cmd: 'clear' },
]

export default function Skills({ isMobile }) {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const termRef = useRef(null)
  const termInView = useInView(termRef, { once: true, margin: '-100px' })
  const isReduced = useReducedMotion()

  const [history, setHistory] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isTypingInitial, setIsTypingInitial] = useState(true)

  // Auto-play initial commands
  useEffect(() => {
    if (!termInView) return
    if (isReduced) {
      setHistory(INITIAL_COMMANDS.map(c => ({ type: 'cmd', prompt: c.prompt, output: c.output, isStatus: c.isStatus })))
      setIsTypingInitial(false)
      return
    }

    if (currentLineIndex < INITIAL_COMMANDS.length) {
      const item = INITIAL_COMMANDS[currentLineIndex]
      const timer = setTimeout(() => {
        setHistory(prev => [...prev, { type: 'cmd', prompt: item.prompt, output: item.output, isStatus: item.isStatus }])
        setCurrentLineIndex(prev => prev + 1)
      }, 450)
      return () => clearTimeout(timer)
    } else {
      setIsTypingInitial(false)
    }
  }, [termInView, currentLineIndex, isReduced])

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    if (trimmed === 'clear') {
      setHistory([])
      setInputVal('')
      return
    }

    let output = ''
    let isStatus = false

    switch (trimmed) {
      case 'whoami':
        output = 'Vaibhav Kumar Shukla — MERN Stack & AI Developer'
        break
      case 'role':
        output = 'Full-Stack Software Engineer & Competitive Programmer'
        break
      case 'stack':
      case 'cat skills.json':
        output = '{\n  "frontend": ["React.js", "TypeScript", "Tailwind CSS", "Redux"],\n  "backend": ["Node.js", "Express.js", "REST APIs"],\n  "database": ["MongoDB", "SQL"],\n  "languages": ["C++", "JavaScript", "Python"],\n  "cloud_tools": ["Git", "AWS", "Docker"]\n}'
        break
      case 'status':
        output = 'OPEN TO FULL-TIME & FREELANCE OPPORTUNITIES'
        isStatus = true
        break
      case 'sudo hire_me':
      case 'hire':
        output = '🚀 Initializing contact protocol... Redirecting to contact section.'
        isStatus = true
        setTimeout(() => {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
        }, 800)
        break
      case 'help':
        output = 'Available commands: whoami, role, stack, status, sudo hire_me, clear'
        break
      default:
        output = `command not found: ${trimmed}. Type 'help' for available commands.`
    }

    setHistory(prev => [...prev, { type: 'cmd', prompt: trimmed, output, isStatus }])
    setInputVal('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    executeCommand(inputVal)
  }

  return (
    <section id="skills" className="terminal-section">
      <div className="terminal-inner">
        {/* Header */}
        <motion.div
          ref={headRef}
          className="terminal-section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow-label">// CURRENT_STACK</span>
          <h2 className="terminal-title">
            What I <span className="highlight-gradient">Build With</span>
          </h2>
          <p className="terminal-sub">
            A quick look at the technologies I use, what I'm learning, and how I approach building things.
          </p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          ref={termRef}
          className="terminal-window glass-panel"
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={termInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Bar */}
          <div className="terminal-topbar">
            <div className="mac-buttons">
              <span className="mac-dot red" />
              <span className="mac-dot yellow" />
              <span className="mac-dot green" />
            </div>
            <div className="terminal-window-title">
              <span className="terminal-icon">⚡</span> zsh - vaibhav@dev:~ (interactive)
            </div>
            <div className="terminal-status-badge">
              <span className="status-live-dot" /> ONLINE
            </div>
          </div>

          {/* Body */}
          <div className="terminal-body">
            <div className="terminal-welcome-msg">
              Last login: {new Date().toDateString()} on ttys000<br />
              Welcome to <span className="text-accent">vaibhav.dev</span> shell interface v2.4.0
              <br /><br />
            </div>

            {/* History */}
            {history.map((item, idx) => (
              <div key={idx} className="terminal-history-block">
                <div className="terminal-prompt-line">
                  <span className="ps1-user">vaibhav@dev</span>
                  <span className="ps1-sep">:</span>
                  <span className="ps1-path">~</span>
                  <span className="ps1-dollar">$</span>
                  <span className="terminal-cmd-text">{item.prompt}</span>
                </div>
                {item.output && (
                  <pre className={`terminal-output ${item.isStatus ? 'status-output' : ''}`}>
                    {item.output}
                  </pre>
                )}
              </div>
            ))}

            {/* Active Input Line */}
            <form onSubmit={handleSubmit} className="terminal-input-form">
              <span className="ps1-user">vaibhav@dev</span>
              <span className="ps1-sep">:</span>
              <span className="ps1-path">~</span>
              <span className="ps1-dollar">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder={isTypingInitial ? 'Executing profile scripts...' : "Type a command e.g. 'help', 'stack'"}
                className="terminal-input"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>

          {/* Quick Command Chips Footer */}
          <div className="terminal-quick-chips">
            <span className="chips-label">QUICK ACTIONS:</span>
            {QUICK_COMMANDS.map(c => (
              <button
                key={c.label}
                onClick={() => executeCommand(c.cmd)}
                className="chip-btn"
              >
                {c.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .terminal-section {
          position: relative;
          padding: 100px 24px;
          background: transparent;
          overflow: hidden;
        }

        .terminal-inner {
          max-width: 960px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .terminal-section-header {
          text-align: center;
          margin-bottom: 44px;
        }

        .eyebrow-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--accent, #6366f1);
          letter-spacing: 0.22em;
          display: block;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .terminal-title {
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .highlight-gradient {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .terminal-sub {
          color: #94a3b8;
          font-size: 14.5px;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Terminal Window */
        .terminal-window {
          border-radius: 16px;
          background: #030307 !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          border: 1px solid rgba(99, 102, 241, 0.25) !important;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 30px rgba(99, 102, 241, 0.15) !important;
          overflow: hidden;
        }

        .terminal-topbar {
          background: #06060c;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mac-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mac-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .mac-dot.red { background: #ef4444; }
        .mac-dot.yellow { background: #f59e0b; }
        .mac-dot.green { background: #10b981; }

        .terminal-window-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .terminal-icon {
          color: #6366f1;
        }

        .terminal-status-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #10b981;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 3px 10px;
          border-radius: 12px;
        }

        .status-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-glow 2s infinite;
        }

        /* Body */
        .terminal-body {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
          padding: 28px 32px;
          min-height: 320px;
          max-height: 520px;
          overflow-y: auto;
          background: #030307;
          color: #f8fafc;
        }

        .terminal-welcome-msg {
          color: #64748b;
          font-size: 12.5px;
          line-height: 1.5;
        }

        .text-accent {
          color: #6366f1;
          font-weight: 600;
        }

        .terminal-history-block {
          margin-bottom: 16px;
        }

        .terminal-prompt-line {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .ps1-user { color: #6366f1; font-weight: 700; }
        .ps1-sep { color: #64748b; }
        .ps1-path { color: #ec4899; }
        .ps1-dollar { color: #f8fafc; margin-right: 4px; }

        .terminal-cmd-text {
          color: #ffffff;
          font-weight: 600;
        }

        .terminal-output {
          color: #cbd5e1;
          margin-top: 6px;
          white-space: pre-wrap;
          line-height: 1.6;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
        }

        .terminal-output.status-output {
          color: #10b981;
          font-weight: 600;
        }

        .terminal-input-form {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
        }

        .terminal-input::placeholder {
          color: #475569;
        }

        /* Quick Chips Footer */
        .terminal-quick-chips {
          background: #06060c;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .chips-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #64748b;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-right: 4px;
        }

        .chip-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4px 12px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .chip-btn:hover {
          color: #ffffff;
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  )
}