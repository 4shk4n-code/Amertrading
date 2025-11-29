"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CartPage() {
  const params = useParams();
  const locale = params.locale as string;
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    notes: "",
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutLoading(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checkoutData,
          items: orderItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();
      clearCart();
      router.push(`/${locale}/cart/success?order=${order.orderNumber}` as any);
    } catch (error: any) {
      alert(error.message || "Failed to place order");
      setCheckoutLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[var(--background)] text-[var(--foreground)]">
        <section className="relative py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="mb-4 font-display text-4xl uppercase tracking-[0.4em] text-gold-600">
              Your Cart
            </h1>
            <p className="mb-8 text-[var(--text-muted)]">
              Your cart is empty
            </p>
            <Link
              href={`/${locale}/products` as any}
              className="inline-block rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-8 font-display text-4xl uppercase tracking-[0.4em] text-gold-600">
            Your Cart
          </h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6"
                  >
                    {item.image && (
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized={item.image.includes('unsplash.com')}
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          AED {item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="rounded border border-[var(--card-border)] px-2 py-1 text-sm hover:bg-[var(--hover-bg)]"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="rounded border border-[var(--card-border)] px-2 py-1 text-sm hover:bg-[var(--hover-bg)]"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">
                            AED {(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
                <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>AED {total.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[var(--card-border)] pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-[var(--accent)]">
                        AED {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutData.customerName}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          customerName: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={checkoutData.customerEmail}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          customerEmail: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={checkoutData.customerPhone}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          customerPhone: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Address
                    </label>
                    <textarea
                      rows={3}
                      value={checkoutData.customerAddress}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          customerAddress: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Notes
                    </label>
                    <textarea
                      rows={2}
                      value={checkoutData.notes}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          notes: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={checkoutLoading}
                    className="w-full rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {checkoutLoading ? "Placing Order..." : "Place Order"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

