import Link from "next/link";
import { logoutAdmin } from "./actions";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/retailers", label: "Retailers" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/promotions", label: "Promotions" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <nav aria-label="Admin" className="flex flex-wrap gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted hover:bg-cream-100 hover:text-foreground transition-colors focus-visible-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors focus-visible-ring"
          >
            Sign out
          </button>
        </form>
      </div>

      {children}
    </div>
  );
}
