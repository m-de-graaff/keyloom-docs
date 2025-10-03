import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Keyloom - Modern Authentication for JavaScript",
    template: "%s | Keyloom",
  },
  description:
    "Modern, security-first authentication for JavaScript applications with comprehensive features and developer-friendly experience.",
  keywords: [
    "authentication",
    "nextjs",
    "typescript",
    "oauth",
    "security",
    "rbac",
    "session management",
    "javascript",
    "react",
    "node.js",
    "jwt",
    "database adapters",
    "middleware",
  ],
  authors: [{ name: "Keyloom Team", url: "https://keyloom.markdegraaff.com" }],
  creator: "Keyloom Team",
  publisher: "Keyloom",
  metadataBase: new URL("https://keyloom.markdegraaff.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://keyloom.markdegraaff.com",
  },
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://keyloom.markdegraaff.com",
    title: "Keyloom - Modern Authentication for JavaScript",
    description:
      "Modern, security-first authentication for JavaScript applications with comprehensive features and developer-friendly experience.",
    siteName: "Keyloom",
    images: [
      {
        url: "/keyloom_banner.png",
        width: 850,
        height: 250,
        alt: "Keyloom - Modern Authentication for JavaScript",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keyloom - Modern Authentication for JavaScript",
    description:
      "Modern, security-first authentication for JavaScript applications with comprehensive features and developer-friendly experience.",
    images: ["/keyloom_banner.png"],
  },
  icons: {
    icon: "/keyloom.png",
    shortcut: "/keyloom.png",
    apple: "/keyloom.png",
  },
  manifest: "/manifest.json",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <StructuredData
          data={[generateOrganizationSchema(), generateWebSiteSchema()]}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
