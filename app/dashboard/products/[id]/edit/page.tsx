"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { ProductType } from "@/types/Product";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const router = useRouter();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/products/${id}`);
      const data: ProductType = await res.json();
      setProduct(data);
    }

    load();
  }, [id]);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!product) return;

    setSaving(true);

    await fetch(`/api/products/${id}/edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    router.push("/dashboard/products");
  }

  if (!product) return <p>Loading...</p>;

  return (
    <main style={{ padding: 40, maxWidth: 600 }}>
      <h1>Edit Product</h1>

      <form
        onSubmit={handleSave}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <label>Name</label>
        <input
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />

        <label>Description</label>
        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />

        <label>Category</label>
        <select
          value={product.category}
          onChange={(e) =>
            setProduct({ ...product, category: e.target.value })
          }
        >
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
        </select>

        <label>Price</label>
        <input
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
        />

        <label>Stock</label>
        <input
          type="number"
          value={product.stock}
          onChange={(e) =>
            setProduct({ ...product, stock: Number(e.target.value) })
          }
        />

        <label>Current Image</label>

        {product.image && (
          <Image
            src={product.image}
            alt="Product"
            width={160}
            height={160}
            style={{ borderRadius: 10 }}
          />
        )}

        <CldUploadWidget
          uploadPreset="ml_default"
          onSuccess={(result: unknown) => {
            const info = result as {
              info: { secure_url: string };
            };

            setProduct({
              ...product,
              image: info.info.secure_url,
            });
          }}
        >
          {({ open }) => (
            <button type="button" onClick={() => open()}>
              Upload New Image
            </button>
          )}
        </CldUploadWidget>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}
