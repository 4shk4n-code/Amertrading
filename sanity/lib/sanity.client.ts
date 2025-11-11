import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

const isValidProjectId =
  typeof projectId === "string" && /^[a-z0-9-]+$/.test(projectId);

export const hasSanityCredentials = Boolean(isValidProjectId && dataset);

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

