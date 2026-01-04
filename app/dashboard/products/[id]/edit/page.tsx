"use client";

import { useEffect, useState, ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { ProductType } from "@/types/Product";

interface CloudinaryUploadSuccess {
  info: {
    secure_url: string;
  };
}


interface InputBlockProps {
  label: string;
  children: ReactNode;
}

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

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data?.message || "Update failed");
        setSaving(false);
        return;
      }

      toast.success("Product updated successfully");
      router.push("/dashboard/products");
      router.refresh();
    } catch {
      toast.error("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!product)
    return (
      <p style={{ padding: 40, color: "#aaa" }}>
        Loading product…
      </p>
    );

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "40px 60px",
        color: "#fff",
        background: "#000",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: 30, marginBottom: 6 }}>Edit Product</h1>

      <p style={{ color: "#aaa", marginBottom: 24 }}>
        Update product details and save changes
      </p>

      <div
        style={{
          background: "rgba(20,20,20,.9)",
          borderRadius: 16,
          border: "1px solid #222",
          padding: 30,
          maxWidth: 900,
        }}
      >
        <form
          onSubmit={handleSave}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
          }}
        >
          <div style={{ display: "grid", gap: 16 }}>
            <InputBlock label="Name">
              <input
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                style={inputBox}
              />
            </InputBlock>

            <InputBlock label="Description">
              <textarea
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                style={{ ...inputBox, minHeight: 110 }}
              />
            </InputBlock>

            <InputBlock label="Category">
              <select
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                style={inputBox}
              >
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Accessories</option>
              </select>
            </InputBlock>

            <InputBlock label="Price (₹)">
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: Number(e.target.value),
                  })
                }
                style={inputBox}
              />
            </InputBlock>

            <InputBlock label="Stock">
              <input
                type="number"
                value={product.stock}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    stock: Number(e.target.value),
                  })
                }
                style={inputBox}
              />
            </InputBlock>
          </div>

          <div>
            <label style={{ color: "#bbb" }}>Product Image</label>

            {product.image && (
              <Image
                src={product.image}
                alt="Product"
                width={380}
                height={260}
                style={{
                  borderRadius: 14,
                  marginTop: 10,
                  border: "1px solid #222",
                  objectFit: "cover",
                }}
              />
            )}

            <CldUploadWidget
              uploadPreset="ml_default"
              onSuccess={(result) => {
                const info = result as CloudinaryUploadSuccess;
                setProduct({
                  ...product,
                  image: info.info.secure_url,
                });
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open?.()}
                  style={secondaryBtn}
                >
                  Upload New Image
                </button>
              )}
            </CldUploadWidget>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <button type="submit" disabled={saving} style={primaryBtn}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function InputBlock({ label, children }: InputBlockProps) {
  return (
    <div>
      <label style={{ color: "#bbb" }}>{label}</label>
      {children}
    </div>
  );
}

const inputBox: React.CSSProperties = {
  background: "#0f0f0f",
  border: "1px solid #333",
  borderRadius: 10,
  padding: "10px 12px",
  color: "#fff",
  width: "100%",
  marginTop: 5,
};

const primaryBtn: React.CSSProperties = {
  background: "#22c55e",
  border: "none",
  borderRadius: 12,
  padding: "12px 16px",
  fontWeight: 800,
  color: "#000",
  cursor: "pointer",
  width: "100%",
};

const secondaryBtn: React.CSSProperties = {
  background: "#111",
  border: "1px solid #444",
  borderRadius: 10,
  padding: "10px 14px",
  marginTop: 14,
  color: "#fff",
  cursor: "pointer",
  width: "100%",
};
