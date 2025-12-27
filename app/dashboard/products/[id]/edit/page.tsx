import { connectDB } from "../../../../../lib/db";
import { Product } from "../../../../../models/Product";
import { redirect } from "next/navigation";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  const product = await Product.findById(id).lean();

  if (!product) redirect("/dashboard/products");

  return (
    <main style={{ padding: "40px", maxWidth: "500px" }}>
      <h1>Edit Product</h1>

      {}
      <form
        action={`/api/products/${id}/edit`}
        method="POST"
      >
        <input
          name="name"
          defaultValue={product.name as string}
          required
        />
        <br /><br />

        <input
          name="price"
          type="number"
          min="1"
          defaultValue={product.price as number}
          required
        />
        <br /><br />

        <input
          name="stock"
          type="number"
          min="0"
          defaultValue={product.stock as number}
          required
        />
        <br /><br />

        <button type="submit">Save</button>
      </form>
    </main>
  );
}