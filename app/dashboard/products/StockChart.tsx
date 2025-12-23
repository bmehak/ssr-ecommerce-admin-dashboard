"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Product = {
  _id: string;
  name: string;
  stock: number;
};

export default function StockChart({ products }: { products: Product[] }) {
  return (
    <div style={{ width: "100%", height: 300, marginBottom: "40px" }}>
      <h3>Stock Overview</h3>
      <ResponsiveContainer>
        <BarChart data={products}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}