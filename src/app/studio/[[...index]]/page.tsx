"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity/sanity.config";

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-black">
      <NextStudio config={config} />
    </div>
  );
}

