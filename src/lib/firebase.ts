import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Lazy initialization function
function initializeFirebase() {
  if (getApps().length > 0) {
    return getFirestore(getApps()[0]);
  }

  let serviceAccount = null;
  
  // Try to parse service account key if provided
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      let keyString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
      // Remove single quotes if present (common in .env files)
      if ((keyString.startsWith("'") && keyString.endsWith("'")) || 
          (keyString.startsWith('"') && keyString.endsWith('"'))) {
        keyString = keyString.slice(1, -1);
      }
      // JSON.stringify already escapes newlines as \n, so we don't need to replace
      // Just parse directly - the JSON is already properly formatted
      serviceAccount = JSON.parse(keyString);
      
      // Validate the service account has required fields
      if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
        throw new Error("Service account key missing required fields");
      }
    } catch (error: any) {
      if (process.env.NODE_ENV !== "production") {
        console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", error.message);
      }
      serviceAccount = null;
    }
  }

  let adminApp;
  if (serviceAccount) {
    try {
      adminApp = initializeApp({
        credential: cert(serviceAccount),
      });
      if (process.env.NODE_ENV !== "production") {
        console.log(`✓ Firebase initialized with service account for project: ${serviceAccount.project_id}`);
      }
    } catch (error: any) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Failed to initialize Firebase with service account:", error.message);
      }
      adminApp = null;
    }
  }
  
  // Fallback to project ID if service account failed or not provided
  if (!adminApp) {
    const projectId = process.env.FIREBASE_PROJECT_ID || "amer-trading";
    adminApp = initializeApp({
      projectId: projectId,
    });
    if (process.env.NODE_ENV !== "production") {
      console.log(`✓ Firebase initialized with project ID: ${projectId}`);
    }
  }

  return getFirestore(adminApp);
}

// Lazy getter for db - initializes on first access
let _db: ReturnType<typeof getFirestore> | null = null;

export const db = new Proxy({} as ReturnType<typeof getFirestore>, {
  get(target, prop) {
    if (!_db) {
      _db = initializeFirebase();
    }
    return (_db as any)[prop];
  }
}) as ReturnType<typeof getFirestore>;

// Type definitions for Firestore documents
export type Product = {
  id: string;
  name: string;
  nameAr?: string;
  nameFa?: string;
  description: string;
  descriptionAr?: string;
  descriptionFa?: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  stock: number;
  category?: string;
  images: string[];
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
};

