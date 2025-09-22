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
    githubUrl: "https://github.com/m-de-graaff/keyloom",
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
    ],
  };
}
