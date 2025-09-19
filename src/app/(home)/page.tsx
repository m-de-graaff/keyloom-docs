import Link from 'next/link';
import { ArrowRight, Shield, Zap, Code, Database, Users, GitBranch } from 'lucide-react';
import { JetBrains_Mono } from 'next/font/google';
const mono = JetBrains_Mono({ subsets: ['latin'] });


export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-100/10 dark:hover:ring-gray-100/20">
                Open source authentication framework.{' '}
                <Link href="/docs" className="font-semibold text-blue-600 dark:text-blue-400">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read the docs <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              The most comprehensive{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                authentication framework
              </span>{' '}
              for TypeScript
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Build secure, scalable authentication with zero vendor lock-in.
              Full control over your data, complete customization, and enterprise-ready features.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/docs/get-started"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Get started
              </Link>
              <Link
                href="/docs"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
              Quick Setup
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Get authentication running in minutes
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              One command to initialize, configure, and deploy production-ready authentication.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  Initialize with CLI
                </h3>
                <div className="mt-4 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm shadow-sm">
                  <div className="mb-2 text-xs uppercase tracking-wider text-slate-400">Terminal</div>
                  <pre className={`${mono.className} leading-6 text-slate-50`}>
{`$ npx keyloom init
✓ Created keyloom.config.ts
✓ Added API routes
✓ Generated database schema
✓ Ready to authenticate!`}
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  Configuration
                </h3>
                <div className="mt-4 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm shadow-sm">
                  <div className="mb-2 text-xs uppercase tracking-wider text-slate-400">keyloom.config.ts</div>
                  <pre className={`${mono.className} leading-6 text-slate-50`}>
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
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Enterprise-grade authentication features
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              From simple OAuth to complex enterprise SSO, Keyloom handles it all with security and performance in mind.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Security First
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Built-in CSRF protection, secure session management, and industry-standard OAuth 2.0 flows.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Lightning Fast
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Optimized for performance with edge runtime support, efficient database queries, and smart caching.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Code className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  TypeScript Native
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Full type safety, excellent IntelliSense, and compile-time error checking for robust applications.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Database className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Database Agnostic
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Works with PostgreSQL, MySQL, MongoDB, SQLite, and more. Bring your own database or use our adapters.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Built-in RBAC
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Organizations, roles, permissions, and invitations out of the box. Scale from simple to enterprise.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <GitBranch className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Zero Vendor Lock-in
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
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
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
              Why choose Keyloom?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Better than the alternatives
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Compare Keyloom with other authentication solutions and see why developers are making the switch.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow ring-1 ring-gray-200 dark:ring-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Feature
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Keyloom
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Auth0
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Firebase
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Supabase
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      Open Source
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      Self-Hosted
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      Built-in RBAC
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      Edge Runtime
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      TypeScript First
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      Zero Usage Fees
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/docs/get-started/comparison"
                className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                View detailed comparison <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-24 sm:py-32 bg-blue-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Join thousands of developers building secure applications with Keyloom.
              Get up and running in under 5 minutes.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="h-5 w-5 flex-none rounded-full bg-blue-400 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-900">1</span>
                  </div>
                  Install Keyloom
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-blue-100">
                  <p className="flex-auto">
                    Add Keyloom to your project with a single command and initialize your configuration.
                  </p>
                  <div className="mt-4 rounded bg-blue-700 p-3 text-sm font-mono text-blue-100">
                    npm install @keyloom/core
                  </div>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="h-5 w-5 flex-none rounded-full bg-blue-400 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-900">2</span>
                  </div>
                  Configure Providers
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-blue-100">
                  <p className="flex-auto">
                    Set up OAuth providers like GitHub, Google, or create custom ones for your needs.
                  </p>
                  <div className="mt-4 rounded bg-blue-700 p-3 text-sm font-mono text-blue-100">
                    providers: [github(), google()]
                  </div>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="h-5 w-5 flex-none rounded-full bg-blue-400 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-900">3</span>
                  </div>
                  Start Authenticating
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-blue-100">
                  <p className="flex-auto">
                    Use our React hooks, middleware, and utilities to secure your application.
                  </p>
                  <div className="mt-4 rounded bg-blue-700 p-3 text-sm font-mono text-blue-100">
                    const {`{ user }`} = useSession()
                  </div>
                </dd>
              </div>
            </dl>
            <div className="mt-16 flex justify-center">
              <Link
                href="/docs/get-started"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
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
