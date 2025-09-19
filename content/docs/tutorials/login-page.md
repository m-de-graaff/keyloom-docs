---
title: Creating a Login Page (Next.js App Router)
description: Build a complete email/password and OAuth login page using Keyloom with CSRF protection, error states, and redirects.
---

## Introduction
This tutorial walks you through creating a production-ready Login page in a Next.js App Router app using Keyloom. You’ll implement:
- Email/password login
- OAuth login buttons (e.g. GitHub, Google)
- CSRF protection (double-submit cookie)
- Error states and form validation
- Redirect handling after successful login

References: @keyloom/core, @keyloom/nextjs, @keyloom/adapters, @keyloom/providers

## Prerequisites
- Next.js 13+ (App Router)
- Installed Keyloom packages in your app: `@keyloom/core`, `@keyloom/nextjs` (+ optional `@keyloom/adapters`, `@keyloom/providers`)
- API route wired at `app/api/auth/[[...keyloom]]/route.ts`
- A configured adapter (e.g. Prisma) and at least one provider if you want OAuth

## 1) Configure Keyloom
Create or update `keyloom.config.ts` in your app root.

```ts title="keyloom.config.ts"
import { defineKeyloom } from "@keyloom/core";
import { prismaAdapter } from "@keyloom/adapters/prisma";
import github from "@keyloom/providers/github";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineKeyloom({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL!,
  session: {
    strategy: "database", // or "jwt"
    ttlMinutes: 60,
    rolling: true,
  },
  adapter: prismaAdapter(prisma),
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  cookie: { sameSite: "lax" },
  secrets: { authSecret: process.env.AUTH_SECRET! },
});
```

## 2) Create the Keyloom API route
This catch‑all route handles: session, csrf, register, login, logout, and oauth endpoints.

```ts title="app/api/auth/[[...keyloom]]/route.ts"
import { createNextHandler } from "@keyloom/nextjs";
import config from "@/keyloom.config";

export const { GET, POST } = createNextHandler(config);
```

## 3) Add optional auth middleware
You can mark public routes and protect everything else. This is optional but recommended.

```ts title="middleware.ts"
import { createAuthMiddleware } from "@keyloom/nextjs/middleware";
import config from "@/keyloom.config";

export default createAuthMiddleware(config, {
  publicRoutes: ["/", "/login", "/api/auth/csrf", "/api/auth/oauth/:provider/start", "/api/auth/oauth/:provider/callback"],
});

export const config = {
  matcher: ["/((?!_next|.*\\.(?:ico|png|jpg|svg|css|js|map)).*)"],
};
```

## 4) Build the Login page (App Router)
We’ll create a simple, accessible form with client-side validation and CSRF protection. On success, redirect to a dashboard.

```tsx title="app/(auth)/login/page.tsx"
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrf, setCsrf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch CSRF token once; server will set __keyloom_csrf cookie
  useEffect(() => {
    fetch("/api/auth/csrf").then(async (r) => {
      try {
        const { csrfToken } = await r.json();
        setCsrf(csrfToken);
      } catch {}
    });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-keyloom-csrf": csrf, // Double-submit header
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Session cookie is set by the server on success
      router.push(callbackUrl);
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

      {error && (
        <div role="alert" className="mb-3 rounded bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="my-6 text-center text-sm text-neutral-500">or</div>

      {/* OAuth buttons */}
      <div className="space-y-2">
        <a
          className="flex w-full items-center justify-center rounded border px-3 py-2 hover:bg-neutral-50"
          href={`/api/auth/oauth/github/start?callbackUrl=${encodeURIComponent(callbackUrl)}`}
        >
          Continue with GitHub
        </a>
        {/* Add more providers similarly */}
      </div>
    </div>
  );
}
```

### Redirect logic
- Email/password: after `POST /api/auth/login`, the server sets the session cookie; navigate with `router.push(callbackUrl)`.
- OAuth: use `/api/auth/oauth/:provider/start?callbackUrl=/destination` and Keyloom will redirect back after completion.

## 5) Optional: Registration page
If you support sign‑up, use `POST /api/auth/register` with the same CSRF header.

```ts title="Register request example"
await fetch("/api/auth/register", {
  method: "POST",
  headers: { "content-type": "application/json", "x-keyloom-csrf": csrf },
  body: JSON.stringify({ email, password }),
});
```

## Troubleshooting & gotchas
- Module not found: `@keyloom/core`
  - Ensure your app explicitly installs it: `pnpm add @keyloom/core` (also `@keyloom/nextjs`, `@keyloom/adapters`, `@keyloom/providers` as needed).
- CSRF error (403)
  - Call `GET /api/auth/csrf` once per page load; include the returned token in `x-keyloom-csrf` and keep the `__keyloom_csrf` cookie intact.
- 405 method_not_allowed / 404 not_found
  - Make sure you route requests under `/api/auth/...` and you created the catch‑all at `app/api/auth/[[...keyloom]]/route.ts`.
- Redirect doesn’t happen after OAuth
  - Verify you passed `callbackUrl` to the `.../oauth/:provider/start` URL and that `NEXT_PUBLIC_APP_URL` and `AUTH_SECRET` are set.
- Database strategy vs JWT
  - For JWT strategy, configure `baseUrl` and `secrets.authSecret`; the login flow remains the same.

## What’s next
- Protect pages with middleware and/or server guards
- Add a logout button that calls `POST /api/auth/logout` (no JSON body, CSRF header required)
- Show the current user by calling `GET /api/auth/session` from a server component or `getServerSideProps` equivalent

