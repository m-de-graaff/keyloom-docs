import { Metadata } from "next";
import { StructuredData } from "./structured-data";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateBreadcrumbsFromSlug,
} from "@/lib/structured-data";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  slug?: string[];
  section?: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Generate comprehensive metadata for SEO
 */
export function generateSEOMetadata({
  title,
  description,
  url,
  section,
  image,
  publishedTime,
  modifiedTime,
  authors = ["Keyloom Team"],
  keywords = [],
  noIndex = false,
}: SEOProps): Metadata {
  const baseUrl = "https://keyloom.markdegraaff.com";
  const canonicalUrl = `${baseUrl}${url}`;
  const ogImage = image || "/keyloom_banner.png";

  return {
    title,
    description,
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
      ...keywords,
    ],
    authors: authors.map((author) => ({ name: author, url: baseUrl })),
    creator: "Keyloom Team",
    publisher: "Keyloom",
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Keyloom Documentation",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: publishedTime || new Date().toISOString(),
      modifiedTime: modifiedTime || new Date().toISOString(),
      section: section || "Documentation",
      authors,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@keyloom",
      site: "@keyloom",
    },
    category: section || "Documentation",
  };
}

/**
 * SEO component that includes structured data
 */
export function SEO({
  title,
  description,
  url,
  slug = [],
  section,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  // Generate structured data
  const breadcrumbs = generateBreadcrumbsFromSlug(slug);
  const articleSchema = generateArticleSchema({
    title,
    description,
    url,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    section:
      section ||
      (slug[0]
        ? slug[0].charAt(0).toUpperCase() + slug[0].slice(1)
        : "Documentation"),
  });
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return <StructuredData data={[articleSchema, breadcrumbSchema]} />;
}
