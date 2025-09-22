"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/terminal";
import { CodeBlock, github, atomOneDark, irBlack } from "react-code-blocks";
import { CodeComparison } from "@/components/code-comparison";

import LogoLoop from "@/components/loop";

export default function HomePage() {
  const quickSetupSteps = [
    {
      title: "Install the CLI",
      description:
        "Add the dev-only CLI and run the interactive init to detect your framework, install deps, and scaffold config.",
      action: "pnpm add -g @keyloom/cli",
    },
    {
      title: "Install Hooks",
      description: "Lets you access auth state and user info on the client.",
      action: "pnpm add @keyloom/react",
    },
    {
      title: "Install UI",
      description:
        "Don't want the hastle of building your own auth UI? Use our UI library.",
      action: "pnpm add @keyloom/ui",
    },
  ];

  const beforeFiles = [
    {
      filename: "lib/auth.ts",
      language: "typescript",
      code: `import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          include: { accounts: true, sessions: true }
        });
        return {
          ...session,
          user: { ...session.user, id: token.sub, role: user?.role }
        };
      }
      return session;
    },
    jwt: ({ token, user, account }) => {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
    signIn: async ({ user, account, profile }) => {
      try {
        if (account?.provider === 'github' || account?.provider === 'google') {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                role: 'USER'
              }
            });
          }
        }
        return true;
      } catch (error) {
        console.error('Sign in error:', error);
        return false;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    signOut: '/auth/signout'
  },
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  events: {
    signIn: async ({ user }) => {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() }
      });
    }
  }
};`,
    },
    {
      filename: "middleware.ts",
      language: "typescript",
      code: `import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin routes
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Protected API routes
    if (pathname.startsWith('/api/protected') && !token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (pathname.startsWith('/dashboard')) return !!token;
        if (pathname.startsWith('/admin')) return token?.role === 'ADMIN';
        if (pathname.startsWith('/api/protected')) return !!token;

        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/protected/:path*']
};`,
    },
    {
      filename: "api/auth/[...nextauth].ts",
      language: "typescript",
      code: `import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

export default NextAuth(authOptions);`,
    },
  ];

  const afterFiles = [
    {
      filename: "keyloom.config.ts",
      language: "typescript",
      code: `import { defineKeyloom } from '@keyloom/core';
import { PrismaAdapter } from '@keyloom/adapters';
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
import github from '@keyloom/providers/github';
import google from '@keyloom/providers/google';

export default defineKeyloom({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL!,
  session: { strategy: 'database', ttlMinutes: 60, rolling: true },
  adapter: PrismaAdapter(db),
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  secrets: { authSecret: process.env.AUTH_SECRET! },
});`,
    },
    {
      filename: "middleware.ts",
      language: "typescript",
      code: `import { createAuthMiddleware } from '@keyloom/nextjs/middleware';
import config from '@/keyloom.config';

export default createAuthMiddleware(config, {
  publicRoutes: ['/', '/sign-in'],
});

export const config = {
  matcher: ['/((?!_next|.*\\.(?:ico|png|jpg|svg|css|js|map)).*)']
};`,
    },
    {
      filename: "app/api/auth/[...keyloom]/route.ts",
      language: "typescript",
      code: `import { createNextHandler } from '@keyloom/nextjs';
import config from '@/keyloom.config';

export const { GET, POST } = createNextHandler(config);`,
    },
  ];

  const logos = [
    {
      node: (
        <img
          className="h-7 w-auto object-contain opacity-60 hover:opacity-80 transition-opacity filter grayscale dark:invert"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
          alt="Next.js"
          title="Next.js"
        />
      ),
      href: "https://nextjs.org",
      ariaLabel: "Next.js",
    },
    {
      node: (
        <img
          className="h-7 w-auto object-contain opacity-60 hover:opacity-80 transition-opacity filter grayscale dark:invert"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          alt="React"
          title="React"
        />
      ),
      href: "https://react.dev",
      ariaLabel: "React",
    },
    {
      node: (
        <img
          className="h-7 w-auto object-contain opacity-60 hover:opacity-80 transition-opacity filter grayscale dark:invert"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
          alt="Node.js"
          title="Node.js"
        />
      ),
      href: "https://nodejs.org",
      ariaLabel: "Node.js",
    },
    {
      node: (
        <img
          className="h-7 w-auto object-contain opacity-60 hover:opacity-80 transition-opacity filter grayscale dark:invert"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg"
          alt="Prisma"
          title="Prisma"
        />
      ),
      href: "https://prisma.io",
      ariaLabel: "Prisma",
    },
    {
      node: (
        <img
          className="h-7 w-auto object-contain opacity-60 hover:opacity-80 transition-opacity filter grayscale dark:invert"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
          alt="PostgreSQL"
          title="PostgreSQL"
        />
      ),
      href: "https://www.postgresql.org/",
      ariaLabel: "PostgreSQL",
    },
    {
      node: (
        <img
          className="h-7 w-auto object-contain opacity-60 hover:opacity-80 transition-opacity filter grayscale dark:invert"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
          alt="Tailwind CSS"
          title="Tailwind CSS"
        />
      ),
      href: "https://tailwindcss.com",
      ariaLabel: "Tailwind CSS",
    },
    {
      node: (
        <img
          className="h-7 w-auto object-contain opacity-60 hover:opacity-80 transition-opacity filter grayscale dark:invert"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"
          alt="Vercel"
          title="Vercel"
        />
      ),
      href: "https://vercel.com",
      ariaLabel: "Vercel",
    },
    {
      node: (
        <img
          className="h-7 w-auto object-contain opacity-60 hover:opacity-80 transition-opacity filter grayscale dark:invert"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          alt="GitHub"
          title="GitHub"
        />
      ),
      href: "https://github.com",
      ariaLabel: "GitHub",
    },
  ];

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero + Cards */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/docs/getting-started"
              className="group relative col-span-2 rounded-2xl border bg-fd-card/80 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fd-background/40 via-transparent to-fd-primary/5 pointer-events-none" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-fd-foreground">
                Build Your Docs.
              </h1>
              <p className="mt-6 text-sm sm:text-base text-fd-muted-foreground">
                Getting Started
              </p>
              <p className="text-xs sm:text-sm text-fd-muted-foreground/90">
                Learn to use Fumadocs on your docs site.
              </p>
            </Link>

            <div className="grid gap-6">
              <Link
                href="/docs/components"
                className="rounded-2xl border bg-fd-card/80 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-sm font-semibold text-fd-foreground">
                  Components
                </div>
                <p className="mt-2 text-sm text-fd-muted-foreground">
                  Add interactive experience to your docs.
                </p>
              </Link>

              <Link
                href="/docs/openapi"
                className="rounded-2xl border bg-fd-card/80 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-sm font-semibold text-fd-foreground">
                  OpenAPI
                </div>
                <p className="mt-2 text-sm text-fd-muted-foreground">
                  Generate interactive playgrounds and docs for your API.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-24 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-base font-semibold leading-7 text-fd-muted-foreground">
              Quick Setup
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-fd-foreground lg:text-4xl">
              Get authentication running in minutes
            </p>
            <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-fd-muted-foreground">
              Answer a few prompts and Keyloom scaffolds routes, providers, and
              environment variables for you.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative isolate w-full min-w-0">
                <div
                  className="absolute -top-12 -left-16 h-48 w-48 rounded-full bg-fd-primary/10 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 rounded-3xl border border-fd-border/40 bg-gradient-to-br from-fd-card via-fd-card/90 to-fd-background/80 shadow-xl backdrop-blur-sm"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-3xl border border-transparent p-3 sm:p-6 lg:p-8">
                  <div className="flex items-center justify-between border-b border-fd-border/40 pb-4">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
                      CLI flow
                    </span>
                    <span className="text-xs text-fd-muted-foreground/80">
                      ~5 min setup
                    </span>
                  </div>
                  <div className="mt-6 w-full min-w-0">
                    <Terminal className="w-full max-w-full border border-fd-border/40 bg-fd-background/90 text-left shadow-lg">
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
              <div className="flex flex-col gap-4 sm:gap-6 w-full min-w-0">
                {quickSetupSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative flex gap-3 sm:gap-4 rounded-2xl border border-fd-border/50 bg-fd-card/80 p-4 sm:p-6 shadow-md w-full min-w-0"
                  >
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-fd-secondary text-sm font-semibold text-fd-foreground flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="space-y-3 min-w-0 flex-1">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-fd-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-fd-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      {step.action ? (
                        <div className="inline-flex items-center gap-2 rounded-md bg-fd-muted px-3 py-2 text-xs font-medium text-fd-muted-foreground max-w-full">
                          <span className="font-mono text-fd-foreground text-xs break-all">
                            {step.action}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border border-dashed border-fd-border/50 bg-fd-background/40 p-4 sm:p-6 text-xs sm:text-sm text-fd-muted-foreground shadow-inner w-full min-w-0">
                  <p className="font-semibold text-fd-foreground">
                    Prefer to follow along?
                  </p>
                  <p className="mt-2">
                    Watch the full walkthrough to see environment syncing,
                    provider setup, and deployment in real time.
                  </p>
                  <Link
                    href="/docs/getting-started"
                    className="mt-4 inline-flex items-center gap-2 rounded-md bg-fd-primary/10 px-4 py-3 min-h-[44px] text-xs sm:text-sm font-semibold text-fd-primary transition-colors hover:bg-fd-primary/20"
                  >
                    Open the guided tutorial <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Components (Bento Grid) */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-base font-semibold leading-7 text-fd-muted-foreground">
              Powerful primitives
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-fd-foreground sm:text-4xl">
              Build faster with focused components
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            {/* CodeComparison Card */}
            <div className="relative overflow-hidden rounded-3xl border border-fd-border/40 bg-fd-card/80 p-0 shadow-xl">
              <div className="flex items-center justify-between border-b border-fd-border/40 px-6 py-4">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
                  Before / After
                </span>
                <span className="text-xs text-fd-muted-foreground/80">
                  Keyloom VS Next-Auth
                </span>
              </div>
              <div className="p-2 sm:p-4 lg:p-6">
                <CodeComparison
                  beforeFiles={beforeFiles}
                  afterFiles={afterFiles}
                  lightTheme="github-light"
                  darkTheme="github-dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Logos */}
      <section className="py-12 sm:py-16">
        <div className="w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
              Built for your stack
            </p>
          </div>
          <div className="w-full overflow-hidden">
            <LogoLoop
              logos={logos}
              speed={90}
              gap={40}
              logoHeight={40}
              fadeOut
              scaleOnHover
              ariaLabel="Technology logos"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
