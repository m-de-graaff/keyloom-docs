import Link from 'next/link';
import { ArrowRight, Shield, Zap, Code, Database, Users, GitBranch } from 'lucide-react';
import { JetBrains_Mono } from 'next/font/google';
import  PixelBlast  from '@/components/PixelBlast';
import { useEffect } from 'react';
const mono = JetBrains_Mono({ subsets: ['latin'] });


export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-fd-muted">
        <div className="absolute inset-0">
          <PixelBlast 
            pixelSize={4}
            patternScale={2}
            patternDensity={1}
            pixelSizeJitter={0}
            speed={0.5}
            edgeFade={0.25}
            enableRipples
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full border bg-fd-secondary/60 px-3 py-1 text-sm leading-6 text-fd-muted-foreground transition-colors hover:bg-fd-secondary">
                Open source authentication framework.{' '}
                <Link href="/docs" className="font-medium text-fd-foreground hover:opacity-80">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read the docs <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-6xl">
              The most comprehensive{' '}
              <span className="text-fd-foreground">
                authentication framework
              </span>{' '}
              for TypeScript
            </h1>
            <p className="mt-6 text-lg leading-8 text-fd-muted-foreground">
              Build secure, scalable authentication with zero vendor lock-in.
              Full control over your data, complete customization, and enterprise-ready features.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/docs/get-started"
                className="rounded-md bg-fd-primary px-3.5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-sm transition-colors hover:bg-fd-primary/80"
              >
                Get started
              </Link>
              <Link
                href="/docs"
                className="text-sm font-semibold leading-6 text-fd-foreground transition-colors hover:opacity-80"
              >
                View documentation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-fd-muted-foreground">
              Quick Setup
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">
              Get authentication running in minutes
            </p>
            <p className="mt-6 text-lg leading-8 text-fd-muted-foreground">
              One command to initialize, configure, and deploy production-ready authentication.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold leading-8 text-fd-foreground">
                  Initialize with CLI
                </h3>
                <div className="mt-4 overflow-auto rounded-lg border bg-fd-card p-4 text-sm shadow-sm">
                  <div className="mb-2 text-xs uppercase tracking-wider text-fd-muted-foreground">Terminal</div>
                  <pre className={`${mono.className} leading-6 text-fd-card-foreground`}>
{`$ npx keyloom init
✓ Created keyloom.config.ts
✓ Added API routes
✓ Generated database schema
✓ Ready to authenticate!`}
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-8 text-fd-foreground">
                  Configuration
                </h3>
                <div className="mt-4 overflow-auto rounded-lg border bg-fd-card p-4 text-sm shadow-sm">
                  <div className="mb-2 text-xs uppercase tracking-wider text-fd-muted-foreground">keyloom.config.ts</div>
                  <pre className={`${mono.className} leading-6 text-fd-card-foreground`}>
{`export default defineKeyloom({
  adapter: prismaAdapter(prisma),
  providers: [
    github({ clientId, clientSecret }),
    google({ clientId, clientSecret }),
  ],
  rbac: { enabled: true },
  session: { strategy: "database" },
});`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-fd-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-fd-muted-foreground">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">
              Enterprise-grade authentication features
            </p>
            <p className="mt-6 text-lg leading-8 text-fd-muted-foreground">
              From simple OAuth to complex enterprise SSO, Keyloom handles it all with security and performance in mind.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-fd-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg border bg-fd-secondary">
                    <Shield className="h-6 w-6 text-fd-secondary-foreground" aria-hidden="true" />
                  </div>
                  Security First
                </dt>
                <dd className="mt-2 text-base leading-7 text-fd-muted-foreground">
                  Built-in CSRF protection, secure session management, and industry-standard OAuth 2.0 flows.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-fd-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg border bg-fd-secondary">
                    <Zap className="h-6 w-6 text-fd-secondary-foreground" aria-hidden="true" />
                  </div>
                  Lightning Fast
                </dt>
                <dd className="mt-2 text-base leading-7 text-fd-muted-foreground">
                  Optimized for performance with edge runtime support, efficient database queries, and smart caching.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-fd-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg border bg-fd-secondary">
                    <Code className="h-6 w-6 text-fd-secondary-foreground" aria-hidden="true" />
                  </div>
                  TypeScript Native
                </dt>
                <dd className="mt-2 text-base leading-7 text-fd-muted-foreground">
                  Full type safety, excellent IntelliSense, and compile-time error checking for robust applications.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-fd-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg border bg-fd-secondary">
                    <Database className="h-6 w-6 text-fd-secondary-foreground" aria-hidden="true" />
                  </div>
                  Database Agnostic
                </dt>
                <dd className="mt-2 text-base leading-7 text-fd-muted-foreground">
                  Works with PostgreSQL, MySQL, MongoDB, SQLite, and more. Bring your own database or use our adapters.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-fd-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg border bg-fd-secondary">
                    <Users className="h-6 w-6 text-fd-secondary-foreground" aria-hidden="true" />
                  </div>
                  Built-in RBAC
                </dt>
                <dd className="mt-2 text-base leading-7 text-fd-muted-foreground">
                  Organizations, roles, permissions, and invitations out of the box. Scale from simple to enterprise.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-fd-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg border bg-fd-secondary">
                    <GitBranch className="h-6 w-6 text-fd-secondary-foreground" aria-hidden="true" />
                  </div>
                  Zero Vendor Lock-in
                </dt>
                <dd className="mt-2 text-base leading-7 text-fd-muted-foreground">
                  Open source, self-hosted, and fully customizable. Your data stays in your control forever.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-fd-muted-foreground">
              Why choose Keyloom?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">
              Better than the alternatives
            </p>
            <p className="mt-6 text-lg leading-8 text-fd-muted-foreground">
              Compare Keyloom with other authentication solutions and see why developers are making the switch.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="overflow-hidden rounded-lg border bg-fd-card shadow-sm">
              <table className="min-w-full divide-y">
                <thead className="bg-fd-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
                      Feature
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
                      Keyloom
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
                      Auth0
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
                      Firebase
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
                      Supabase
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y bg-fd-card">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-fd-foreground">
                      Open Source
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-fd-foreground">
                      Self-Hosted
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-fd-foreground">
                      Built-in RBAC
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-fd-foreground">
                      Edge Runtime
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-fd-foreground">
                      TypeScript First
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-fd-foreground">
                      Zero Usage Fees
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-primary"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-fd-muted-foreground/50"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/docs/get-started/comparison"
                className="text-sm font-semibold text-fd-foreground hover:opacity-80"
              >
                View detailed comparison <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
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
