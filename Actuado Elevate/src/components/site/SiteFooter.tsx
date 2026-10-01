import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-sand">
      <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl text-graphite">Actuado</span>
              <span className="h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-gold" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              HubSpot Diamond Solutions Partner. CRM, RevOps, AI and business process
              optimisation for companies that take their operating model seriously.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="label-eyebrow">Navigate</p>
              <div className="mt-5 flex flex-col gap-3 text-sm text-graphite-soft">
                <Link to="/services" className="hover:text-graphite">
                  Services
                </Link>
                <Link to="/work" className="hover:text-graphite">
                  Work
                </Link>
                <Link to="/about" className="hover:text-graphite">
                  About
                </Link>
                <Link to="/contact" className="hover:text-graphite">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <p className="label-eyebrow">Contact</p>
              <div className="mt-5 flex flex-col gap-3 text-sm text-graphite-soft">
                <a href="mailto:hello@actuado.com" className="hover:text-graphite">
                  hello@actuado.com
                </a>
                <span>+34 910 000 000</span>
                <span>Madrid · Amsterdam</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Actuado. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
