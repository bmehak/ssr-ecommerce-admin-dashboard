export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Types } from "mongoose";
import { connectDB } from "../../../lib/db";
import { Product } from "../../../models/Product";
import StockChart from "./StockChart";

type ProductType = {
  _id: string;
  name: string;
  price: number;
  stock: number;
};

export default async function ProductsPage() {
  await connectDB();

const rawProducts = await Product.find().lean();

const products: ProductType[] = rawProducts.map((p) => ({
  _id: p._id.toString(),
  name: p.name,
  price: p.price,
  stock: p.stock,
}));

  return (
    <div>
      <h1>Products</h1>
      <StockChart products={products} />
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <form action={`/api/products/${p._id}/delete`} method="POST">
                  <button style={{ color: "red" }}>Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
