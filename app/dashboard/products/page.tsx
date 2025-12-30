export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connectDB } from "../../../lib/db";
import { Product } from "../../../models/Product";
import StockChart from "./StockChart";

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
    <div>
      <h1>Products</h1>
      <StockChart products={products} />
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                <img 
                  src={p.image} 
                  alt={p.name}
                  width={60} 
                  height={60} 
                  style={{ borderRadius: "8px", objectFit: "cover" }}
                />
              </td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
          
              <td>
                <form action={`/api/products/${p._id}/delete`} method="POST">
                  <button style={{ color: "red" }}>Delete</button>
                </form>
                &nbsp;
                <a href={`/dashboard/products/${p._id}/edit`}>
                  <button>Edit</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
