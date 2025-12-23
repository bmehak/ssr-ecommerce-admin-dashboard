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

  const products: ProductType[] = await Product.find().lean();

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
