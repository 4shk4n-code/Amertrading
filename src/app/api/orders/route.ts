import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/firebase-orders";
import { getProductById } from "@/lib/firebase-products";

// POST - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      notes,
    } = body;

    if (!customerName || !customerEmail || !customerPhone || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate products exist and are active
    for (const item of items) {
      const product = await getProductById(item.productId);
      if (!product || !product.active) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found or inactive` },
          { status: 400 }
        );
      }
    }

    const order = await createOrder({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items: items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      notes,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
