import { signIn } from "../../auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

type LoginProps = {
  searchParams?: {
    callbackUrl?: string;
  };
};

export default function LoginPage({ searchParams }: LoginProps) {

  const callback = searchParams?.callbackUrl || "/";

  return (
    <div style={pageWrap}>
      <div style={card}>
        <h1 style={title}>Welcome Back 👋</h1>
        <p style={subtitle}>Log in to continue shopping or manage the store</p>

        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: callback,
              });
            } catch (error) {
              if (isRedirectError(error)) throw error;
              redirect("/login");
            }
          }}
          style={form}
        >
          <input name="email" type="email" placeholder="Email" required style={input}/>
          <input name="password" type="password" placeholder="Password" required style={input}/>

          <button type="submit" style={btnPrimary}>Sign In</button>
        </form>

        <p style={{ marginTop: 14 }}>
          New here?{" "}
          <a
            href={`/signup?callbackUrl=${encodeURIComponent(callback)}`}
            style={{ color: "#38bdf8" }}
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}


const pageWrap = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#020617",
};

const card = {
  background: "#0f172a",
  border: "1px solid #1f2937",
  borderRadius: 16,
  padding: 28,
  width: 380,
  color: "#fff",
  textAlign: "center" as const,
};

const title = { fontSize: 26, marginBottom: 6 };
const subtitle = { color: "#94a3b8", marginBottom: 18 };
const form = { display: "flex", flexDirection: "column" as const, gap: 10 };

const input = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #334155",
  background: "#020617",
  color: "#fff",
};

const btnPrimary = {
  padding: 12,
  borderRadius: 10,
  background: "#38bdf8",
  color: "#000",
  fontWeight: 700,
  cursor: "pointer",
  border: "none",
};
