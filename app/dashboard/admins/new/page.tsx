"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateAdminPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admins/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created");
        router.push("/dashboard/admins");
      } else {
        toast.error(data.message || "Account creation failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        color: "#fff",
        background: "#000",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 6 }}>
        Create Account
      </h1>

      <p style={{ color: "#aaa", marginBottom: 22 }}>
        Add a new admin or user account
      </p>

      <div
        style={{
          maxWidth: 600,
          background: "rgba(20,20,20,.9)",
          borderRadius: 14,
          border: "1px solid #222",
          padding: 24,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <Field label="Email">
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputBox}
              placeholder="admin@example.com"
            />
          </Field>

          <Field label="Password">
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={inputBox}
              placeholder="Create a strong password"
            />
          </Field>

          <Field label="Role">
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={inputBox}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </Field>

          <button
            disabled={loading}
            type="submit"
            style={primaryBtn}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}

/* ---------- Small Reusable Label Wrapper ---------- */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ color: "#bbb", fontSize: 14 }}>{label}</label>
      {children}
    </div>
  );
}

/* ---------- Styles ---------- */
const inputBox: React.CSSProperties = {
  width: "100%",
  marginTop: 6,
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #333",
  background: "#0f0f0f",
  color: "#fff",
  fontSize: 15,
};

const primaryBtn: React.CSSProperties = {
  marginTop: 6,
  background: "#22c55e",
  color: "#000",
  padding: "12px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontWeight: 800,
};
