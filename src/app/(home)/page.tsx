"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PixelBlast from "@/components/PixelBlast";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/terminal";
import { CodeBlock, github, atomOneDark, irBlack } from "react-code-blocks";

// Theme-aware CodeBlock component
function ThemedCodeBlock({
  language,
  text,
}: {
  language: string;
  text: string;
}) {
  return (
    <>
      {/* Light mode code block */}
      <div className="block dark:hidden">
        <CodeBlock
          language={language}
          text={text}
          theme={github}
          showLineNumbers={false}
        />
      </div>
      {/* Dark mode code block */}
      <div className="hidden dark:block">
        <CodeBlock
          language={language}
          text={text}
          theme={irBlack}
          showLineNumbers={false}
        />
      </div>
    </>
  );
}

export default function HomePage() {
  const quickSetupSteps = [
    {
      title: "Install the CLI",
      description:
        "Add the dev-only CLI and run the interactive init to detect your framework, install deps, and scaffold config.",
      action: "pnpm add -D @keyloom/cli && npx keyloom init",
    },
    {
      title: "Connect your providers",
      description:
        "Configure providers in keyloom.config.ts and set client IDs/secrets in .env (GitHub, Google, Discord, or custom).",
      action: "providers: [github(), google()]",
    },
    {
      title: "Protect routes instantly",
      description:
        "Enable the middleware and route manifest for immediate access control across pages and APIs.",
      action: "export default createAuthMiddleware(config, { routes })",
    },
  ];

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          {/* Light mode dots */}
          <div className="block dark:hidden">
            <PixelBlast
              color="#dadada"
              pixelSize={3}
              patternScale={2}
              patternDensity={1.3}
              pixelSizeJitter={0.45}
              speed={0.5}
              edgeFade={0.03}
              enableRipples
            />
          </div>
          {/* Dark mode dots */}
          <div className="hidden dark:block">
            <PixelBlast
              color="#666666"
              pixelSize={3}
              patternScale={2}
              patternDensity={1.3}
              pixelSizeJitter={0.45}
              speed={0.5}
              edgeFade={0.03}
              enableRipples
            />
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 w-full">
          <div className="mx-auto max-w-6xl text-center">
            {/* Subtle background for better text visibility */}
            <div className="absolute inset-0 rounded-3xl"></div>
            {/* Make text non-interactive so PixelBlast can be interacted with */}
            <div className="relative px-8 py-16 sm:px-12 sm:py-20 pointer-events-none">
              <div className="mb-8 flex justify-center">
                {/* Make the badge interactive */}
                <div className="relative rounded-full border bg-fd-secondary/90 px-4 py-2 text-sm leading-6 text-fd-muted-foreground transition-colors hover:bg-fd-secondary pointer-events-auto">
                  Open source authentication framework.{" "}
                  <Link
                    href="/docs"
                    className="font-medium text-fd-foreground hover:opacity-80"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read the docs <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-6xl lg:text-7xl">
                The most comprehensive{" "}
                <span className="text-fd-foreground">
                  authentication framework
                </span>{" "}
                for TypeScript
              </h1>
              <div className="mt-12 flex items-center justify-center gap-x-6">
                {/* Make the button interactive */}
                <Link
                  href="/docs/get-started"
                  className="rounded-md bg-fd-primary px-6 py-3 text-base font-semibold text-fd-primary-foreground transition-all hover:bg-fd-primary/90 pointer-events-auto"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-base font-semibold leading-7 text-fd-muted-foreground">
              Quick Setup
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">
              Get authentication running in minutes
            </p>
            <p className="mt-6 text-lg leading-8 text-fd-muted-foreground">
              Answer a few prompts and Keyloom scaffolds routes, providers, and
              environment variables for you.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative isolate">
                <div
                  className="absolute -top-12 -left-16 h-48 w-48 rounded-full bg-fd-primary/10 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 rounded-3xl border border-fd-border/40 bg-gradient-to-br from-fd-card via-fd-card/90 to-fd-background/80 shadow-xl backdrop-blur-sm"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-3xl border border-transparent p-6 sm:p-8">
                  <div className="flex items-center justify-between border-b border-fd-border/40 pb-4">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
                      CLI flow
                    </span>
                    <span className="text-xs text-fd-muted-foreground/80">
                      ~5 min setup
                    </span>
                  </div>
                  <div className="mt-6">
                    <Terminal className="max-w-none border border-fd-border/40 bg-fd-background/90 text-left shadow-lg">
                      <TypingAnimation className="font-mono text-sm text-fd-primary">
                        ~/apps/my-app % npx keyloom init
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        ▲ Next.js App Router project detected
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        Keyloom Init
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        › Step 1 of 6: Project configuration
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        ? Session strategy (Use arrow keys) › database
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        ? Database adapter › prisma
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        ? OAuth providers › ◉ GitHub ◉ Google ○ Discord
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        ? Enable RBAC (Role-Based Access Control)? › Yes
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        ? Setup default roles and permissions? › Yes
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        › Step 2 of 6: Install dependencies
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        ✔ Dependencies installed
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        › Step 3 of 6: Generate configuration
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        ✔ Wrote keyloom.config.ts
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        › Step 4 of 6: Scaffold files
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        ✔ Wrote app/api/auth/[...keyloom]/route.ts
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        ✔ Wrote middleware.ts
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        ✔ Wrote .env.example
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        › Step 5 of 6: Generate migration artifacts
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        ✔ Generated migration artifacts
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        › Step 6 of 6: Generate route manifest
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        ✔ Route manifest generated
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        ✔ Wrote .keyloom/routes.generated.ts
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        ✔ Wrote .keyloom/routes.generated.json
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        Summary
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        ✔ Created 4 file(s)
                      </TypingAnimation>
                      <AnimatedSpan className="font-mono text-sm text-fd-muted-foreground/80">
                        Next steps: configure keyloom.config, set env vars, run
                        migrations
                      </AnimatedSpan>
                    </Terminal>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {quickSetupSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative flex gap-4 rounded-2xl border border-fd-border/50 bg-fd-card/80 p-6 shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-fd-secondary text-sm font-semibold text-fd-foreground">
                      {index + 1}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-base font-semibold text-fd-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm text-fd-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      {step.action ? (
                        <div className="inline-flex items-center gap-2 rounded-md bg-fd-muted px-3 py-2 text-xs font-medium text-fd-muted-foreground">
                          <span className="font-mono text-fd-foreground">
                            {step.action}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border border-dashed border-fd-border/50 bg-fd-background/40 p-6 text-sm text-fd-muted-foreground shadow-inner">
                  <p className="font-semibold text-fd-foreground">
                    Prefer to follow along?
                  </p>
                  <p className="mt-2">
                    Watch the full walkthrough to see environment syncing,
                    provider setup, and deployment in real time.
                  </p>
                  <Link
                    href="/docs/get-started"
                    className="mt-4 inline-flex items-center gap-2 rounded-md bg-fd-primary/10 px-3 py-2 text-xs font-semibold text-fd-primary transition-colors hover:bg-fd-primary/20"
                  >
                    Open the guided tutorial <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
