import { auth, signOut } from "../../auth";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.user?.role;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        background: "#000",
        color: "#fff",
      }}
    >

      <aside
        style={{
          width: 260,
          padding: "28px 18px",
          background: "#0d0d0d",
          borderRight: "1px solid #1f1f1f",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h2
          style={{
            fontSize: 22,
            marginBottom: 16,
            fontWeight: 800,
          }}
        >
          Admin Panel
        </h2>

        <p style={{ color: "#aaa", marginBottom: 22 }}>
          Welcome, {session?.user?.email}
        </p>

        <nav>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gap: 8,
            }}
          >
            {role === "admin" && (
              <>
                <NavItem href="/dashboard">📊 Home</NavItem>
                <NavItem href="/dashboard/products">📦 Products</NavItem>
                <NavItem href="/dashboard/products/new">➕ Add Product</NavItem>
                <NavItem href="/dashboard/admins">👥 Manage Accounts</NavItem>
                <NavItem href="/dashboard/admins/new">
                  ✨ Create New Account
                </NavItem>
                <NavItem href="/products">🛒 View Store</NavItem>
              </>
            )}
          </ul>
        </nav>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            style={{
              marginTop: 24,
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: "1px solid #444",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Logout
          </button>
        </form>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "30px 40px",
        }}
      >
        {children}
      </main>
    </div>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        style={{
          display: "block",
          padding: "10px 14px",
          borderRadius: 10,
          background: "#111",
          border: "1px solid #222",
          textDecoration: "none",
          color: "#e5e5e5",
          fontWeight: 600,
        }}
      >
        {children}
      </Link>
    </li>
  );
}
