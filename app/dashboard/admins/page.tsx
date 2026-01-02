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

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admins");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []); 

  async function deleteUser(id: string, role: string) {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/admins/${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success(role == "admin" ? "Admin deleted" :"User deleted");
      load();
    } else {
      const data = await res.json();
      toast.error(data.message || "Delete failed");
    }
  }

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <main style={{ padding: 40 }}>
      <h1>Manage Admins & Users</h1>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "12px",
                    color: "#000",
                    background: u.role === "admin" ? "#8af" : "#8f8",
                    fontWeight: 600,
                  }}
                >
                  {u.role.toUpperCase()}
                </span>
              </td>
              <td>
                {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "—"}
              </td>
              <td>
                <button
                  style={{ color: "#ff4d4d", cursor: "pointer" }}
                  onClick={() => deleteUser(u._id, u.role)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

