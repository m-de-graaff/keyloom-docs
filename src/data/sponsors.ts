/**
 * Sponsors Configuration
 * 
 * This file contains the configuration for sponsors and supporters of Keyloom
 * that are featured on the sponsors page.
 * 
 * To add a new sponsor:
 * 1. Add a new object to the `sponsors` array below
 * 2. Fill in the required fields: name, description, url
 * 3. Optionally add a logo URL and tier level
 * 
 * Example:
 * {
 *   name: "Awesome Company",
 *   description: "Platinum sponsor supporting Keyloom development",
 *   url: "https://awesomecompany.com",
 *   logo: "https://awesomecompany.com/logo.png", // Optional
 *   tier: "platinum" // Optional: platinum, gold, silver, bronze
 * }
 */

export interface SponsorItem {
  /** The name of the sponsor/organization */
  name: string;
  /** Description of the sponsor or their sponsorship tier */
  description: string;
  /** The URL to the sponsor's website */
  url: string;
  /** Optional logo URL for the sponsor */
  logo?: string;
  /** Optional sponsorship tier for styling purposes */
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze';
}

/**
 * Array of sponsors to display on the sponsors page.
 * Currently empty - add your sponsors here!
 */
export const sponsors: SponsorItem[] = [
  // Add sponsors here
  // Example:
  // {
  //   name: "Example Corp",
  //   description: "Gold sponsor - Supporting open source authentication",
  //   url: "https://example-corp.com",
  //   logo: "https://example-corp.com/logo.png",
  //   tier: "gold"
  // }
];
