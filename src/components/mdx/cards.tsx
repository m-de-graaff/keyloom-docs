import clsx from "clsx";
import type { ReactNode } from "react";

type CardsProps = {
  children: ReactNode;
  columns?: string;
};

type CardProps = {
  title: string;
  href?: string;
  icon?: ReactNode;
  children?: ReactNode;
};

const baseCardClass = "group flex h-full flex-col rounded-lg border bg-card/60 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-primary/50";

export function Cards({ children, columns = "sm:grid-cols-2 xl:grid-cols-3" }: CardsProps) {
  return <div className={clsx("grid gap-4", columns)}>{children}</div>;
}

export function Card({ title, href, icon, children }: CardProps) {
  const content = (
    <div className={baseCardClass}>
      <div className="flex items-start gap-3">
        {icon && <span className="text-primary/80">{icon}</span>}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">{title}</h3>
          {children && (
            <div className="text-sm text-muted-foreground/90">
              {typeof children === "string" ? <p>{children}</p> : children}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!href) return content;
  return (
    <a href={href} className="focus:outline-none">
      {content}
    </a>
  );
}
