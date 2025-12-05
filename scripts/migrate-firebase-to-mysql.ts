/**
 * Migration script to export data from Firebase and import to MySQL
 * 
 * Usage:
 * 1. Make sure you have Firebase credentials set in .env.local
 * 2. Make sure you have MySQL DATABASE_URL set in .env.local
 * 3. Run: npm run db:generate (to generate Prisma client)
 * 4. Run: npx tsx scripts/migrate-firebase-to-mysql.ts
 */

import { db as firestore } from "../src/lib/firebase";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function migrateProducts() {
  console.log("🔄 Migrating products from Firebase to MySQL...");
  
  try {
    const productsSnapshot = await firestore.collection("products").get();
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Found ${products.length} products in Firebase`);

    let migrated = 0;
    let skipped = 0;

    for (const product of products) {
      try {
        // Check if product already exists
        const existing = await prisma.product.findUnique({
          where: { id: product.id },
        });

        if (existing) {
          console.log(`⏭️  Skipping product ${product.id} (already exists)`);
          skipped++;
          continue;
        }

        // Convert Firestore timestamp to Date
        const convertTimestamp = (ts: any): Date => {
          if (ts?.toDate) return ts.toDate();
          if (ts instanceof Date) return ts;
          return new Date();
        };

        await prisma.product.create({
          data: {
            id: product.id,
            name: product.name || "",
            nameAr: product.nameAr || null,
            nameFa: product.nameFa || null,
            description: product.description || "",
            descriptionAr: product.descriptionAr || null,
            descriptionFa: product.descriptionFa || null,
            price: product.price || 0,
            compareAtPrice: product.compareAtPrice || null,
            sku: product.sku || null,
            stock: product.stock || 0,
            category: product.category || null,
            images: product.images || [],
            featured: product.featured || false,
            active: product.active !== false,
            createdAt: convertTimestamp(product.createdAt),
            updatedAt: convertTimestamp(product.updatedAt) || new Date(),
          },
        });

        migrated++;
        console.log(`✅ Migrated product: ${product.name} (${product.id})`);
      } catch (error: any) {
        console.error(`❌ Error migrating product ${product.id}:`, error.message);
      }
    }

    console.log(`\n✅ Products migration complete!`);
    console.log(`   Migrated: ${migrated}`);
    console.log(`   Skipped: ${skipped}`);
  } catch (error) {
    console.error("❌ Error migrating products:", error);
    throw error;
  }
}

async function migrateOrders() {
  console.log("\n🔄 Migrating orders from Firebase to MySQL...");
  
  try {
    const ordersSnapshot = await firestore.collection("orders").get();
    const orders = ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Found ${orders.length} orders in Firebase`);

    let migrated = 0;
    let skipped = 0;

    for (const order of orders) {
      try {
        // Check if order already exists
        const existing = await prisma.order.findUnique({
          where: { id: order.id },
        });

        if (existing) {
          console.log(`⏭️  Skipping order ${order.id} (already exists)`);
          skipped++;
          continue;
        }

        // Convert Firestore timestamp to Date
        const convertTimestamp = (ts: any): Date => {
          if (ts?.toDate) return ts.toDate();
          if (ts instanceof Date) return ts;
          return new Date();
        };

        // Create order with items
        await prisma.order.create({
          data: {
            id: order.id,
            orderNumber: order.orderNumber || `ORD-${order.id}`,
            customerName: order.customerName || "",
            customerEmail: order.customerEmail || "",
            customerPhone: order.customerPhone || "",
            customerAddress: order.customerAddress || null,
            total: order.total || 0,
            status: order.status || "pending",
            notes: order.notes || null,
            createdAt: convertTimestamp(order.createdAt),
            updatedAt: convertTimestamp(order.updatedAt) || new Date(),
            items: {
              create: (order.items || []).map((item: any, idx: number) => ({
                productId: item.productId,
                quantity: item.quantity || 1,
                price: item.price || 0,
              })),
            },
          },
        });

        migrated++;
        console.log(`✅ Migrated order: ${order.orderNumber} (${order.id})`);
      } catch (error: any) {
        console.error(`❌ Error migrating order ${order.id}:`, error.message);
      }
    }

    console.log(`\n✅ Orders migration complete!`);
    console.log(`   Migrated: ${migrated}`);
    console.log(`   Skipped: ${skipped}`);
  } catch (error) {
    console.error("❌ Error migrating orders:", error);
    throw error;
  }
}

async function main() {
  console.log("🚀 Starting Firebase to MySQL migration...\n");

  try {
    await migrateProducts();
    await migrateOrders();
    
    console.log("\n✅ Migration completed successfully!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

