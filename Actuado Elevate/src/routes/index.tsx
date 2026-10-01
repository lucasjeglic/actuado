import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, ButtonLink, TextLink } from "@/components/site/primitives";
import heroImage from "@/assets/hero-meeting.jpg";
import portrait from "@/assets/portrait-quote.jpg";
import architecture from "@/assets/texture-architecture.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Actuado — HubSpot Diamond Partner for CRM, RevOps & AI" },
      {
        name: "description",
        content:
          "Actuado helps enterprise and scale-up teams design revenue operations that hold: CRM architecture, RevOps, AI enablement and process optimisation on HubSpot.",
      },
      {
        property: "og:title",
        content: "Actuado — HubSpot Diamond Partner for CRM, RevOps & AI",
      },
      {
        property: "og:description",
        content:
          "A consulting partner for CRM architecture, revenue operations, AI enablement and business process optimisation.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "180+", label: "HubSpot implementations delivered" },
  { value: "12 yrs", label: "Average partner tenure in RevOps" },
  { value: "31%", label: "Median pipeline velocity gain" },
  { value: "Diamond", label: "HubSpot Solutions Partner tier" },
];

const services = [
  {
    n: "01",
    title: "CRM Architecture",
    body: "Data models, object design and migration paths that survive the next five years of the business — not just the next quarter.",
  },
  {
    n: "02",
    title: "Revenue Operations",
    body: "Forecast discipline, lifecycle definitions and reporting that give the leadership team one version of the number.",
  },
  {
    n: "03",
    title: "Process Optimisation",
    body: "We map the work as it actually happens, remove the handovers that cost time, and automate what remains.",
  },
  {
    n: "04",
    title: "AI Enablement",
    body: "Applied AI inside the commercial workflow: research, summarisation, routing and quality control — governed and measurable.",
    accent: true,
  },
];

const process = [
  {
    step: "Phase 01",
    title: "Diagnose",
    body: "Two to three weeks of interviews, system audit and data review. We finish with a written point of view, not a slide deck.",
  },
  {
    step: "Phase 02",
    title: "Design",
    body: "Target operating model, CRM architecture and process blueprint, agreed with the people who will run it every day.",
  },
  {
    step: "Phase 03",
    title: "Build",
    body: "Implementation in HubSpot with clean migration, integration and documentation. Delivered in fortnightly increments.",
  },
  {
    step: "Phase 04",
    title: "Embed",
    body: "Enablement, adoption tracking and a quarterly operating rhythm so the model keeps compounding after we leave.",
  },
];

const cases = [
  {
    client: "NORTHBRIDGE",
    sector: "Industrial manufacturing",
    headline: "One CRM across nine countries and three legacy systems.",
    metric: "42% faster quote-to-order",
  },
  {
    client: "VELLUM",
    sector: "Professional services",
    headline: "A forecast the board finally trusted, four weeks after go-live.",
    metric: "±4% forecast accuracy",
  },
  {
    client: "ORVILLE & CO",
    sector: "B2B SaaS",
    headline: "AI-assisted research cut pre-call preparation from hours to minutes.",
    metric: "11 hrs saved per rep, monthly",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border px-6 pt-20 pb-0 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-[84rem]">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>HubSpot Diamond Solutions Partner</Eyebrow>
              <h1 className="display-1 mt-8 max-w-[16ch] text-graphite">
                Revenue operations, designed with intent.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-graphite-soft">
                Actuado is a consulting partner for CRM architecture, RevOps, applied AI and
                business process optimisation. We work with leadership teams who want their
                commercial engine to be deliberate rather than accumulated.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink to="/contact">Book a conversation</ButtonLink>
                <ButtonLink to="/work" variant="quiet">
                  See selected work
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="label-eyebrow">Practice areas</p>
              <ul className="mt-6 divide-y divide-border border-t border-border">
                {["CRM Architecture", "Revenue Operations", "Process Optimisation", "AI Enablement"].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between py-4 text-sm text-graphite-soft"
                    >
                      {item}
                      <ArrowUpRight className="size-4 text-gold" />
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="mt-20 overflow-hidden rounded-xl lg:mt-28">
            <img
              src={heroImage}
              alt="Two consultants in conversation in a sunlit meeting room"
              width={1600}
              height={1104}
              className="h-[38vw] max-h-[560px] min-h-[280px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section className="!py-20 lg:!py-24">
        <div className="grid gap-12 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-5xl text-graphite">{s.value}</p>
              <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="display-2 mt-6 text-graphite">
              Four disciplines, one operating model.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-graphite-soft">
              Most commercial systems fail at the seams. We work across the whole chain so the
              parts reinforce each other.
            </p>
            <div className="mt-8">
              <TextLink to="/services">Explore our services</TextLink>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:col-span-8">
            {services.map((s) => (
              <article
                key={s.title}
                className="group bg-background p-8 transition-colors duration-500 hover:bg-sand-deep lg:p-10"
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-sm text-muted-foreground">{s.n}</span>
                  {s.accent && (
                    <span className="rounded-full bg-gold-soft px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-accent-foreground uppercase">
                      AI
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-2xl text-graphite">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-graphite-soft">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* HubSpot expertise */}
      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl">
            <img
              src={architecture}
              alt="Minimal concrete and oak architecture in warm afternoon light"
              width={1600}
              height={912}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <Eyebrow>HubSpot expertise</Eyebrow>
            <h2 className="display-2 mt-6 max-w-[18ch] text-graphite">
              Diamond tier, earned in delivery.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-graphite-soft">
              We are certified across the full HubSpot suite and specialise in complex,
              multi-entity environments — custom objects, data governance, integrations and
              migrations from Salesforce, Dynamics and homegrown systems.
            </p>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-2">
              {[
                ["Sales Hub Enterprise", "Architecture & rollout"],
                ["Marketing Hub", "Lifecycle & attribution"],
                ["Service Hub", "Post-sale operations"],
                ["Operations Hub", "Data sync & programmable automation"],
              ].map(([term, desc]) => (
                <div key={term} className="bg-background p-6">
                  <dt className="text-sm font-medium text-graphite">{term}</dt>
                  <dd className="mt-1.5 text-sm text-muted-foreground">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Process timeline */}
      <Section tone="graphite">
        <Eyebrow light>How we work</Eyebrow>
        <h2 className="display-2 mt-6 max-w-[20ch] text-primary-foreground">
          A deliberate sequence, never a template.
        </h2>
        <ol className="mt-20 grid gap-14 border-t border-primary-foreground/15 pt-14 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <li key={p.title} className="relative">
              <span className="absolute -top-[3.6rem] left-0 h-[2px] w-10 bg-gold" />
              <p className="text-[11px] font-medium tracking-[0.18em] text-primary-foreground/50 uppercase">
                {p.step}
              </p>
              <h3 className="mt-4 text-2xl text-primary-foreground">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/65">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Case studies */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="display-2 mt-6 max-w-[16ch] text-graphite">
              Engagements we can talk about.
            </h2>
          </div>
          <TextLink to="/work">All case studies</TextLink>
        </div>

        <div className="mt-16 border-t border-border">
          {cases.map((c) => (
            <article
              key={c.client}
              className="group grid gap-6 border-b border-border py-12 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-4">
                <p className="font-serif text-3xl tracking-tight text-graphite lg:text-4xl">
                  {c.client}
                </p>
                <p className="mt-2 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                  {c.sector}
                </p>
              </div>
              <p className="text-lg leading-relaxed text-graphite-soft lg:col-span-5">
                {c.headline}
              </p>
              <div className="lg:col-span-3 lg:text-right">
                <p className="inline-block border-b-2 border-gold pb-1 text-sm text-graphite">
                  {c.metric}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Testimonial */}
      <Section tone="sand">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <figure className="lg:col-span-8">
            <Eyebrow>Client perspective</Eyebrow>
            <blockquote className="mt-8 font-serif text-3xl leading-[1.28] text-graphite lg:text-[2.6rem]">
              “Actuado did the unglamorous work first. They understood how our commercial teams
              actually operate before touching a single property in HubSpot — and that is why the
              system is still clean two years later.”
            </blockquote>
            <figcaption className="mt-10 text-sm text-muted-foreground">
              <span className="text-graphite">Helena Bergström</span> · Chief Revenue Officer,
              Northbridge Industries
            </figcaption>
          </figure>
          <div className="lg:col-span-4">
            <img
              src={portrait}
              alt="Portrait of Helena Bergström"
              width={1008}
              height={1200}
              loading="lazy"
              className="aspect-4/5 w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Next step</Eyebrow>
            <h2 className="display-2 mt-6 max-w-[18ch] text-graphite">
              Start with a conversation, not a proposal.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink to="/contact">Book a conversation</ButtonLink>
            <ButtonLink to="/services" variant="quiet">
              How we engage
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
