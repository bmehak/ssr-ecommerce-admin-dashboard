import Link from "next/link";
import { signOut } from "../../auth";

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
        {/* Logout Form added at the bottom of the Sidebar */}
        <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid #333" }}>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              style={{
                background: "none",
                border: "none",
                color: "#ff4d4d",
                cursor: "pointer",
                padding: 0,
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              Logout →
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "40px" }}>{children}</main>
    </div>
  );
}