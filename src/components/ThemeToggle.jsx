import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark')
  const [isRotating, setIsRotating] = useState(false)

  useEffect(() => {
    // 1. Read existing theme from document or localStorage
    const saved = localStorage.getItem('portfolio-theme')
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    } else {
      const currentDocTheme = document.documentElement.getAttribute('data-theme')
      if (currentDocTheme) {
        setTheme(currentDocTheme)
      } else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const defaultTheme = isDark ? 'dark' : 'light'
        setTheme(defaultTheme)
        document.documentElement.setAttribute('data-theme', defaultTheme)
      }
    }

    // 2. Observer for any external data-theme changes (e.g. from tests or other components)
    const observer = new MutationObserver(() => {
      const active = document.documentElement.getAttribute('data-theme')
      if (active && (active === 'light' || active === 'dark')) {
        setTheme(active)
      }
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsRotating(true)
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('portfolio-theme', next)
    document.documentElement.setAttribute('data-theme', next)

    // Trigger themechange event for 3D canvas and dynamic listeners
    window.dispatchEvent(new Event('themechange'))
    setTimeout(() => setIsRotating(false), 500)
  }

  const isDark = theme === 'dark'

  return (
    <aside className="floating-theme-wrapper" aria-label="Theme Switcher">
      <motion.button
        id="floating-theme-toggle"
        onClick={toggleTheme}
        className="floating-theme-btn"
        aria-label={`Current theme is ${theme}. Click to switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Animated Ripple Burst Ring on Toggle */}
        <AnimatePresence>
          {isRotating && (
            <motion.span
              key={`burst-${theme}`}
              className="theme-burst-ring"
              initial={{ scale: 0.7, opacity: 0.9 }}
              animate={{ scale: 1.7, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        {/* Icon Animation: Moon for dark theme, Sun for light theme */}
        <div className="icon-container">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon-icon"
                className="theme-icon-motion"
                initial={{ rotate: -90, scale: 0.2, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.2, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 20,
                  duration: 0.35
                }}
              >
                {/* Crisp Neo-Brutalist Moon Vector */}
                <svg
                  className="theme-svg moon-svg"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" fillOpacity="0.18" />
                  {/* Subtle Star Sparkles */}
                  <circle cx="18" cy="5" r="1" fill="currentColor" stroke="none" />
                  <circle cx="21" cy="9" r="0.75" fill="currentColor" stroke="none" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="sun-icon"
                className="theme-icon-motion"
                initial={{ rotate: 90, scale: 0.2, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0.2, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 20,
                  duration: 0.35
                }}
              >
                {/* Crisp Neo-Brutalist Sun Vector */}
                <svg
                  className="theme-svg sun-svg"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4.5" fill="currentColor" fillOpacity="0.22" />
                  <line x1="12" y1="1.5" x2="12" y2="3.5" />
                  <line x1="12" y1="20.5" x2="12" y2="22.5" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1.5" y1="12" x2="3.5" y2="12" />
                  <line x1="20.5" y1="12" x2="22.5" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      <style>{`
        .floating-theme-wrapper {
          position: fixed;
          top: 20px;
          right: 24px;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }

        .floating-theme-btn {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 2.5px solid var(--border);
          box-shadow: 3.5px 3.5px 0px var(--border);
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          cursor: pointer;
          outline: none;
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.18s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.25s ease,
                      background-color 0.25s ease;
        }

        .floating-theme-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0px var(--accent);
          border-color: var(--border);
        }

        .floating-theme-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1.5px 1.5px 0px var(--border);
        }

        .theme-burst-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 2.5px solid var(--accent);
          pointer-events: none;
        }

        .icon-container {
          position: relative;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-icon-motion {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-svg {
          display: block;
          transition: color 0.2s ease;
        }

        .moon-svg {
          color: #facc15;
          filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.35));
        }

        .sun-svg {
          color: #e86c60;
          filter: drop-shadow(0 0 5px rgba(232, 108, 96, 0.45));
        }

        /* Responsive placement on mobile */
        @media (max-width: 768px) {
          .floating-theme-wrapper {
            top: 14px;
            right: 14px;
          }
          .floating-theme-btn {
            width: 42px;
            height: 42px;
            border-width: 2px;
            box-shadow: 2.5px 2.5px 0px var(--border);
          }
        }
      `}</style>
    </aside>
  )
}
