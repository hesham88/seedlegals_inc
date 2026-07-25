import React, { useEffect, useRef, useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

interface Message { who: 'agent' | 'user'; text: string; cite?: string; }

const SEED: Message[] = [
  {
    who: 'agent',
    text: 'Your EIN is filed under Path B (no SSN). The SS-4 was faxed to the IRS Fax-TIN unit on 2 Jul — return fax expected by 8 Jul.',
    cite: 'Cited: Incorporation → step 4 · IRS Fax-TIN',
  },
];

const SUGGESTIONS: { q: string; a: string; cite: string }[] = [
  {
    q: 'Where is my EIN?',
    a: 'Fax-TIN transmission confirmed 2 Jul, 09:41. The IRS return fax typically lands in ~4 business days; the EIN agent polls daily and files the confirmation to your vault.',
    cite: 'Cited: Incorporation → step 4',
  },
  {
    q: 'What if the 83(b) deadline passes?',
    a: 'The election must be postmarked within 30 days of share issuance (29 Jun) — 6 Aug 2026. The 83(b) agent has the package prepared and will book tracked mailing; I can escalate to a human reviewer now.',
    cite: 'Cited: Stock Restriction Agreement · Calendar',
  },
  {
    q: 'Can I open a bank account?',
    a: 'Banking is gated on EIN issuance. The banking agent has a Mercury application pre-filled, with a Wise-USD fallback if underwriting stalls.',
    cite: 'Cited: Incorporation → step 5',
  },
];

/**
 * Support & Inquiry (RAG) agent — page-cited answers, human-gated.
 * Replace `answer()` with a call to the RAG endpoint; the shape is unchanged.
 */
export const ChatAgent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(SEED);
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) endRef.current?.scrollIntoView?.({ block: 'nearest' }); }, [messages, open]);

  const answer = (q: string) => {
    const hit = SUGGESTIONS.find(s => s.q.toLowerCase() === q.toLowerCase());
    return hit
      ? { who: 'agent' as const, text: hit.a, cite: hit.cite }
      : {
          who: 'agent' as const,
          text: 'Routing that to the orchestrator — I will answer from your filings and cite the page. If it needs a filing decision, a human reviewer signs off before anything is submitted.',
          cite: 'Human-in-the-loop on every filing',
        };
  };

  const ask = (q: string) => {
    if (!q.trim()) return;
    setMessages(m => [...m, { who: 'user', text: q }, answer(q)]);
    setDraft('');
  };

  return (
    <>
      {open && (
        <div
          className="fixed right-6 bottom-24 w-[360px] max-w-[calc(100vw-3rem)] max-h-[520px] flex flex-col z-40 overflow-hidden glass-card-active"
          style={{ backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 18px 60px rgba(10,12,60,.28)' }}
        >
          <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid var(--divider)' }}>
            <span className="w-8.5 h-8.5 rounded-xl flex items-center justify-center btn-primary">
              <Bot className="w-4.5 h-4.5" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-hd">Support &amp; Inquiry Agent</div>
              <div className="flex items-center gap-1.5 text-[11px] text-mut">
                <span className="status-dot" style={{ background: 'var(--ok)' }} />
                Page-cited answers · human-gated
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ color: 'var(--mut-2)' }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-2.5">
            {messages.map((m, i) => (
              <div
                key={i}
                className="max-w-[86%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed"
                style={
                  m.who === 'user'
                    ? { marginLeft: 'auto', background: 'var(--acc)', color: '#fff' }
                    : { background: 'var(--card-faint)', border: '1px solid var(--card-border)', color: 'var(--txt)' }
                }
              >
                {m.text}
                {m.cite && <span className="block text-[10.5px] mt-1.5" style={{ color: 'var(--mut)' }}>{m.cite}</span>}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="px-3 py-2.5 space-y-2" style={{ borderTop: '1px solid var(--divider)' }}>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map(s => (
                <button key={s.q} onClick={() => ask(s.q)} className="px-2.5 py-1 rounded-full text-[11px] font-semibold glass-inset" style={{ color: 'var(--acc)' }}>
                  {s.q}
                </button>
              ))}
            </div>
            <form
              onSubmit={e => { e.preventDefault(); ask(draft); }}
              className="flex items-center gap-2 px-3 py-2 rounded-full glass-inset"
            >
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Ask about EIN, 83(b), banking…"
                className="flex-1 bg-transparent outline-none text-xs text-body placeholder:text-[color:var(--mut)]"
              />
              <button type="submit" aria-label="Send"><Send className="w-4 h-4" style={{ color: 'var(--acc)' }} /></button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="fixed right-6 bottom-6 h-14 px-5 flex items-center gap-2.5 text-sm z-40 btn-primary"
        style={{ boxShadow: '0 10px 34px rgba(95,97,251,.5)' }}
      >
        {open ? <X className="w-5.5 h-5.5" /> : <Bot className="w-5.5 h-5.5" />}
        {open ? 'Close' : 'Ask the agent'}
        {!open && (
          <span className="w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center" style={{ background: '#04DCA2', color: '#04352a' }}>
            1
          </span>
        )}
      </button>
    </>
  );
};
