import { connectDB } from "../../../lib/db";
import { Product } from "../../../models/Product";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  const product = await Product.findById(id).lean();

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <main style={{ padding: "40px" }}>
      <h1>{product.name}</h1>

      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={300}
        style={{ borderRadius: "12px", objectFit: "cover" }}
      />

      <p style={{ marginTop: 20 }}>{product.description}</p>

      <h3>₹{product.price}</h3>

      <p><b>Stock:</b> {product.stock}</p>

      <p><b>Category:</b> {product.category}</p>
    </main>
  );
}
