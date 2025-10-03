import { source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { Feedback } from "@/components/feedback";
import { onRateAction } from "@/lib/github";
import { LLMCopyButton, ViewOptions } from "@/components/page-actions";
import { StructuredData } from "@/components/structured-data";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateBreadcrumbsFromSlug,
} from "@/lib/structured-data";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const { slug = [] } = params;

  const owner = "m-de-graaff";
  const repo = "keyloom";

  // Generate structured data
  const breadcrumbs = generateBreadcrumbsFromSlug(slug);
  const articleSchema = generateArticleSchema({
    title: page.data.title,
    description: page.data.description || "",
    url: page.url,
    section: slug[0]
      ? slug[0].charAt(0).toUpperCase() + slug[0].slice(1)
      : "Documentation",
  });
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <StructuredData data={[articleSchema, breadcrumbSchema]} />
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6"></div>
        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
          <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
          <ViewOptions
            markdownUrl={`${page.url}.mdx`}
            githubUrl={`https://github.com/${owner}/${repo}/blob/dev/apps/docs/content/docs/${page.path}`}
          />
        </div>
        <DocsBody>
          <MDXContent
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
        {/* Feedback form at the bottom of every docs page */}
        <Feedback onRateAction={onRateAction} />
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const { slug = [] } = params;
  const baseUrl = "https://keyloom.markdegraaff.com";
  const canonicalUrl = `${baseUrl}${page.url}`;
  const image = ["/docs-og", ...slug, "image.png"].join("/");

  return {
    title: page.data.title,
    description: page.data.description,
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
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: canonicalUrl,
      siteName: "Keyloom Documentation",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: new Date().toISOString(),
      section: slug[0]
        ? slug[0].charAt(0).toUpperCase() + slug[0].slice(1)
        : "Documentation",
      authors: ["Keyloom Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [image],
      creator: "@keyloom",
      site: "@keyloom",
    },
    authors: [{ name: "Keyloom Team", url: baseUrl }],
    category: "Documentation",
  };
}
