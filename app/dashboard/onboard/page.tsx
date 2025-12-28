"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function OnboardPage() {
  const [loading, setLoading] = useState(false);

  async function handleOnboard(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    if (res.ok) {
      toast.success("New Admin registered successfully!");
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error("Failed to register admin.");
    }
    setLoading(false);
  }

  return (
    <main style={{ padding: "40px", maxWidth: "400px" }}>
      <h1>Onboard New Admin</h1>
      <form onSubmit={handleOnboard} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        <input name="name" placeholder="Full Name" required style={inputStyle} />
        <input name="email" type="email" placeholder="Email" required style={inputStyle} />
        <input name="password" type="password" placeholder="Password" required style={inputStyle} />
        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? "Registering..." : "Create Admin Account"}
        </button>
      </form>
    </main>
  );
}

const inputStyle = { padding: "12px", borderRadius: "5px", border: "1px solid #ddd" };
const btnStyle = { padding: "12px", background: "#111", color: "#fff", cursor: "pointer", borderRadius: "5px" };