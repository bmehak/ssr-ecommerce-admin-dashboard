"use client";

import { useEffect, useState } from "react";

type UserType = {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminListPage() {
  const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
      async function load() {
        const res = await fetch("/api/admins");
        const data = await res.json();
        setUsers(data);
      }
  
      load();
    }, []); 

  async function deleteUser(id: string) {
    await fetch(`/api/admins/${id}`, { method: "DELETE" });
  }

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
              <td>{u.role}</td>
              <td>
                {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "—"}
              </td>
              <td>
                <button
                  style={{ color: "red" }}
                  onClick={() => deleteUser(u._id)}
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
