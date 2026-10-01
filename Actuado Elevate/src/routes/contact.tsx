import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Actuado — Book a Conversation" },
      {
        name: "description",
        content:
          "Talk to Actuado about CRM architecture, revenue operations, AI enablement or process optimisation on HubSpot.",
      },
      { property: "og:title", content: "Contact Actuado — Book a Conversation" },
      {
        property: "og:description",
        content: "A 45-minute conversation with a partner. No pitch deck.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="display-1 mt-8 max-w-[12ch] text-graphite">
            Book a conversation.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-graphite-soft">
            Forty-five minutes with a partner. We will ask about your operating model, tell you
            plainly whether we are the right firm, and put our thinking in writing afterwards.
          </p>
          <dl className="mt-12 space-y-6 border-t border-border pt-10 text-sm">
            <div>
              <dt className="label-eyebrow">Email</dt>
              <dd className="mt-2">
                <a href="mailto:hello@actuado.com" className="link-underline text-graphite">
                  hello@actuado.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-eyebrow">Offices</dt>
              <dd className="mt-2 text-graphite-soft">
                Calle de Serrano 21, Madrid · Keizersgracht 62, Amsterdam
              </dd>
            </div>
          </dl>
        </div>

        <form
          className="rounded-xl border border-border bg-sand p-8 shadow-soft lg:col-span-7 lg:p-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name" name="name" />
            <Field label="Work email" name="email" type="email" />
            <Field label="Company" name="company" />
            <Field label="Role" name="role" />
          </div>

          <div className="mt-6">
            <label className="label-eyebrow" htmlFor="topic">
              Area of interest
            </label>
            <select
              id="topic"
              name="topic"
              className="mt-3 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-graphite outline-none focus:border-gold"
            >
              <option>CRM architecture</option>
              <option>Revenue operations</option>
              <option>Process optimisation</option>
              <option>AI enablement</option>
              <option>Not sure yet</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="label-eyebrow" htmlFor="message">
              What are you working through?
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-3 w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm text-graphite outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-graphite px-6 py-3 text-sm text-primary-foreground transition-colors hover:bg-graphite-soft"
          >
            Request a conversation
          </button>
          <p className="mt-4 text-xs text-muted-foreground">
            We reply within one business day.
          </p>
        </form>
      </div>
    </Section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="label-eyebrow" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="mt-3 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-graphite outline-none focus:border-gold"
      />
    </div>
  );
}
