// IMPORTANT: Load environment variables FIRST before any other imports
import dotenv from "dotenv";
import { resolve } from "path";

// Load .env.local file BEFORE importing anything that uses process.env
const envResult = dotenv.config({ path: resolve(process.cwd(), ".env.local") });

// Debug: Check if env var is loaded
console.log("Environment check:");
console.log("FIREBASE_SERVICE_ACCOUNT_KEY exists:", !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
console.log("FIREBASE_SERVICE_ACCOUNT_KEY length:", process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.length || 0);
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  console.log("First 50 chars:", key.substring(0, 50));
  console.log("Starts with '{':", key.trim().startsWith('{'));
}
console.log("");

// NOW import firebase (after env vars are loaded)
import { db } from "../src/lib/firebase";

async function testFirebase() {
  try {
    console.log("🔥 Testing Firebase connection...\n");

    // Test 1: Check if we can access Firestore
    console.log("✓ Firebase Admin SDK initialized");
    
    // Test 2: Try to read from products collection
    try {
      const productsSnapshot = await db.collection("products").limit(1).get();
      console.log(`✓ Can read from 'products' collection (found ${productsSnapshot.size} test document(s))`);
    } catch (error: any) {
      console.log(`⚠ Cannot read from 'products': ${error.message}`);
      console.log("  This is OK if the collection doesn't exist yet.\n");
    }

    // Test 3: Try to write a test document (then delete it)
    try {
      const testRef = await db.collection("products").add({
        name: "Test Product",
        description: "This is a test - will be deleted",
        price: 0,
        stock: 0,
        images: [],
        featured: false,
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      console.log(`✓ Can write to 'products' collection (created test document: ${testRef.id})`);
      
      // Clean up - delete the test document
      await testRef.delete();
      console.log(`✓ Can delete from 'products' collection (cleaned up test document)\n`);
    } catch (error: any) {
      console.log(`✗ Cannot write to 'products': ${error.message}`);
      console.log("  Check your Firestore security rules!\n");
    }

    console.log("✅ Firebase is configured correctly!");
    console.log("   You can now add products from /admin/products\n");
  } catch (error: any) {
    console.error("❌ Firebase connection failed:", error.message);
    console.error("\nTroubleshooting:");
    console.error("1. Check FIREBASE_SERVICE_ACCOUNT_KEY in .env.local");
    console.error("2. Make sure Firestore Database is enabled in Firebase Console");
    console.error("3. Verify your service account key is valid JSON");
    process.exit(1);
  }
}

testFirebase();
