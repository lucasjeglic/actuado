import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow, ButtonLink } from "@/components/site/primitives";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work — Case Studies | Actuado" },
      {
        name: "description",
        content:
          "Case studies from Actuado: CRM consolidation, forecast accuracy, AI-assisted selling and process redesign on HubSpot.",
      },
      { property: "og:title", content: "Selected Work — Case Studies | Actuado" },
      {
        property: "og:description",
        content: "How we rebuilt commercial operating models for industrial, services and SaaS clients.",
      },
    ],
  }),
  component: Work,
});

const cases = [
  {
    client: "NORTHBRIDGE",
    sector: "Industrial manufacturing · 2,400 employees",
    headline: "One CRM across nine countries and three legacy systems.",
    body: "A three-phase consolidation onto HubSpot Sales Hub Enterprise, with a custom object model for equipment fleets and a governed integration to SAP.",
    metrics: [
      ["42%", "Faster quote-to-order"],
      ["9", "Countries on one model"],
      ["0", "Critical data-loss incidents"],
    ],
  },
  {
    client: "VELLUM",
    sector: "Professional services · 600 employees",
    headline: "A forecast the board finally trusted, four weeks after go-live.",
    body: "Stage definitions rewritten around evidence, a weekly operating rhythm installed, and executive reporting rebuilt on a single source of pipeline truth.",
    metrics: [
      ["±4%", "Forecast accuracy"],
      ["6 hrs", "Saved per week, per manager"],
      ["94%", "CRM adoption at 90 days"],
    ],
  },
  {
    client: "ORVILLE & CO",
    sector: "B2B SaaS · 310 employees",
    headline: "AI-assisted research cut pre-call preparation from hours to minutes.",
    body: "Account research, call summarisation and CRM capture assistants deployed inside the existing workflow, with human review gates and quarterly model evaluation.",
    metrics: [
      ["11 hrs", "Saved per rep monthly"],
      ["3.1x", "Research coverage"],
      ["100%", "Outputs under review policy"],
    ],
    accent: true,
  },
  {
    client: "KESTREL HEALTH",
    sector: "Healthcare technology · 850 employees",
    headline: "Quote-to-cash redesigned around the way clinicians actually buy.",
    body: "Process mapping across six functions, automation of 41 manual handovers and an onboarding flow that shortened time-to-value for new accounts.",
    metrics: [
      ["41", "Handovers automated"],
      ["27 days", "Shorter onboarding"],
      ["18%", "Higher renewal rate"],
    ],
  },
];

function Work() {
  return (
    <>
      <Section className="border-b border-border">
        <Eyebrow>Selected work</Eyebrow>
        <h1 className="display-1 mt-8 max-w-[16ch] text-graphite">
          Results that outlast the engagement.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-graphite-soft">
          Client names shown with permission. Figures are measured twelve months after go-live,
          not at handover.
        </p>
      </Section>

      {cases.map((c, i) => (
        <Section key={c.client} tone={i % 2 === 1 ? "sand" : "white"}>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-serif text-4xl tracking-tight text-graphite lg:text-5xl">
                {c.client}
              </p>
              <p className="mt-3 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {c.sector}
              </p>
              {c.accent && (
                <span className="mt-6 inline-block rounded-full bg-gold-soft px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-accent-foreground uppercase">
                  AI engagement
                </span>
              )}
            </div>
            <div className="lg:col-span-8">
              <h2 className="display-2 max-w-[22ch] text-graphite">{c.headline}</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite-soft">
                {c.body}
              </p>
              <dl className="mt-12 grid gap-10 border-t border-border pt-10 sm:grid-cols-3">
                {c.metrics.map(([value, label]) => (
                  <div key={label}>
                    <dt className="font-serif text-4xl text-graphite">{value}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>
      ))}

      <Section className="border-t border-border">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="display-2 max-w-[18ch] text-graphite">
            Curious what this would look like for your organisation?
          </h2>
          <ButtonLink to="/contact">Book a conversation</ButtonLink>
        </div>
      </Section>
    </>
  );
}
