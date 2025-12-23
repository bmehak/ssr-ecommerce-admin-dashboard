"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError("Invalid input. Please check values.");
      return;
    }

    router.push("/dashboard/products");
  }

  return (
    <main style={{ padding: "40px", maxWidth: "500px" }}>
      <h1>Add Product</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <br /><br />
        <input name="price" type="number" placeholder="Price" required />
        <br /><br />
        <input name="stock" type="number" placeholder="Stock" required />
        <br /><br />
        <button type="submit">Create</button>
      </form>
    </main>
  );
}
