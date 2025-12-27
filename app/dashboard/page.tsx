export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connectDB } from "../../lib/db";
import { Product } from "../../models/Product";

interface IProduct {
  _id: { toString: () => string };
  name: string;
  price: number;
  stock: number;
}

export default async function DashboardPage() {
  await connectDB();

  const products = (await Product.find().lean()) as unknown as IProduct[];

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum: number, p) => sum + p.stock,
    0
  );

  const totalValue = products.reduce(
    (sum: number, p) => sum + p.stock * p.price,
    0
  );

  const lowStock = products.filter((p) => p.stock < 10);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Total Products" value={totalProducts} />
        <Card title="Total Stock" value={totalStock} />
        <Card title="Stock Value (₹)" value={totalValue} />
        <Card title="Low Stock Items" value={lowStock.length} />
      </div>

      <h3 style={{ marginTop: 40 }}>Low Stock Alerts</h3>
      {lowStock.length === 0 && <p>All stocks are healthy 👍</p>}

      <ul>
        {lowStock.map((p) => (
          <li key={p._id.toString()}>
            {p.name} — {p.stock} left
          </li>
        ))}
      </ul>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div
      style={{
        background: "#111",
        color: "#fff",
        padding: 20,
        borderRadius: 10,
        width: 200,
      }}
    >
      <h4 style={{ margin: 0, color: "#888" }}>{title}</h4>
      <strong style={{ fontSize: 22 }}>{typeof value === "number" ? value.toLocaleString("en-IN") : value}</strong>
    </div>
  );
}
