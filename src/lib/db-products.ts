import { prisma } from "./prisma";

// Product type with images as string array (not Json)
// Defined manually since Prisma client may not be generated yet
export type Product = {
  id: string;
  name: string;
  nameAr: string | null;
  nameFa: string | null;
  description: string;
  descriptionAr: string | null;
  descriptionFa: string | null;
  price: number;
  compareAtPrice: number | null;
  sku: string | null;
  stock: number;
  category: string | null;
  images: string[];
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Helper to convert JSON images to string array
function parseImages(images: unknown): string[] {
  if (Array.isArray(images)) {
    return images.filter((img): img is string => typeof img === "string");
  }
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed.filter((img): img is string => typeof img === "string") : [];
    } catch {
      return [];
    }
  }
  return [];
}

// Get all products
export async function getProducts(filters?: {
  category?: string;
  active?: boolean;
  featured?: boolean;
}): Promise<Product[]> {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not set, returning empty products array");
      return [];
    }

    const where: {
      active?: boolean;
      category?: string;
      featured?: boolean;
    } = {};
    
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

    // Convert JSON images to string arrays
    return products.map((product) => ({
      ...product,
      images: parseImages(product.images),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Get a single product by ID or SKU
export async function getProductById(id: string): Promise<Product | null> {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not set, returning null");
      return null;
    }

    // Try by ID first
    const product = await prisma.product.findUnique({
      where: { id },
    });
    
    if (product) {
      return {
        ...product,
        images: parseImages(product.images),
      } as Product;
    }

    // Try by SKU
    const productBySku = await prisma.product.findFirst({
      where: {
        sku: id,
        active: true,
      },
    });

    if (productBySku) {
      return {
        ...productBySku,
        images: parseImages(productBySku.images),
      } as Product;
    }

    return null;
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
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL not set");
    }

    const product = await prisma.product.create({
      data: {
        ...productData,
        images: Array.isArray(productData.images) ? productData.images : [],
      },
    });
    return {
      ...product,
      images: parseImages(product.images),
    } as Product;
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
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL not set");
    }

    const updateData: Record<string, unknown> = { ...productData };
    if (productData.images !== undefined) {
      updateData.images = Array.isArray(productData.images) ? productData.images : [];
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });
    return {
      ...product,
      images: parseImages(product.images),
    } as Product;
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

