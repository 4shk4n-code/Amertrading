import { prisma } from "./prisma";
import type { Order, OrderItem } from "@prisma/client";

// Create a new order
export async function createOrder(orderData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  notes?: string;
}): Promise<Order & { items: OrderItem[] }> {
  try {
    // Calculate total
    let total = 0;
    for (const item of orderData.items) {
      total += item.price * item.quantity;
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        customerAddress: orderData.customerAddress || null,
        total,
        status: "pending",
        notes: orderData.notes || null,
        items: {
          create: orderData.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Get all orders (admin only)
export async function getOrders(): Promise<(Order & { items: OrderItem[] })[]> {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

// Get order by ID
export async function getOrderById(
  id: string
): Promise<(Order & { items: OrderItem[] }) | null> {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

// Update order status
export async function updateOrderStatus(
  id: string,
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
): Promise<Order> {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    return order;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

