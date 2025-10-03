import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { showcaseItems, ShowcaseItem } from "@/data/showcase";

export const metadata: Metadata = {
  title: "Showcase - Keyloom",
  description:
    "Discover amazing projects and applications built with Keyloom authentication framework.",
};

interface ShowcaseCardProps {
  item: ShowcaseItem;
}

function ShowcaseCard({ item }: ShowcaseCardProps) {
  return (
    <div className="group relative flex h-full flex-col rounded-lg border border-fd-border bg-fd-card/60 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-primary/50">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 focus:outline-none"
        aria-label={`Visit ${item.name}`}
      >
        <span className="sr-only">Visit {item.name}</span>
      </a>

      <div className="flex flex-1 flex-col">
        {item.image && (
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-fd-muted/50 p-2">
            <img
              src={item.image}
              alt={`${item.name} logo`}
              className="h-full w-full object-contain"
            />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-fd-foreground group-hover:text-fd-primary transition-colors">
              {item.name}
            </h3>
            <ExternalLink className="h-4 w-4 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <p className="mt-2 text-sm text-fd-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-fd-secondary px-2 py-1 text-xs font-medium text-fd-secondary-foreground"
              >
                {tag}
              </span>
            ))}
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
        <h3 className="text-lg font-semibold text-fd-foreground mb-2">
          No showcase items yet
        </h3>
        <p className="text-fd-muted-foreground mb-6">
          We're looking for amazing projects built with Keyloom to feature here.
          Have you built something awesome with Keyloom?
        </p>
        <div className="space-y-4">
          <p className="text-sm text-fd-muted-foreground">
            To add your project to the showcase:
          </p>
          <ol className="text-sm text-fd-muted-foreground text-left space-y-2 max-w-md mx-auto">
            <li>
              1. Edit{" "}
              <code className="bg-fd-muted px-1 py-0.5 rounded text-xs">
                src/data/showcase.ts
              </code>
            </li>
            <li>
              2. Add your project details to the{" "}
              <code className="bg-fd-muted px-1 py-0.5 rounded text-xs">
                showcaseItems
              </code>{" "}
              array
            </li>
            <li>
              3. Include name, description, URL, and optionally an image and
              tags
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <Link
            href="https://github.com/m-de-graaff/keyloom-docs"
            className="inline-flex items-center gap-2 rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            <Github className="h-4 w-4" />
            Contribute on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-6xl">
              Showcase
            </h1>
            <p className="mt-6 text-lg leading-8 text-fd-muted-foreground">
              Discover amazing projects and applications built with Keyloom.
              From startups to enterprise solutions, see how developers are
              using Keyloom to build secure, scalable authentication systems.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {showcaseItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {showcaseItems.map((item, index) => (
                <ShowcaseCard key={index} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </main>
  );
}
