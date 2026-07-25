import React from 'react';

/**
 * Fixed aurora backdrop — the colour field the glass surfaces blur against.
 * Render once, behind the app shell. Purely decorative, never interactive.
 */
export const GlassBackdrop: React.FC = () => (
  <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--app-bg)' }}>
    <div className="absolute w-[560px] h-[560px] rounded-full -top-45 -left-30" style={{ background: 'var(--blob-1)' }} />
    <div className="absolute w-[520px] h-[520px] rounded-full -bottom-40 -right-25" style={{ background: 'var(--blob-2)' }} />
    <div className="absolute w-[420px] h-[420px] rounded-full top-50 right-85" style={{ background: 'var(--blob-3)' }} />
  </div>
);
