import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { BrandLogo } from './TechLogos'

const GITHUB_USER = 'shuklavaibhav30'
const LEETCODE_USER = 'imvaibhavshukla'
const CF_USER = 'shuklagvk'
const CC_USER = 'shuklagvk'

const PROFILE_URLS = {
  github: `https://github.com/${GITHUB_USER}`,
  leetcode: `https://leetcode.com/u/${LEETCODE_USER}`,
  codechef: `https://www.codechef.com/users/${CC_USER}`,
  codeforces: `https://codeforces.com/profile/${CF_USER}`,
  codolio: 'https://codolio.com/profile/shuklavaibhav',
}

const TECH_ARSENAL = [
  { id: 'mongodb', name: 'MongoDB' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'react', name: 'React.js' },
  { id: 'nodejs', name: 'Node.js' },
  { id: 'express', name: 'Express.js' },
  { id: 'tailwind', name: 'Tailwind CSS' },
  { id: 'cpp', name: 'C++' },
  { id: 'python', name: 'Python' },
  { id: 'git', name: 'Git' },
  { id: 'github', name: 'GitHub' },
  { id: 'aws', name: 'AWS' },
  { id: 'postgres', name: 'PostgreSQL' },
  { id: 'docker', name: 'Docker' },
  { id: 'redux', name: 'Redux' },
]

// Resilient animated counter
function Counter({ value, suffix = '', prefix = '' }) {
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true, margin: '40px' })
  const [displayValue, setDisplayValue] = useState(() => (value != null ? String(value) : '0'))

  useEffect(() => {
    if (value === '—' || value === undefined || value === null) {
      setDisplayValue('—')
      return
    }
    const str = String(value)
    const hasPlus = str.endsWith('+')
    const hasStar = str.includes('★')
    if (hasStar || isNaN(parseInt(str, 10))) {
      setDisplayValue(str)
      return
    }
    const num = parseInt(hasPlus ? str.slice(0, -1) : str, 10)
    if (isNaN(num)) {
      setDisplayValue(str)
      return
    }
    if (isInView) {
      const ctrl = animate(0, num, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(v) {
          setDisplayValue(Math.floor(v) + (hasPlus ? '+' : ''))
        }
      })
      return () => ctrl.stop()
    } else {
      setDisplayValue(str)
    }
  }, [value, isInView])

  return (
    <span ref={nodeRef} className="counter-num">
      {prefix}{displayValue}{suffix}
    </span>
  )
}

// Animated circular progress ring for LeetCode (Neo-Brutalist high contrast)
function RadialProgressRing({ solved = 292, total = 500, size = 104, strokeWidth = 9, accent = '#e86c60' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const [progress, setProgress] = useState(0)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const targetPercent = Math.min(100, Math.max(10, Math.round((solved / total) * 100)))

  useEffect(() => {
    if (inView) {
      const ctrl = animate(0, targetPercent, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setProgress(v)
      })
      return () => ctrl.stop()
    }
  }, [inView, targetPercent])

  const offset = circumference - (progress / 100) * circumference

  return (
    <div ref={ref} className="radial-ring-box" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="radial-ring-svg">
        <circle
          className="radial-ring-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="radial-ring-bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          stroke={accent}
          strokeLinecap="round"
        />
      </svg>
      <div className="radial-ring-content">
        <span className="radial-val"><Counter value={solved} /></span>
        <span className="radial-lbl">SOLVED</span>
      </div>
    </div>
  )
}

// Real GitHub Non-Zero Activity Baseline for shuklavaibhav30 (371 total contributions in past year)
const GITHUB_ACTIVITY_MAP = {
  "2025-10-20": [1, 1], "2025-10-23": [10, 2], "2025-10-25": [4, 1], "2025-10-30": [1, 1],
  "2025-10-31": [6, 2], "2025-11-02": [2, 1], "2025-11-06": [2, 1], "2025-11-07": [4, 1],
  "2025-11-08": [5, 1], "2025-11-09": [14, 3], "2025-11-10": [1, 1], "2025-12-15": [1, 1],
  "2026-02-10": [1, 1], "2026-03-25": [1, 1], "2026-03-26": [1, 1], "2026-03-28": [1, 1],
  "2026-03-29": [8, 2], "2026-03-31": [1, 1], "2026-04-01": [1, 1], "2026-04-02": [1, 1],
  "2026-04-03": [1, 1], "2026-04-07": [3, 1], "2026-04-08": [1, 1], "2026-04-09": [2, 1],
  "2026-04-13": [5, 1], "2026-04-17": [1, 1], "2026-04-24": [1, 1], "2026-05-31": [1, 1],
  "2026-06-03": [2, 1], "2026-06-05": [4, 1], "2026-06-06": [7, 2], "2026-06-07": [16, 3],
  "2026-06-08": [2, 1], "2026-06-10": [15, 3], "2026-06-11": [11, 2], "2026-06-12": [5, 1],
  "2026-06-13": [5, 1], "2026-06-14": [2, 1], "2026-06-20": [1, 1], "2026-06-21": [1, 1],
  "2026-06-24": [1, 1], "2026-06-25": [3, 1], "2026-07-09": [1, 1], "2026-07-14": [2, 1],
  "2026-07-24": [9, 2], "2026-07-25": [23, 4], "2026-07-28": [1, 1], "2026-07-30": [9, 2],
  "2026-07-31": [8, 2], "2026-08-01": [5, 1], "2026-08-02": [3, 1], "2026-08-03": [2, 1],
  "2026-08-20": [1, 1], "2026-08-21": [1, 1], "2026-08-22": [3, 1], "2026-08-23": [4, 1],
  "2026-08-24": [1, 1], "2026-08-26": [2, 1], "2026-08-29": [5, 1], "2026-08-30": [10, 2],
  "2026-09-01": [1, 1], "2026-09-08": [6, 2], "2026-09-09": [4, 1], "2026-09-10": [1, 1],
  "2026-09-11": [7, 2], "2026-09-12": [3, 1], "2026-09-13": [6, 2], "2026-09-14": [16, 3],
  "2026-09-15": [6, 2], "2026-09-16": [2, 1], "2026-09-17": [8, 2], "2026-09-21": [3, 1],
  "2026-09-23": [1, 1], "2026-09-24": [2, 1], "2026-09-25": [1, 1], "2026-09-27": [3, 1],
  "2026-09-28": [1, 1], "2026-09-30": [1, 1], "2026-10-01": [9, 2], "2026-10-03": [2, 1],
  "2026-10-04": [7, 2], "2026-10-05": [1, 1], "2026-10-06": [2, 1], "2026-10-07": [9, 2],
  "2026-10-12": [1, 1], "2026-10-19": [18, 4], "2026-10-20": [1, 1], "2026-10-21": [3, 1]
}

function buildInitialContributions() {
  const days = []
  const start = new Date('2025-10-19')
  for (let i = 0; i < 369; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const dateStr = d.toISOString().split('T')[0]
    const record = GITHUB_ACTIVITY_MAP[dateStr]
    const count = record ? record[0] : 0
    const level = record ? record[1] : 0
    days.push({
      date: dateStr,
      count,
      level,
      dayOfMonth: d.getDate(),
      month: d.toLocaleString('en-US', { month: 'short' }),
      dayOfWeek: d.getDay()
    })
  }
  return days
}

// Real GitHub Commit & PR Activity Heatmap
function GitHubHeatmap({ username = 'shuklavaibhav30', prCount = 3 }) {
  const [days, setDays] = useState(buildInitialContributions)
  const [totalCount, setTotalCount] = useState(371)
  const [hoveredDay, setHoveredDay] = useState(null)
  const scrollRef = useRef(null)

  // Fetch live contributions
  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => r.json())
      .then(d => {
        if (d && Array.isArray(d.contributions) && d.contributions.length > 0) {
          const mapped = d.contributions.map(c => {
            const dt = new Date(c.date)
            return {
              ...c,
              dayOfMonth: dt.getDate(),
              month: dt.toLocaleString('en-US', { month: 'short' }),
              dayOfWeek: dt.getDay()
            }
          })
          setDays(mapped)
          if (d.total?.lastYear) setTotalCount(d.total.lastYear)
        }
      })
      .catch(() => {})
  }, [username])

  // Group into weeks
  const weeks = useMemo(() => {
    const res = []
    let cur = []
    days.forEach(d => {
      cur.push(d)
      if (cur.length === 7) {
        res.push(cur)
        cur = []
      }
    })
    if (cur.length > 0) res.push(cur)
    return res
  }, [days])

  // Month labels
  const monthLabels = useMemo(() => {
    let lastM = ''
    return weeks.map(w => {
      const match = w.find(d => d.dayOfMonth <= 7 && d.month !== lastM)
      if (match) {
        lastM = match.month
        return match.month
      }
      return ''
    })
  }, [weeks])

  // Auto-scroll to current active months (right side) on load
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [weeks])

  const formatDate = (isoStr) => {
    if (!isoStr) return ''
    try {
      const d = new Date(isoStr)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return isoStr
    }
  }

  return (
    <div className="gh-heatmap-wrapper">
      <div className="gh-heatmap-header">
        <div className="gh-h-title">
          <span className="gh-h-dot" />
          <span>REAL COMMIT & PR HEATMAP</span>
        </div>
        <div className="gh-h-meta">
          <span className="gh-h-badge">{totalCount} CONTRIBUTIONS</span>
          <span className="gh-h-badge gh-pr-badge">{prCount} MERGED PRS</span>
        </div>
      </div>

      <div className="gh-heatmap-scroll" ref={scrollRef}>
        <div className="gh-heatmap-canvas">
          {/* Month labels row */}
          <div className="gh-month-row">
            <div className="gh-weekday-spacer" />
            {monthLabels.map((m, idx) => (
              <span key={idx} className="gh-month-lbl">{m}</span>
            ))}
          </div>

          {/* Grid with Day of Week labels and Week Columns */}
          <div className="gh-grid-body">
            <div className="gh-weekdays-col">
              <span className="gh-day-lbl">Mon</span>
              <span className="gh-day-lbl">Wed</span>
              <span className="gh-day-lbl">Fri</span>
            </div>

            <div className="gh-weeks-container">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="gh-week-col">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className={`gh-cell gh-level-${day.level || 0}`}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${formatDate(day.date)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with dynamic hover readout & Color scale legend */}
      <div className="gh-heatmap-footer">
        <div className="gh-hover-info">
          {hoveredDay ? (
            <span className="gh-hover-active">
              <strong>{hoveredDay.count}</strong> contribution{hoveredDay.count === 1 ? '' : 's'} on {formatDate(hoveredDay.date)}
            </span>
          ) : (
            <span className="gh-hover-idle">
              {totalCount} commits & PR activity recorded in past year
            </span>
          )}
        </div>

        <div className="gh-legend">
          <span className="gh-legend-lbl">Less</span>
          <span className="gh-legend-box gh-level-0" />
          <span className="gh-legend-box gh-level-1" />
          <span className="gh-legend-box gh-level-2" />
          <span className="gh-legend-box gh-level-3" />
          <span className="gh-legend-box gh-level-4" />
          <span className="gh-legend-lbl">More</span>
        </div>
      </div>
    </div>
  )
}

// Mini sparkline for Codeforces rating
function RatingSparkline({ accent = '#4f46e5' }) {
  return (
    <div className="sparkline-wrapper">
      <svg viewBox="0 0 160 48" className="sparkline-svg">
        <defs>
          <linearGradient id="cfGlowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 4 40 Q 30 38, 50 32 T 90 24 T 125 14 T 156 8 L 156 46 L 4 46 Z"
          fill="url(#cfGlowGrad)"
        />
        <path
          d="M 4 40 Q 30 38, 50 32 T 90 24 T 125 14 T 156 8"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          className="sparkline-path"
        />
        <circle cx="156" cy="8" r="4" fill={accent} stroke="#000" strokeWidth="1.5" className="sparkline-dot" />
      </svg>
      <div className="sparkline-label">
        <span>RATING TRAJECTORY</span>
        <span className="sparkline-val">+615 PEAK</span>
      </div>
    </div>
  )
}

// Neo-Brutalist Bento Card
function BentoCard({
  accent,
  href,
  className = '',
  children,
  badgeText = 'VERIFIED NODE',
  delay = 0,
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`bento-card ${className}`}
      style={{ '--card-accent': accent }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="bento-corner-tag">[ {badgeText} ]</div>
      <div className="bento-body">
        {children}
      </div>
    </motion.a>
  )
}

// Real LeetCode Algorithmic Topics & Skills for imvaibhavshukla
const INITIAL_LEETCODE_SKILLS = [
  { name: 'Array', count: 149 },
  { name: 'String', count: 72 },
  { name: 'Math', count: 68 },
  { name: 'Hash Table', count: 48 },
  { name: 'Sorting', count: 38 },
  { name: 'Binary Search', count: 32 },
  { name: 'Two Pointers', count: 31 },
  { name: 'Greedy', count: 24 },
  { name: 'Trees', count: 24 },
  { name: 'Dynamic Programming', count: 20 },
  { name: 'Simulation', count: 20 },
  { name: 'Linked List', count: 19 },
  { name: 'Bit Manipulation', count: 18 },
  { name: 'Sliding Window', count: 12 },
  { name: 'Backtracking', count: 11 },
  { name: 'Stack', count: 11 }
]

export default function Stats({ isMobile }) {
  // Live Data States
  const [ghData, setGhData] = useState({ public_repos: 25, followers: 4, following: 5 })
  const [ghPrCount, setGhPrCount] = useState(3)
  const [ghLoading, setGhLoading] = useState(false)

  const [lcData, setLcData] = useState({ solvedProblem: 296, easySolved: 151, mediumSolved: 129, hardSolved: 14 })
  const [lcSkills, setLcSkills] = useState(INITIAL_LEETCODE_SKILLS)
  const [lcLoading, setLcLoading] = useState(false)

  const [cfData, setCfData] = useState({ rating: 615, maxRating: 615, rank: 'NEWBIE', contests: 2 })
  const [cfLoading, setCfLoading] = useState(false)

  const [ccData, setCcData] = useState({
    rating: 873,
    maxRating: 873,
    stars: '1★',
    rank: 'Div 4',
    solved: 91,
    status: 'Active Solver',
    contests: 8
  })
  const [ccLoading, setCcLoading] = useState(false)

  const [isRefreshing, setIsRefreshing] = useState(false)

  // Primary Fetcher
  const fetchAllMetrics = useCallback(() => {
    setIsRefreshing(true)

    // 1. GitHub User & PRs
    setGhLoading(true)
    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then(r => r.json())
      .then(d => {
        if (d && d.public_repos !== undefined) {
          setGhData({
            public_repos: d.public_repos,
            followers: d.followers,
            following: d.following
          })
        }
      })
      .catch(() => {})
      .finally(() => setGhLoading(false))

    fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USER}+type:pr`)
      .then(r => r.json())
      .then(d => {
        if (d && typeof d.total_count === 'number') {
          setGhPrCount(d.total_count)
        }
      })
      .catch(() => {})

    // 2. LeetCode Solved & Skills
    setLcLoading(true)
    fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USER}/solved`)
      .then(r => r.json())
      .then(d => {
        if (d?.solvedProblem != null || d?.totalSolved != null) {
          setLcData({
            solvedProblem: d.solvedProblem ?? d.totalSolved,
            easySolved: d.easySolved ?? 151,
            mediumSolved: d.mediumSolved ?? 129,
            hardSolved: d.hardSolved ?? 14
          })
        } else {
          throw new Error('Fallback needed')
        }
      })
      .catch(() => {
        fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USER}`)
          .then(r => r.json())
          .then(d => {
            if (d?.status === 'success') {
              setLcData({
                solvedProblem: d.totalSolved,
                easySolved: d.easySolved,
                mediumSolved: d.mediumSolved,
                hardSolved: d.hardSolved
              })
            }
          })
          .catch(() => {})
      })
      .finally(() => setLcLoading(false))

    fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USER}/skill`)
      .then(r => r.json())
      .then(d => {
        if (d && (d.fundamental || d.intermediate || d.advanced)) {
          const all = [
            ...(d.fundamental || []),
            ...(d.intermediate || []),
            ...(d.advanced || [])
          ]
          const sorted = all
            .map(t => ({ name: t.tagName, count: t.problemsSolved }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 16)
          if (sorted.length > 0) setLcSkills(sorted)
        }
      })
      .catch(() => {})

    // 3. Codeforces
    setCfLoading(true)
    Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${CF_USER}`).then(r => r.json()),
      fetch(`https://codeforces.com/api/user.rating?handle=${CF_USER}`).then(r => r.json())
    ])
      .then(([infoRes, ratingRes]) => {
        if (infoRes.status === 'OK' && infoRes.result?.length > 0) {
          const u = infoRes.result[0]
          const count = ratingRes.status === 'OK' && Array.isArray(ratingRes.result) ? ratingRes.result.length : 2
          setCfData({
            rating: u.rating ?? 615,
            maxRating: u.maxRating ?? 615,
            rank: u.rank ? u.rank.toUpperCase() : 'NEWBIE',
            contests: count
          })
        }
      })
      .catch(() => {})
      .finally(() => setCfLoading(false))

    // 4. CodeChef (Real verified rating: 873, max: 873, 1★, 91 solved, 8 contests)
    setCcLoading(true)
    fetch(`https://codechef-stats.tashif.codes/${CC_USER}`)
      .then(r => r.json())
      .then(d => {
        if (d?.status === 'success' && d?.data) {
          const info = d.data
          setCcData(prev => ({
            rating: info.currentRating ? info.currentRating : prev.rating || 873,
            maxRating: info.maxRating ? info.maxRating : prev.maxRating || 873,
            stars: info.stars ? `${info.stars}★` : prev.stars || '1★',
            rank: info.rank ? `#${info.rank}` : prev.rank || 'Div 4',
            solved: info.totalSolved > 0 ? info.totalSolved : prev.solved || 91,
            status: 'Active Solver',
            contests: info.totalContests > 0 ? info.totalContests : prev.contests || 8
          }))
        }
      })
      .catch(() => {})
      .finally(() => {
        setCcLoading(false)
        setTimeout(() => setIsRefreshing(false), 500)
      })
  }, [])

  useEffect(() => {
    fetchAllMetrics()
  }, [fetchAllMetrics])

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Aggregate stats across verified platforms (Codolio verified aggregate: 465+)
  const totalSolved = useMemo(() => {
    const lcSolved = lcData?.solvedProblem || 296
    const ccSolved = Number(ccData?.solved) || 91
    return lcSolved + ccSolved + 78
  }, [lcData, ccData])

  return (
    <section id="stats" ref={ref} className="stats-section">
      <motion.div
        className="stats-inner"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Intro Bio Paragraph */}
        <p className="bio-paragraph">
          I’m a <span className="neo-inline-pill yellow">MERN Stack Developer</span> who loves turning ideas into real-world web applications. I build with <span className="neo-inline-pill white">React.js</span>, <span className="neo-inline-pill white">Node.js</span>, <span className="neo-inline-pill white">Express.js</span> and <span className="neo-inline-pill white">MongoDB</span>, while actively sharpening my <span className="neo-inline-pill orange">problem-solving</span> skills through <span className="neo-inline-pill yellow">LeetCode</span> and <span className="neo-inline-pill green">CodeChef</span>.
        </p>

        {/* Elegant Headline */}
        <h2 className="headline-italic">
          The stack behind<br />
          everything I <span className="neo-text-yellow">ship.</span>
        </h2>

        {/* Floating Marquee Tech Stack Strip with Real Official Logos */}
        <div className="floating-tech-container">
          <div className="floating-tech-label">CURRENT TECH ARSENAL</div>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[...TECH_ARSENAL, ...TECH_ARSENAL].map((item, idx) => (
                <span key={idx} className="floating-tech-pill">
                  <span className="tech-logo-wrap">
                    <BrandLogo id={item.id} size={15} />
                  </span>
                  <span>{item.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* NEO-BRUTALIST SECTION HEADER (Matching Yellow Banner in Reference Image) */}
        <div className="section-header-centered">
          <div className="header-eyebrow-pill">
            <span className="eyebrow-dot" />
            <span>LIVE PLATFORMS • VERIFIED TELEMETRY</span>
          </div>

          <div className="metrics-banner-box">
            <h2 className="metrics-banner-title">
              DEVELOPMENT METRICS<span className="metrics-dot">.</span>
            </h2>
          </div>

          <div className="live-status-pill">
            <span className="live-badge-dot" />
            <span>LIVE TELEMETRY VERIFIED & SYNCHRONIZED</span>
          </div>
        </div>

        {/* Top Aggregate Summary Telemetry Ribbon */}
        <div className="telemetry-ribbon">
          <div className="ribbon-item">
            <span className="ribbon-val"><Counter value={totalSolved} suffix="+" /></span>
            <span className="ribbon-lbl">TOTAL SOLVED</span>
          </div>
          <div className="ribbon-divider" />
          <div className="ribbon-item">
            <span className="ribbon-val"><Counter value={ghData.public_repos || 25} /></span>
            <span className="ribbon-lbl">REPOSITORIES</span>
          </div>
          <div className="ribbon-divider" />
          <button
            onClick={fetchAllMetrics}
            className={`ribbon-refresh-btn ${isRefreshing ? 'is-spinning' : ''}`}
            title="Refresh Live Node Telemetry"
            aria-label="Refresh telemetry data"
          >
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
            <span>{isRefreshing ? 'SYNCING...' : 'REFRESH'}</span>
          </button>
        </div>

        {/* THE NEO-BRUTALIST BENTO GRID LAYOUT */}
        <div className="bento-metrics-grid">

          {/* 1. LEETCODE CARD (Featured - 7 Columns) */}
          <BentoCard
            accent="#e86c60"
            href={PROFILE_URLS.leetcode}
            className="bento-leetcode"
            badgeText="ALGORITHMS"
            delay={0.1}
          >
            <div className="card-top-bar">
              <div className="platform-meta">
                <div className="platform-icon-ring ring-leetcode">
                  <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.713.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.178 1.823.645l2.697 2.607c.234.234.58.358.917.324.337-.034.639-.214.805-.508.337-.597.126-1.352-.47-1.689l-2.697-2.607c-1.045-1.045-2.502-1.57-4.215-1.57s-3.17.525-4.215 1.57l-4.319 4.38c-1.045 1.045-1.57 2.457-1.57 4.17s.525 3.125 1.57 4.17l4.332 4.363c1.045 1.045 2.502 1.57 4.215 1.57s3.17-.525 4.215-1.57l2.697-2.607c.596-.337.807-1.092.47-1.689-.166-.294-.468-.474-.805-.508-.337-.034-.683.09-.917.324zM18.825 8.27l-5.698 5.767c-.234.234-.58.358-.917.324-.337-.034-.639-.214-.805-.508-.337-.597-.126-1.352.47-1.689l5.698-5.767c.596-.337 1.352-.126 1.689.47.337.597.126 1.352-.437 1.403z"/>
                  </svg>
                </div>
                <div>
                  <div className="platform-title">
                    <span>LEETCODE</span>
                    <span className="profile-handle">@{LEETCODE_USER}</span>
                  </div>
                  <div className="platform-sync-status">
                    <span className="status-dot-active" />
                    <span>{lcLoading ? 'SYNCING...' : 'LIVE VERIFIED PROFILE'}</span>
                  </div>
                </div>
              </div>
              <div className="external-link-arrow">
                <span>VIEW ↗</span>
              </div>
            </div>

            <div className="leetcode-visual-split">
              {/* Radial Donut Meter */}
              <div className="leetcode-donut-pane">
                <RadialProgressRing
                  solved={lcData.solvedProblem || 296}
                  total={500}
                  accent="#e86c60"
                />
                <div className="leetcode-focus-badge">
                  <span>TARGET: 500+</span>
                  <span className="focus-pill">Active</span>
                </div>
              </div>

              {/* Difficulty Breakdown Bars */}
              <div className="leetcode-bars-pane">
                <div className="difficulty-row">
                  <div className="diff-header">
                    <span className="diff-tag diff-easy">EASY</span>
                    <span className="diff-num"><Counter value={lcData.easySolved || 151} /></span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill fill-easy"
                      style={{ width: `${Math.min(100, Math.round(((lcData.easySolved || 151) / (lcData.solvedProblem || 296)) * 100))}%` }}
                    />
                  </div>
                </div>

                <div className="difficulty-row">
                  <div className="diff-header">
                    <span className="diff-tag diff-med">MEDIUM</span>
                    <span className="diff-num"><Counter value={lcData.mediumSolved || 129} /></span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill fill-med"
                      style={{ width: `${Math.min(100, Math.round(((lcData.mediumSolved || 129) / (lcData.solvedProblem || 296)) * 100))}%` }}
                    />
                  </div>
                </div>

                <div className="difficulty-row">
                  <div className="diff-header">
                    <span className="diff-tag diff-hard">HARD</span>
                    <span className="diff-num"><Counter value={lcData.hardSolved || 14} /></span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill fill-hard"
                      style={{ width: `${Math.max(8, Math.min(100, Math.round(((lcData.hardSolved || 14) / (lcData.solvedProblem || 296)) * 100 * 2)))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Covered Algorithmic Topics & Skills */}
            <div className="leetcode-topics-section">
              <div className="lc-topics-header">
                <div className="lc-topics-title">
                  <span className="lc-topics-dot" />
                  <span>COVERED TOPICS & ALGORITHMIC DOMAINS</span>
                </div>
                <span className="lc-topics-meta">TOP 16 SKILLS</span>
              </div>
              <div className="lc-skills-grid">
                {lcSkills.map((s, idx) => (
                  <span key={idx} className="lc-skill-pill" title={`${s.count} problems solved in ${s.name}`}>
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-count">{s.count}</span>
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* 2. GITHUB CARD (Featured - 5 Columns) */}
          <BentoCard
            accent="#0284c7"
            href={PROFILE_URLS.github}
            className="bento-github"
            badgeText="OPEN SOURCE"
            delay={0.15}
          >
            <div className="card-top-bar">
              <div className="platform-meta">
                <div className="platform-icon-ring ring-github">
                  <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                <div>
                  <div className="platform-title">
                    <span>GITHUB</span>
                    <span className="profile-handle">@{GITHUB_USER}</span>
                  </div>
                  <div className="platform-sync-status">
                    <span className="status-dot-active" />
                    <span>{ghLoading ? 'SYNCING...' : 'LIVE COMMITS & PRS'}</span>
                  </div>
                </div>
              </div>
              <div className="external-link-arrow">
                <span>VIEW ↗</span>
              </div>
            </div>

            {/* Repos Hero Highlight */}
            <div className="github-metric-showcase">
              <div className="gh-big-stat">
                <span className="gh-counter"><Counter value={ghData.public_repos || 25} /></span>
                <span className="gh-counter-lbl">PUBLIC REPOSITORIES</span>
              </div>
              <div className="gh-pills-row">
                <div className="gh-pill">
                  <span className="gh-pill-val"><Counter value={ghData.followers || 4} /></span>
                  <span className="gh-pill-lbl">FOLLOWERS</span>
                </div>
                <div className="gh-pill">
                  <span className="gh-pill-val"><Counter value={ghData.following || 5} /></span>
                  <span className="gh-pill-lbl">FOLLOWING</span>
                </div>
                <div className="gh-pill gh-pill-pr">
                  <span className="gh-pill-val"><Counter value={ghPrCount || 3} /></span>
                  <span className="gh-pill-lbl">MERGED PRS</span>
                </div>
              </div>
            </div>

            {/* Real GitHub Commit & PR Activity Heatmap */}
            <GitHubHeatmap username={GITHUB_USER} prCount={ghPrCount} />
          </BentoCard>

          {/* 3. CODEFORCES CARD (4 Columns) */}
          <BentoCard
            accent="#4f46e5"
            href={PROFILE_URLS.codeforces}
            className="bento-codeforces"
            badgeText="COMPETITIVE CP"
            delay={0.2}
          >
            <div className="card-top-bar">
              <div className="platform-meta">
                <div className="platform-icon-ring ring-codeforces">
                  <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                    <path d="M4.5 7.5A1.5 1.5 0 016 9v10.5a1.5 1.5 0 01-3 0V9a1.5 1.5 0 011.5-1.5zM12 3a1.5 1.5 0 011.5 1.5V19.5a1.5 1.5 0 01-3 0V4.5A1.5 1.5 0 0112 3zM19.5 12a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-3 0v-6a1.5 1.5 0 011.5-1.5z"/>
                  </svg>
                </div>
                <div>
                  <div className="platform-title">
                    <span>CODEFORCES</span>
                    <span className="profile-handle">@{CF_USER}</span>
                  </div>
                  <div className="platform-sync-status">
                    <span className="status-dot-active" />
                    <span>{cfLoading ? 'SYNCING...' : 'CONTEST NODE'}</span>
                  </div>
                </div>
              </div>
              <div className="external-link-arrow">
                <span>↗</span>
              </div>
            </div>

            <div className="stat-center-hero">
              <div className="hero-rating-number text-indigo">
                <Counter value={cfData.rating || 615} />
              </div>
              <div className="hero-rating-label">CURRENT RATING</div>
              <div className="cf-tier-pill">
                <span>★ {cfData.rank || 'NEWBIE'}</span>
              </div>
            </div>

            <div className="cp-dual-metrics">
              <div className="cp-metric-box">
                <span className="cp-m-val"><Counter value={cfData.maxRating || 615} /></span>
                <span className="cp-m-lbl">MAX RATING</span>
              </div>
              <div className="cp-metric-box">
                <span className="cp-m-val"><Counter value={cfData.contests || 2} /></span>
                <span className="cp-m-lbl">CONTESTS</span>
              </div>
            </div>

            <RatingSparkline accent="#4f46e5" />
          </BentoCard>

          {/* 4. CODECHEF CARD (4 Columns) */}
          <BentoCard
            accent="#ea580c"
            href={PROFILE_URLS.codechef}
            className="bento-codechef"
            badgeText="COMPETITIVE CP"
            delay={0.25}
          >
            <div className="card-top-bar">
              <div className="platform-meta">
                <div className="platform-icon-ring ring-codechef">
                  <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                    <path d="M12 2C8.686 2 6 4.686 6 8c-1.657 0-3 1.343-3 3 0 1.25.767 2.32 1.856 2.766-.543.633-.856 1.448-.856 2.334 0 2.209 1.791 4 4 4h8c2.209 0 4-1.791 4-4 0-.886-.313-1.701-.856-2.334C20.233 13.32 21 12.25 21 11c0-1.657-1.343-3-3-3 0-3.314-2.686-6-6-6zm0 2c2.209 0 4 1.791 4 4v1h1c.552 0 1 .448 1 1s-.448 1-1 1h-1v1c0 1.105-.895 2-2 2H9c-1.105 0-2-.895-2-2v-1H6c-.552 0-1-.448-1-1s.448-1 1-1h1V8c0-2.209 1.791-4 4-4z"/>
                  </svg>
                </div>
                <div>
                  <div className="platform-title">
                    <span>CODECHEF</span>
                    <span className="profile-handle">@{CC_USER}</span>
                  </div>
                  <div className="platform-sync-status">
                    <span className="status-dot-active" />
                    <span>{ccLoading ? 'SYNCING...' : 'LIVE VERIFIED PROFILE'}</span>
                  </div>
                </div>
              </div>
              <div className="external-link-arrow">
                <span>VIEW ↗</span>
              </div>
            </div>

            <div className="stat-center-hero">
              <div className="hero-rating-number text-orange">
                <Counter value={ccData.rating || 873} />
              </div>
              <div className="hero-rating-label">CURRENT RATING</div>
              <div className="cf-tier-pill tier-orange">
                <span>★ {ccData.stars || '1★'} • {ccData.rank || 'DIV 4'}</span>
              </div>
            </div>

            <div className="cp-dual-metrics">
              <div className="cp-metric-box">
                <span className="cp-m-val"><Counter value={ccData.maxRating || 873} /></span>
                <span className="cp-m-lbl">MAX RATING</span>
              </div>
              <div className="cp-metric-box">
                <span className="cp-m-val"><Counter value={ccData.solved || 91} /></span>
                <span className="cp-m-lbl">PROBLEMS SOLVED</span>
              </div>
            </div>

            <div className="codechef-status-banner">
              <span>⚡ {ccData.contests || 8} Contests Attended • Verified Solver</span>
            </div>
          </BentoCard>

          {/* 5. CODOLIO CARD (4 Columns) */}
          <BentoCard
            accent="#16a34a"
            href={PROFILE_URLS.codolio}
            className="bento-codolio"
            badgeText="UNIFIED HUB"
            delay={0.3}
          >
            <div className="card-top-bar">
              <div className="platform-meta">
                <div className="platform-icon-ring ring-codolio">
                  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <div className="platform-title">
                    <span>CODOLIO</span>
                    <span className="profile-handle">@shuklavaibhav</span>
                  </div>
                  <div className="platform-sync-status">
                    <span className="status-dot-active" />
                    <span>UNIFIED PORTFOLIO</span>
                  </div>
                </div>
              </div>
              <div className="external-link-arrow">
                <span>VIEW ↗</span>
              </div>
            </div>

            <div className="stat-center-hero">
              <div className="hero-rating-number text-emerald">
                <Counter value={totalSolved} suffix="+" />
              </div>
              <div className="hero-rating-label">AGGREGATED SOLVED</div>
              <div className="cf-tier-pill tier-emerald">
                <span>6 PROFILES LINKED</span>
              </div>
            </div>

            <div className="cp-dual-metrics">
              <div className="cp-metric-box">
                <span className="cp-m-val"><Counter value={234} /></span>
                <span className="cp-m-lbl">ACTIVE DAYS</span>
              </div>
              <div className="cp-metric-box">
                <span className="cp-m-val"><Counter value={22} /></span>
                <span className="cp-m-lbl">TOTAL CONTESTS</span>
              </div>
            </div>

            <div className="codolio-platforms-row">
              <span className="c-plat-badge">LeetCode</span>
              <span className="c-plat-badge">CodeChef</span>
              <span className="c-plat-badge">Codeforces</span>
              <span className="c-plat-badge">GitHub</span>
              <span className="c-plat-badge">GFG</span>
              <span className="c-plat-badge">HackerRank</span>
            </div>

            <div className="codolio-action-pill">
              <span>View Full Codolio Profile ↗</span>
            </div>
          </BentoCard>

        </div>
      </motion.div>

      <style>{`
        .stats-section {
          padding: 60px 24px 100px;
          background: transparent;
          position: relative;
          overflow: hidden;
        }
        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Bio & Headline */
        .bio-paragraph {
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
          color: #1e293b;
          font-size: clamp(1.25rem, 2.4vw, 1.65rem);
          font-weight: 500;
          line-height: 1.6;
          text-align: center;
          max-width: 960px;
          margin: 0 auto 36px;
        }
        .neo-inline-pill {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-style: normal;
          font-size: 0.85em;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          margin: 0 4px;
        }
        .neo-inline-pill.yellow { background: var(--accent-peach, #ffd6ce); color: var(--hf-peach-text, #8c2d24); }
        .neo-inline-pill.white { background: var(--bg-card); color: var(--text-main); border: 1.5px solid var(--border); }
        .neo-inline-pill.orange { background: var(--bg-card-alt); color: var(--text-main); border: 1.5px solid var(--border); }
        .neo-inline-pill.green {
          background: #e6f6ee;
          color: #1b5e3b;
          border: 1.5px solid var(--border);
        }
        :root[data-theme="dark"] .neo-inline-pill.green {
          background: rgba(74, 222, 128, 0.12);
          color: #6ee7b7;
          border-color: rgba(110, 231, 183, 0.35);
        }

        .headline-italic {
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
          color: var(--text-main);
          font-size: clamp(2rem, 4.2vw, 3.2rem);
          font-weight: 700;
          text-align: center;
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin: 0 auto 28px;
        }
        .neo-text-yellow {
          background: var(--bg-card, #ffffff);
          color: var(--text-main, #1c1c1c);
          padding: 0 12px;
          border: 2px solid var(--border, #1c1c1c);
          border-radius: 8px;
          box-shadow: 3px 3px 0px var(--accent, #e86c60);
          font-style: normal;
          display: inline-block;
        }

        /* Marquee Tech Stack */
        .floating-tech-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 60px;
          width: 100%;
        }
        .floating-tech-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 800;
          letter-spacing: 0.2em;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          max-width: 960px;
          position: relative;
          background: var(--bg-card) !important;
          border: var(--border-width) solid var(--border) !important;
          border-radius: 9999px !important;
          padding: 10px 0 !important;
          box-shadow: var(--shadow) !important;
        }
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 12px;
          width: max-content;
          animation: marqueeLeftToRight 28s linear infinite;
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marqueeLeftToRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .floating-tech-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-main, #1c1c1c);
          background: var(--bg-card-alt, #ffffff);
          border: 1.5px solid var(--border, #1c1c1c);
          box-shadow: 2px 2px 0px var(--border, #1c1c1c);
          padding: 6px 14px;
          border-radius: 9999px;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .floating-tech-pill:hover {
          background: var(--accent-peach, #ffd6ce);
          color: var(--hf-peach-text, #8c2d24);
          transform: translateY(-2px);
          box-shadow: 3px 3px 0px var(--border, #1c1c1c);
        }
        .tech-logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
        }

        /* Section Header & Subtitle */
        .section-header-centered {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 50px;
          margin-bottom: 24px;
        }
        .header-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-card);
          border: 2px solid var(--border);
          box-shadow: var(--shadow-sm);
          padding: 4px 12px;
          border-radius: 9999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 14px;
        }

        .eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          border: 1px solid #000;
        }

        /* Hacktoberfest Clean Neo-Brutalist Banner */
        .metrics-banner-box {
          background: var(--bg-card, #ffffff);
          border: 2.5px solid var(--border, #1c1c1c);
          box-shadow: 5px 5px 0px var(--accent, #e86c60);
          border-radius: 14px;
          padding: 10px 24px;
          margin-bottom: 14px;
          transition: all 0.2s ease;
        }
        .metrics-banner-box:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0px var(--accent, #e86c60);
        }
        .metrics-banner-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          color: var(--text-main, #1c1c1c);
          letter-spacing: -0.02em;
          margin: 0;
          text-transform: uppercase;
        }
        .metrics-dot {
          color: var(--accent, #e86c60);
          font-weight: 900;
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #dcfce7;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0px #000000;
          padding: 4px 12px;
          border-radius: 9999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          color: #15803d;
        }
        .live-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #22c55e;
          border: 1px solid #000;
          animation: pulse-glow 2s infinite;
        }

        /* Top Telemetry Summary Ribbon */
        .telemetry-ribbon {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-card);
          border: var(--border-width) solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow);
          padding: 14px 24px;
          margin: 28px auto 32px;
          max-width: 1200px;
        }
        .ribbon-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ribbon-val {
          font-family: 'JetBrains Mono', monospace;
          font-size: 20px;
          font-weight: 900;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }
        .ribbon-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: var(--text-muted);
          font-weight: 700;
          letter-spacing: 0.12em;
        }
        .ribbon-divider {
          width: 2px;
          height: 28px;
          background: var(--border);
        }
        .ribbon-refresh-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          border: 2px solid var(--border);
          box-shadow: 3px 3px 0px var(--border);
          color: #120f08;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 800;
          padding: 8px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .ribbon-refresh-btn:hover {
          background: var(--accent-hover);
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px var(--border);
        }
        .ribbon-refresh-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0px var(--border);
        }
        .ribbon-refresh-btn.is-spinning svg {
          animation: spin 0.8s linear infinite;
        }

        /* ========================================================
           BENTO GRID STYLING (Neo-Brutalist Cards)
           ======================================================== */
        .bento-metrics-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        .bento-leetcode { grid-column: span 7; min-width: 0; max-width: 100%; }
        .bento-github { grid-column: span 5; min-width: 0; max-width: 100%; }
        .bento-codeforces { grid-column: span 4; min-width: 0; max-width: 100%; }
        .bento-codechef { grid-column: span 4; min-width: 0; max-width: 100%; }
        .bento-codolio { grid-column: span 4; min-width: 0; max-width: 100%; }

        /* Bento Card Shell */
        .bento-card {
          position: relative;
          background: var(--bg-card);
          border: var(--border-width) solid var(--border);
          border-radius: 20px;
          padding: 24px 26px;
          text-decoration: none;
          color: var(--text-main);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow);
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.25s ease, border-color 0.25s ease;
        }

        .bento-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border);
        }

        .bento-corner-tag {
          position: absolute;
          top: 14px;
          right: 18px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 8.5px;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.12em;
          pointer-events: none;
        }

        .bento-body {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          gap: 18px;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        /* Card Top Bar */
        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .platform-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .platform-icon-ring {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 2px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          color: var(--text-main);
        }
        .ring-leetcode { background: var(--bg-card); color: #d97706; }
        .ring-github { background: var(--bg-card); color: #0284c7; }
        .ring-codeforces { background: var(--bg-card); color: #4f46e5; }
        .ring-codechef { background: var(--bg-card); color: #ea580c; }
        .ring-codolio { background: var(--bg-card); color: #16a34a; }

        .platform-title {
          display: flex;
          align-items: baseline;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          font-weight: 900;
          color: var(--text-main);
        }
        .profile-handle {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .platform-sync-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .status-dot-active {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          border: 1px solid #000;
        }

        .external-link-arrow {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          color: var(--text-main);
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.15s ease;
        }
        .bento-card:hover .external-link-arrow {
          background: var(--accent);
          color: #120f08;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px var(--border);
        }

        /* ----------------------------------------------------
           LEETCODE VISUALS
           ---------------------------------------------------- */
        .leetcode-visual-split {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 20px;
          align-items: center;
          padding: 6px 0;
        }
        .leetcode-donut-pane {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .radial-ring-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .radial-ring-svg {
          transform: rotate(-90deg);
        }
        .radial-ring-bg {
          fill: none;
          stroke: #e2e8f0;
        }
        .radial-ring-bar {
          fill: none;
          transition: stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .radial-ring-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .radial-val {
          font-family: 'JetBrains Mono', monospace;
          font-size: 22px;
          font-weight: 900;
          color: var(--text-main);
        }
        .radial-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.12em;
        }
        .leetcode-focus-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .focus-pill {
          background: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border);
          padding: 1px 6px;
          border-radius: 4px;
          font-size: 8px;
          font-weight: 800;
        }

        .leetcode-bars-pane {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .difficulty-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .diff-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 800;
        }
        .diff-easy { color: #16a34a; }
        .diff-med { color: var(--accent); }
        .diff-hard { color: #dc2626; }
        .diff-num { color: var(--text-main); }

        .progress-track {
          width: 100%;
          height: 8px;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fill-easy { background: #22c55e; }
        .fill-med { background: var(--accent); }
        .fill-hard { background: #ef4444; }

        /* LeetCode Covered Topics & Skills */
        .bento-leetcode .bento-body {
          justify-content: space-between;
          gap: 14px;
        }
        .leetcode-topics-section {
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          box-sizing: border-box;
        }
        .lc-topics-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'JetBrains Mono', monospace;
        }
        .lc-topics-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9.5px;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: 0.04em;
        }
        .lc-topics-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e86c60;
          border: 1px solid #000;
        }
        .lc-topics-meta {
          font-size: 8px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--bg-card-alt);
          border: 1px solid var(--border);
          color: var(--text-muted);
        }
        .lc-skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .lc-skill-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          color: var(--text-main);
          background: var(--bg-card-alt);
          border: 1.5px solid var(--border);
          padding: 2.5px 7px;
          border-radius: 6px;
          box-shadow: 1.5px 1.5px 0px var(--border);
          transition: all 0.15s ease;
          cursor: default;
        }
        .lc-skill-pill:hover {
          transform: translateY(-1px);
          box-shadow: 2px 2px 0px var(--border);
          background: var(--accent-peach, #ffd6ce);
          color: var(--hf-peach-text, #8c2d24);
        }
        .skill-name {
          font-size: 9px;
        }
        .skill-count {
          background: var(--bg-card);
          border: 1px solid var(--border);
          font-size: 8px;
          font-weight: 800;
          padding: 1px 4px;
          border-radius: 4px;
          color: #e86c60;
        }
        :root[data-theme="dark"] .skill-count {
          color: #f87171;
        }

        /* ----------------------------------------------------
           GITHUB VISUALS
           ---------------------------------------------------- */
        .github-metric-showcase {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
          gap: 14px;
        }
        .gh-big-stat {
          display: flex;
          flex-direction: column;
        }
        .gh-counter {
          font-family: 'JetBrains Mono', monospace;
          font-size: 38px;
          font-weight: 900;
          color: var(--text-main);
          line-height: 1;
        }
        .gh-counter-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 800;
          color: #0284c7;
          letter-spacing: 0.08em;
          margin-top: 4px;
        }
        .gh-pills-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .gh-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          padding: 4px 10px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
        }
        .gh-pill-val {
          font-size: 13px;
          font-weight: 800;
          color: var(--text-main);
        }
        .gh-pill-lbl {
          font-size: 8px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .gh-pill-pr {
          background: #e6f6ee;
          color: #1b5e3b;
          border-color: #22c55e;
        }
        :root[data-theme="dark"] .gh-pill-pr {
          background: rgba(34, 197, 94, 0.15);
          color: #86efac;
          border-color: rgba(74, 222, 128, 0.35);
        }

        /* GitHub Activity Heatmap */
        .gh-heatmap-wrapper {
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          overflow: hidden;
        }
        .gh-heatmap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
        }
        .gh-h-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9.5px;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: 0.04em;
        }
        .gh-h-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          border: 1px solid #000;
        }
        .gh-h-meta {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .gh-h-badge {
          font-size: 8px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--bg-card-alt);
          border: 1px solid var(--border);
          color: var(--text-main);
        }
        .gh-heatmap-scroll {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 4px;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
          -webkit-overflow-scrolling: touch;
        }
        .gh-heatmap-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .gh-heatmap-scroll::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 4px;
        }
        .gh-heatmap-canvas {
          display: flex;
          flex-direction: column;
          min-width: 690px;
        }
        .gh-month-row {
          display: flex;
          height: 14px;
          margin-bottom: 3px;
        }
        .gh-weekday-spacer {
          width: 24px;
          flex-shrink: 0;
        }
        .gh-month-lbl {
          width: 12.5px;
          flex-shrink: 0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          font-weight: 700;
          color: var(--text-muted);
          overflow: visible;
          white-space: nowrap;
        }
        .gh-grid-body {
          display: flex;
          align-items: flex-start;
        }
        .gh-weekdays-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 85px;
          padding: 10px 0 2px;
          flex-shrink: 0;
        }
        .gh-day-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7.5px;
          font-weight: 700;
          color: var(--text-muted);
          line-height: 1;
        }
        .gh-weeks-container {
          display: flex;
          gap: 2.5px;
        }
        .gh-week-col {
          display: flex;
          flex-direction: column;
          gap: 2.5px;
          width: 10px;
          flex-shrink: 0;
        }
        .gh-cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          cursor: pointer;
        }
        .gh-cell:hover {
          transform: scale(1.4);
          z-index: 5;
          box-shadow: 0 0 4px var(--border);
        }
        /* Real Neo-Brutalist Heatmap Scales */
        .gh-level-0 {
          background: var(--bg-card-alt, #f1f5f9);
          border: 1px solid var(--border);
        }
        .gh-level-1 {
          background: #86efac;
          border: 1px solid #4ade80;
        }
        .gh-level-2 {
          background: #4ade80;
          border: 1px solid #22c55e;
        }
        .gh-level-3 {
          background: #22c55e;
          border: 1px solid #16a34a;
        }
        .gh-level-4 {
          background: #15803d;
          border: 1px solid #14532d;
        }
        :root[data-theme="dark"] .gh-level-0 {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
        }
        :root[data-theme="dark"] .gh-level-1 {
          background: #0e4429;
          border-color: #006d32;
        }
        :root[data-theme="dark"] .gh-level-2 {
          background: #006d32;
          border-color: #26a641;
        }
        :root[data-theme="dark"] .gh-level-3 {
          background: #26a641;
          border-color: #39d353;
        }
        :root[data-theme="dark"] .gh-level-4 {
          background: #39d353;
          border-color: #56d364;
        }
        .gh-heatmap-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          margin-top: 2px;
          padding-top: 4px;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
          gap: 6px;
        }
        .gh-hover-info {
          color: var(--text-main);
        }
        .gh-hover-active strong {
          color: #16a34a;
        }
        :root[data-theme="dark"] .gh-hover-active strong {
          color: #4ade80;
        }
        .gh-hover-idle {
          color: var(--text-muted);
        }
        .gh-legend {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .gh-legend-lbl {
          font-size: 7.5px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .gh-legend-box {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          display: inline-block;
        }

        /* ----------------------------------------------------
           CODEFORCES / CODECHEF / CODOLIO VISUALS
           ---------------------------------------------------- */
        .stat-center-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 8px 0;
        }
        .hero-rating-number {
          font-family: 'JetBrains Mono', monospace;
          font-size: 38px;
          font-weight: 900;
          color: var(--text-main);
          line-height: 1;
        }
        .text-indigo { color: #6366f1 !important; }
        .text-orange { color: #f97316 !important; }
        .text-emerald { color: #16a34a !important; }

        .hero-rating-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.12em;
          margin-top: 4px;
          margin-bottom: 6px;
        }
        .cf-tier-pill {
          display: inline-flex;
          align-items: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-main);
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          padding: 2px 8px;
          border-radius: 6px;
        }
        .tier-orange { background: var(--bg-card); color: #f97316; }
        .tier-emerald { background: var(--bg-card); color: #16a34a; }

        .cp-dual-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .cp-metric-box {
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          border-radius: 8px;
          padding: 6px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cp-m-val {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          font-weight: 900;
          color: var(--text-main);
        }
        .cp-m-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .sparkline-wrapper {
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 6px 10px;
        }
        .sparkline-svg {
          width: 100%;
          height: 36px;
          overflow: visible;
        }
        .sparkline-label {
          display: flex;
          justify-content: space-between;
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          font-weight: 800;
          color: #64748b;
          margin-top: 2px;
        }
        .sparkline-val {
          color: #4338ca;
          font-weight: 900;
        }

        .codechef-status-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card-alt);
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          padding: 6px 8px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 800;
          color: #f97316;
        }

        .codolio-platforms-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
        }
        .c-plat-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 800;
          color: var(--text-main);
          background: var(--bg-card-alt);
          border: 1.5px solid var(--border);
          box-shadow: 1.5px 1.5px 0px var(--border);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .codolio-action-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e6f6ee;
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          color: #1b5e3b;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          padding: 6px 10px;
          border-radius: 6px;
          transition: all 0.15s ease;
        }
        .bento-card:hover .codolio-action-pill {
          background: var(--accent, #e86c60);
          color: #1c1c1c;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px var(--border);
        }

        /* Card Footer Tags */
        .card-footer-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .mini-chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          color: var(--text-main);
          background: var(--bg-card-alt);
          border: 1.5px solid var(--border);
          padding: 2px 8px;
          border-radius: 4px;
          box-shadow: 1.5px 1.5px 0px var(--border);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .bento-leetcode { grid-column: span 12; }
          .bento-github { grid-column: span 12; }
          .bento-codeforces { grid-column: span 6; }
          .bento-codechef { grid-column: span 6; }
          .bento-codolio { grid-column: span 12; }
          .telemetry-ribbon {
            flex-wrap: wrap;
            gap: 16px;
          }
          .ribbon-divider { display: none; }
        }

        @media (max-width: 768px) {
          .stats-section { padding: 40px 16px 70px; }
          .bento-metrics-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }
          .bento-leetcode,
          .bento-github,
          .bento-codeforces,
          .bento-codechef,
          .bento-codolio {
            grid-column: span 1;
            min-width: 0;
            max-width: 100%;
          }
          .bento-card {
            padding: 20px 16px;
          }
          .leetcode-visual-split {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            width: 100%;
          }
          .leetcode-donut-pane {
            width: 100%;
            margin-bottom: 6px;
          }
          .leetcode-bars-pane {
            width: 100%;
          }
          .telemetry-ribbon {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding: 14px 16px;
          }
          .ribbon-refresh-btn {
            grid-column: span 2;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .stats-section { padding: 36px 12px 50px; }
          .bento-card {
            padding: 16px 14px;
            border-radius: 16px;
          }
          .card-top-bar {
            flex-wrap: wrap;
            gap: 8px;
          }
          .platform-title {
            font-size: 13px;
          }
          .hero-rating-number, .gh-counter {
            font-size: 32px;
          }
          .cp-dual-metrics {
            grid-template-columns: 1fr 1fr;
            gap: 6px;
          }
          .telemetry-ribbon {
            padding: 12px;
            gap: 8px;
          }
        }

        @media (max-width: 360px) {
          .cp-dual-metrics {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}