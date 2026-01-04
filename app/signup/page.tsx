import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn } from "../../auth";

export default function SignupPage({
  searchParams
}: {
  searchParams?: { callbackUrl?: string }
}) {

  const callback = searchParams?.callbackUrl || "/";

  return (
    <div style={pageWrap}>
      <div style={card}>
        <h1 style={title}>Create Account ✨</h1>
        <p style={subtitle}>Shop faster by creating a free account</p>

        <form
          action={async (formData) => {
            "use server";

            const email = String(formData.get("email"));
            const password = String(formData.get("password"));

            await connectDB();

            const exists = await User.findOne({ email });
            if (exists) redirect("/login");

            const hashed = await bcrypt.hash(password, 10);

            await User.create({
              email,
              password: hashed,
              role: "user"
            });

            // AUTO LOGIN
            await signIn("credentials", {
              email,
              password,
              redirectTo: callback
            });
          }}
          style={form}
        >
          <input name="email" type="email" placeholder="Email" required style={input}/>
          <input name="password" type="password" placeholder="Password" required style={input}/>

          <button type="submit" style={btnPrimary}>Create Account</button>
        </form>

        <p style={{ marginTop: 14 }}>
          Already have an account?{" "}
          <a href={`/login?callbackUrl=${encodeURIComponent(callback)}`} style={{ color:"#38bdf8" }}>
            Login
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
  background: "#4ade80",
  color: "#000",
  fontWeight: 700,
  cursor: "pointer",
  border: "none",
};
