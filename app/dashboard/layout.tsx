import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#111",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Admin</h2>
        <nav style={{ marginTop: "20px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link href="/dashboard/products" style={{ color: "#fff" }}>
                Products
              </Link>
            </li>
            <li style={{ marginTop: "10px" }}>
              <Link href="/dashboard/products/new" style={{ color: "#fff" }}>
                Add Product
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "40px" }}>{children}</main>
    </div>
  );
}