import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

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
  ],
  authors: [{ name: "Keyloom Team" }],
  creator: "Keyloom",
  publisher: "Keyloom",
  metadataBase: new URL("https://keyloom.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://keyloom.dev",
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

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
