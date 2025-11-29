import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getProducts, createProduct } from "@/lib/firebase-products";

// GET - List all products
export async function GET(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const active = searchParams.get("active");

    const filters: any = {};
    if (category) filters.category = category;
    if (active !== null) filters.active = active === "true";

    const products = await getProducts(filters);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      nameAr,
      nameFa,
      description,
      descriptionAr,
      descriptionFa,
      price,
      compareAtPrice,
      sku,
      stock,
      category,
      images,
      featured,
      active,
    } = body;

    if (!name || !description || price === undefined) {
      return NextResponse.json(
        { error: "Name, description, and price are required" },
        { status: 400 }
      );
    }

    const product = await createProduct({
      name,
      nameAr,
      nameFa,
      description,
      descriptionAr,
      descriptionFa,
      price: parseFloat(price),
      compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : undefined,
      sku,
      stock: parseInt(stock) || 0,
      category,
      images: images || [],
      featured: featured || false,
      active: active !== false,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
