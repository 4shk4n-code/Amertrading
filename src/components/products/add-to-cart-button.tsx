"use client";

import { useCart } from "@/contexts/cart-context";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  images?: string[];
  stock: number;
};

export function AddToCartButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (product.stock <= 0) {
    return (
      <button
        disabled
        className={`rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] cursor-not-allowed ${className}`}
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 ${className}`}
    >
      {added ? "Added to Cart!" : "Add to Cart"}
    </button>
  );
}

