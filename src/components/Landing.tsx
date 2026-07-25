import { DECK_HTML } from '../landingDeck';
import { signInWithGoogle } from '../firebase';

const GoogleGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
    <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
  </svg>
);

export function Landing() {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 20 }}>
        <button
          type="button"
          onClick={() => void signInWithGoogle()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            font: '600 14px/1 "Segoe UI",system-ui,sans-serif',
            color: '#0F1524',
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,.08)',
            borderRadius: 999,
            padding: '11px 18px',
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(0,0,0,.35)',
          }}
        >
          <GoogleGlyph />
          Continue with Google
        </button>
      </div>
      {/* DECK_HTML is a static, compile-time constant authored in this repo —
          not user input, so there is no XSS surface here. */}
      <div dangerouslySetInnerHTML={{ __html: DECK_HTML }} />
    </div>
  );
}
