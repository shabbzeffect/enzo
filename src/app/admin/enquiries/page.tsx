import Link from "next/link";
import { getStore } from "@/server/demo-store";
import { Badge } from "@/components/ui/badge";
import { updateEnquiryStatusAction, deleteEnquiryAction, seedDemoEnquiry } from "../actions";

export const metadata = {
  title: "Enquiries inbox — Nyumba Edit admin",
  description: "Nyumba Edit admin enquiries inbox (demonstration only).",
};

export const dynamic = "force-dynamic";

export default function AdminEnquiriesPage() {
  const enquiries = getStore().enquiries;

  const newCount = enquiries.filter((e) => e.status === "new").length;
  const readCount = enquiries.filter((e) => e.status === "read").length;
  const resolvedCount = enquiries.filter((e) => e.status === "resolved").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Enquiries inbox</h1>
        <p className="text-muted text-sm">
          {enquiries.length} total · {newCount} new · {readCount} read · {resolvedCount} resolved.
          Enquiries from retailer/product pages, contact form and listing requests land here.
        </p>
        <Link href="/admin" className="text-sm text-primary hover:underline">&larr; Back to dashboard</Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm p-4">
        <form action={seedDemoEnquiry} className="flex flex-wrap items-center gap-3">
          <input type="hidden" name="kind" value="contact" />
          <input name="name" type="text" placeholder="Name" className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus-visible-ring" />
          <input name="phone" type="tel" placeholder="+254 700 000 000" className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus-visible-ring" />
          <input name="email" type="email" placeholder="email@example.com" className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus-visible-ring" />
          <input name="message" type="text" placeholder="Message..." className="flex-1 min-w-[200px] rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus-visible-ring" />
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors focus-visible-ring"
          >
            Add demo enquiry
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-x-auto">
        {enquiries.length === 0 ? (
          <div className="p-12 text-center text-muted">No enquiries yet.</div>
        ) : (
          <table className="w-full min-w-[1000px] text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 pb-3 text-xs text-muted font-medium">Kind</th>
                <th className="pb-3 text-xs text-muted font-medium">From</th>
                <th className="pb-3 text-xs text-muted font-medium">Subject / Target</th>
                <th className="pb-3 text-xs text-muted font-medium max-w-md">Message</th>
                <th className="pb-3 text-xs text-muted font-medium">Date</th>
                <th className="pb-3 text-xs text-muted font-medium text-center">Status</th>
                <th className="pb-3 text-xs text-muted font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {enquiries.map((e) => (
                <tr key={e.id} className="text-foreground align-top">
                  <td className="p-4">
                    <Badge variant="subtle" className="capitalize">{e.kind.replace("-", " ")}</Badge>
                  </td>
                  <td className="py-4">
                    <div className="font-medium">{e.name}</div>
                    <p className="text-xs text-muted">{e.phone}</p>
                    {e.email && <p className="text-xs text-muted">{e.email}</p>}
                  </td>
                  <td className="py-4 max-w-xs">
                    {e.subject && <div className="text-xs font-medium text-foreground">{e.subject}</div>}
                    {e.retailerName && <p className="text-xs text-muted">Retailer: {e.retailerName}</p>}
                    {e.productName && <p className="text-xs text-muted">Product: {e.productName}</p>}
                  </td>
                  <td className="py-4 max-w-md">
                    <p className="text-xs text-muted line-clamp-2">{e.message}</p>
                  </td>
                  <td className="py-4 text-xs text-muted">
                    {new Date(e.createdAt).toLocaleString("en-KE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-4 text-center">
                    <Badge
                      variant={e.status === "new" ? "warning" : e.status === "read" ? "tertiary" : "success"}
                    >
                      {e.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-right whitespace-nowrap">
                    <form action={updateEnquiryStatusAction} className="inline-flex items-center gap-1">
                      <input type="hidden" name="id" value={e.id} />
                      <select name="status" className="text-xs rounded-lg border border-border bg-white px-2 py-1 text-foreground focus-visible-ring" defaultValue={e.status}>
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button type="submit" className="text-xs text-primary hover:underline">Update</button>
                    </form>
                    <form action={deleteEnquiryAction} className="inline-flex">
                      <input type="hidden" name="id" value={e.id} />
                      <button type="submit" className="text-xs text-tertiary hover:underline">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="rounded-xl border border-border bg-cream-50 p-6">
        <h3 className="font-bold text-foreground mb-2">Notes</h3>
        <ul className="text-sm text-muted space-y-2 list-disc list-inside">
          <li>Enquiries are stored in process memory for this demo; they reset when the server restarts.</li>
          <li>In production, connect the Prisma Enquiry model and add email/WhatsApp notifications.</li>
          <li>The "Add demo enquiry" button seeds a sample entry for testing the inbox UI.</li>
        </ul>
      </div>
    </div>
  );
}