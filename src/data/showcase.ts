/**
 * Showcase Configuration
 * 
 * This file contains the configuration for projects/applications built with Keyloom
 * that are featured on the showcase page.
 * 
 * To add a new showcase item:
 * 1. Add a new object to the `showcaseItems` array below
 * 2. Fill in the required fields: name, description, url
 * 3. Optionally add an image URL and tags
 * 
 * Example:
 * {
 *   name: "My Awesome App",
 *   description: "A modern web application built with Keyloom authentication",
 *   url: "https://myawesomeapp.com",
 *   image: "https://myawesomeapp.com/logo.png", // Optional
 *   tags: ["Next.js", "Prisma", "PostgreSQL"] // Optional
 * }
 */

export interface ShowcaseItem {
  /** The name/title of the project */
  name: string;
  /** A brief description of the project */
  description: string;
  /** The URL to the live project */
  url: string;
  /** Optional image/logo URL for the project */
  image?: string;
  /** Optional array of technology tags */
  tags?: string[];
}

/**
 * Array of showcase items to display on the showcase page.
 * Currently empty - add your projects here!
 */
export const showcaseItems: ShowcaseItem[] = [
  // Add showcase items here
  // Example:
  // {
  //   name: "Example App",
  //   description: "An example application showcasing Keyloom's capabilities",
  //   url: "https://example.com",
  //   image: "https://example.com/logo.png",
  //   tags: ["Next.js", "TypeScript", "Tailwind CSS"]
  // }
];
