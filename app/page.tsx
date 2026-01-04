import Link from "next/link";
import { auth, signOut } from "../auth";

export default async function HomePage() {
  const session = await auth();
  const role = session?.user?.role;
  const email = session?.user?.email;

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
        color: "#fff",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          width: "100%",
          background: "rgba(20,20,20,.9)",
          borderRadius: "14px",
          border: "1px solid #222",
          padding: "32px 40px",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            margin: 0,
          }}
        >
          SSR E-Commerce Platform
        </h1>

        {!session ? (
          <p style={{ color: "#aaa" }}>
            You are currently browsing as <strong>Guest</strong>
          </p>
        ) : (
          <div>
            <p style={{ color: "#aaa", marginBottom: 6 }}>
              Logged in as <strong>{email}</strong>
            </p>

            <span
              style={{
                background:
                  role === "admin" ? "#38bdf8" : "#4ade80",
                color: "#000",
                padding: "6px 12px",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              {role?.toUpperCase()}
            </span>
          </div>
        )}

        <hr style={{ borderColor: "#222" }} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {role === "admin" && (
            <Link href="/dashboard" style={buttonPrimary}>
              Go to Admin Dashboard
            </Link>
          )}

          <Link href="/products" style={buttonGrey}>
            Browse Store
          </Link>

          {!session && (
            <Link href="/login" style={buttonPrimary}>
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

        <p style={{ color: "#666", fontSize: "13px", marginTop: "6px" }}>
          Secure Server-Rendered Dashboard • Role-based Access • Real-time Analytics
        </p>
      </div>
    </main>
  );
}

const baseBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 10,
  fontWeight: 800,
  textDecoration: "none",
  border: "1px solid #222",
  cursor: "pointer",
  transition: "all .18s ease",
};

const buttonPrimary: React.CSSProperties = {
  ...baseBtn,
  background: "#fff",
  color: "#000",
};

const buttonGrey: React.CSSProperties = {
  ...baseBtn,
  background: "#111",
  color: "#fff",
};

const buttonYellow: React.CSSProperties = {
  ...baseBtn,
  background: "#fde047",
  color: "#000",
};

const buttonRed: React.CSSProperties = {
  ...baseBtn,
  background: "#ef4444",
  color: "#000",
};
