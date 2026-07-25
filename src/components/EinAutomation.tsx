import React, { useEffect, useRef, useState } from 'react';
import { Phone, PhoneCall, Send, FileText, CheckCircle2, Hourglass, Mic, Badge, Globe, Printer } from 'lucide-react';

type CallState = 'idle' | 'dialing' | 'queued' | 'live' | 'done';
type EinPath = 'ssn' | 'nossn';

interface LogLine { icon: React.ElementType; text: string; time: string; tone: 'acc' | 'warn' | 'ok'; }

const CALL_FLOW: CallState[] = ['idle', 'dialing', 'queued', 'live', 'done'];

const CALL_COPY: Record<CallState, { status: string; tone: string; label: string; queue: string }> = {
  idle:    { status: 'Not started',            tone: 'var(--mut-2)',  label: 'Place IRS call',   queue: '—' },
  dialing: { status: 'Dialing IRS…',           tone: 'var(--acc)',    label: 'Dialing…',         queue: '—' },
  queued:  { status: 'On hold in IRS queue',   tone: 'var(--warn-txt)', label: 'On hold…',       queue: '4 of 11' },
  live:    { status: 'Agent on the line',      tone: 'var(--ok-txt)', label: 'Call in progress', queue: '1 of 1' },
  done:    { status: 'EIN read back & captured', tone: 'var(--ok-txt)', label: 'Call complete',  queue: '1 of 1' },
};

const CALL_LOG: Record<CallState, LogLine[]> = {
  idle: [{ icon: Hourglass, text: 'Call scheduled for the next IRS window (Mon–Fri, 6am–11pm ET)', time: 'Queued', tone: 'acc' }],
  dialing: [
    { icon: FileText, text: 'Third-party designee authorization (Form SS-4, line 18) attached', time: 'now', tone: 'acc' },
    { icon: PhoneCall, text: 'Dialing IRS Business & Specialty Tax Line', time: 'now', tone: 'acc' },
  ],
  queued: [
    { icon: PhoneCall, text: 'Connected — navigating IVR to the EIN department', time: '0:12', tone: 'acc' },
    { icon: Hourglass, text: 'Holding in queue — the agent re-attempts automatically if dropped', time: '3:41', tone: 'warn' },
  ],
  live: [
    { icon: Mic, text: 'IRS assistor reached — SS-4 details being read from your file', time: '11:06', tone: 'ok' },
    { icon: FileText, text: 'Live transcript recording for your audit log', time: '11:07', tone: 'acc' },
  ],
  done: [
    { icon: CheckCircle2, text: 'EIN issued and read back by the IRS assistor', time: '14:22', tone: 'ok' },
    { icon: FileText, text: 'Transcript + CP-575 request filed to your document vault', time: '14:23', tone: 'acc' },
  ],
};

const TONE: Record<string, string> = { acc: 'var(--acc)', warn: 'var(--warn-txt)', ok: 'var(--ok-txt)' };

interface EinAutomationProps {
  /** Optional: drive the path from the founder profile instead of local state. */
  path?: EinPath;
  onPathChange?: (p: EinPath) => void;
  /** Called when the simulated/real IRS call completes. */
  onEinCaptured?: () => void;
}

/**
 * Step 4 automation surface — IRS call automation + Fax-TIN transmission.
 * Wire `startCall` / `sendFax` to the EIN agent endpoints; the state machine
 * mirrors the orchestrator's task states so the UI needs no change.
 */
export const EinAutomation: React.FC<EinAutomationProps> = ({ path, onPathChange, onEinCaptured }) => {
  const [localPath, setLocalPath] = useState<EinPath>('nossn');
  const [callState, setCallState] = useState<CallState>('idle');
  const notified = useRef(false);

  const activePath = path ?? localPath;
  const setPath = (p: EinPath) => (onPathChange ? onPathChange(p) : setLocalPath(p));

  useEffect(() => {
    if (callState === 'done' && !notified.current) {
      notified.current = true;
      onEinCaptured?.();
    }
  }, [callState, onEinCaptured]);

  const advanceCall = () => setCallState(s => CALL_FLOW[(CALL_FLOW.indexOf(s) + 1) % CALL_FLOW.length]);
  const copy = CALL_COPY[callState];

  const faxRows = [
    { name: 'Form SS-4 · Apex Dynamics Inc.', pages: '2', sent: '2 Jul 2026, 09:41', status: 'Delivered', cls: 'pill-ok' },
    { name: 'Third-party designee authorization', pages: '1', sent: '2 Jul 2026, 09:41', status: 'Delivered', cls: 'pill-ok' },
    { name: 'IRS return fax · EIN confirmation', pages: '—', sent: 'Expected by 8 Jul', status: 'Awaiting', cls: 'pill-warn' },
  ];

  return (
    <div className="space-y-3">
      {/* Founder-profile router */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {([
          { id: 'ssn' as EinPath, icon: Badge, title: 'Path A · Has SSN', body: 'Online EIN — instant. Straight through the IRS online flow, confirmed in the same session.' },
          { id: 'nossn' as EinPath, icon: Globe, title: 'Path B · No SSN', body: 'Phone + Fax-TIN — ~4 business days. The international route, tracked end to end.' },
        ]).map(({ id, icon: Icon, title, body }) => (
          <button
            key={id}
            onClick={() => setPath(id)}
            className="text-left p-4 rounded-2xl glass-inset transition"
            style={{ border: `1.5px solid ${activePath === id ? 'var(--acc)' : 'var(--card-border)'}` }}
          >
            <div className="flex items-center gap-2 text-[13px] font-bold text-hd">
              <Icon className="w-4 h-4" style={{ color: 'var(--acc)' }} />
              {title}
            </div>
            <p className="text-xs text-mut mt-1">{body}</p>
          </button>
        ))}
      </div>

      {/* Phone call automation */}
      <div className="p-4 rounded-2xl glass-inset">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--nav-active-bg)' }}>
            <Phone className="w-4 h-4" style={{ color: 'var(--acc)' }} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold text-hd">IRS call automation</div>
            <div className="text-[11px] text-mut">
              Third-party designee call to the IRS Business &amp; Specialty line, placed and transcribed by the EIN agent.
            </div>
          </div>
          <button
            onClick={advanceCall}
            className="flex items-center gap-1.5 h-8 px-4 text-xs shrink-0 btn-primary"
            style={callState === 'done' ? { background: '#04a97e' } : undefined}
          >
            {callState === 'done' ? <CheckCircle2 className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
            {copy.label}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
          {[
            ['Line', 'IRS +1 267-941-1099', 'var(--hd)'],
            ['Queue position', copy.queue, 'var(--hd)'],
            ['Call status', copy.status, copy.tone],
          ].map(([k, v, tone]) => (
            <div key={k} className="p-2.5 rounded-xl glass-card">
              <div className="text-[10px] text-mut">{k}</div>
              <div className="text-xs font-bold" style={{ color: tone }}>{v}</div>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          {CALL_LOG[callState].map((l, i) => {
            const Icon = l.icon;
            return (
              <div key={i} className="flex items-center gap-2.5 text-xs text-body">
                <Icon className="w-4 h-4 shrink-0" style={{ color: TONE[l.tone] }} />
                <span className="flex-1">{l.text}</span>
                <span className="text-[11px] text-mut shrink-0">{l.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fax-TIN integration */}
      <div className="p-4 rounded-2xl glass-inset">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--nav-active-bg)' }}>
            <Printer className="w-4 h-4" style={{ color: 'var(--acc)' }} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold text-hd">Fax-TIN integration</div>
            <div className="text-[11px] text-mut">
              Form SS-4 transmitted to the IRS Fax-TIN unit with delivery receipt and return-fax capture.
            </div>
          </div>
          <button className="flex items-center gap-1.5 h-8 px-4 text-xs shrink-0 btn-ghost">
            <Send className="w-4 h-4" />
            Re-send SS-4
          </button>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--divider)' }}>
          <div className="grid grid-cols-[1fr_max-content_max-content_max-content] gap-3 px-3.5 py-2 table-head text-[11px] font-semibold">
            <span>Transmission</span><span>Pages</span><span>Sent</span><span>Status</span>
          </div>
          {faxRows.map(r => (
            <div key={r.name} className="grid grid-cols-[1fr_max-content_max-content_max-content] gap-3 items-center px-3.5 py-2.5 row-divide text-xs text-body">
              <span className="flex items-center gap-2 font-semibold text-hd min-w-0">
                <FileText className="w-4 h-4 shrink-0" style={{ color: 'var(--acc)' }} />
                <span className="truncate">{r.name}</span>
              </span>
              <span>{r.pages}</span>
              <span className="text-mut">{r.sent}</span>
              <span className={`px-2.5 py-0.5 text-[11px] ${r.cls}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
