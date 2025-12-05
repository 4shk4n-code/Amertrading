import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/db-products";

// GET - List active products (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const filters: { active: boolean; category?: string; featured?: boolean } = { active: true };
    if (category) filters.category = category;
    if (featured === "true") filters.featured = true;

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
