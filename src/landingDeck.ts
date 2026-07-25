// The SeedLegals pitch deck, as the logged-out landing page. Rendered via
// dangerouslySetInnerHTML in Landing.tsx. Scoped under .deck-root so it never
// fights the app's Tailwind body classes. No <script> (scroll reveals are
// simply shown; the sign-in button is a real React element rendered on top).
export const DECK_HTML = `
<style>
  .deck-root{
    --bg:#080B15; --bg-2:#0F1524; --bg-3:#161E33;
    --ink:#EAEEF7; --body:#A9B2C7; --muted:#6A7590;
    --violet:#8E7BFF; --violet-2:#6D5CFF; --teal:#2FD8C2;
    --line:rgba(255,255,255,.09); --line-2:rgba(255,255,255,.06);
    --sans:"Segoe UI",system-ui,-apple-system,Roboto,Helvetica,Arial,sans-serif;
    --mono:ui-monospace,"Cascadia Code","SF Mono",Consolas,"Liberation Mono",monospace;
    min-height:100vh;background:var(--bg);color:var(--body);
    font-family:var(--sans);line-height:1.6;-webkit-font-smoothing:antialiased;
    background-image:
      radial-gradient(1100px 620px at 78% -8%, rgba(109,92,255,.20), transparent 60%),
      radial-gradient(900px 560px at 8% 4%, rgba(47,216,194,.10), transparent 55%);
  }
  .deck-root *{box-sizing:border-box}
  .deck-root .wrap{max-width:1080px;margin:0 auto;padding:0 28px}
  .deck-root section{padding:96px 0;border-bottom:1px solid var(--line-2)}
  .deck-root section:last-of-type{border-bottom:0}
  .deck-root .eyebrow{font-family:var(--mono);font-size:12.5px;letter-spacing:.16em;
    text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:10px;margin:0 0 22px}
  .deck-root .eyebrow::before{content:"";width:7px;height:7px;border-radius:50%;
    background:var(--violet);box-shadow:0 0 0 4px rgba(142,123,255,.16)}
  .deck-root .eyebrow .n{color:var(--violet);font-weight:600}
  .deck-root h1{font-size:clamp(40px,6.4vw,74px);line-height:1.02;letter-spacing:-.025em;
    font-weight:800;color:var(--ink);margin:0 0 22px}
  .deck-root h2{font-size:clamp(28px,3.9vw,44px);line-height:1.08;letter-spacing:-.02em;
    font-weight:800;color:var(--ink);margin:0 0 18px}
  .deck-root h3{font-size:18px;font-weight:700;color:var(--ink);margin:0 0 8px}
  .deck-root p{margin:0 0 16px;max-width:64ch}
  .deck-root .lead{font-size:clamp(17px,2vw,20px);color:#C4CBDD;max-width:60ch}
  .deck-root strong{color:#DCE2EF;font-weight:650}
  .deck-root .accent{color:var(--violet)}
  .deck-root .hero{padding-top:132px;padding-bottom:104px}
  .deck-root .pills{display:flex;flex-wrap:wrap;gap:10px;margin:30px 0 34px}
  .deck-root .pill{font-family:var(--mono);font-size:12px;color:#C6CDDE;background:var(--bg-2);
    border:1px solid var(--line);border-radius:999px;padding:8px 14px}
  .deck-root .pill.on{color:var(--teal);border-color:rgba(47,216,194,.3);background:rgba(47,216,194,.06)}
  .deck-root .byline{font-family:var(--mono);font-size:12.5px;color:var(--muted);
    border-top:1px solid var(--line-2);padding-top:20px;margin-top:8px}
  .deck-root .byline b{color:#C6CDDE;font-weight:600}
  .deck-root .grid{display:grid;gap:18px}
  .deck-root .cols-2{grid-template-columns:repeat(2,1fr)}
  .deck-root .card{background:linear-gradient(180deg,var(--bg-2),rgba(15,21,36,.55));
    border:1px solid var(--line);border-radius:16px;padding:24px}
  .deck-root .card.violet{border-color:rgba(142,123,255,.28);
    background:linear-gradient(180deg,rgba(142,123,255,.10),rgba(15,21,36,.4))}
  .deck-root .card.teal{border-color:rgba(47,216,194,.26);
    background:linear-gradient(180deg,rgba(47,216,194,.09),rgba(15,21,36,.4))}
  .deck-root .card .tag{font-family:var(--mono);font-size:11px;letter-spacing:.12em;
    text-transform:uppercase;color:var(--muted);margin-bottom:12px}
  .deck-root .card.violet .tag{color:var(--violet)}
  .deck-root .card.teal .tag{color:var(--teal)}
  .deck-root ul.clean{list-style:none;margin:0;padding:0}
  .deck-root ul.clean li{position:relative;padding-left:22px;margin-bottom:11px;color:var(--body)}
  .deck-root ul.clean li::before{content:"";position:absolute;left:2px;top:10px;width:6px;height:6px;
    border-radius:50%;background:var(--violet)}
  .deck-root ul.clean.t li::before{background:var(--teal)}
  .deck-root .agents{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line-2);
    border:1px solid var(--line);border-radius:16px;overflow:hidden;margin-top:8px}
  .deck-root .agent{background:var(--bg-2);padding:18px 20px}
  .deck-root .agent b{color:var(--ink);font-weight:700;font-size:15px}
  .deck-root .agent span{display:block;color:var(--body);font-size:14px;margin-top:4px}
  .deck-root .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
  .deck-root .chip{font-size:13.5px;color:#C6CDDE;background:var(--bg-2);border:1px solid var(--line);
    border-radius:10px;padding:9px 14px}
  .deck-root .chip b{color:var(--violet);font-weight:650}
  .deck-root .note{font-family:var(--mono);font-size:12.5px;color:var(--muted);background:var(--bg-2);
    border:1px solid var(--line-2);border-left:2px solid var(--violet);border-radius:8px;
    padding:14px 16px;margin-top:22px;max-width:70ch}
  .deck-root .foot{padding:40px 0 60px;color:var(--muted);font-family:var(--mono);font-size:12px}
  @media (max-width:720px){.deck-root .cols-2,.deck-root .agents{grid-template-columns:1fr}
    .deck-root section{padding:64px 0}}
</style>
<div class="deck-root">
  <section class="hero"><div class="wrap">
    <p class="eyebrow"><span class="n">Proposal</span> &middot; 2026 &middot; for SeedLegals R&amp;D</p>
    <h1>Incorporation,<br>Reimagined.</h1>
    <p class="lead">An <span class="accent">agentic layer</span> that turns everything after &ldquo;incorporation complete&rdquo; &mdash; EIN, 83(b), banking, the raise &mdash; from a black box into a transparent, guided, investment-ready journey. On the stack you already run.</p>
    <div class="pills"><span class="pill">Angular &middot; RxJS/NgRx</span><span class="pill">Spring Boot &middot; GraphQL/REST</span><span class="pill">AWS &middot; Docker</span><span class="pill on">No rip-and-replace</span></div>
    <p class="byline">A proposal by <b>Hesham Aboul-Fetouh</b> &middot; Founder &amp; CEO, Asdaa.co</p>
  </div></section>
  <section><div class="wrap">
    <p class="eyebrow"><span class="n">01</span> &middot; The core problem</p>
    <h2>Founders go dark after &ldquo;complete.&rdquo;</h2>
    <div class="grid cols-2" style="margin-top:32px">
      <div class="card"><div class="tag">The founder experience</div><h3>Waiting in the dark</h3>
        <ul class="clean"><li>Disconnected third parties, no shared thread of truth</li><li>Silent waiting with zero status visibility</li><li>Deadlines (EIN, 83(b)) surfaced by luck, not design</li><li>A required SSN field that dead-ends international founders</li></ul></div>
      <div class="card"><div class="tag">The operational cost</div><h3>Friction surfaces late</h3>
        <ul class="clean"><li>No telemetry into third-party (RA, IRS) delays</li><li>Escalations arrive after the founder feels it</li><li>Manual chasing consumes CX; trust erodes</li><li>&ldquo;Complete&rdquo; &ne; a company that can operate</li></ul></div>
    </div>
  </div></section>
  <section><div class="wrap">
    <p class="eyebrow"><span class="n">02</span> &middot; The insight</p>
    <h2>Two things get conflated. Separate them.</h2>
    <div class="grid cols-2" style="margin-top:30px">
      <div class="card teal"><div class="tag">Statutory &mdash; keep as-is</div><h3>Registered Agent</h3><p>Required by Delaware law (8 Del. C. &sect;132). Stays with InCorp, behind a <strong>pluggable provider interface</strong>.</p></div>
      <div class="card violet"><div class="tag">Ownable &mdash; automate</div><h3>EIN &middot; 83(b) &middot; Banking</h3><p>Per the IRS, an EIN comes from the responsible party or a <strong>third-party designee &mdash; not a registered agent</strong>. <span class="accent">You can own and automate them</span> &mdash; and end the black box.</p></div>
    </div>
  </div></section>
  <section><div class="wrap">
    <p class="eyebrow"><span class="n">03</span> &middot; The solution</p>
    <h2>An agentic layer &mdash; on your stack.</h2>
    <p class="lead">Containerized agents on <strong>AWS (ECS/EKS &middot; Step Functions)</strong>, exposed to your Angular app via your existing <strong>GraphQL/REST</strong> layer. Models via Bedrock or Gemini. Every step a tracked task.</p>
    <div class="agents">
      <div class="agent"><b>Lifecycle Orchestrator</b><span>Real-time status across every step &mdash; no silent gaps.</span></div>
      <div class="agent"><b>Founder-Profile / Router</b><span>SSN vs no-SSN, US vs international &rarr; the right path, automatically.</span></div>
      <div class="agent"><b>EIN agent</b><span>SS-4 + Fax-TIN / guided IRS call as third-party designee + status polling.</span></div>
      <div class="agent"><b>83(b) agent</b><span>Form 15620 + 30-day deadline engine + tracked mailing.</span></div>
      <div class="agent"><b>Banking agent</b><span>Triggers Mercury / BaaS on EIN issuance; Wise-USD fallback.</span></div>
      <div class="agent"><b>Support &amp; Inquiry &middot; RAG</b><span>Page-cited answers over your KB + the founder's live case; human-gated.</span></div>
    </div>
    <p class="note">Human-in-the-loop governance on every filing. Dual dashboards &mdash; founder + internal ops (turnaround, flagged delays, intervene).</p>
  </div></section>
  <section><div class="wrap">
    <p class="eyebrow"><span class="n">04</span> &middot; Inclusive by design</p>
    <h2>One workflow. Every founder.</h2>
    <div class="grid cols-2" style="margin-top:30px">
      <div class="card teal"><div class="tag">Path A &middot; has SSN</div><h3>Online EIN &rarr; instant</h3></div>
      <div class="card violet"><div class="tag">Path B &middot; no SSN</div><h3>Phone + Fax-TIN &rarr; ~4 business days</h3><p>The international route &mdash; mislabeled &ldquo;US-only&rdquo; today &mdash; done right and tracked.</p></div>
    </div>
    <p style="margin-top:24px">Same orchestrator extends to <strong>UK, UAE, and Singapore</strong> incorporation.</p>
  </div></section>
  <section><div class="wrap">
    <p class="eyebrow"><span class="n">05</span> &middot; Impact</p>
    <h2>A win on both sides.</h2>
    <div class="grid cols-2" style="margin-top:30px">
      <div class="card"><div class="tag" style="color:#2FD8C2">For founders</div><ul class="clean t"><li>Complete clarity, end to end</li><li>Faster turnaround, fewer surprises</li><li>Trust through transparency</li><li>Works without an SSN</li></ul></div>
      <div class="card"><div class="tag">For SeedLegals</div><ul class="clean"><li>Scalable ops &mdash; agents absorb the chase</li><li>Fewer escalations, higher retention</li><li><strong>New revenue</strong> &mdash; managed EIN &amp; banking concierge</li><li>Full operational transparency</li></ul></div>
    </div>
  </div></section>
  <div class="wrap foot">Prepared by Hesham Aboul-Fetouh &middot; Asdaa.co &middot; A proposal for SeedLegals &mdash; not an official SeedLegals document. Sign in to enter the live prototype &rarr;</div>
</div>
`;
