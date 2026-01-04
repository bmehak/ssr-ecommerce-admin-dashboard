export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connectDB } from "../../lib/db";
import { Product } from "../../models/Product";
import StockChart from "@/components/StockChart";
import { Order } from "@/models/Order";
import RevenueChart from "@/components/RevenueChart";
import { ReactNode } from "react";

interface IProduct {
  _id: { toString: () => string };
  name: string;
  price: number;
  stock: number;
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default async function DashboardPage() {
  await connectDB();

  const products = (await Product.find().lean()) as unknown as IProduct[];
  const orders = await Order.find().lean();

  const now = new Date();
  const last7 = new Date(); last7.setDate(now.getDate() - 7);
  const last30 = new Date(); last30.setDate(now.getDate() - 30);

  const totalProducts = products.length;
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const totalValue = products.reduce((s, p) => s + p.stock * p.price, 0);
  const lowStock = products.filter((p) => p.stock < 10);

  const stockChartData = products.map((p) => ({
    name: p.name.length > 10 ? p.name.substring(0, 10) + "..." : p.name,
    stock: p.stock,
  }));

  const lastMonthOrders = orders.filter(o => new Date(o.createdAt) >= last30);
  const totalRevenue = lastMonthOrders.reduce(
    (s, o) => s + o.price * o.quantity,
    0
  );

  const lastWeekOrders = orders.filter(o => new Date(o.createdAt) >= last7);
  const revenueByDate: Record<string, number> = {};

  lastWeekOrders.forEach(o => {
    const d = new Date(o.createdAt);
    const date = d.toISOString().split("T")[0];
    revenueByDate[date] =
      (revenueByDate[date] || 0) + o.price * o.quantity;
  });

  const revenueChartData = Object.entries(revenueByDate).map(
    ([date, revenue]) => ({ date, revenue })
  );

  const salesMap: Record<string, number> = {};

  lastWeekOrders.forEach(o => {
    salesMap[o.productId] = (salesMap[o.productId] || 0) + o.quantity;
  });

  let bestSeller = "No sales yet";

  const best = Object.entries(salesMap).sort((a, b) => b[1] - a[1])[0];

  if (best) {
    const prod = products.find(p => p._id.toString() === best[0]);
    if (prod) bestSeller = `${prod.name} : ${best[1]} sold`;
  }


  return (
    <main style={{ padding: 40, color: "#fff" }}>

      <h1 style={{ fontSize: 32, marginBottom: 6 }}>
        Dashboard
      </h1>

      <p style={{ color: "#aaa", marginBottom: 30 }}>
        Overview & Performance Insights
      </p>

      <div style={{ display: "flex", gap: 18, marginBottom: 26 }}>
        <Card title="Revenue (Last 30 Days)" value={totalRevenue} color="#22c55e" />
        <Card title="Total Products" value={totalProducts} color="#38bdf8" />
        <Card title="Total Stock" value={totalStock} color="#a855f7" />
        <Card title="Stock Value (₹)" value={totalValue} color="#fde047" />
        <Card title="Low Stock Items" value={lowStock.length} color="#ef4444" />
        <Card title="Best Seller(Last 7 Days)" value={bestSeller} color="#34d399" />
      </div>

      <Section title="📦 Stock Levels by Product">
        <StockChart data={stockChartData} />
      </Section>

      <Section title="💰 Revenue — Last 7 Days">
        <RevenueChart data={revenueChartData} />
      </Section>

      <h3 style={{ marginTop: 30 }}>Low Stock Alerts</h3>

      {lowStock.length === 0 ? (
        <p style={{ color: "#aaa" }}>All stocks are healthy 👍</p>
      ) : (
        <ul style={{ lineHeight: "26px" }}>
          {lowStock.map((p) => (
            <li key={p._id.toString()}>
              {p.name} — {p.stock} left
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function Section({ title, children }: SectionProps) {
  return (
    <div
      style={{
        background: "rgba(20,20,20,.9)",
        borderRadius: 14,
        padding: 20,
        marginBottom: 26,
        border: "1px solid #222",
      }}
    >
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
      {children}
    </div>
  );
}

function Card({ title, value, color }: { title: string; value: number | string; color: string }) {
  return (
    <div
      style={{
        background: "#0f0f0f",
        borderRadius: 14,
        padding: 18,
        border: `1px solid ${color}55`,
        minWidth: 200,
      }}
    >
      <h4 style={{ color: "#aaa", marginBottom: 6 }}>{title}</h4>
      <strong style={{ fontSize: 22, color }}>
        {typeof value === "number" ? value.toLocaleString("en-IN") : value}
      </strong>
    </div>
  );
}
