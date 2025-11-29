"use client";

import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const params = useParams();
  const locale = params.locale as string;
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mb-8 text-6xl">✓</div>
          <h1 className="mb-4 font-display text-4xl uppercase tracking-[0.4em] text-gold-600">
            Order Placed Successfully!
          </h1>
          {orderNumber && (
            <p className="mb-8 text-lg text-[var(--text-muted)]">
              Your order number is: <span className="font-semibold text-[var(--accent)]">{orderNumber}</span>
            </p>
          )}
          <p className="mb-8 text-[var(--text-muted)]">
            Thank you for your order. We will contact you shortly to confirm your order details.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href={`/${locale}/products` as any}
              className="rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Continue Shopping
            </Link>
            <Link
              href={`/${locale}` as any}
              className="rounded-lg border border-[var(--card-border)] px-6 py-3 font-medium transition hover:bg-[var(--hover-bg)]"
            >
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CartSuccessPage() {
  return (
    <Suspense fallback={
      <div className="bg-[var(--background)] text-[var(--foreground)]">
        <section className="relative py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p>Loading...</p>
          </div>
        </section>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

