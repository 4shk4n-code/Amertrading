import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

export const hasSanityCredentials = Boolean(projectId && dataset);

export const sanityClient = hasSanityCredentials
  ? createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion: "2025-01-01",
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
    })
  : null;

export type SanityClient = NonNullable<typeof sanityClient>;

