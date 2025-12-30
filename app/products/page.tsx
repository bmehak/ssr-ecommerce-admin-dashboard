import { connectDB } from "../../lib/db";
import { Product } from "../../models/Product";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/Product";

export default async function ProductsPage() {
  await connectDB();

  const products = (await Product.find().lean()) as ProductType[];

  return (
    <main style={{ padding: "40px" }}>
      <h1>Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((p) => (
          <Link
            key={p._id}
            href={`/products/${p._id}`}
            style={{
              background: "#111",
              padding: "15px",
              borderRadius: "10px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <Image
              src={p.image}
              alt={p.name}
              width={260}
              height={180}
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
