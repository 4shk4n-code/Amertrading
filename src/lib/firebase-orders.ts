import { db } from "./firebase";
import type { Order, OrderItem } from "./firebase";
import { Timestamp } from "firebase-admin/firestore";

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

// Create a new order
export async function createOrder(orderData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
  items: Omit<OrderItem, "id">[];
  notes?: string;
}): Promise<Order> {
  try {
    // Calculate total
    let total = 0;
    for (const item of orderData.items) {
      total += item.price * item.quantity;
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const now = Timestamp.now();
    const orderRef = await db.collection("orders").add({
      orderNumber,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress || "",
      total,
      status: "pending",
      notes: orderData.notes || "",
      items: orderData.items.map((item, idx) => ({
        id: `item-${idx}`,
        ...item,
      })),
      createdAt: now,
      updatedAt: now,
    });

    const orderDoc = await orderRef.get();
    const data = orderDoc.data()!;
    return {
      id: orderRef.id,
      ...data,
      items: data.items as OrderItem[],
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
    } as Order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Get all orders (admin only)
export async function getOrders(): Promise<Order[]> {
  try {
    const snapshot = await db.collection("orders").orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        items: data.items || [],
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Order;
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

// Get order by ID
export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const orderDoc = await db.collection("orders").doc(id).get();
    if (!orderDoc.exists) {
      return null;
    }
    const data = orderDoc.data()!;
    return {
      id: orderDoc.id,
      ...data,
      items: data.items || [],
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
    } as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

// Update order status
export async function updateOrderStatus(id: string, status: Order["status"]): Promise<void> {
  try {
    await db.collection("orders").doc(id).update({
      status,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}
