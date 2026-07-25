import React from 'react';
import {
  MinusCircle, GitBranch, Printer, CalendarClock, Landmark, Bot, Network, CheckCircle2,
} from 'lucide-react';

/**
 * Agentic Layer — the Asdaa.co proposal rendered as a product surface.
 * Content mirrors "SeedLegals agentic layer proposal" (10 slides).
 */

const Section: React.FC<{ eyebrow: string; title: string; children: React.ReactNode; className?: string }> = ({
  eyebrow, title, children, className = '',
}) => (
  <div className={`p-5 md:p-6 glass-card ${className}`}>
    <div className="text-[10.5px] font-bold uppercase tracking-[.1em]" style={{ color: 'var(--acc)' }}>{eyebrow}</div>
    <h3 className="text-[17px] font-bold text-hd mt-1.5 mb-3.5">{title}</h3>
    {children}
  </div>
);

const Bullet: React.FC<{ tone?: 'ok' | 'warn'; children: React.ReactNode }> = ({ tone = 'ok', children }) => {
  const Icon = tone === 'ok' ? CheckCircle2 : MinusCircle;
  return (
    <div className="flex gap-2.5 text-xs text-body">
      <Icon className="w-4 h-4 shrink-0 mt-px" style={{ color: tone === 'ok' ? 'var(--ok)' : 'var(--warn-txt)' }} />
      <span className="flex-1 text-pretty">{children}</span>
    </div>
  );
};

const AGENTS = [
  { icon: Network, name: 'Lifecycle Orchestrator', desc: 'Real-time status across every step — no silent gaps.', status: 'Running', cls: 'pill-ok' },
  { icon: GitBranch, name: 'Founder-Profile Router', desc: 'SSN vs no-SSN — routes each founder to the correct path automatically.', status: 'Routed: Path B', cls: 'pill' },
  { icon: Printer, name: 'EIN Agent', desc: 'SS-4 + Fax-TIN or guided IRS call (third-party designee), with status polling.', status: 'In progress', cls: 'pill-warn' },
  { icon: CalendarClock, name: '83(b) Agent', desc: 'Form 15620 + 30-day deadline engine + tracked mailing.', status: '15 days left', cls: 'pill-warn' },
  { icon: Landmark, name: 'Banking Agent', desc: 'Mercury / BaaS on EIN issuance; Wise-USD fallback.', status: 'Waiting on EIN', cls: 'pill' },
  { icon: Bot, name: 'Support & Inquiry (RAG)', desc: 'Page-cited answers, human-gated — cuts ticket load.', status: 'Live', cls: 'pill-ok' },
];

export const AgenticLayerView: React.FC = () => (
  <div className="space-y-4 max-w-5xl mx-auto pb-28">
    {/* Hero */}
    <div className="p-6 md:p-7 glass-card-active">
      <div className="text-[11px] font-bold uppercase tracking-[.1em]" style={{ color: 'var(--acc)' }}>
        Proposal · Asdaa.co → SeedLegals
      </div>
      <h2 className="text-3xl font-extrabold text-hd mt-1.5 tracking-tight">Incorporation, Reimagined</h2>
      <p className="text-sm text-mut mt-1.5 max-w-2xl text-pretty">
        Turning everything after “incorporation complete” — EIN, 83(b), banking, the raise — from a black box into a
        transparent, guided, investment-ready journey.
      </p>
      <div className="flex flex-wrap gap-2.5 mt-3.5">
        <span className="pill px-3 py-1 text-[11.5px]">Hesham Aboul-Fetouh · Asdaa.co</span>
        <span className="px-3 py-1 rounded-full text-[11.5px] font-semibold" style={{ background: 'var(--chip-bg)', color: 'var(--mut-2)' }}>
          Angular · Spring Boot · AWS — no rip-and-replace
        </span>
      </div>
    </div>

    {/* 01 problem */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Section eyebrow="01 · The problem" title="The founder experience">
        <div className="space-y-2.5">
          <Bullet tone="warn">Disconnected third parties, no shared thread of truth.</Bullet>
          <Bullet tone="warn">Silent waiting — zero status visibility.</Bullet>
          <Bullet tone="warn">Deadlines (EIN, 83(b)) surfaced by luck, not design.</Bullet>
          <Bullet tone="warn">A required SSN field that dead-ends international founders.</Bullet>
        </div>
      </Section>
      <Section eyebrow="01 · The problem" title="The operational cost" className="glass-card-soft">
        <div className="space-y-2.5">
          <Bullet tone="warn">No telemetry into registered-agent or IRS delays.</Bullet>
          <Bullet tone="warn">Escalations arrive after the founder feels it — CX load, trust erosion.</Bullet>
          <Bullet tone="warn">“Complete” on the platform ≠ a usable company.</Bullet>
        </div>
      </Section>
    </div>

    {/* 02 insight */}
    <Section eyebrow="02 · The insight" title="Separate the two things that get conflated">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl glass-inset">
          <div className="text-[10.5px] font-bold tracking-[.08em]" style={{ color: 'var(--mut-2)' }}>STATUTORY — KEEP AS-IS</div>
          <div className="text-[15px] font-bold text-hd mt-1">Registered Agent</div>
          <p className="text-xs text-mut mt-1 text-pretty">
            Required by Delaware law (8 Del. C. §132). Stays with InCorp — pluggable, untouched.
          </p>
        </div>
        <div className="p-4 rounded-2xl" style={{ background: 'var(--nav-active-bg)', border: '1px solid var(--nav-active-border)' }}>
          <div className="text-[10.5px] font-bold tracking-[.08em]" style={{ color: 'var(--acc)' }}>OWNABLE — AUTOMATE</div>
          <div className="text-[15px] font-bold text-hd mt-1">EIN · 83(b) · Banking</div>
          <p className="text-xs text-mut mt-1 text-pretty">
            Per IRS: obtained by the responsible party or a third-party designee — not a registered agent.
            SeedLegals can own and automate it.
          </p>
        </div>
      </div>
    </Section>

    {/* 03 architecture */}
    <Section eyebrow="03 · The solution" title="An agentic layer, on your stack">
      <div className="space-y-2">
        <div className="flex items-center gap-3.5 px-4 py-3 rounded-xl glass-inset">
          <span className="text-[10.5px] font-bold tracking-[.08em] w-24 shrink-0" style={{ color: 'var(--mut-2)' }}>FRONTEND</span>
          <span className="text-xs text-body">Angular founder dashboard · internal ops dashboard</span>
        </div>
        <div className="text-center text-[11px] text-mut">↓ GraphQL / REST ↓</div>
        <div className="flex items-center gap-3.5 px-4 py-3 rounded-xl" style={{ background: 'var(--nav-active-bg)', border: '1px solid var(--nav-active-border)' }}>
          <span className="text-[10.5px] font-bold tracking-[.08em] w-24 shrink-0" style={{ color: 'var(--acc)' }}>AGENT LAYER</span>
          <span className="text-xs text-body">Lifecycle Orchestrator — every step a tracked task · human-in-the-loop on every filing</span>
        </div>
        <div className="text-center text-[11px] text-mut">↓ Step Functions ↓</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            ['Compute', 'Containerized agents on ECS / EKS'],
            ['Models', 'AWS Bedrock or Gemini'],
            ['Existing backend', 'Spring Boot services — no rip-and-replace'],
          ].map(([k, v]) => (
            <div key={k} className="px-4 py-3 rounded-xl glass-inset">
              <div className="text-xs font-bold text-hd">{k}</div>
              <div className="text-[11.5px] text-mut mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>

    {/* 04 agents */}
    <Section eyebrow="04 · The agents" title="Six workers, one orchestrator">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {AGENTS.map(({ icon: Icon, name, desc, status, cls }) => (
          <div key={name} className="p-4 rounded-2xl glass-inset flex flex-col gap-1.5">
            <span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--nav-active-bg)' }}>
              <Icon className="w-4.5 h-4.5" style={{ color: 'var(--acc)' }} />
            </span>
            <div className="text-[13px] font-bold text-hd">{name}</div>
            <div className="text-[11.5px] text-mut flex-1 text-pretty">{desc}</div>
            <span className={`self-start px-2.5 py-0.5 text-[10.5px] ${cls}`}>{status}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-mut mt-3">Human-in-the-loop on every filing · dual dashboards: founder + internal ops.</p>
    </Section>

    {/* 05 journey */}
    <Section eyebrow="05 · The founder journey" title="Before and after">
      <div className="space-y-3.5">
        <div>
          <div className="text-[10.5px] font-bold tracking-[.08em] mb-2" style={{ color: 'var(--mut-2)' }}>TODAY</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {['Incorporate ✓', '…silence…', 'Chase EIN by email & phone', '83(b) deadline discovered late — or missed'].map(t => (
              <div key={t} className="px-3.5 py-3 rounded-xl text-xs text-mut text-pretty" style={{ background: 'var(--card-faint)', border: '1px dashed var(--divider)' }}>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10.5px] font-bold tracking-[.08em] mb-2" style={{ color: 'var(--acc)' }}>WITH THE AGENTIC LAYER</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              'Incorporate ✓ — journey starts, not ends',
              'EIN filed & tracked, live status',
              '83(b) generated, mailed, deadline enforced',
              'Bank open — investment-ready',
            ].map(t => (
              <div key={t} className="px-3.5 py-3 rounded-xl text-xs font-semibold text-hd text-pretty" style={{ background: 'var(--nav-active-bg)', border: '1px solid var(--nav-active-border)' }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>

    {/* 06 + 07 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <Section eyebrow="06 · Inclusive by design" title="One workflow, every founder">
        <div className="space-y-2.5">
          <div className="p-4 rounded-xl glass-inset">
            <div className="text-xs font-bold text-hd">Path A · Has SSN</div>
            <p className="text-xs text-mut mt-1">Online EIN — instant. Straight through the IRS online flow, confirmed same session.</p>
          </div>
          <div className="p-4 rounded-xl glass-inset">
            <div className="text-xs font-bold text-hd">Path B · No SSN</div>
            <p className="text-xs text-mut mt-1">Phone + Fax-TIN — ~4 business days. The international route, done right and tracked end to end.</p>
          </div>
          <p className="text-xs text-mut">The same orchestrator extends beyond Delaware — UK, UAE, Singapore.</p>
        </div>
      </Section>

      <Section eyebrow="07 · Integrations" title="Fits your world">
        <div className="space-y-2">
          {[
            ['Registered agent', 'InCorp today — pluggable'],
            ['IRS', 'SS-4 + Fax-TIN + click-to-call + status polling — no public EIN API, so handled as assisted filing with live tracking'],
            ['Banking / BaaS', 'Mercury · Wise · embedded'],
            ['E-sign', 'Issue & close documents'],
            ['Comms', 'Voice · fax · mail · email'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-3 px-3.5 py-2.5 rounded-xl glass-inset">
              <span className="text-xs font-bold text-hd w-28 shrink-0">{k}</span>
              <span className="text-xs text-mut flex-1 text-pretty">{v}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>

    {/* 08 impact */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Section eyebrow="08 · Impact" title="For founders">
        <div className="space-y-2.5">
          <Bullet>Complete clarity, end to end.</Bullet>
          <Bullet>Faster turnaround on EIN, 83(b), banking.</Bullet>
          <Bullet>Trust through transparency.</Bullet>
          <Bullet>Works without an SSN.</Bullet>
        </div>
      </Section>
      <Section eyebrow="08 · Impact" title="For SeedLegals">
        <div className="space-y-2.5">
          <Bullet>Scalable ops — agents absorb the chase.</Bullet>
          <Bullet>Fewer escalations, higher retention.</Bullet>
          <Bullet>Full operational transparency.</Bullet>
          <Bullet>New revenue — a managed EIN &amp; banking concierge.</Bullet>
        </div>
      </Section>
    </div>

    {/* 09 next step */}
    <div className="p-6 glass-card-active">
      <div className="text-[10.5px] font-bold uppercase tracking-[.1em]" style={{ color: 'var(--acc)' }}>09 · Next step</div>
      <h3 className="text-[17px] font-bold text-hd mt-1.5 mb-3.5">A short feasibility review with R&amp;D</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          'Fax-TIN auto-routing for non-SSN founders',
          'Real-time third-party status tracking',
          'AWS / Bedrock deployment shape',
        ].map((t, i) => (
          <div key={t} className="flex gap-2.5 px-4 py-3.5 rounded-xl glass-inset">
            <span className="w-5.5 h-5.5 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0" style={{ background: 'var(--acc)' }}>
              {i + 1}
            </span>
            <span className="text-xs text-body">{t}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
