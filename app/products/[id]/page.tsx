import { connectDB } from "../../../lib/db";
import { Product } from "../../../models/Product";
import Image from "next/image";
import PlaceOrderButton from "@/components/PlaceOrderButton";
import LoginBar from "@/components/LoginBar";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  const product = await Product.findById(id).lean();

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <main style={{ padding: "40px", maxWidth: 1200, margin: "0 auto" }}>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <LoginBar />

        <Link
          href="/products"
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "1px solid #444",
            textDecoration: "none",
            color: "#fff",
          }}
        >
          ← Back to Store
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 40,
          marginTop: 25,
        }}
      >

        <div
          style={{
            background: "#0d0d0d",
            padding: 20,
            borderRadius: 16,
            border: "1px solid #222",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            width={700}
            height={500}
            style={{
              borderRadius: 12,
              objectFit: "cover",
              width: "100%",
            }}
          />
        </div>

        <div>
          <h1 style={{ fontSize: 36 }}>{product.name}</h1>

          <p style={{ opacity: 0.7 }}>
            Category — <b>{product.category}</b>
          </p>

          <h2 style={{ color: "#aaffaa", fontSize: 32 }}>
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <p style={{ marginTop: 10 }}>{product.description}</p>

          <p style={{ marginTop: 10 }}>
            <b>Stock:</b>{" "}
            <span
              style={{
                color: product.stock > 5 ? "#8aff8a" : "#ff7c7c",
              }}
            >
              {product.stock}
            </span>
          </p>

          <div style={{ marginTop: 25 }}>
            <PlaceOrderButton
              productId={product._id.toString()}
              price={product.price}
              stock={product.stock}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
