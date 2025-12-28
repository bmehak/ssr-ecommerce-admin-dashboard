"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface StockData {
  name: string;
  stock: number;
}

interface StockChartProps {
  data: StockData[];
}

export default function StockChart({ data }: StockChartProps) {
  return (
    <div style={{ 
      height: 350, 
      marginTop: "40px", 
      background: "#fdfdfd", 
      padding: "20px", 
      borderRadius: "10px", 
      border: "1px solid #eee" 
    }}>
      <h3 style={{ color: "#333", marginBottom: "20px", fontFamily: "sans-serif" }}>
        Stock Levels by Product
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: "#666" }} 
            interval={0}
          />
          <YAxis tick={{ fontSize: 12, fill: "#666" }} />
          <Tooltip 
            cursor={{ fill: '#f5f5f5' }}
            contentStyle={{ 
              borderRadius: "8px", 
              border: "none", 
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
            }} 
          />
          <Bar 
            dataKey="stock" 
            fill="#111" 
            radius={[4, 4, 0, 0]} 
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}