import "dotenv/config";
import { seedSampleData } from "../sanity/seedData";

async function main() {
  console.log("🌱 Seeding Sanity sample content...");
  await seedSampleData();
  console.log("✅ Seeding complete.");
}

main().catch((error) => {
  console.error("❌ Failed to seed data:", error);
  process.exit(1);
});

