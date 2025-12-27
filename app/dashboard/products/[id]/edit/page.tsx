import { connectDB } from "../../../../../lib/db";
import { Product } from "../../../../../models/Product";
import { redirect } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();

  const product = await Product.findById(params.id).lean();

  if (!product) redirect("/dashboard/products");

  return (
    <main style={{ padding: "40px", maxWidth: "500px" }}>
      <h1>Edit Product</h1>

      <form
        action={`/api/products/${params.id}/edit`}
        method="POST"
      >
        <input
          name="name"
          defaultValue={product.name}
          required
        />
        <br /><br />

        <input
          name="price"
          type="number"
          min="1"
          defaultValue={product.price}
          required
        />
        <br /><br />

        <input
          name="stock"
          type="number"
          min="0"
          defaultValue={product.stock}
          required
        />
        <br /><br />

        <button type="submit">Save</button>
      </form>
    </main>
  );
}
