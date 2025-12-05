import { prisma } from "./prisma";
import type { Product } from "@prisma/client";

// Get all products
export async function getProducts(filters?: {
  category?: string;
  active?: boolean;
  featured?: boolean;
}): Promise<Product[]> {
  try {
    const where: any = {};
    
    if (filters?.active !== undefined) {
      where.active = filters.active;
    }
    if (filters?.category) {
      where.category = filters.category;
    }
    if (filters?.featured) {
      where.featured = true;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Get a single product by ID or SKU
export async function getProductById(id: string): Promise<Product | null> {
  try {
    // Try by ID first
    const product = await prisma.product.findUnique({
      where: { id },
    });
    
    if (product) {
      return product;
    }

    // Try by SKU
    const productBySku = await prisma.product.findFirst({
      where: {
        sku: id,
        active: true,
      },
    });

    return productBySku;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Create a new product
export async function createProduct(
  productData: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<Product> {
  try {
    const product = await prisma.product.create({
      data: productData,
    });
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// Update a product
export async function updateProduct(
  id: string,
  productData: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
): Promise<Product> {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: productData,
    });
    return product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete a product
export async function deleteProduct(id: string): Promise<void> {
  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

