export function BrandLogo({ id, size = 16, className = '' }) {
  const normId = (id || '').toLowerCase().replace(/[\s\.\-\+\/]/g, '');

  switch (normId) {
    case 'react':
    case 'reactjs':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" width={size} height={size} className={className} aria-label="React">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );

    case 'node':
    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="Node.js">
          <path fill="#5FA04E" d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z"/>
          <path fill="#ffffff" d="M12 6.5l5.5 3.2v6.4L12 19.3l-5.5-3.2V9.7L12 6.5zm-2.8 5.7v3.5h1.6v-2.3l2.2 2.3h1.8v-4.5h-1.6v2.3l-2.2-2.3H9.2z"/>
        </svg>
      );

    case 'express':
    case 'expressjs':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="Express.js" fill="currentColor">
          <path d="M24 18.579h-3.475l-4.223-5.592-4.223 5.592H8.604l5.96-7.897L8.857 3.421h3.475l3.97 5.255 3.97-5.255H23.75l-5.707 7.261zM4.747 18.579H1.272l5.96-7.897L1.525 3.421H5l3.97 5.255-1.985 2.628z"/>
        </svg>
      );

    case 'mongodb':
    case 'mongo':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="MongoDB">
          <path fill="#47A248" d="M17.193 9.555c-1.233-4.321-4.224-7.464-4.792-8.06a.715.715 0 0 0-.802-.172c-.172.073-.284.24-.284.428v.025c-.01.59-.138 2.08-.85 3.896-.827 2.115-2.222 4.417-3.414 7.228-1.529 3.604-.842 7.03 1.708 8.878 2.551 1.849 5.867 1.05 7.37-.215 1.503-1.266 2.302-3.805 1.064-8.02v-.004zm-5.19 12.002c-3.155.088-5.32-2.148-5.32-5.485 0-3.033 1.727-5.83 3.125-8.1 1.25-2.03 2.15-4.22 2.22-5.83.05.95.42 2.62 1.34 4.54 1.15 2.41 2.54 4.67 2.54 7.35 0 3.73-1.89 7.42-3.905 7.525z"/>
        </svg>
      );

    case 'javascript':
    case 'js':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="JavaScript">
          <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
          <path fill="#000000" d="M7.5 17.5c.8.5 1.7.8 2.6.8 1.4 0 2.2-.7 2.2-2.1v-5.8H10v5.8c0 .5-.3.8-.8.8-.5 0-.9-.2-1.2-.4l-.5 1zm8.3-7.1c-1.3 0-2.3.8-2.3 2.1 0 1.2.8 1.8 2 2.2l.6.2c.7.2 1 .5 1 .9 0 .5-.4.8-1.1.8-.7 0-1.4-.3-1.9-.7l-.5 1.1c.6.5 1.5.8 2.3.8 1.5 0 2.5-.8 2.5-2.2 0-1.1-.7-1.8-1.9-2.2l-.6-.2c-.6-.2-.9-.4-.9-.8 0-.4.3-.7.9-.7.6 0 1.2.2 1.6.5l.5-1.1c-.6-.5-1.4-.7-2.1-.7z"/>
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="TypeScript">
          <rect width="24" height="24" rx="4" fill="#3178C6"/>
          <path fill="#ffffff" d="M5.5 10.5h6v1.8H9.6v6.2H7.4v-6.2H5.5v-1.8zm8.7 0c1.4 0 2.5.8 2.5 2.1 0 1.2-.8 1.8-2 2.2l-.6.2c-.7.2-1 .5-1 .9 0 .5.4.8 1.1.8.7 0 1.4-.3 1.9-.7l.5 1.2c-.6.5-1.5.8-2.4.8-1.5 0-2.5-.8-2.5-2.2 0-1.1.7-1.8 1.9-2.2l.6-.2c.6-.2.9-.4.9-.8 0-.4-.3-.7-.9-.7-.6 0-1.2.2-1.6.5l-.5-1.2c.6-.5 1.5-.7 2.5-.7z"/>
        </svg>
      );

    case 'tailwind':
    case 'tailwindcss':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="Tailwind CSS">
          <path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"/>
        </svg>
      );

    case 'c':
    case 'cpp':
    case 'cplusplus':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="C++">
          <path fill="#00599C" d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2z"/>
          <path fill="#ffffff" d="M11.5 14.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5c.8 0 1.5.4 1.9 1l1.4-1c-.8-1-2-1.6-3.3-1.6-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5c1.3 0 2.5-.6 3.3-1.6l-1.4-1c-.4.6-1.1 1-1.9 1zm4-3.2v1.4h-1.4v1.4h1.4v1.4h1.4v-1.4h1.4v-1.4h-1.4v-1.4h-1.4zm4.2 0v1.4h-1.4v1.4h1.4v1.4h1.4v-1.4h1.4v-1.4h-1.4v-1.4h-1.4z"/>
        </svg>
      );

    case 'python':
    case 'py':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="Python">
          <path fill="#3776AB" d="M11.9 2c-4.3 0-4 1.9-4 1.9l.01 2h4.1v.6H5.4S2 6.1 2 10.4c0 4.4 3 4.2 3 4.2h1.8v-2.5s-.1-3 3-3h5.1s2.9-.1 2.9-2.9c0-2.8-2.4-4.2-5.9-4.2zm-2.2 1.3c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/>
          <path fill="#FFD438" d="M12.1 22c4.3 0 4-1.9 4-1.9l-.01-2h-4.1v-.6h6.6s3.4.4 3.4-3.9c0-4.4-3-4.2-3-4.2h-1.8v2.5s.1 3-3 3h-5.1s-2.9.1-2.9 2.9c0 2.8 2.4 4.2 5.9 4.2zm2.2-1.3c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/>
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="Git">
          <path fill="#F05032" d="M21.7 10.8l-8.5-8.5c-.7-.7-1.8-.7-2.5 0l-2 2 2.6 2.6c.6-.2 1.4 0 1.9.5.5.5.7 1.3.5 1.9l2.5 2.5c.6-.2 1.4 0 1.9.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.3-.5-1.9l-2.3-2.3v5.1c.2.2.4.4.5.6.7.7.7 1.8 0 2.5s-1.8.7-2.5 0-1.8-.7 0-2.5c.2-.2.4-.4.6-.5v-5.2c-.2-.1-.4-.3-.6-.5-.5-.5-.7-1.3-.5-1.9l-2.6-2.6-6 6c-.7.7-.7 1.8 0 2.5l8.5 8.5c.7.7 1.8.7 2.5 0l8.4-8.5c.7-.7.7-1.8 0-2.5z"/>
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="GitHub" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );

    case 'aws':
    case 'amazonwebservices':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="AWS">
          <path fill="#FF9900" d="M18.8 17.3c-2.4 1.7-5.9 2.6-8.9 2.6-4.2 0-8-1.5-10.9-4.1-.2-.2 0-.5.3-.3 3.1 1.8 6.9 2.9 10.8 2.9 2.7 0 5.8-.7 8.5-2.1.4-.2.7.2.2.9zM19.7 15.6c-.3-.4-2-.1-3-.1-.3 0-.3-.2 0-.4 1.8-1.2 4.6-.8 4.9-.4.3.4-.2 3.2-1.9 4.5-.2.2-.4.1-.3-.2.3-.9.6-3 .3-3.4z"/>
          <path fill="currentColor" d="M8.3 8.8v2.6c0 1.6.8 2.3 2 2.3.8 0 1.4-.4 1.8-.9v.8h1.7V8.8h-1.7v2.8c0 .8-.4 1.2-1 1.2-.6 0-.9-.4-.9-1.2V8.8H8.3z"/>
        </svg>
      );

    case 'sql':
    case 'postgres':
    case 'postgresql':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="PostgreSQL / SQL">
          <path fill="#336791" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z"/>
        </svg>
      );

    case 'docker':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="Docker">
          <path fill="#2496ED" d="M13 8.5h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6-3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6-3h2v2h-2zm-3 0h2v2h-2zm13 8.5c-.3-1.6-1.5-2.7-2.9-2.8-.4 0-.8.1-1.1.2V8.5h-3v5H1.6C1.2 14.3 1 15.1 1 16c0 3.9 3.6 7 8 7 5.6 0 9.8-3.6 10.7-8.5.8-.1 1.7-.5 2.3-1.1.7-.7 1-1.7 1-2.9z"/>
        </svg>
      );

    case 'redux':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="Redux">
          <path fill="#764ABC" d="M15.7 7.2c-1.3-1.3-3.3-1.5-4.8-.5-.3.2-.6.4-.9.7-.7-.8-1.7-1.3-2.8-1.3-2 0-3.7 1.6-3.7 3.7 0 .6.2 1.2.4 1.7-1.3 1.2-1.7 3.2-.8 4.7.9 1.5 2.6 2.2 4.3 1.7.7.8 1.7 1.3 2.8 1.3 2 0 3.7-1.6 3.7-3.7 0-.6-.2-1.2-.4-1.7 1.3-1.2 1.7-3.2.8-4.7-.5-.9-1.3-1.5-2.2-1.7z"/>
        </svg>
      );

    case 'systemdesign':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="System Design" fill="none" stroke="#e86c60" strokeWidth="2">
          <rect x="2" y="2" width="8" height="8" rx="2"/>
          <rect x="14" y="2" width="8" height="8" rx="2"/>
          <rect x="8" y="14" width="8" height="8" rx="2"/>
          <path d="M6 10v4h2M18 10v4h-2"/>
        </svg>
      );

    case 'vite':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label="Vite">
          <path fill="#646CFF" d="M23.3 3.6L12.7 22.8c-.3.5-1 .5-1.3 0L.7 3.6c-.3-.5.1-1.1.7-1.1h4.2c.4 0 .8.2 1 .6L12 13.5 17.4 3.1c.2-.4.6-.6 1-.6h4.2c.6 0 1 .6.7 1.1z"/>
          <path fill="#FFD62E" d="M19.6 1.5L10 17.5l-2.7-5.3 12.3-10.7z"/>
        </svg>
      );

    case 'zod':
    case 'jwt':
    case 'aiapi':
    case 'restapis':
    case 'api':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#e86c60" strokeWidth="2">
          <path d="M4 17l6-6-6-6M12 19h8"/>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#4ade80">
          <circle cx="12" cy="12" r="5"/>
        </svg>
      );
  }
}
