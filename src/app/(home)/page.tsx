'use client'
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Code, Database, Users, GitBranch } from 'lucide-react';
import  PixelBlast  from '@/components/PixelBlast';
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/terminal';
import { CodeBlock, github, atomOneDark, irBlack } from 'react-code-blocks';


// Theme-aware CodeBlock component
function ThemedCodeBlock({ language, text }: { language: string; text: string }) {
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
      title: 'Install the CLI',
      description: 'Scaffold your Keyloom project with one command and interactive prompts.',
      action: 'npx @keyloom/cli init',
    },
    {
      title: 'Connect your providers',
      description: 'Pick from built-in OAuth presets or supply custom credentials and Keyloom wires the callbacks for you.',
      action: 'providers: [github(), google()]',
    },
    {
      title: 'Protect routes instantly',
      description: 'Drop our middleware and hooks into your app to enforce authentication with sensible defaults.',
      action: 'const session = await getSession()',
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
              color='#dadada'
              pixelSize={3}
              patternScale={2}
              patternDensity={1.3}
              pixelSizeJitter={.45}
              speed={0.5}
              edgeFade={0.03}
              enableRipples
            />
          </div>
          {/* Dark mode dots */}
          <div className="hidden dark:block">
            <PixelBlast 
              color='#666666'
              pixelSize={3}
              patternScale={2}
              patternDensity={1.3}
              pixelSizeJitter={.45}
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
                  Open source authentication framework.{' '}
                  <Link href="/docs" className="font-medium text-fd-foreground hover:opacity-80">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read the docs <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-6xl lg:text-7xl">
                The most comprehensive{' '}
                <span className="text-fd-foreground">
                  authentication framework
                </span>{' '}
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
              Answer a few prompts and Keyloom scaffolds routes, providers, and environment variables for you.
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
                        ~/apps/my-app % npx @keyloom/cli init
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        ? What framework are you using - Next.js
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        ? Select providers - GitHub, Google
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-fd-muted-foreground">
                        ? Database adapter - Prisma + PlanetScale
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        Generated src/auth/config.ts
                      </TypingAnimation>
                      <TypingAnimation className="font-mono text-sm text-emerald-400">
                        Synced environment variables with Keyloom Vault
                      </TypingAnimation>
                      <AnimatedSpan className="font-mono text-sm text-fd-muted-foreground/80">
                        Next step: npm run dev
                      </AnimatedSpan>
                    </Terminal>
                  </div>
                  <div className="mt-6 grid gap-4 rounded-2xl border border-fd-border/30 bg-fd-muted/40 p-4 text-left sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-fd-muted-foreground">
                        Includes
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-fd-muted-foreground">
                        <li>API routes wired to Keyloom</li>
                        <li>OAuth provider presets</li>
                        <li>Example protected page</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-fd-muted-foreground">
                        Works with
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-fd-muted-foreground">
                        <li>Next.js App Router</li>
                        <li>Prisma or Drizzle</li>
                        <li>Edge or Node runtimes</li>
                      </ul>
                    </div>
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
                        <h3 className="text-base font-semibold text-fd-foreground">{step.title}</h3>
                        <p className="mt-1 text-sm text-fd-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      {step.action ? (
                        <div className="inline-flex items-center gap-2 rounded-md bg-fd-muted px-3 py-2 text-xs font-medium text-fd-muted-foreground">
                          <span className="font-mono text-fd-foreground">{step.action}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border border-dashed border-fd-border/50 bg-fd-background/40 p-6 text-sm text-fd-muted-foreground shadow-inner">
                  <p className="font-semibold text-fd-foreground">Prefer to follow along?</p>
                  <p className="mt-2">
                    Watch the full walkthrough to see environment syncing, provider setup, and deployment in real time.
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

      {/* Getting Started Section */}
      <section className="py-24 sm:py-32 bg-fd-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-6 text-lg leading-8 text-fd-muted-foreground">
              Join thousands of developers building secure applications with Keyloom.
              Get up and running in under 5 minutes.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-fd-foreground">
                  <div className="h-5 w-5 flex-none rounded-full bg-fd-secondary flex items-center justify-center">
                    <span className="text-xs font-bold text-fd-foreground">1</span>
                  </div>
                  Install Keyloom
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-fd-muted-foreground">
                  <p className="flex-auto">
                    Add Keyloom to your project with a single command and initialize your configuration.
                  </p>
                  <div className="mt-4 rounded border bg-fd-card p-3 text-sm font-mono text-fd-card-foreground">
                    npm install @keyloom/core
                  </div>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-fd-foreground">
                  <div className="h-5 w-5 flex-none rounded-full bg-fd-secondary flex items-center justify-center">
                    <span className="text-xs font-bold text-fd-foreground">2</span>
                  </div>
                  Configure Providers
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-fd-muted-foreground">
                  <p className="flex-auto">
                    Set up OAuth providers like GitHub, Google, or create custom ones for your needs.
                  </p>
                  <div className="mt-4 rounded border bg-fd-card p-3 text-sm font-mono text-fd-card-foreground">
                    providers: [github(), google()]
                  </div>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-fd-foreground">
                  <div className="h-5 w-5 flex-none rounded-full bg-fd-secondary flex items-center justify-center">
                    <span className="text-xs font-bold text-fd-foreground">3</span>
                  </div>
                  Start Authenticating
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-fd-muted-foreground">
                  <p className="flex-auto">
                    Use our React hooks, middleware, and utilities to secure your application.
                  </p>
                  <div className="mt-4 rounded border bg-fd-card p-3 text-sm font-mono text-fd-card-foreground">
                    const {`{ user }`} = useSession()
                  </div>
                </dd>
              </div>
            </dl>
            <div className="mt-16 flex justify-center">
              <Link
                href="/docs/get-started"
                className="rounded-md bg-fd-primary px-3.5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-sm transition-colors hover:bg-fd-primary/80"
              >
                Start building now
              </Link>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}


