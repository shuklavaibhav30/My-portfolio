import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CERTIFICATES = [
  {
    id: 'ml',
    title: 'Machine Learning',
    subtitle: 'Job-Oriented Training Program in Collaboration with AKGEC Ghaziabad',
    issuer: 'CodeSquadz & AppSquadz',
    authority: 'Ajay Kumar Garg Engineering College (AKGEC)',
    credentialId: 'CSAKG9385',
    date: 'July 2024',
    category: 'MACHINE LEARNING',
    badgeText: 'AKGEC COLLABORATION',
    accent: '#e86c60',
    previewImg: '/ML_VAIBHAV.png',
    downloadUrl: '/ML_VAIBHAV.png',
    downloadName: 'Vaibhav_Kumar_Shukla_Machine_Learning_Certificate.png',
    fileType: 'PNG Image',
    fileSize: '452 KB',
    verifyUrl: null,
    skills: ['Machine Learning', 'Python', 'NumPy & Pandas', 'Model Training', 'Supervised Learning', 'Predictive Modeling'],
    description: 'Intensive 6-week engineering training covering supervised & unsupervised learning, statistical analysis, feature engineering, model evaluation, and production-ready ML pipelines.'
  },
  {
    id: 'gfg',
    title: 'Full Stack Developer Bootcamp',
    subtitle: 'Master Frontend to Backend (6-Week Intensive)',
    issuer: 'GeeksforGeeks',
    authority: 'Mr. Sandeep Jain (Founder & CEO)',
    date: 'August 2024',
    category: 'FULL-STACK DEVELOPMENT',
    badgeText: 'INDUSTRY BOOTCAMP',
    accent: '#2f8d46',
    previewImg: '/GFG_VAIBHAV.png',
    downloadUrl: '/GFG_VAIBHAV.pdf',
    downloadName: 'Vaibhav_Shukla_GFG_FullStack_Bootcamp.pdf',
    fileType: 'PDF Document',
    fileSize: '65 KB',
    verifyUrl: 'https://media.geeksforgeeks.org/courses/certificates/83f2ba5b61d0b73ad3912508b311085a.pdf',
    skills: ['Full Stack', 'React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT Auth'],
    description: 'Mastered end-to-end full-stack web architecture covering modern frontend UI/UX, backend microservices, database schemas, secure authentication, and production cloud deployment.'
  },
  {
    id: 'cdac',
    title: 'Cloud Computing Professional',
    subtitle: 'FutureSkills PRIME Bootcamp (MeitY Govt. of India)',
    issuer: 'C-DAC Noida & FutureSkills PRIME',
    authority: 'Ministry of Electronics & IT (MeitY) & NASSCOM',
    credentialId: 'FSP/BCMP/C-DAC/NOI/CC304/2608/1782/344826',
    date: 'September 2024',
    category: 'CLOUD COMPUTING',
    badgeText: 'GOVT OF INDIA ACCREDITED',
    accent: '#1d4ed8',
    previewImg: '/CDAC_VAIBHAV.png',
    downloadUrl: '/CDAC_VAIBHAV.pdf',
    downloadName: 'Vaibhav_Kumaar_Shukla_CDAC_Cloud_Computing.pdf',
    fileType: 'PDF Document',
    fileSize: '760 KB',
    verifyUrl: null,
    skills: ['Cloud Computing', 'Virtualization', 'Infrastructure', 'MeitY / NASSCOM', 'FutureSkills PRIME', 'CDAC'],
    description: 'Conducted by CDAC Noida in collaboration with AKGEC & NIELIT under the Government of India FutureSkills PRIME project. Rigorous training in cloud infrastructure, virtualization, and distributed deployment.'
  }
]

const BADGES = [
  {
    id: 'lc-200',
    title: '200 Days Badge 2026',
    platform: 'LeetCode',
    category: 'STREAK',
    iconUrl: '/leetcode-200.png',
    accent: '#f59e0b',
    date: 'Sep 2026',
    desc: '200+ days consistent daily problem solving milestone on LeetCode.',
    badgeId: '#10817535',
    url: 'https://leetcode.com/u/imvaibhavshukla/'
  },
  {
    id: 'lc-100',
    title: '100 Days Badge 2026',
    platform: 'LeetCode',
    category: 'STREAK',
    iconUrl: '/leetcode-100.png',
    accent: '#38bdf8',
    date: 'Jun 2026',
    desc: 'Century streak solving daily algorithmic and data structure challenges.',
    badgeId: '#10412111',
    url: 'https://leetcode.com/u/imvaibhavshukla/'
  },
  {
    id: 'lc-50',
    title: '50 Days Badge 2026',
    platform: 'LeetCode',
    category: 'STREAK',
    iconUrl: '/leetcode-50.png',
    accent: '#4ade80',
    date: 'Mar 2026',
    desc: 'First major milestone in establishing an unbroken coding discipline.',
    badgeId: '#9882133',
    url: 'https://leetcode.com/u/imvaibhavshukla/'
  },
  {
    id: 'gh-pull-shark',
    title: 'Pull Shark (x3)',
    platform: 'GitHub',
    category: 'OPEN SOURCE',
    iconUrl: '/github-pull-shark.png',
    accent: '#06b6d4',
    date: 'Merged PRs',
    desc: 'Merged pull requests into collaborative codebases & open-source projects.',
    badgeId: '@shuklavaibhav30',
    url: 'https://github.com/shuklavaibhav30?tab=achievements'
  },
  {
    id: 'hr-cpp',
    title: 'C++ (CPP) ★ Badge',
    platform: 'HackerRank',
    category: 'LANGUAGE',
    accent: '#fca582',
    date: '1 Star Verified',
    desc: 'Demonstrated proficiency in C++ language fundamentals, STL, and object-oriented logic.',
    badgeId: 'C++ Track',
    url: 'https://www.hackerrank.com/profile/shuklavaibhav30',
    customType: 'hackerrank-cpp'
  }
]

export default function Certificates({ isMobile }) {
  const [activeModalCert, setActiveModalCert] = useState(null)

  return (
    <section id="certificates" className="certs-section">
      <div className="certs-container">
        
        {/* Section Header */}
        <div className="certs-header">
          <div className="certs-eyebrow">
            <span className="certs-pulse-dot" />
            <span>[ VERIFIED CREDENTIALS & ACHIEVEMENTS ]</span>
          </div>

          <h2 className="certs-title">
            Certifications & <span className="certs-title-accent">Platform Badges</span>
          </h2>

          <p className="certs-subtitle">
            Industry-recognized bootcamp diplomas, government skilling initiatives, and competitive milestones across LeetCode, GitHub, and HackerRank.
          </p>
        </div>

        {/* 1. DIPLOMA DOSSIER SHOWCASE (Redesigned Editorial Slates) */}
        <div className="certs-block">
          <div className="certs-subhead">
            <div className="certs-subhead-title">
              <span className="subhead-icon">📜</span>
              <h3>Featured Certifications</h3>
            </div>
            <span className="certs-subhead-tag">3 VERIFIED DIPLOMAS</span>
          </div>

          <div className="certs-slates-list">
            {CERTIFICATES.map((cert, idx) => {
              const isEven = idx % 2 === 1
              return (
                <div 
                  key={cert.id} 
                  className={`cert-slate ${isEven ? 'cert-slate-reverse' : ''}`}
                >
                  {/* Top Bar on Card */}
                  <div className="cert-slate-topbar">
                    <div className="cert-slate-badge-group">
                      <span className="cert-slate-cat-pill" style={{ borderColor: cert.accent, color: cert.accent }}>
                        {cert.category}
                      </span>
                      <span className="cert-slate-type-tag">
                        [ {cert.badgeText} ]
                      </span>
                    </div>
                    <span className="cert-slate-date-tag">
                      📅 {cert.date}
                    </span>
                  </div>

                  {/* Main Slate Body */}
                  <div className="cert-slate-body">
                    {/* Visual Certificate Frame */}
                    <div 
                      className="cert-frame-wrapper"
                      onClick={() => setActiveModalCert(cert)}
                      title="Click to inspect certificate in high resolution"
                    >
                      <div className="cert-frame-matting">
                        <img 
                          src={cert.previewImg} 
                          alt={cert.title} 
                          className="cert-frame-img"
                          loading="eager"
                        />
                        <div className="cert-frame-overlay">
                          <span className="cert-frame-inspect-chip">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              <line x1="11" y1="8" x2="11" y2="14"></line>
                              <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                            CLICK TO ZOOM
                          </span>
                        </div>
                        {/* Certificate Verified Seal Ribbon */}
                        <div className="cert-seal-ribbon">
                          <span className="seal-star">★</span> VERIFIED
                        </div>
                      </div>
                    </div>

                    {/* Metadata & Actions Column */}
                    <div className="cert-slate-content">
                      <div className="cert-slate-titles">
                        <h4 className="cert-slate-title">{cert.title}</h4>
                        <p className="cert-slate-subtitle">{cert.subtitle}</p>
                      </div>

                      {/* Technical Spec Box */}
                      <div className="cert-slate-specbox">
                        <div className="cert-spec-row">
                          <span className="cert-spec-label">ISSUING BODY</span>
                          <span className="cert-spec-value">{cert.issuer}</span>
                        </div>
                        <div className="cert-spec-row">
                          <span className="cert-spec-label">AUTHORITY</span>
                          <span className="cert-spec-value">{cert.authority}</span>
                        </div>
                        {cert.credentialId && (
                          <div className="cert-spec-row">
                            <span className="cert-spec-label">CREDENTIAL REF</span>
                            <span className="cert-spec-value monospace-value">{cert.credentialId}</span>
                          </div>
                        )}
                        <div className="cert-spec-row">
                          <span className="cert-spec-label">DOCUMENT</span>
                          <span className="cert-spec-value">{cert.fileType} • {cert.fileSize}</span>
                        </div>
                      </div>

                      <p className="cert-slate-desc">{cert.description}</p>

                      {/* Tags */}
                      <div className="cert-slate-tags">
                        {cert.skills.map(s => (
                          <span key={s} className="cert-slate-tag">#{s}</span>
                        ))}
                      </div>

                      {/* Actions Row */}
                      <div className="cert-slate-actions">
                        <a
                          href={cert.downloadUrl}
                          download={cert.downloadName}
                          className="cert-btn-primary-download"
                          title={`Download ${cert.downloadName}`}
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                          <span>DOWNLOAD {cert.fileType.includes('PDF') ? 'PDF' : 'PNG'}</span>
                        </a>

                        {cert.verifyUrl ? (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="cert-btn-secondary-action"
                            title="Verify directly at GeeksforGeeks"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15 3 21 3 21 9"/>
                              <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            <span>VERIFY ONLINE</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveModalCert(cert)}
                            className="cert-btn-secondary-action"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <span>PREVIEW FULL</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 2. PLATFORM BADGES & ACHIEVEMENTS */}
        <div className="certs-block" style={{ marginTop: '72px' }}>
          <div className="certs-subhead">
            <div className="certs-subhead-title">
              <span className="subhead-icon">🏆</span>
              <h3>Platform Badges & Honors</h3>
            </div>
            <span className="certs-subhead-tag">GITHUB • LEETCODE • HACKERRANK</span>
          </div>

          <div className="badges-grid">
            {BADGES.map((b) => (
              <a
                key={b.id}
                href={b.url}
                target="_blank"
                rel="noreferrer"
                className="badge-card"
              >
                <div className="badge-card-glow" style={{ background: b.accent }} />
                
                <div className="badge-top-row">
                  <span className="badge-platform-tag" style={{ borderColor: b.accent, color: b.accent }}>
                    {b.platform}
                  </span>
                  <span className="badge-date-tag">{b.date}</span>
                </div>

                {/* Badge Icon / Artwork */}
                <div className="badge-art-frame">
                  {b.iconUrl ? (
                    <img 
                      src={b.iconUrl} 
                      alt={b.title} 
                      className="badge-art-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}

                  {b.customType === 'hackerrank-cpp' && (
                    <div className="badge-custom-hr-cpp">
                      <svg viewBox="0 0 100 110" width="76" height="84">
                        <polygon 
                          points="50 5, 93 28, 93 82, 50 105, 7 82, 7 28" 
                          fill="#fca582" 
                          stroke="#f87171" 
                          strokeWidth="2.5" 
                        />
                        <text x="50" y="47" fill="#232b35" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="21" textAnchor="middle">C++</text>
                        <text x="50" y="67" fill="#2d3748" fontFamily="'JetBrains Mono', monospace" fontWeight="800" fontSize="11" letterSpacing="0.08em" textAnchor="middle">CPP</text>
                        <text x="50" y="87" fill="#232b35" fontSize="15" textAnchor="middle">★</text>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Badge Text */}
                <div className="badge-content">
                  <h5 className="badge-title">{b.title}</h5>
                  <p className="badge-desc">{b.desc}</p>
                  <div className="badge-footer">
                    <span className="badge-id-pill">{b.badgeId}</span>
                    <span className="badge-external-link">
                      VIEW ↗
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 3. LIGHTBOX MODAL FOR CERTIFICATE ZOOM */}
        <AnimatePresence>
          {activeModalCert && (
            <motion.div
              className="cert-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalCert(null)}
            >
              <motion.div
                className="cert-modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="cert-modal-header">
                  <div>
                    <h3 className="cert-modal-title">{activeModalCert.title}</h3>
                    <p className="cert-modal-sub">{activeModalCert.issuer} • {activeModalCert.date}</p>
                  </div>
                  <button
                    className="cert-modal-close"
                    onClick={() => setActiveModalCert(null)}
                    title="Close preview (Esc)"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Image View */}
                <div className="cert-modal-img-container">
                  <img
                    src={activeModalCert.previewImg}
                    alt={activeModalCert.title}
                    className="cert-modal-img"
                  />
                </div>

                {/* Modal Footer with Actions */}
                <div className="cert-modal-footer">
                  <div className="cert-modal-meta">
                    <span className="cert-modal-type">{activeModalCert.fileType}</span>
                    <span className="cert-modal-size">Size: {activeModalCert.fileSize}</span>
                  </div>

                  <div className="cert-modal-buttons">
                    <a
                      href={activeModalCert.downloadUrl}
                      download={activeModalCert.downloadName}
                      className="cert-modal-btn-download"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      DOWNLOAD {activeModalCert.fileType.includes('PDF') ? 'PDF' : 'PNG'}
                    </a>

                    {activeModalCert.verifyUrl && (
                      <a
                        href={activeModalCert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="cert-modal-btn-verify"
                      >
                        VERIFY CREDENTIAL ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* COMPONENT STYLES */}
      <style>{`
        .certs-section {
          background: transparent;
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
        }

        .certs-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .certs-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .certs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-card);
          border: 2px solid var(--border);
          box-shadow: var(--shadow-sm);
          padding: 5px 14px;
          border-radius: 9999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: 0.12em;
          margin-bottom: 16px;
        }

        .certs-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.4);
          animation: certPulse 2s infinite;
        }

        @keyframes certPulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }

        .certs-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4vw, 44px);
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }

        .certs-title-accent {
          color: var(--accent);
          position: relative;
          display: inline-block;
        }

        .certs-subtitle {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          color: var(--text-muted);
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Subhead */
        .certs-subhead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid var(--border);
          padding-bottom: 14px;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .certs-subhead-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .subhead-icon {
          font-size: 20px;
        }

        .certs-subhead-title h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--text-main);
          margin: 0;
        }

        .certs-subhead-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--text-faint);
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          padding: 4px 10px;
          border-radius: 6px;
          box-shadow: var(--shadow-sm);
        }

        /* 1. REDESIGNED CERTIFICATE DOSSIER SLATES */
        .certs-slates-list {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .cert-slate {
          background: var(--bg-card);
          border: var(--border-width) solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow);
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-slate:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .cert-slate-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          background: var(--bg-subtle);
          border-bottom: 2px solid var(--border);
          flex-wrap: wrap;
          gap: 10px;
        }

        .cert-slate-badge-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .cert-slate-cat-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 3px 9px;
          background: var(--bg-card);
          border: 1.5px solid currentColor;
          border-radius: 6px;
        }

        .cert-slate-type-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          color: var(--text-faint);
          letter-spacing: 0.06em;
        }

        .cert-slate-date-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
        }

        /* Slate Body (Two-Column Layout) */
        .cert-slate-body {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 28px;
          padding: 24px;
          align-items: center;
        }

        /* Alternating reverse */
        .cert-slate-reverse .cert-slate-body {
          grid-template-columns: 1fr 1.15fr;
        }
        .cert-slate-reverse .cert-frame-wrapper {
          order: 2;
        }
        .cert-slate-reverse .cert-slate-content {
          order: 1;
        }

        @media (max-width: 900px) {
          .cert-slate-body,
          .cert-slate-reverse .cert-slate-body {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .cert-slate-reverse .cert-frame-wrapper {
            order: 1;
          }
          .cert-slate-reverse .cert-slate-content {
            order: 2;
          }
        }

        /* Certificate Frame (Matting + Realism) */
        .cert-frame-wrapper {
          position: relative;
          cursor: pointer;
          background: var(--bg-card-alt);
          border: 2px solid var(--border);
          border-radius: 12px;
          padding: 10px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s ease;
        }

        .cert-frame-wrapper:hover {
          transform: scale(1.015);
        }

        .cert-frame-matting {
          position: relative;
          width: 100%;
          aspect-ratio: 1.4 / 1;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          border: 1.5px solid var(--border);
        }

        .cert-frame-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.3s ease;
        }

        .cert-frame-wrapper:hover .cert-frame-img {
          transform: scale(1.03);
        }

        .cert-frame-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .cert-frame-wrapper:hover .cert-frame-overlay {
          opacity: 1;
        }

        .cert-frame-inspect-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-card);
          color: var(--text-main);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 800;
          padding: 7px 14px;
          border-radius: 8px;
          border: 2px solid var(--border);
          box-shadow: 3px 3px 0px var(--border);
        }

        .cert-seal-ribbon {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #f59e0b;
          color: #1c1c1c;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 900;
          padding: 4px 9px;
          border-radius: 6px;
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 2;
        }

        .seal-star {
          font-size: 12px;
        }

        /* Content side */
        .cert-slate-content {
          display: flex;
          flex-direction: column;
        }

        .cert-slate-titles {
          margin-bottom: 14px;
        }

        .cert-slate-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(20px, 2.5vw, 25px);
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.25;
          margin-bottom: 4px;
        }

        .cert-slate-subtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Spec box */
        .cert-slate-specbox {
          background: var(--bg-card-alt);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cert-spec-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12px;
        }

        .cert-spec-label {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          color: var(--text-faint);
          font-size: 10px;
          min-width: 100px;
          flex-shrink: 0;
          letter-spacing: 0.04em;
        }

        .cert-spec-value {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.35;
        }

        .monospace-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          word-break: break-all;
        }

        .cert-slate-desc {
          font-size: 13.5px;
          color: var(--text-body);
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .cert-slate-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .cert-slate-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 700;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          color: var(--text-muted);
          padding: 2.5px 8px;
          border-radius: 5px;
        }

        /* Buttons Row */
        .cert-slate-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cert-btn-primary-download {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 800;
          padding: 10px 18px;
          border-radius: 8px;
          border: 2px solid var(--border);
          box-shadow: 3px 3px 0px var(--border);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-btn-primary-download:hover {
          transform: translate(-1.5px, -1.5px);
          box-shadow: 4.5px 4.5px 0px var(--border);
          filter: brightness(1.06);
        }

        .cert-btn-primary-download:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0px var(--border);
        }

        .cert-btn-secondary-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-card);
          color: var(--text-main);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          font-weight: 800;
          padding: 10px 16px;
          border-radius: 8px;
          border: 2px solid var(--border);
          box-shadow: 3px 3px 0px var(--border);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .cert-btn-secondary-action:hover {
          transform: translate(-1.5px, -1.5px);
          box-shadow: 4.5px 4.5px 0px var(--border);
          background: var(--bg-subtle);
        }

        .cert-btn-secondary-action:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0px var(--border);
        }

        /* 2. PLATFORM BADGES GRID (Balanced 5-Item Centered Layout) */
        .badges-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .badge-card {
          position: relative;
          background: var(--bg-card);
          border: var(--border-width) solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow);
          padding: 18px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          width: calc(33.333% - 14px);
          min-width: 280px;
          max-width: 380px;
          box-sizing: border-box;
        }

        @media (max-width: 960px) {
          .badge-card {
            width: calc(50% - 10px);
            max-width: none;
          }
        }

        @media (max-width: 620px) {
          .badge-card {
            width: 100%;
          }
        }

        .badge-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border);
        }

        .badge-card-glow {
          position: absolute;
          top: -24px;
          right: -24px;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          opacity: 0.15;
          filter: blur(20px);
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .badge-card:hover .badge-card-glow {
          opacity: 0.3;
        }

        .badge-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .badge-platform-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 2.5px 7px;
          border-radius: 5px;
          border: 1.5px solid currentColor;
          background: var(--bg-subtle);
        }

        .badge-date-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          color: var(--text-faint);
        }

        .badge-art-frame {
          width: 100%;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card-alt);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          margin-bottom: 14px;
          padding: 10px;
          transition: transform 0.25s ease;
        }

        .badge-card:hover .badge-art-frame {
          transform: scale(1.03);
        }

        .badge-art-img {
          max-height: 85px;
          max-width: 85px;
          object-fit: contain;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));
        }

        .badge-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .badge-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .badge-desc {
          font-size: 12px;
          color: var(--text-body);
          line-height: 1.45;
          margin-bottom: 12px;
          flex: 1;
        }

        .badge-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px dashed var(--border);
          padding-top: 10px;
          margin-top: auto;
        }

        .badge-id-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          color: var(--text-faint);
        }

        .badge-external-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          color: var(--accent);
          transition: transform 0.15s ease;
        }

        .badge-card:hover .badge-external-link {
          transform: translateX(2px);
        }

        /* 3. LIGHTBOX MODAL */
        .cert-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 15, 12, 0.78);
          backdrop-filter: blur(8px);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .cert-modal-content {
          background: var(--bg-card);
          border: 3px solid var(--border);
          box-shadow: 8px 8px 0px var(--border);
          border-radius: 18px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .cert-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          border-bottom: 2px solid var(--border);
          background: var(--bg-subtle);
        }

        .cert-modal-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 4px;
        }

        .cert-modal-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .cert-modal-close {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 2px solid var(--border);
          background: var(--bg-card);
          color: var(--text-main);
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 2px 2px 0px var(--border);
          transition: all 0.15s ease;
        }

        .cert-modal-close:hover {
          background: var(--accent);
          color: #ffffff;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px var(--border);
        }

        .cert-modal-img-container {
          padding: 20px;
          background: #0f172a;
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          max-height: 62vh;
        }

        .cert-modal-img {
          max-width: 100%;
          max-height: 60vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }

        .cert-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-top: 2px solid var(--border);
          background: var(--bg-subtle);
          flex-wrap: wrap;
          gap: 12px;
        }

        .cert-modal-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .cert-modal-type {
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          padding: 3px 8px;
          border-radius: 5px;
          color: var(--text-main);
        }

        .cert-modal-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cert-modal-btn-download {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 800;
          padding: 10px 18px;
          border-radius: 8px;
          border: 2px solid var(--border);
          box-shadow: 3px 3px 0px var(--border);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .cert-modal-btn-download:hover {
          transform: translate(-1.5px, -1.5px);
          box-shadow: 4.5px 4.5px 0px var(--border);
        }

        .cert-modal-btn-verify {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-card);
          color: var(--text-main);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          font-weight: 800;
          padding: 10px 16px;
          border-radius: 8px;
          border: 2px solid var(--border);
          box-shadow: 3px 3px 0px var(--border);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .cert-modal-btn-verify:hover {
          background: var(--bg-subtle);
          transform: translate(-1.5px, -1.5px);
          box-shadow: 4.5px 4.5px 0px var(--border);
        }
      `}</style>
    </section>
  )
}
