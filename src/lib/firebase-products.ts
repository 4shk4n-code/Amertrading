import { db } from "./firebase";
import type { Product } from "./firebase";
import { Timestamp } from "firebase-admin/firestore";

// Helper to convert Firestore timestamp to Date
const convertTimestamp = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return new Date(timestamp);
};

// Get all products
export async function getProducts(filters?: {
  category?: string;
  active?: boolean;
  featured?: boolean;
}): Promise<Product[]> {
  try {
    let query = db.collection("products");

    if (filters?.active !== undefined) {
      query = query.where("active", "==", filters.active);
    }
    if (filters?.category) {
      query = query.where("category", "==", filters.category);
    }
    if (filters?.featured) {
      query = query.where("featured", "==", true);
    }

    query = query.orderBy("createdAt", "desc");

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Product;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Get a single product by ID or SKU
export async function getProductById(id: string): Promise<Product | null> {
  try {
    // Try by ID first
    const productDoc = await db.collection("products").doc(id).get();
    if (productDoc.exists) {
      const data = productDoc.data()!;
      return {
        id: productDoc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Product;
    }

    // Try by SKU
    const skuSnapshot = await db
      .collection("products")
      .where("sku", "==", id)
      .where("active", "==", true)
      .get();
    
    if (!skuSnapshot.empty) {
      const doc = skuSnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Product;
    }

    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Create a new product
export async function createProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
  try {
    const now = Timestamp.now();
    const docRef = await db.collection("products").add({
      ...productData,
      createdAt: now,
      updatedAt: now,
    });

    const productDoc = await docRef.get();
    const data = productDoc.data()!;
    return {
      id: docRef.id,
      ...data,
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
    } as Product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// Update a product
export async function updateProduct(id: string, productData: Partial<Product>): Promise<void> {
  try {
    const productRef = db.collection("products").doc(id);
    await productRef.update({
      ...productData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete a product
export async function deleteProduct(id: string): Promise<void> {
  try {
    await db.collection("products").doc(id).delete();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
