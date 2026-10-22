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
          <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
            <span className="eyebrow-label">// CURRENT_STACK</span>
          </div>
          <h2 className="terminal-title">
            What I <span className="neo-highlight">Build With</span>
          </h2>
          <p className="terminal-sub">
            A quick interactive console look at the technologies I use, what I'm mastering, and how I ship scalable code.
          </p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          ref={termRef}
          className="terminal-window"
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
              Welcome to <span className="text-accent">vaibhav.dev</span> shell interface v2.5.0
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
            <span className="chips-label">QUICK COMMANDS:</span>
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
          padding: 100px 24px 70px;
          background: transparent;
          overflow: hidden;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .terminal-section {
            padding: 50px 16px 40px;
          }
        }

        .terminal-inner {
          max-width: 960px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          width: 100%;
          box-sizing: border-box;
        }

        .terminal-section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .eyebrow-label {
          display: inline-flex;
          align-items: center;
          background: var(--bg-card);
          border: 2px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          padding: 4px 12px;
          border-radius: 9999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text-main);
          letter-spacing: 0.15em;
          font-weight: 800;
        }

        .terminal-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .neo-highlight {
          background: var(--bg-card, #ffffff);
          color: var(--text-main, #1c1c1c);
          padding: 2px 14px;
          border-radius: 10px;
          border: 2.5px solid var(--border, #1c1c1c);
          box-shadow: 4px 4px 0px var(--accent, #e86c60);
          display: inline-block;
          transition: all 0.15s ease;
        }
        .neo-highlight:hover {
          transform: translate(-1px, -1px);
          box-shadow: 5px 5px 0px var(--accent, #e86c60);
        }

        .terminal-sub {
          color: var(--text-muted);
          font-size: 15px;
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Terminal Window */
        .terminal-window {
          border-radius: 20px;
          background: var(--bg-card) !important;
          border: var(--border-width) solid var(--border) !important;
          box-shadow: var(--shadow-lg) !important;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .terminal-window:hover {
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-xl) !important;
        }

        .terminal-topbar {
          background: var(--bg-subtle);
          border-bottom: 2px solid var(--border);
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
          border: 1.5px solid var(--border);
        }
        .mac-dot.red { background: #ef4444; }
        .mac-dot.yellow { background: #ffb347; }
        .mac-dot.green { background: #4ade80; }

        .terminal-window-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 800;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .terminal-icon {
          color: var(--accent-green, #4ade80);
        }

        .terminal-status-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #1b5e3b;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 6px;
          background: #e6f6ee;
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          padding: 3px 10px;
          border-radius: 9999px;
        }

        .status-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          border: 1px solid #000;
          animation: pulse-glow 2s infinite;
        }

        /* Body */
        .terminal-body {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
          padding: 24px 28px;
          min-height: 300px;
          max-height: 480px;
          overflow-y: auto;
          background: var(--bg-card);
          color: var(--text-main);
        }

        .terminal-welcome-msg {
          color: var(--text-muted);
          font-size: 12px;
          line-height: 1.5;
        }

        .text-accent {
          color: var(--accent);
          font-weight: 800;
        }

        .terminal-history-block {
          margin-bottom: 14px;
        }

        .terminal-prompt-line {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .ps1-user { color: #f59e0b; font-weight: 800; }
        .ps1-sep { color: var(--text-muted); font-weight: 800; }
        .ps1-path { color: #38bdf8; font-weight: 800; }
        .ps1-dollar { color: var(--text-muted); font-weight: 900; margin-right: 4px; }

        .terminal-cmd-text {
          color: var(--text-main);
          font-weight: 800;
        }

        .terminal-output {
          color: var(--text-main);
          background: var(--bg-subtle);
          border-left: 3.5px solid var(--accent, #e86c60);
          border-top: 1.5px solid var(--border);
          border-right: 1.5px solid var(--border);
          border-bottom: 1.5px solid var(--border);
          padding: 10px 14px;
          border-radius: 6px;
          margin-top: 6px;
          white-space: pre-wrap;
          line-height: 1.6;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
        }

        .terminal-output.status-output {
          color: #1b5e3b;
          font-weight: 800;
          background: #e6f6ee;
          border-left-color: #4ade80;
          border-color: var(--border);
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
          color: var(--text-main);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
          font-weight: 700;
        }

        .terminal-input::placeholder {
          color: var(--text-faint);
        }

        /* Quick Chips Footer */
        .terminal-quick-chips {
          background: var(--bg-subtle);
          border-top: 2px solid var(--border);
          padding: 14px 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .chips-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 800;
          letter-spacing: 0.1em;
          margin-right: 4px;
        }

        .chip-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 800;
          color: var(--text-main);
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          padding: 4px 12px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .chip-btn:hover {
          background: var(--accent-peach, #ffd6ce);
          color: var(--hf-peach-text, #8c2d24);
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px var(--border);
        }

        /* Mobile Responsive Overrides */
        @media (max-width: 768px) {
          .terminal-window {
            border-radius: 16px;
          }
          .terminal-topbar {
            padding: 10px 14px;
            flex-wrap: wrap;
            gap: 8px;
          }
          .terminal-body {
            padding: 16px 14px;
            font-size: 12.5px;
            min-height: 220px;
            max-height: 380px;
          }
          .terminal-output {
            font-size: 11.5px;
            padding: 8px 10px;
          }
          .terminal-quick-chips {
            padding: 10px 14px;
            gap: 6px;
          }
          .chip-btn {
            font-size: 10px;
            padding: 3px 9px;
          }
        }

        @media (max-width: 480px) {
          .terminal-window-title {
            font-size: 11px;
          }
          .terminal-status-badge {
            font-size: 9px;
            padding: 2px 7px;
          }
          .mac-dot {
            width: 10px;
            height: 10px;
          }
          .terminal-body {
            font-size: 11.5px;
            padding: 14px 10px;
          }
          .terminal-cmd-text {
            word-break: break-all;
          }
        }
      `}</style>
    </section>
  )
}