export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connectDB } from "../../lib/db";
import { Product } from "../../models/Product";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/Product";
import LoginBar from "@/components/LoginBar";

export default async function ProductsPage() {
  await connectDB();

  const products = (await Product.find().lean()) as ProductType[];

  return (
    <main style={{ padding: "40px", maxWidth: 1200, margin: "0 auto" }}>
      
      <div 
        style={{ 
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30
        }}
      >
        <LoginBar />

        <h1 style={{ fontSize: 32, fontWeight: 800 }}>🛒 Store</h1>

      </div>

      <p style={{ opacity: 0.8, marginBottom: 20 }}>
        Browse available products and place orders instantly
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "24px",
        }}
      >
        {products.map((p) => (
          <Link
            key={p._id}
            href={`/products/${p._id}`}
            style={{
              background: "#0d0d0d",
              borderRadius: "14px",
              textDecoration: "none",
              color: "white",
              overflow: "hidden",
              border: "1px solid #1f1f1f",
              transition: "transform .2s ease, box-shadow .2s ease",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 170,
                position: "relative"
              }}
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            <div style={{ padding: "14px" }}>
              <h3 style={{ margin: 0 }}>{p.name}</h3>

              <p style={{ opacity: 0.7, marginTop: 6, fontSize: 14 }}>
                {p.category}
              </p>

              <p style={{ marginTop: 12, fontWeight: 700, fontSize: 18 }}>
                ₹{p.price.toLocaleString("en-IN")}
              </p>

              <div
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  opacity: 0.7,
                }}
              >
                {p.stock > 0 ? `In stock: ${p.stock}` : "Out of stock"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
