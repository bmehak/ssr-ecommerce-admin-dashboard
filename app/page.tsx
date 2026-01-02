import Link from "next/link";
import { auth, signOut } from "../auth";

export default async function HomePage() {
  const session = await auth();
  const role = session?.user?.role;
  const email = session?.user?.email;

  return (
    <main
      style={{
        padding: "60px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#fff" }}>
        SSR E-commerce Platform
      </h1>

      {session ? (
        <p style={{ color: "#aaa" }}>
          Logged in as <strong>{email}</strong> ({role})
        </p>
      ) : (
        <p style={{ color: "#aaa" }}>You are not logged in</p>
      )}

      <div style={{ display: "flex", gap: "15px" }}>

        {role === "admin" && (
          <Link
            href="/dashboard/products"
            style={buttonWhite}
          >
            Go to Admin Dashboard
          </Link>
        )}

        <Link href="/products" style={buttonDark}>
          View Store
        </Link>

        {!session && (
          <Link href="/login" style={buttonWhite}>
            Login
          </Link>
        )}

        {session && (
          <>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button type="submit" style={buttonYellow}>
                Switch Account
              </button>
            </form>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit" style={buttonRed}>
                Logout
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

const baseBtn = {
  padding: "12px 18px",
  borderRadius: "8px",
  fontWeight: "bold",
  textDecoration: "none",
  border: "none",
  cursor: "pointer",
} as const;

const buttonWhite = {
  ...baseBtn,
  background: "#fff",
  color: "#000",
};

const buttonDark = {
  ...baseBtn,
  background: "#333",
  color: "#fff",
};

const buttonYellow = {
  ...baseBtn,
  background: "#ffeb3b",
  color: "#000",
};

const buttonRed = {
  ...baseBtn,
  background: "#ff4d4d",
  color: "#000",
};
