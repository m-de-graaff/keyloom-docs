---
title: Adding a Superadmin Role (RBAC)
description: Implement a Superadmin role with Keyloom RBAC, including Prisma schema updates, middleware configuration, and permission checks.
---

## Introduction
This tutorial shows how to add a "superadmin" role to your application using Keyloom's RBAC capabilities. You will:
- Enable RBAC in Keyloom
- Update your database schema (Prisma) to support roles (including `superadmin`)
- Seed an initial superadmin membership
- Configure middleware for protected routes
- Implement role and permission checks in server actions/routes

References: @keyloom/core, @keyloom/nextjs, @keyloom/adapters, Prisma

## 1) Enable RBAC in Keyloom configuration

```ts title="keyloom.config.ts"
import { defineKeyloom } from "@keyloom/core";
import { prismaAdapter } from "@keyloom/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineKeyloom({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL!,
  session: { strategy: "database", ttlMinutes: 60, rolling: true },
  adapter: prismaAdapter(prisma),
  providers: [], // add OAuth providers as needed
  rbac: { enabled: true },
  cookie: { sameSite: "lax" },
  secrets: { authSecret: process.env.AUTH_SECRET! },
});
```

## 2) Database schema: roles and memberships
Keyloom's Prisma adapter uses a `Membership` table with a `role` field (TEXT). You don't need to change the schema to support `superadmin`; simply store the string value `"superadmin"`. If you prefer type safety, you can add a Prisma enum and map it to TEXT.

```prisma title="Example Prisma models"
model Organization {
  id        String   @id @default(uuid())
  name      String
  slug      String?  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  members   Membership[]
}

enum Role {
  superadmin
  admin
  member
}

model Membership {
  id        String   @id @default(uuid())
  userId    String
  orgId     String
  role      String   // or: Role @map("role") if you prefer enum mapped to TEXT
  status    String   @default("active")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, orgId])
  @@index([orgId])
  @@index([userId, orgId, role, status])

  // Relations
  organization Organization @relation(fields: [orgId], references: [id], onDelete: Cascade)
  // user -> reference your User model (depends on your app schema)
}
```

If your project was scaffolded by Keyloom CLI, these tables might already exist. Adjust the `role` field to allow `superadmin` if you used an enum earlier.

### Run migrations
Generate and run your Prisma migrations after editing the schema:

```bash
npx prisma migrate dev -n add-superadmin-role
```

## 3) Seed an initial superadmin
Create a script to seed one organization and a superadmin membership for your own user.

```ts title="scripts/seed-superadmin.ts"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_SUPERADMIN_EMAIL!; // set in .env

  // Ensure user exists
  const user = await prisma.user.upsert({
    where: { email },
    create: { email, emailVerified: new Date() },
    update: {},
  });

  // Create an org if none exists
  const org = await prisma.organization.upsert({
    where: { slug: "primary" },
    create: { name: "Primary Org", slug: "primary" },
    update: {},
  });

  // Grant superadmin role
  await prisma.membership.upsert({
    where: { userId_orgId: { userId: user.id, orgId: org.id } },
    create: { userId: user.id, orgId: org.id, role: "superadmin" },
    update: { role: "superadmin" },
  });

  console.log(`Seeded superadmin ${email} in org ${org.slug}`);
}

main().finally(() => prisma.$disconnect());
```

Run the seed script (adapt for your package manager):

```bash
node scripts/seed-superadmin.ts
```

## 4) Middleware configuration
Protect routes by default and keep only a few public. Middleware integrates with RBAC seamlessly (the role checks happen where you invoke them).

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

## 5) Selecting an active organization
Keyloom uses an org cookie to know which org a user is operating in. When an authenticated user picks an org, set the cookie via a server action or route.

```ts title="app/orgs/[id]/select/route.ts"
import { NextResponse } from "next/server";
import { setActiveOrgCookie } from "@keyloom/nextjs";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", setActiveOrgCookie(params.id));
  return res;
}
```

## 6) Check role with withRole helper
Use `withRole` from `@keyloom/nextjs` to guard server routes/actions that require `superadmin`.

```ts title="app/admin/revalidate/route.ts"
import { withRole } from "@keyloom/nextjs";
import config from "@/keyloom.config";

export async function POST() {
  const adapter = (config as any).adapter;
  return withRole(
    async () => {
      // privileged action here
      // e.g. await revalidatePath("/dashboard")
      return new Response("ok", { status: 200 });
    },
    {
      requiredRoles: ["superadmin"],
      rbacEnabled: (config as any).rbac?.enabled !== false,
      adapter,
      getUser: async () => {
        // Example: read current session via Keyloom session endpoint
        const resp = await fetch("http://localhost:3000/api/auth/session", { cache: "no-store" });
        const data = await resp.json();
        return data?.user ?? null;
      },
      // orgId resolved from cookie by default; pass orgId if you want to override
      onDenied: () => new Response("forbidden", { status: 403 }),
    }
  );
}
```

### Permission maps
If you have granular permissions, map them to roles and use `requiredPermission`.

```ts title="Permission map example"
const permMap = {
  "billing:update": ["superadmin", "admin"],
  "users:invite": ["superadmin", "admin"],
};

// ...
return withRole(asyncDoSomething, {
  requiredPermission: "billing:update",
  permMap,
  getUser,
  adapter,
});
```

## 7) UI hints for superadmin-only areas
In React components, you can fetch the session and role to conditionally render admin UI.

```tsx title="components/AdminGate.tsx"
export async function AdminGate({ children }: { children: React.ReactNode }) {
  const res = await fetch("/api/auth/session", { cache: "no-store" });
  const { user } = await res.json();
  if (!user) return null;
  // For UI gating, you may also call an API that returns the role for the active org
  return <>{children}</>;
}
```

## Troubleshooting & gotchas
- RBAC not taking effect
  - Ensure `rbac: { enabled: true }` in `keyloom.config.ts`.
  - Confirm your adapter implements `getMembership(userId, orgId)`; Prisma adapter generated by CLI does.
- 200 select_orgf or 403 forbidden
  - Set an active org cookie with `setActiveOrgCookie(orgId)` before calling protected paths.
  - Make sure the user actually has a `Membership` row for the org.
- Role string vs enum
  - Keyloom stores role as text; you can still use a Prisma enum mapped to TEXT to make app code safer.
- Multitenancy across orgs
  - Always set/derive the active org before privileged actions; different orgs can grant different roles.

## Whats next
- Build an org switcher that calls the `/orgs/[id]/select` route to set the active org cookie
- Add admin pages protected with `withRole({ requiredRoles: ["superadmin"] })`
- Add audit events for privileged actions via your adapter or app logic

