import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/keyloom.png"
            alt="Keyloom"
            width={24}
            height={24}
            className="rounded-sm"
          />
          Keyloom
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: "Get Started",
        url: "/docs/get-started",
      },
      {
        text: "GitHub",
        url: "https://github.com/m-de-graaff/keyloom",
        external: true,
      },
      {
        text: "Support Me",
        url: "https://buymeacoffee.com/mdegraaff",
        external: true,
      }
    ],
  };
}
