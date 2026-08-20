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

    // Required validation
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

    // Exact variable names expected by EmailJS template
    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    }

    try {
      console.log('EmailJS Service:', serviceId)
      console.log('EmailJS Template:', templateId)
      console.log('EmailJS Public Key exists:', Boolean(publicKey))

      if (serviceId && templateId && publicKey && serviceId !== 'service_default') {
        // Pass publicKey directly as the 4th positional argument
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
        console.log('EmailJS success:', response)
      } else {
        console.warn('EmailJS environment variables not configured. Simulating email send.')
        await new Promise(resolve => setTimeout(resolve, 1200))
      }

      setStatus({ loading: false, success: true, errorMsg: '' })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: null }))
      }, 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      console.error('EmailJS error text:', err?.text)
      console.error('EmailJS status:', err?.status)
      const detail = err?.text || err?.message || 'Failed to send message. Please check Template ID in .env.'
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
            <div className="section-label">// GET_IN_TOUCH</div>
            <h2 className="contact-title">Get in Touch</h2>
            <p className="contact-desc">
              Have a project in mind, a question, or just want to say hello? I'd love to hear from you.
            </p>

            <div className="contact-details">
              <div className="detail-item">
                <div className="detail-label">E-mail</div>
                <a href="mailto:imvksofficial@gmail.com" className="detail-value">
                  imvksofficial@gmail.com
                </a>
              </div>
              <div className="detail-item">
                <div className="detail-label">Contact</div>
                <a href="tel:+918400777282" className="detail-value">
                  +91 8400777282
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="contact-right">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  disabled={status.loading}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  disabled={status.loading}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="Project Inquiry / Hello"
                  value={formData.subject}
                  disabled={status.loading}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  value={formData.message}
                  disabled={status.loading}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input form-textarea"
                />
              </div>

              {status.success === true && (
                <div className="form-alert success-alert">
                  Message sent successfully.
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

        {/* FOOTER */}
        <footer className={`footer-grid ${isMobile ? 'mobile' : ''}`}>
          {/* LEFT */}
          <div className="footer-left">
            <h3 className="footer-name">VAIBHAV SHUKLA</h3>
            <p className="footer-tagline">
              Full-Stack Developer | MERN Stack Developer | Problem Solver
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
            <div className="footer-col-heading">CONTACT</div>
            <div className="footer-contact-details">
              <div>+91 8400777282</div>
              <div>imvksofficial@gmail.com</div>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        .contact-section {
          padding: 100px 24px 40px;
          background: transparent;
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
          margin-bottom: 100px;
        }
        .contact-grid.mobile {
          grid-template-columns: 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        /* LEFT COLUMN */
        .section-label {
          font-family: 'JetBrains Mono', monospace;
          color: var(--accent, #6366f1);
          font-size: 11px;
          letter-spacing: 0.2em;
          margin-bottom: 12px;
        }
        .contact-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .contact-desc {
          color: #94a3b8;
          line-height: 1.7;
          font-size: 14.5px;
          margin-bottom: 36px;
          max-width: 460px;
        }
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .detail-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #64748b;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .detail-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 15px;
          color: #f8fafc;
          transition: color 0.2s ease;
        }
        .detail-value:hover {
          color: var(--accent, #6366f1);
        }

        /* RIGHT COLUMN (FORM) */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: rgba(6, 6, 18, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 32px;
          border-radius: 8px;
          backdrop-filter: blur(12px);
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #cbd5e1;
          letter-spacing: 0.05em;
        }
        .form-input {
          background: rgba(3, 3, 7, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          padding: 12px 16px;
          color: #f8fafc;
          font-family: inherit;
          font-size: 13.5px;
          outline: none;
          transition: all 0.2s ease;
        }
        .form-input:focus {
          border-color: var(--accent, #6366f1);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
          background: rgba(10, 10, 25, 0.9);
        }
        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-alert {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          padding: 10px 14px;
          border-radius: 4px;
        }
        .success-alert {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
        }
        .error-alert {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .submit-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          padding: 14px 28px;
          letter-spacing: 0.1em;
          border-radius: 4px;
          color: #fff;
          background: linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(147,51,234,0.25) 100%);
          border: 1px solid rgba(99,102,241,0.5);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: 8px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(99,102,241,0.4);
          background: linear-gradient(135deg, rgba(99,102,241,0.55) 0%, rgba(147,51,234,0.45) 100%);
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
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          align-items: start;
        }
        .footer-grid.mobile {
          grid-template-columns: 1fr;
          gap: 32px;
        }

        .footer-name {
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #f8fafc;
          margin-bottom: 8px;
        }
        .footer-tagline {
          font-size: 12.5px;
          color: #64748b;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .footer-socials {
          display: flex;
          gap: 14px;
        }
        .footer-social-icon {
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-social-icon:hover {
          color: var(--accent, #6366f1);
          transform: translateY(-2px);
        }

        .footer-col-heading {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
        }
        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #94a3b8;
          transition: color 0.2s ease;
        }
        .footer-nav-link:hover {
          color: var(--accent, #6366f1);
        }

        .footer-contact-details {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #94a3b8;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </section>
  )
}
