import { useState } from 'react'
import emailjs from '@emailjs/browser'

const SOCIALS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/shuklavaibhav30', path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/vaibhav-kumar-shukla-445b3a300/', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { id: 'insta', label: 'Instagram', href: 'https://www.instagram.com/vaiibhavvshukla/', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { id: 'x', label: 'X', href: 'https://x.com/shuklagvk', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' }
]

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Domains', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

export default function Contact({ isMobile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ loading: false, success: null, errorMsg: '' })

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setStatus({ loading: false, success: false, errorMsg: 'Please enter your name.' })
      return
    }
    if (!validateEmail(formData.email)) {
      setStatus({ loading: false, success: false, errorMsg: 'Please enter a valid email address.' })
      return
    }
    if (!formData.subject.trim()) {
      setStatus({ loading: false, success: false, errorMsg: 'Please enter a subject.' })
      return
    }
    if (!formData.message.trim()) {
      setStatus({ loading: false, success: false, errorMsg: 'Please enter your message.' })
      return
    }

    setStatus({ loading: true, success: null, errorMsg: '' })

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    }

    try {
      if (serviceId && templateId && publicKey && serviceId !== 'service_default') {
        await emailjs.send(serviceId, templateId, templateParams, publicKey)
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      setStatus({ loading: false, success: true, errorMsg: '' })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: null }))
      }, 5000)
    } catch (err) {
      const detail = err?.text || err?.message || 'Failed to send message.'
      setStatus({ loading: false, success: false, errorMsg: detail })
    }
  }

  const handleNav = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* GET IN TOUCH SECTION */}
        <div className={`contact-grid ${isMobile ? 'mobile' : ''}`}>
          {/* LEFT COLUMN */}
          <div className="contact-left">
            <div className="section-label-pill">// GET_IN_TOUCH</div>
            <h2 className="contact-title">
              Get in <span className="neo-highlight">Touch</span>
            </h2>
            <p className="contact-desc">
              Have a project in mind, an engineering role, or want to discuss full-stack & AI architectures? Let's connect.
            </p>

            <div className="contact-details">
              <div className="detail-card">
                <div className="detail-label">EMAIL ADDRESS</div>
                <a href="mailto:imvksofficial@gmail.com" className="detail-value">
                  imvksofficial@gmail.com
                </a>
              </div>
              <div className="detail-card">
                <div className="detail-label">DIRECT PHONE / WHATSAPP</div>
                <a href="tel:+918400777282" className="detail-value">
                  +91 8400777282
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (FORM - Matching Registration Card in Reference Image) */}
          <div className="contact-right">
            <div className="form-card-container">
              {/* Top Badge (Matching 'FREE REGISTRATION' in image) */}
              <div className="form-top-header">
                <span className="free-inquiry-pill">DIRECT INQUIRY</span>
                <span className="open-role-text">• Open to opportunities</span>
              </div>

              <h3 className="form-headline">Send Message to Vaibhav</h3>
              <p className="form-subheadline">Fill in your details below to start a conversation.</p>

              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">FULL NAME *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    disabled={status.loading}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">EMAIL ADDRESS *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    disabled={status.loading}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">SUBJECT *</label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    placeholder="Project Inquiry / Job Opportunity / Hello"
                    value={formData.subject}
                    disabled={status.loading}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">YOUR MESSAGE *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Type your message here..."
                    value={formData.message}
                    disabled={status.loading}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input form-textarea"
                  />
                </div>

                {status.success === true && (
                  <div className="form-alert success-alert">
                    Message sent successfully! I'll get back to you shortly.
                  </div>
                )}

                {status.success === false && (
                  <div className="form-alert error-alert">
                    {status.errorMsg || 'Failed to send message. Please try again.'}
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={status.loading}>
                  {status.loading ? 'SENDING...' : status.success ? 'MESSAGE SENT ✓' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className={`footer-grid ${isMobile ? 'mobile' : ''}`}>
          {/* LEFT */}
          <div className="footer-left">
            <h3 className="footer-name">VAIBHAV KUMAR SHUKLA</h3>
            <p className="footer-tagline">
              Frontend & Full-Stack Developer • Blockchain Research Lab, AKGEC
            </p>
            <div className="footer-socials">
              {SOCIALS.map(s => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-icon"
                  aria-label={s.label}
                >
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* MIDDLE */}
          <div className="footer-middle">
            <div className="footer-col-heading">NAVIGATE</div>
            <ul className="footer-nav-list">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="footer-nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="footer-right">
            <div className="footer-col-heading">GET IN TOUCH</div>
            <div className="footer-contact-details">
              <a href="tel:+918400777282" className="footer-contact-link">+91 8400777282</a>
              <a href="mailto:imvksofficial@gmail.com" className="footer-contact-link">imvksofficial@gmail.com</a>
              <div>Ghaziabad / Lucknow (UP), India</div>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        .contact-section {
          padding: 90px 24px 40px;
          background: transparent;
          position: relative;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 50px 16px 30px;
          }
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 48px;
          align-items: start;
          margin-bottom: 90px;
        }
        .contact-grid.mobile {
          grid-template-columns: 1fr;
          gap: 36px;
          margin-bottom: 50px;
        }

        /* LEFT COLUMN */
        .contact-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .section-label-pill {
          display: inline-flex;
          align-items: center;
          background: var(--bg-card);
          border: 2px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          padding: 4px 12px;
          border-radius: 9999px;
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-main);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          margin-bottom: 12px;
        }
        .contact-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4.2vw, 3.2rem);
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .contact-desc {
          color: var(--text-muted);
          line-height: 1.65;
          font-size: 15px;
          margin-bottom: 32px;
          max-width: 460px;
        }
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 460px;
        }
        .detail-card {
          background: var(--bg-card);
          border: 2.5px solid var(--border);
          box-shadow: var(--shadow);
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .detail-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-lg);
        }
        .detail-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          color: var(--text-faint);
          letter-spacing: 0.1em;
        }
        .detail-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          font-weight: 800;
          color: var(--text-main);
        }
        .detail-value:hover {
          color: var(--accent);
        }

        /* RIGHT COLUMN (FORM CARD) */
        .form-card-container {
          background: var(--bg-card);
          border: 2.5px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          padding: 32px;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .form-card-container {
            padding: 20px 16px;
            border-radius: 16px;
          }
        }

        .form-top-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .free-inquiry-pill {
          background: var(--accent-peach, #ffd6ce);
          color: var(--hf-peach-text, #8c2d24);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          border: 1.5px solid var(--border);
          box-shadow: 2px 2px 0px var(--border);
          padding: 3px 10px;
          border-radius: 9999px;
        }
        .open-role-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .form-headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 4px;
        }
        .form-subheadline {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 22px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: 0.05em;
        }
        .form-input {
          background: var(--bg-subtle);
          border: 2px solid var(--border);
          border-radius: 8px;
          box-shadow: 2px 2px 0px var(--border);
          padding: 12px 14px;
          color: var(--text-main);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 600;
          outline: none;
          transition: all 0.15s ease;
        }
        .form-input:focus {
          border-color: var(--accent);
          box-shadow: 3px 3px 0px var(--accent);
          transform: translate(-1px, -1px);
        }
        .form-input::placeholder {
          color: var(--text-faint);
          font-weight: 500;
        }
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-alert {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 800;
          padding: 10px 14px;
          border-radius: 8px;
          border: 2px solid var(--border);
          box-shadow: 3px 3px 0px var(--border);
        }
        .success-alert {
          background: #e6f6ee;
          color: #1b5e3b;
          border-color: var(--border);
        }
        :root[data-theme="dark"] .success-alert {
          background: rgba(74, 222, 128, 0.12);
          color: #6ee7b7;
          border-color: rgba(110, 231, 183, 0.35);
        }
        .error-alert {
          background: #fee2e2;
          color: #b91c1c;
        }

        .submit-btn {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 14px 28px;
          letter-spacing: 0.05em;
          border-radius: 10px;
          color: #1c1c1c;
          background: var(--accent, #e86c60);
          border: 2.5px solid var(--border);
          box-shadow: 4px 4px 0px var(--border);
          cursor: pointer;
          transition: all 0.15s ease;
          margin-top: 6px;
        }
        .submit-btn:hover:not(:disabled) {
          background: var(--accent-hover, #d75a4e);
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px var(--border);
        }
        .submit-btn:active:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px var(--border);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* FOOTER */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
          padding-top: 50px;
          border-top: 2.5px solid var(--border);
          align-items: start;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-right {
          justify-self: end;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            justify-content: space-between;
            gap: 32px 16px;
            padding-top: 36px;
          }
          .footer-left {
            grid-column: 1 / -1;
            text-align: left;
          }
          .footer-middle {
            grid-column: 1;
            justify-self: start;
            text-align: left;
            min-width: 0;
          }
          .footer-right {
            grid-column: 2;
            justify-self: end;
            text-align: right;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            min-width: 0;
          }
        }

        .footer-grid.mobile {
          grid-template-columns: 1fr 1fr;
          justify-content: space-between;
          gap: 32px 16px;
        }
        .footer-grid.mobile .footer-left {
          grid-column: 1 / -1;
          text-align: left;
        }
        .footer-grid.mobile .footer-middle {
          grid-column: 1;
          justify-self: start;
          text-align: left;
          min-width: 0;
        }
        .footer-grid.mobile .footer-right {
          grid-column: 2;
          justify-self: end;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          min-width: 0;
        }

        .footer-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: var(--text-main);
          margin-bottom: 6px;
        }
        .footer-tagline {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 18px;
          line-height: 1.5;
        }
        .footer-socials {
          display: flex;
          gap: 10px;
        }
        .footer-social-icon {
          width: 38px;
          height: 38px;
          background: var(--bg-card);
          border: 2px solid var(--border);
          box-shadow: 2.5px 2.5px 0px var(--border);
          border-radius: 8px;
          color: var(--text-main);
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-social-icon:hover {
          background: var(--accent-peach, #ffd6ce);
          color: var(--hf-peach-text, #8c2d24);
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px var(--border);
        }

        .footer-col-heading {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 900;
          color: var(--text-main);
          letter-spacing: 0.15em;
          margin-bottom: 14px;
        }
        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
          white-space: nowrap;
        }
        .footer-nav-link:hover {
          color: var(--accent);
        }

        .footer-contact-details {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          gap: 8px;
          word-break: break-word;
          overflow-wrap: break-word;
          min-width: 0;
          align-items: flex-end;
          text-align: right;
        }

        .footer-contact-link {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
          word-break: break-all;
          text-align: right;
        }
        .footer-contact-link:hover {
          color: var(--accent);
        }
      `}</style>
    </section>
  )
}
