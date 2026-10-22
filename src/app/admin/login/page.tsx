import { LoginForm } from "./_login-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin login — Nyumba Edit",
  description: "Sign in to the Nyumba Edit admin dashboard.",
};

export default function AdminLoginPage() {
  return (
    <div className="max-w-md mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Admin login</h1>
        <p className="text-muted text-sm">
          Enter your admin credentials to access the dashboard.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
