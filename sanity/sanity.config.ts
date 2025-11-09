import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas";

export default defineConfig({
  name: "amertrading_cms",
  title: "AMER TRADING CMS",
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemas,
  },
});

