import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow, ButtonLink } from "@/components/site/primitives";
import architecture from "@/assets/texture-architecture.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Actuado — A Consulting Practice for RevOps" },
      {
        name: "description",
        content:
          "Actuado is a senior consulting practice for CRM, RevOps, AI and process design. How we think, how we staff, and what we refuse to do.",
      },
      { property: "og:title", content: "About Actuado — A Consulting Practice for RevOps" },
      {
        property: "og:description",
        content: "Senior-only teams, written points of view, and systems built to be handed over.",
      },
    ],
  }),
  component: About,
});

const principles = [
  ["Senior people, on the work", "The consultants in the diagnostic are the consultants in delivery. No pyramid staffing."],
  ["A written point of view", "Every engagement produces a document that states what we believe and why — signed, and revisited."],
  ["Built to be handed over", "Documentation, enablement and an operating rhythm are part of scope, not an upsell."],
  ["Fewer clients, deeper work", "We take on a limited number of mandates each quarter so attention is never divided."],
];

function About() {
  return (
    <>
      <Section className="border-b border-border">
        <Eyebrow>About</Eyebrow>
        <h1 className="display-1 mt-8 max-w-[17ch] text-graphite">
          A small practice, built for consequential decisions.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-graphite-soft">
          Actuado was founded by operators who ran revenue organisations before they advised them.
          We remain deliberately small: enough scale to deliver enterprise programmes, small
          enough that the partners stay on the work.
        </p>
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Principles</Eyebrow>
            <h2 className="display-2 mt-6 max-w-[16ch] text-graphite">
              How we choose to work.
            </h2>
          </div>
          <dl className="divide-y divide-border border-t border-border lg:col-span-7">
            {principles.map(([title, body]) => (
              <div key={title} className="py-8">
                <dt className="text-xl text-graphite">{title}</dt>
                <dd className="mt-3 max-w-xl text-base leading-relaxed text-graphite-soft">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>The firm</Eyebrow>
            <h2 className="display-2 mt-6 max-w-[18ch] text-graphite">
              Madrid and Amsterdam. Clients across Europe.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-graphite-soft">
              Twenty-eight consultants across architecture, operations, data and change. HubSpot
              Diamond Solutions Partner since 2021, with certifications across the full suite and
              a dedicated applied-AI practice.
            </p>
            <div className="mt-10">
              <ButtonLink to="/contact" variant="quiet">
                Meet the team
              </ButtonLink>
            </div>
          </div>
          <img
            src={architecture}
            alt="Warm minimal architecture detail"
            width={1600}
            height={912}
            loading="lazy"
            className="aspect-4/3 w-full rounded-xl object-cover"
          />
        </div>
      </Section>
    </>
  );
}
