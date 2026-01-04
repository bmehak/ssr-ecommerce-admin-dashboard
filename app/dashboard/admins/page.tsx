"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type UserType = {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminListPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/admins", {
        cache: "no-store",
        credentials: "include",
      });

      const data = await res.json();
      setUsers(data);
      setLoading(false);
    }

    load();
  }, []);

  async function deleteUser(id: string, role: string) {
    const confirmDelete = confirm("Are you sure you want to delete this account?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/admins/${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success(role === "admin" ? "Admin deleted" : "User deleted");
      setUsers(prev => prev.filter(u => u._id !== id));
    } else {
      const data = await res.json();
      toast.error(data.message || "Delete failed");
    }
  }

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <main style={{ padding: 40, color: "#fff" }}>
      {/* HEADER */}
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        Manage Accounts
      </h1>

      <p style={{ color: "#aaa", marginBottom: 20 }}>
        View and manage admin & user roles
      </p>

      {/* WRAPPER CARD */}
      <div
        style={{
          background: "rgba(20,20,20,.9)",
          borderRadius: 14,
          border: "1px solid #222",
          padding: 18,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 10px",
          }}
        >
          <thead>
            <tr style={{ color: "#bbb", textAlign: "left" }}>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr
                key={u._id}
                style={{
                  background: "#0f0f0f",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <td style={{ padding: 14, fontWeight: 600 }}>
                  {u.email}
                </td>

                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 700,
                      background:
                        u.role === "admin"
                          ? "#1e3a8a"
                          : "#064e3b",
                      color: "#a7f3d0",
                      marginLeft: 10,
                    }}
                  >
                    {u.role.toUpperCase()}
                  </span>
                </td>

                <td style={{ color: "#bbb" }}>
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => deleteUser(u._id, u.role)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "1px solid #ef4444",
                      color: "#ef4444",
                      background: "transparent",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", marginTop: 20 }}>
            No users found
          </p>
        )}
      </div>
    </main>
  );
}
