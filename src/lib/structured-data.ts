import type {
  WithContext,
  Organization,
  Article,
  BreadcrumbList,
  WebSite,
  SoftwareApplication,
} from "schema-dts";

const baseUrl = "https://keyloom.markdegraaff.com";

/**
 * Generate Organization structured data for Keyloom
 */
export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Keyloom",
    description:
      "Modern, security-first authentication for JavaScript applications with comprehensive features and developer-friendly experience.",
    url: baseUrl,
    logo: `${baseUrl}/keyloom.png`,
    image: `${baseUrl}/keyloom_banner.png`,
    sameAs: ["https://github.com/m-de-graaff/keyloom"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "technical support",
      url: `${baseUrl}/docs`,
    },
    foundingDate: "2024",
    knowsAbout: [
      "Authentication",
      "JavaScript",
      "TypeScript",
      "Next.js",
      "OAuth",
      "Security",
      "RBAC",
      "Session Management",
    ],
  };
}

/**
 * Generate WebSite structured data with search functionality
 */
export function generateWebSiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Keyloom Documentation",
    description:
      "Complete documentation for Keyloom - Modern authentication for JavaScript applications",
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: "Keyloom",
      url: baseUrl,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/api/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    } as any,
    inLanguage: "en-US",
  };
}

/**
 * Generate Article structured data for documentation pages
 */
export function generateArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  section,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
}): WithContext<Article> {
  const currentDate = new Date().toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: `${baseUrl}${url}`,
    datePublished: datePublished || currentDate,
    dateModified: dateModified || currentDate,
    author: {
      "@type": "Organization",
      name: "Keyloom Team",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Keyloom",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/keyloom.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}${url}`,
    },
    articleSection: section || "Documentation",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Keyloom Documentation",
      url: baseUrl,
    },
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`,
    })),
  };
}

/**
 * Generate breadcrumbs from page slug
 */
export function generateBreadcrumbsFromSlug(
  slug: string[]
): Array<{ name: string; url: string }> {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Documentation", url: "/docs" },
  ];

  let currentPath = "/docs";

  for (let i = 0; i < slug.length; i++) {
    const segment = slug[i];
    currentPath += `/${segment}`;

    // Convert slug segment to readable name
    const name = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({
      name,
      url: currentPath,
    });
  }

  return breadcrumbs;
}

/**
 * Generate SoftwareApplication structured data for Keyloom
 */
export function generateSoftwareSchema(): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Keyloom",
    description:
      "Modern, security-first authentication for JavaScript applications",
    url: baseUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Keyloom Team",
      url: baseUrl,
    },
    downloadUrl: "https://www.npmjs.com/package/@keyloom/core",
    installUrl: "https://www.npmjs.com/package/@keyloom/core",
    softwareVersion: "1.0.0",
    releaseNotes: `${baseUrl}/docs`,
    screenshot: `${baseUrl}/keyloom_banner.png`,
    featureList: [
      "OAuth Authentication",
      "Session Management",
      "Role-Based Access Control (RBAC)",
      "JWT Support",
      "Database Adapters",
      "Next.js Integration",
      "TypeScript Support",
    ],
  } as WithContext<SoftwareApplication>;
}
