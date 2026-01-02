import { auth } from "../../auth";
import Link from "next/link";
import { signOut } from "../../auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = session?.user?.role;

  return (
    <div style={{ display: "flex" }}>
      <aside>
        <h2>Admin</h2>

        <ul>
          {role === "admin" && (
            <>
              <li>
                <Link href="/dashboard">Dashboard Home</Link>
              </li>

              <li>
                <Link href="/dashboard/products">All Products</Link>
              </li>
          
              <li>
                <Link href="/dashboard/products/new">Add Product</Link>
              </li>
            
              <li>
                <Link href="/dashboard/admins">Manage Accounts</Link>
              </li>
              
              <li>
                <Link href="/dashboard/admins/new">Create New Account</Link>
              </li>

              <li>
                <Link href="/products">View Store</Link>
              </li>
            </>
          )}
        </ul>

        <form action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}>
          <button>Logout</button>
        </form>
      </aside>

      <main>{children}</main>
    </div>
  );
}
