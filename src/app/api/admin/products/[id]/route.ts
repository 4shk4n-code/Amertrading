import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getProductById, updateProduct, deleteProduct } from "@/lib/firebase-products";

// GET - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    await updateProduct(params.id, {
      name,
      nameAr,
      nameFa,
      description,
      descriptionAr,
      descriptionFa,
      price: price !== undefined ? parseFloat(price) : undefined,
      compareAtPrice: compareAtPrice !== undefined ? parseFloat(compareAtPrice) : undefined,
      sku,
      stock: stock !== undefined ? parseInt(stock) : undefined,
      category,
      images,
      featured,
      active,
    });

    const updatedProduct = await getProductById(params.id);
    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await deleteProduct(params.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
