import { signIn } from "../../auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default function LoginPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirectTo: "/dashboard/products", 
            });
          } catch (error) {
            if (isRedirectError(error)) {
              throw error; 
            }
            console.error("Login Error:", error);
          }
        }}
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}
      >
        <h1>Admin Login</h1>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}