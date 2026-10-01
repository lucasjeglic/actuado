import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow, ButtonLink } from "@/components/site/primitives";
import { Database, GitBranch, Sparkles, LineChart } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CRM, RevOps, AI & Process | Actuado" },
      {
        name: "description",
        content:
          "CRM architecture, revenue operations, business process optimisation and applied AI, delivered on HubSpot by a Diamond Solutions Partner.",
      },
      { property: "og:title", content: "Services — CRM, RevOps, AI & Process | Actuado" },
      {
        property: "og:description",
        content:
          "Four consulting disciplines that make a commercial operating model deliberate rather than accumulated.",
      },
    ],
  }),
  component: Services,
});

const detail = [
  {
    icon: Database,
    title: "CRM Architecture",
    lead: "A data model your business can defend.",
    points: [
      "Object and property design, naming conventions, governance",
      "Migration from Salesforce, Dynamics or legacy systems",
      "Integration architecture with ERP, billing and product data",
      "Permission models for multi-entity organisations",
    ],
  },
  {
    icon: LineChart,
    title: "Revenue Operations",
    lead: "One version of the number, across the leadership team.",
    points: [
      "Lifecycle and stage definitions with exit criteria",
      "Forecast methodology and pipeline hygiene rhythm",
      "Executive reporting and attribution modelling",
      "Territory, routing and compensation alignment",
    ],
  },
  {
    icon: GitBranch,
    title: "Process Optimisation",
    lead: "Fewer handovers, less rework, faster cycles.",
    points: [
      "Process mapping against how work actually happens",
      "Automation design and exception handling",
      "Quote-to-cash and onboarding flow redesign",
      "Adoption measurement and continuous improvement",
    ],
  },
  {
    icon: Sparkles,
    title: "AI Enablement",
    lead: "Applied AI inside the workflow — governed and measurable.",
    accent: true,
    points: [
      "Account research and pre-call preparation assistants",
      "Call summarisation and CRM data capture",
      "Lead qualification, routing and enrichment",
      "Model governance, evaluation and human review design",
    ],
  },
];

function Services() {
  return (
    <>
      <Section className="border-b border-border">
        <Eyebrow>Services</Eyebrow>
        <h1 className="display-1 mt-8 max-w-[18ch] text-graphite">
          Consulting that ends in a working system.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-graphite-soft">
          We are engaged where strategy meets configuration. Every mandate produces both a
          decision your leadership team can stand behind and the implementation that makes it
          real.
        </p>
      </Section>

      {detail.map((s, i) => (
        <Section key={s.title} tone={i % 2 === 1 ? "sand" : "white"}>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4">
                <span
                  className={
                    s.accent
                      ? "flex size-11 items-center justify-center rounded-lg bg-gold-soft"
                      : "flex size-11 items-center justify-center rounded-lg border border-border"
                  }
                >
                  <s.icon className={s.accent ? "size-5 text-accent-foreground" : "size-5 text-graphite-soft"} />
                </span>
                <span className="label-eyebrow">{`0${i + 1}`}</span>
              </div>
              <h2 className="display-2 mt-8 text-graphite">{s.title}</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-graphite-soft">
                {s.lead}
              </p>
            </div>
            <ul className="divide-y divide-border border-t border-border lg:col-span-7">
              {s.points.map((p) => (
                <li key={p} className="flex gap-6 py-5">
                  <span className="mt-2.5 h-px w-6 shrink-0 bg-gold" />
                  <span className="text-base leading-relaxed text-graphite-soft">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section tone="graphite">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <Eyebrow light>Engagement models</Eyebrow>
            <h2 className="display-2 mt-6 max-w-[20ch] text-primary-foreground">
              Diagnostic, programme or retained advisory.
            </h2>
          </div>
          <ButtonLink to="/contact" variant="gold">
            Discuss a mandate
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
