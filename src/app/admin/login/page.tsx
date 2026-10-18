import { LoginForm } from "./_login-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin login — Nyumba Edit",
  description: "Nyumba Edit admin login (demonstration only).",
};

export default function AdminLoginPage() {
  return (
    <div className="max-w-md mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Admin login</h1>
        <p className="text-muted text-sm">
          Demonstration only. In production this would be NextAuth-protected.
        </p>
      </div>
      <LoginForm />
      <p className="text-xs text-muted text-center">
        Demo session value: admin-demo. Replace with real auth before production.
      </p>
    </div>
  );
}
