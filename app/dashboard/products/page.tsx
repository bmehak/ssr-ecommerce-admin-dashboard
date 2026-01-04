export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connectDB } from "../../../lib/db";
import { Product } from "../../../models/Product";
import StockChart from "./StockChart";
import Link from "next/link";

type ProductType = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string;
};

export default async function ProductsPage() {
  await connectDB();

  const rawProducts = await Product.find().lean();

  const products: ProductType[] = rawProducts.map((p) => ({
    _id: p._id.toString(),
    name: p.name,
    description: p.description,
    category: p.category,
    price: p.price,
    stock: p.stock,
    image: p.image,
  }));

  return (
    <main style={{ padding: 40, color: "#fff" }}>

      <h1 style={{ fontSize: 30, marginBottom: 10 }}>
        Products
      </h1>

      <p style={{ color: "#aaa", marginBottom: 25 }}>
        Manage product inventory & update listings
      </p>

      <div
        style={{
          background: "rgba(20,20,20,.9)",
          borderRadius: 14,
          padding: 20,
          border: "1px solid #222",
          marginBottom: 26,
        }}
      >
        <h3 style={{ marginBottom: 12 }}>📦 Stock Overview</h3>
        <StockChart products={products} />
      </div>

      <div
        style={{
          background: "rgba(20,20,20,.9)",
          borderRadius: 14,
          padding: 20,
          border: "1px solid #222",
        }}
      >
        <h3 style={{ marginBottom: 12 }}>Product List</h3>


        <div style={{ display: "grid", gap: 16 }}>

          {products.map((p) => (
            <div
              key={p._id}
              style={{
                display: "grid",
                gridTemplateColumns: "110px 1fr auto",
                gap: 16,
                padding: 16,
                background: "#0f0f0f",
                borderRadius: 12,
                border: "1px solid #222",
                width: "100%",
                alignItems: "center",
              }}
            >

              <img
                src={p.image}
                width={110}
                height={110}
                style={{
                  borderRadius: 10,
                  objectFit: "cover",
                  border: "1px solid #222",
                }}
              />

              <div style={{ display: "grid", gap: 6 }}>

                <div style={{ fontSize: 18, fontWeight: 700 }}>
                  {p.name}
                </div>

                <span
                  style={{
                    background: "#1f2937",
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontSize: 13,
                    width: "fit-content",
                  }}
                >
                  {p.category}
                </span>

                <p
                  style={{
                    margin: 0,
                    color: "#bbb",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    maxWidth: "90%",
                  }}
                >
                  {p.description}
                </p>

                <div style={{ fontWeight: 700 }}>
                  ₹{p.price.toLocaleString("en-IN")}
                </div>

                <div
                  style={{
                    fontWeight: 600,
                    color: p.stock < 10 ? "#f87171" : "#4ade80",
                  }}
                >
                  Stock: {p.stock}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                <Link href={`/dashboard/products/${p._id}/edit`}>
                  <button
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "1px solid #38bdf8",
                      color: "#38bdf8",
                      background: "transparent",
                      cursor: "pointer",
                      width: 110,
                    }}
                  >
                    Edit
                  </button>
                </Link>

                <form
                  action={`/api/products/${p._id}/delete`}
                  method="POST"
                >
                  <button
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "1px solid #ef4444",
                      color: "#ef4444",
                      background: "transparent",
                      cursor: "pointer",
                      width: 110,
                    }}
                  >
                    Delete
                  </button>
                </form>

              </div>

            </div>
          ))}

        </div>
      </div>
    </main>
  );
}
