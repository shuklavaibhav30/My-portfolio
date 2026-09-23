import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, animate } from 'framer-motion'

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

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setL] = useState(true)
  useEffect(() => {
    if (!url) return
    fetch(url)
      .then(r => r.json())
      .then(d => { setData(d); setL(false) })
      .catch(() => { setL(false) })
  }, [url])
  return { data, loading }
}

function Counter({ value }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (value === '—' || value === undefined || value === null) { setDisplayValue('—'); return; }
    const str = String(value);
    const hasPlus = str.endsWith('+');
    const hasStar = str.includes('★');
    if (hasStar) { setDisplayValue(str); return; }
    const num = parseInt(hasPlus ? str.slice(0, -1) : str, 10);
    if (isNaN(num)) { setDisplayValue(str); return; }
    if (isInView) {
      const ctrl = animate(0, num, {
        duration: 1.8, ease: 'easeOut',
        onUpdate(v) { setDisplayValue(Math.floor(v) + (hasPlus ? '+' : '')); }
      });
      return () => ctrl.stop();
    }
  }, [value, isInView]);

  return <span ref={nodeRef}>{displayValue}</span>;
}

function Stat({ value, label, color, loading, size }) {
  const fontSize = size === 'lg' ? '24px' : '16px';
  return (
    <div className="stat-cell">
      <div className="stat-value" style={{ color: color || '#f8fafc', fontSize }}>
        {loading ? <span className="stat-loading">···</span> : <Counter value={value} />}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function CardHeader({ title, accent, loading, icon }) {
  return (
    <div className="card-header">
      <div className="card-header-left">
        {icon && <span className="card-icon" style={{ color: accent }}>{icon}</span>}
        <span className="card-title">{title}</span>
      </div>
      <div className="card-sync">
        <span className="sync-dot" style={{ background: loading ? '#fbbf24' : '#10b981' }} />
        <span>{loading ? 'FETCHING...' : 'SYNCED 2 MIN AGO'}</span>
      </div>
    </div>
  )
}

// SVG connection lines that adapt to actual element positions
function ConnectionLines({ hoveredNode, containerRef, isMobile }) {
  const [paths, setPaths] = useState([]);

  const computePaths = useCallback(() => {
    if (isMobile || !containerRef.current) return;
    const container = containerRef.current;
    const center = container.querySelector('.center-node');
    const cards = container.querySelectorAll('.platform-card');
    if (!center || cards.length === 0) return;

    const cRect = center.getBoundingClientRect();
    const pRect = container.getBoundingClientRect();
    const cx = cRect.left + cRect.width / 2 - pRect.left;
    const cy = cRect.top + cRect.height / 2 - pRect.top;

    const newPaths = [];
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      const ex = r.left + r.width / 2 - pRect.left;
      const ey = r.top + r.height / 2 - pRect.top;
      const id = card.dataset.id;
      const accent = card.dataset.accent;
      // Bezier control points
      const midX = (cx + ex) / 2;
      newPaths.push({ id, accent, d: `M ${ex} ${ey} C ${midX} ${ey}, ${midX} ${cy}, ${cx} ${cy}` });
    });
    setPaths(newPaths);
  }, [isMobile, containerRef]);

  useEffect(() => {
    computePaths();
    window.addEventListener('resize', computePaths);
    // Recompute after data loads and layout settles
    const timer = setTimeout(computePaths, 1000);
    return () => { window.removeEventListener('resize', computePaths); clearTimeout(timer); };
  }, [computePaths]);

  if (isMobile) return null;

  return (
    <svg className="connection-svg">
      {paths.map(p => (
        <g key={p.id}>
          <path
            d={p.d}
            stroke={hoveredNode === p.id ? p.accent : 'rgba(255,255,255,0.04)'}
            strokeWidth={hoveredNode === p.id ? 1.5 : 1}
            fill="none"
            strokeDasharray="6 3"
            style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
          />
          {hoveredNode === p.id && (
            <circle r="3" fill={p.accent} opacity="0.8">
              <animateMotion dur="2s" repeatCount="indefinite" path={p.d} />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

function openProfile(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function Stats({ isMobile }) {
  const [cfData, setCfData] = useState(null)
  const [cfLoading, setCfLoading] = useState(true)
  const [cfSyncTime, setCfSyncTime] = useState(null)

  const [ccData, setCcData] = useState(null)
  const [ccLoading, setCcLoading] = useState(true)
  const [ccSyncTime, setCcSyncTime] = useState(null)

  const [lcData, setLcData] = useState(null)
  const [lcLoading, setLcLoading] = useState(true)
  const [lcSyncTime, setLcSyncTime] = useState(null)

  const { data: ghData, loading: ghLoading } = useFetch(`https://api.github.com/users/${GITHUB_USER}`)
  const [ghSyncTime, setGhSyncTime] = useState(null)

  useEffect(() => {
    if (!ghLoading && ghData) {
      setGhSyncTime(new Date())
    }
  }, [ghLoading, ghData])

  // Helper to format relative sync time
  const getSyncLabel = (syncDate) => {
    if (!syncDate) return 'FETCHING...'
    const diffSec = Math.floor((new Date() - syncDate) / 1000)
    if (diffSec < 60) return 'SYNCED JUST NOW'
    const diffMin = Math.floor(diffSec / 60)
    if (diffMin < 60) return `SYNCED ${diffMin} MIN AGO`
    const diffHr = Math.floor(diffMin / 60)
    return `SYNCED ${diffHr} HR AGO`
  }

  // Fetch Codeforces profile dynamically via official API
  useEffect(() => {
    setCfLoading(true)
    Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${CF_USER}`).then(r => r.json()),
      fetch(`https://codeforces.com/api/user.rating?handle=${CF_USER}`).then(r => r.json())
    ]).then(([infoRes, ratingRes]) => {
      if (infoRes.status === 'OK' && infoRes.result?.length > 0) {
        const u = infoRes.result[0]
        const contestsCount = ratingRes.status === 'OK' && Array.isArray(ratingRes.result) ? ratingRes.result.length : null
        setCfData({
          rating: u.rating ?? null,
          maxRating: u.maxRating ?? null,
          rank: u.rank ? u.rank.toUpperCase() : 'UNRATED',
          contests: contestsCount
        })
        setCfSyncTime(new Date())
      } else {
        setCfData(null)
      }
      setCfLoading(false)
    }).catch(() => {
      setCfData(null)
      setCfLoading(false)
    })
  }, [])

  // Fetch CodeChef profile dynamically via CORS-friendly API proxy
  useEffect(() => {
    setCcLoading(true)
    fetch(`https://codechef-api.vercel.app/handle/${CC_USER}`)
      .then(r => r.json())
      .then(d => {
        if (d && d.success !== false && (d.currentRating != null || d.rating != null)) {
          setCcData({
            rating: d.currentRating ?? d.rating ?? null,
            maxRating: d.highestRating ?? d.maxRating ?? null,
            stars: d.stars ? String(d.stars) : null,
            globalRank: d.globalRank ?? d.global_rank ?? null,
          })
          setCcSyncTime(new Date())
        } else {
          throw new Error('CodeChef API returned invalid data')
        }
        setCcLoading(false)
      })
      .catch(() => {
        setCcData(null)
        setCcLoading(false)
      })
  }, [])

  // Fetch LeetCode
  useEffect(() => {
    setLcLoading(true)
    fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USER}/solved`)
      .then(r => r.json())
      .then(d => {
        if (d?.solvedProblem != null || d?.totalSolved != null) {
          setLcData(d)
          setLcSyncTime(new Date())
        } else {
          throw new Error('Fallback required')
        }
        setLcLoading(false)
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
                hardSolved: d.hardSolved,
              })
              setLcSyncTime(new Date())
            }
            setLcLoading(false)
          })
          .catch(() => setLcLoading(false))
      })
  }, [])

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stats" ref={ref} className="stats-section">
      <motion.div
        className="stats-inner"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Restored Intro Bio Paragraph */}
        <p className="bio-paragraph">
          I’m a <span className="highlight-accent">MERN Stack Developer</span> who loves turning ideas into real-world web applications. I build with <span className="highlight-accent">React.js</span>, <span className="highlight-accent">Node.js</span>, <span className="highlight-accent">Express.js</span> and <span className="highlight-accent">MongoDB</span>, while actively sharpening my <span className="highlight-accent">problem-solving</span> skills through <span className="highlight-accent">LeetCode</span> and <span className="highlight-accent">CodeChef</span>. I write code to solve problems — and sometimes create new ones just to debug them.
        </p>

        {/* Elegant Headline */}
        <h2 className="headline-italic">
          The stack behind<br />
          everything I <span className="highlight-accent">ship.</span>
        </h2>

        {/* Floating Marquee Tech Stack Strip */}
        <div className="floating-tech-container">
          <div className="floating-tech-label">TECH STACK</div>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[
                { icon: '⚛', name: 'React.js' },
                { icon: '⬢', name: 'Node.js' },
                { icon: '⚡', name: 'Express.js' },
                { icon: '🍃', name: 'MongoDB' },
                { icon: '⚡', name: 'JavaScript' },
                { icon: '📘', name: 'TypeScript' },
                { icon: '🌊', name: 'Tailwind CSS' },
                { icon: '⚙', name: 'C++' },
                { icon: '🐍', name: 'Python' },
                { icon: '🌱', name: 'Git' },
                { icon: '🐙', name: 'GitHub' },
                { icon: '☁', name: 'AWS' },
                { icon: '⚙', name: 'C' },
                { icon: '🗄', name: 'SQL' },
                // Duplicate for seamless infinite loop
                { icon: '⚛', name: 'React.js' },
                { icon: '⬢', name: 'Node.js' },
                { icon: '⚡', name: 'Express.js' },
                { icon: '🍃', name: 'MongoDB' },
                { icon: '⚡', name: 'JavaScript' },
                { icon: '📘', name: 'TypeScript' },
                { icon: '🌊', name: 'Tailwind CSS' },
                { icon: '⚙', name: 'C++' },
                { icon: '🐍', name: 'Python' },
                { icon: '🌱', name: 'Git' },
                { icon: '🐙', name: 'GitHub' },
                { icon: '☁', name: 'AWS' },
                { icon: '⚙', name: 'C' },
                { icon: '🗄', name: 'SQL' },
              ].map((item, idx) => (
                <span key={idx} className="floating-tech-pill">
                  <span className="tech-icon">{item.icon}</span> {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Standardized Section Header */}
        <div className="section-header-centered">
          <span className="stats-eyebrow">// COMPUTING_NODES</span>
          <h2 className="section-title">
            Development <span className="highlight-gradient">Metrics</span>
            <span className="live-badge"><span className="live-badge-dot" /> LIVE</span>
          </h2>
        </div>

        {/* Pill List */}
        <div className="pill-list">
          {/* GitHub Pill */}
          <a
            href={PROFILE_URLS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-card"
            style={{ '--accent': '#3b82f6' }}
          >
            <div className="pill-left">
              <div className="pill-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div className="pill-info">
                <div className="pill-name">GITHUB</div>
                <div className="pill-sync">
                  <span className="sync-dot" style={{ background: ghLoading ? '#fbbf24' : (ghData ? '#10b981' : '#ef4444') }} />
                  {ghLoading ? 'FETCHING...' : (ghData ? getSyncLabel(ghSyncTime) : 'SYNC FAILED')}
                </div>
              </div>
            </div>
            <div className="pill-right">
              {ghLoading ? <div className="pill-unavail">FETCHING...</div> : (
                ghData ? (
                  <>
                    <div className="pill-primary">
                      <div className="primary-circle"><Counter value={ghData?.public_repos ?? '0'} /></div>
                      <div className="primary-lbl">REPOS</div>
                    </div>
                    <div className="pill-secondary">
                      <div className="sec-item"><Counter value={ghData?.followers ?? '0'} /> <span>FOLLOWERS</span></div>
                      <div className="sec-item"><Counter value={ghData?.following ?? '0'} /> <span>FOLLOWING</span></div>
                    </div>
                  </>
                ) : (
                  <div className="pill-unavail">DATA UNAVAILABLE</div>
                )
              )}
            </div>
          </a>

          {/* LeetCode Pill */}
          <a
            href={PROFILE_URLS.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-card"
            style={{ '--accent': '#f59e0b' }}
          >
            <div className="pill-left">
              <div className="pill-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.713.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.178 1.823.645l2.697 2.607c.234.234.58.358.917.324.337-.034.639-.214.805-.508.337-.597.126-1.352-.47-1.689l-2.697-2.607c-1.045-1.045-2.502-1.57-4.215-1.57s-3.17.525-4.215 1.57l-4.319 4.38c-1.045 1.045-1.57 2.457-1.57 4.17s.525 3.125 1.57 4.17l4.332 4.363c1.045 1.045 2.502 1.57 4.215 1.57s3.17-.525 4.215-1.57l2.697-2.607c.596-.337.807-1.092.47-1.689-.166-.294-.468-.474-.805-.508-.337-.034-.683.09-.917.324zM18.825 8.27l-5.698 5.767c-.234.234-.58.358-.917.324-.337-.034-.639-.214-.805-.508-.337-.597-.126-1.352.47-1.689l5.698-5.767c.596-.337 1.352-.126 1.689.47.337.597.126 1.352-.437 1.403z"/>
                </svg>
              </div>
              <div className="pill-info">
                <div className="pill-name">LEETCODE</div>
                <div className="pill-sync">
                  <span className="sync-dot" style={{ background: lcLoading ? '#fbbf24' : (lcData ? '#10b981' : '#ef4444') }} />
                  {lcLoading ? 'FETCHING...' : (lcData ? getSyncLabel(lcSyncTime) : 'SYNC FAILED')}
                </div>
              </div>
            </div>
            <div className="pill-right">
              {lcLoading ? <div className="pill-unavail">FETCHING...</div> : (
                lcData ? (
                  <>
                    <div className="pill-primary">
                      <div className="primary-circle"><Counter value={lcData.solvedProblem ?? lcData.totalSolved ?? '0'} /></div>
                      <div className="primary-lbl">SOLVED</div>
                    </div>
                    <div className="pill-secondary">
                      <div className="sec-item" style={{color: '#10b981'}}><Counter value={lcData.easySolved ?? '0'} /> <span>EASY</span></div>
                      <div className="sec-item" style={{color: '#fbbf24'}}><Counter value={lcData.mediumSolved ?? '0'} /> <span>MEDIUM</span></div>
                      <div className="sec-item" style={{color: '#ef4444'}}><Counter value={lcData.hardSolved ?? '0'} /> <span>HARD</span></div>
                    </div>
                  </>
                ) : (
                  <div className="pill-unavail">DATA UNAVAILABLE</div>
                )
              )}
            </div>
          </a>

          {/* Codolio Pill */}
          <a
            href={PROFILE_URLS.codolio}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-card codolio-pill"
            style={{ '--accent': '#10b981' }}
          >
            <div className="pill-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div className="codolio-info">
              <div className="pill-name">CODOLIO</div>
              <div className="pill-sync">SHUKLAVAIBHAV</div>
            </div>
          </a>

          {/* CodeChef Pill */}
          <a
            href={PROFILE_URLS.codechef}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-card"
            style={{ '--accent': '#f97316' }}
          >
            <div className="pill-left">
              <div className="pill-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C8.686 2 6 4.686 6 8c-1.657 0-3 1.343-3 3 0 1.25.767 2.32 1.856 2.766-.543.633-.856 1.448-.856 2.334 0 2.209 1.791 4 4 4h8c2.209 0 4-1.791 4-4 0-.886-.313-1.701-.856-2.334C20.233 13.32 21 12.25 21 11c0-1.657-1.343-3-3-3 0-3.314-2.686-6-6-6zm0 2c2.209 0 4 1.791 4 4v1h1c.552 0 1 .448 1 1s-.448 1-1 1h-1v1c0 1.105-.895 2-2 2H9c-1.105 0-2-.895-2-2v-1H6c-.552 0-1-.448-1-1s.448-1 1-1h1V8c0-2.209 1.791-4 4-4z"/>
                </svg>
              </div>
              <div className="pill-info">
                <div className="pill-name">CODECHEF</div>
                <div className="pill-sync">
                  <span className="sync-dot" style={{ background: ccLoading ? '#fbbf24' : (ccData ? '#10b981' : '#ef4444') }} />
                  {ccLoading ? 'FETCHING...' : (ccData ? getSyncLabel(ccSyncTime) : 'SYNC FAILED')}
                </div>
              </div>
            </div>
            <div className="pill-right">
              {ccLoading ? (
                <div className="pill-unavail">FETCHING...</div>
              ) : ccData && ccData.rating != null ? (
                <>
                  <div className="pill-primary">
                    <div className="primary-circle"><Counter value={ccData.rating.toString()} /></div>
                    <div className="primary-lbl">RATING</div>
                  </div>
                  <div className="pill-secondary">
                    {ccData.maxRating != null && (
                      <div className="sec-item"><Counter value={ccData.maxRating.toString()} /> <span>MAX</span></div>
                    )}
                    {ccData.stars != null && (
                      <div className="sec-item"><span>{ccData.stars}★</span> <span>STARS</span></div>
                    )}
                    {ccData.globalRank != null && (
                      <div className="sec-item"><span>#{ccData.globalRank}</span> <span>RANK</span></div>
                    )}
                  </div>
                </>
              ) : (
                <div className="pill-unavail">DATA UNAVAILABLE</div>
              )}
            </div>
          </a>

          {/* Codeforces Pill */}
          <a
            href={PROFILE_URLS.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-card"
            style={{ '--accent': '#6366f1' }}
          >
            <div className="pill-left">
              <div className="pill-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M4.5 7.5A1.5 1.5 0 016 9v10.5a1.5 1.5 0 01-3 0V9a1.5 1.5 0 011.5-1.5zM12 3a1.5 1.5 0 011.5 1.5V19.5a1.5 1.5 0 01-3 0V4.5A1.5 1.5 0 0112 3zM19.5 12a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-3 0v-6a1.5 1.5 0 011.5-1.5z"/>
                </svg>
              </div>
              <div className="pill-info">
                <div className="pill-name">CODEFORCES</div>
                <div className="pill-sync">
                  <span className="sync-dot" style={{ background: cfLoading ? '#fbbf24' : (cfData ? '#10b981' : '#ef4444') }} />
                  {cfLoading ? 'FETCHING...' : (cfData ? getSyncLabel(cfSyncTime) : 'SYNC FAILED')}
                </div>
              </div>
            </div>
            <div className="pill-right">
              {cfLoading ? (
                <div className="pill-unavail">FETCHING...</div>
              ) : cfData && cfData.rating != null ? (
                <>
                  <div className="pill-primary">
                    <div className="primary-circle"><Counter value={cfData.rating.toString()} /></div>
                    <div className="primary-lbl">RATING</div>
                  </div>
                  <div className="pill-secondary">
                    {cfData.maxRating != null && (
                      <div className="sec-item"><Counter value={cfData.maxRating.toString()} /> <span>MAX</span></div>
                    )}
                    {cfData.contests != null && (
                      <div className="sec-item"><Counter value={cfData.contests.toString()} /> <span>CONTESTS</span></div>
                    )}
                    {cfData.rank && (
                      <div className="sec-item"><span>{cfData.rank}</span> <span>RANK</span></div>
                    )}
                  </div>
                </>
              ) : (
                <div className="pill-unavail">DATA UNAVAILABLE</div>
              )}
            </div>
          </a>
        </div>
      </motion.div>

      <style>{`
        .stats-section {
          padding: 40px 24px 80px;
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

        .bio-paragraph {
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
          color: #e2e8f0;
          font-size: clamp(1.3rem, 2.6vw, 1.75rem);
          font-weight: 400;
          line-height: 1.5;
          text-align: center;
          max-width: 980px;
          margin: 0 auto 36px;
        }

        .bio-paragraph .highlight-accent {
          color: var(--accent, #8b5cf6);
          font-style: italic;
          font-weight: 400;
        }

        .headline-italic {
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
          color: #f8fafc;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 400;
          text-align: center;
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin: 0 auto 28px;
        }

        .headline-italic .highlight-accent {
          color: var(--accent, #8b5cf6);
          font-style: italic;
        }

        .floating-tech-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 50px;
          width: 100%;
        }

        .floating-tech-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #64748b;
          letter-spacing: 0.2em;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          max-width: 900px;
          position: relative;
          background: rgba(6, 6, 18, 0.7);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 40px;
          padding: 10px 0;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.12);
        }

        .marquee-wrapper::before,
        .marquee-wrapper::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0; width: 40px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-wrapper::before {
          left: 0;
          background: linear-gradient(to right, rgba(6,6,18,0.9), transparent);
        }
        .marquee-wrapper::after {
          right: 0;
          background: linear-gradient(to left, rgba(6,6,18,0.9), transparent);
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 12px;
          width: max-content;
          animation: marqueeLeftToRight 25s linear infinite;
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
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 6px 14px;
          border-radius: 20px;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .floating-tech-pill:hover {
          color: #f8fafc;
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.2);
          transform: translateY(-2px);
        }
        .tech-icon {
          color: var(--accent, #6366f1);
          font-size: 13px;
        }

        .section-header-centered {
          text-align: center;
          margin-top: 60px;
          margin-bottom: 50px;
        }

        .stats-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--accent, #6366f1);
          letter-spacing: 0.2em;
          display: block;
          margin-bottom: 10px;
        }

        .section-header-centered .section-title {
          font-size: clamp(1.8rem, 4.5vw, 2.5rem);
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #10b981;
          font-weight: 700;
          letter-spacing: 0.1em;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          padding: 4px 12px;
          border-radius: 20px;
        }
        .live-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-glow 2s infinite;
        }

        /* Pill List */
        .pill-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
        }

        .pill-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(6,6,18,0.7);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 40px;
          padding: 12px 24px;
          backdrop-filter: blur(8px);
          text-decoration: none;
          color: inherit;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
        }
        
        .pill-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 20px color-mix(in srgb, var(--accent) 15%, transparent),
                      0 10px 30px rgba(0,0,0,0.5);
          transform: translateY(-2px) scale(1.01);
        }

        .pill-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pill-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: var(--accent);
          background: rgba(0,0,0,0.2);
        }

        .pill-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pill-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #f8fafc;
        }

        .pill-sync {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: #64748b;
          letter-spacing: 0.05em;
        }

        .pill-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .pill-unavail {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #64748b;
          letter-spacing: 0.05em;
        }

        .pill-primary {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .primary-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          font-weight: 700;
          color: #f8fafc;
          box-shadow: inset 0 0 10px color-mix(in srgb, var(--accent) 20%, transparent);
        }

        .primary-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: #94a3b8;
          letter-spacing: 0.05em;
        }

        .pill-secondary {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 100px;
        }

        .sec-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #cbd5e1;
          font-weight: 600;
          background: rgba(255,255,255,0.03);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .sec-item span:last-child {
          font-size: 8px;
          color: #64748b;
          margin-left: 6px;
        }

        /* Codolio Pill */
        .codolio-pill {
          justify-content: center;
          gap: 16px;
        }
        .codolio-info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 768px) {
          .pill-card {
            flex-direction: column;
            gap: 16px;
            padding: 20px;
            border-radius: 24px;
          }
          .pill-left, .pill-right {
            width: 100%;
            justify-content: space-between;
          }
          .codolio-pill {
            flex-direction: row;
          }
        }
      `}</style>
    </section>
  )
}