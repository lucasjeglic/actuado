import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "sand" | "graphite";
}) {
  return (
    <section
      className={cn(
        "px-6 py-24 lg:px-10 lg:py-36",
        tone === "sand" && "bg-sand",
        tone === "graphite" && "bg-graphite text-primary-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-[84rem]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={cn("label-eyebrow rule-gold", light && "text-primary-foreground/60")}>
      {children}
    </p>
  );
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to as never}
      className="group inline-flex items-center gap-2 text-sm text-graphite transition-colors hover:text-graphite-soft"
    >
      <span className="link-underline">{children}</span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function ButtonLink({
  to,
  children,
  variant = "solid",
}: {
  to: string;
  children: ReactNode;
  variant?: "solid" | "quiet" | "gold";
}) {
  return (
    <Link
      to={to as never}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm transition-colors duration-300",
        variant === "solid" && "bg-graphite text-primary-foreground hover:bg-graphite-soft",
        variant === "quiet" &&
          "border border-graphite/15 text-graphite hover:border-graphite/40",
        variant === "gold" && "bg-gold text-accent-foreground hover:bg-gold/85",
      )}
    >
      {children}
    </Link>
  );
}
