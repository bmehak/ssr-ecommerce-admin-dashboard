import { auth } from "@/auth";
import Link from "next/link";
import { headers } from "next/headers";

export default async function LoginBar() {
  const session = await auth();
  const headersList = await headers();
  const currentUrl = headersList.get("referer") || "/";
  return (
    <div style={{ display:"flex", gap:12, marginBottom:20 }}>
      {!session?.user ? (
        <Link
          href={`/login?callbackUrl=${encodeURIComponent(currentUrl)}`}
          style={{
            padding:"8px 12px",
            border:"1px solid #444",
            borderRadius:8
          }}
        >
          Login
        </Link>
      ) : (
        <>
          {session.user.role === "admin" && (
            <Link
              href="/dashboard"
              style={{
                padding:"8px 12px",
                border:"1px solid #888",
                borderRadius:8
              }}
            >
              Go to Dashboard
            </Link>
          )}

          <Link
            href="/logout"
            style={{
              padding:"8px 12px",
              border:"1px solid #ff4444",
              borderRadius:8,
              color:"#ff4444"
            }}
          >
            Logout
          </Link>
        </>
      )}
    </div>
  );
}
