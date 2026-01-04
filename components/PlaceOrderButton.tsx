"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PlaceOrderButton({
  productId,
  price,
  stock
}: {
  productId: string;
  price: number;
  stock: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function placeOrder() {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    if (quantity > stock) {
      toast.error("Not enough stock available");
      return;
    }

    const confirmOrder = confirm(
      `Confirm Order?\n\nQuantity: ${quantity}\nTotal = ₹${(
        quantity * price
      ).toLocaleString("en-IN")}`
    );

    if (!confirmOrder) return;

    setLoading(true);

    const res = await fetch("/api/orders/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        quantity,
        price,
      }),
    });

    if (res.ok) {
      toast.success("Order placed successfully!");
      router.refresh();
    }
    else toast.error("Order failed");

    setLoading(false);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{
          width: 70,
          padding: 8,
          borderRadius: 8,
          border: "1px solid #333",
          background: "#111",
          color: "#fff",
        }}
      />

      <button
        onClick={placeOrder}
        disabled={loading}
        style={{
          padding: "12px 16px",
          borderRadius: 10,
          border: "none",
          background: "#fff",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Placing..." : "Place Order"}
      </button>
    </div>
  );
}
