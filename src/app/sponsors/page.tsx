import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Heart, Github } from "lucide-react";
import { sponsors, SponsorItem } from "@/data/sponsors";

export const metadata: Metadata = {
  title: "Sponsors - Keyloom",
  description:
    "Meet the amazing sponsors and supporters who make Keyloom possible.",
};

interface SponsorCardProps {
  sponsor: SponsorItem;
}

function SponsorCard({ sponsor }: SponsorCardProps) {
  const tierColors = {
    platinum:
      "border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 dark:border-slate-600",
    gold: "border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-600",
    silver:
      "border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-600",
    bronze:
      "border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 dark:border-orange-600",
  };

  const cardClass = sponsor.tier
    ? `${tierColors[sponsor.tier]} border-2`
    : "border border-fd-border bg-fd-card/60";

  return (
    <div
      className={`group relative flex h-full flex-col rounded-lg p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-primary/50 ${cardClass}`}
    >
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 focus:outline-none"
        aria-label={`Visit ${sponsor.name}`}
      >
        <span className="sr-only">Visit {sponsor.name}</span>
      </a>

      <div className="flex flex-1 flex-col">
        {sponsor.logo && (
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-white/50 dark:bg-black/20 p-2">
            <img
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              className="h-full w-full object-contain"
            />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-fd-foreground group-hover:text-fd-primary transition-colors">
              {sponsor.name}
            </h3>
            <ExternalLink className="h-4 w-4 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <p className="mt-2 text-sm text-fd-muted-foreground leading-relaxed">
            {sponsor.description}
          </p>
        </div>

        {sponsor.tier && (
          <div className="mt-4">
            <span className="inline-flex items-center rounded-md bg-fd-secondary/50 px-2 py-1 text-xs font-medium text-fd-secondary-foreground capitalize">
              {sponsor.tier} Sponsor
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="rounded-lg border border-dashed border-fd-border/50 bg-fd-background/40 p-12">
        <Heart className="mx-auto h-12 w-12 text-fd-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold text-fd-foreground mb-2">
          Looking for sponsors
        </h3>
        <p className="text-fd-muted-foreground mb-6">
          Keyloom is an open source project that relies on the support of
          sponsors and contributors to continue development and maintenance.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-fd-muted-foreground">
            To add a sponsor to this page:
          </p>
          <ol className="text-sm text-fd-muted-foreground text-left space-y-2 max-w-md mx-auto">
            <li>
              1. Edit{" "}
              <code className="bg-fd-muted px-1 py-0.5 rounded text-xs">
                src/data/sponsors.ts
              </code>
            </li>
            <li>
              2. Add sponsor details to the{" "}
              <code className="bg-fd-muted px-1 py-0.5 rounded text-xs">
                sponsors
              </code>{" "}
              array
            </li>
            <li>
              3. Include name, description, URL, and optionally a logo and tier
            </li>
          </ol>
        </div>
        <div className="mt-6 space-x-4">
          <Link
            href="https://github.com/sponsors/m-de-graaff"
            className="inline-flex items-center gap-2 rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            <Heart className="h-4 w-4" />
            Become a Sponsor
          </Link>
          <Link
            href="https://github.com/m-de-graaff/keyloom-docs"
            className="inline-flex items-center gap-2 rounded-md border border-fd-border bg-fd-background px-4 py-2 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-muted"
          >
            <Github className="h-4 w-4" />
            Contribute
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SponsorsPage() {
  // Group sponsors by tier for better organization
  const sponsorsByTier = sponsors.reduce((acc, sponsor) => {
    const tier = sponsor.tier || "other";
    if (!acc[tier]) acc[tier] = [];
    acc[tier].push(sponsor);
    return acc;
  }, {} as Record<string, SponsorItem[]>);

  const tierOrder = ["platinum", "gold", "silver", "bronze", "other"];
  const tierTitles = {
    platinum: "Platinum Sponsors",
    gold: "Gold Sponsors",
    silver: "Silver Sponsors",
    bronze: "Bronze Sponsors",
    other: "Supporters",
  };

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-6xl">
              Sponsors
            </h1>
            <p className="mt-6 text-lg leading-8 text-fd-muted-foreground">
              Meet the amazing sponsors and supporters who make Keyloom
              possible. Their contributions help us maintain and improve the
              framework for the entire community.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {sponsors.length > 0 ? (
            <div className="space-y-16">
              {tierOrder.map((tier) => {
                const tierSponsors = sponsorsByTier[tier];
                if (!tierSponsors || tierSponsors.length === 0) return null;

                return (
                  <div key={tier}>
                    <h2 className="text-2xl font-bold text-fd-foreground mb-8 text-center">
                      {tierTitles[tier as keyof typeof tierTitles]}
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {tierSponsors.map((sponsor, index) => (
                        <SponsorCard key={index} sponsor={sponsor} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </main>
  );
}
