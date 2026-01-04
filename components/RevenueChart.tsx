"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type DataType = { date: string; revenue: number };

export default function RevenueChart({ data }: { data: DataType[] }) {
  const sortedData = [...data].sort(
    (a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  return (
    <div style={{ 
      height: 400, 
      marginTop: "15px", 
      background: "#fdfdfd", 
      padding: "20px", 
      borderRadius: "10px", 
      border: "1px solid #eee" 
    }}>
      <h3 style={{ color: "#333", marginBottom: "20px", fontFamily: "sans-serif" }}></h3>

      {sortedData.length === 0 ? (
        <p>No sales yet! </p>
      ) : (
      <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={sortedData} >
            <XAxis dataKey="date"
              tickFormatter={(v) => 
                new Date(v).toLocaleDateString("en-IN")
              }
            />
            <YAxis tickFormatter={(v) => `₹${v.toLocaleString()}`} />
            <Tooltip formatter={(v) => `₹${Number(v).toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#82ca96" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
